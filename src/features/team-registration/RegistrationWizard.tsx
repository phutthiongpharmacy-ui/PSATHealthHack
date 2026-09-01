"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { teamRegistrationApi, TeamApiError } from "./api";
import { buildRegistrationPayload, createEmptyMember, registrationRecordToForm, validateRegistrationForm } from "./form";
import { clearRegistrationSession, loadRegistrationSession, saveRegistrationSession, type RegistrationSession } from "./storage";
import { RegistrationFrame, Panel, SystemError } from "./RegistrationFrame";
import { EmailStep } from "./EmailStep";
import { OtpStep } from "./OtpStep";
import { TeamFormStep } from "./TeamFormStep";
import { ReviewPaymentStep } from "./ReviewPaymentStep";
import type { FieldErrors, RegistrationForm, TeamEventConfig, TeamRegistrationRecord } from "./types";

const emptyErrors = (): FieldErrors => ({ members: [] });
const initialForm = (leaderEmail = ""): RegistrationForm => ({ teamName: "", categoryId: null, members: [createEmptyMember(0, leaderEmail), createEmptyMember(1), createEmptyMember(2)] });
const readableError = (error: unknown) => error instanceof TeamApiError ? error.message : "ไม่สามารถเชื่อมต่อระบบลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง";

export function RegistrationWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<TeamEventConfig | null>(null);
  const [session, setSession] = useState<RegistrationSession | null>(null);
  const [email, setEmail] = useState("");
  const [challenge, setChallenge] = useState<{ id: string; referenceCode: string; expiresAt: string; resendAvailableAt: string } | null>(null);
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState<RegistrationForm>(() => initialForm());
  const [errors, setErrors] = useState<FieldErrors>(emptyErrors);
  const [activeMember, setActiveMember] = useState(0);
  const [systemError, setSystemError] = useState("");
  const [loading, setLoading] = useState(true);
  const idempotencyKey = useRef<string | null>(null);

  const routeFromRegistration = useCallback((registration: TeamRegistrationRecord, activeSession: RegistrationSession) => {
    const nextSession = { ...activeSession, registrationId: registration.id };
    saveRegistrationSession(nextSession); setSession(nextSession); setEmail(activeSession.leaderEmail);
    if (registration.status === "paid") {
      router.replace("/register/payment-result"); return;
    }
    setForm(registrationRecordToForm(registration));
    setStep(registration.status === "ready_for_payment" || registration.status === "payment_pending" ? 4 : 3);
  }, [router]);

  useEffect(() => {
    let cancelled = false;
    async function bootstrap() {
      const stored = loadRegistrationSession();
      try {
        const [eventConfig, current] = await Promise.all([
          teamRegistrationApi.getConfig(),
          stored ? teamRegistrationApi.getCurrentRegistration(stored.accessToken).catch(() => null) : Promise.resolve(null),
        ]);
        if (cancelled) return;
        setConfig(eventConfig);
        if (stored && current?.registration) routeFromRegistration(current.registration, stored);
        else if (stored) { clearRegistrationSession(); setSession(null); setEmail(stored.leaderEmail); }
      } catch (error) { if (!cancelled) setSystemError(readableError(error)); }
      finally { if (!cancelled) setLoading(false); }
    }
    void bootstrap(); return () => { cancelled = true; };
  }, [routeFromRegistration]);

  const requestOtp = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) { setSystemError("กรุณากรอกอีเมลให้ถูกต้อง"); return; }
    setLoading(true); setSystemError("");
    try { const result = await teamRegistrationApi.requestOtp(email.trim()); setChallenge({ id: result.challengeId, referenceCode: result.referenceCode, expiresAt: result.expiresAt, resendAvailableAt: result.resendAvailableAt }); setOtp(""); setStep(2); }
    catch (error) { setSystemError(readableError(error)); }
    finally { setLoading(false); }
  };

  const verifyOtp = async () => {
    if (!challenge || otp.length !== 6) return;
    setLoading(true); setSystemError("");
    try {
      const verified = await teamRegistrationApi.verifyOtp(challenge.id, otp, challenge.referenceCode);
      const nextSession: RegistrationSession = { accessToken: verified.accessToken, leaderEmail: verified.leaderEmail, expiresAt: verified.expiresAt, registrationId: null };
      saveRegistrationSession(nextSession); setSession(nextSession); setEmail(verified.leaderEmail);
      const current = await teamRegistrationApi.getCurrentRegistration(verified.accessToken);
      if (current.registration) routeFromRegistration(current.registration, nextSession);
      else { setForm(initialForm(verified.leaderEmail)); setErrors(emptyErrors()); setStep(3); }
    } catch (error) { setSystemError(readableError(error)); }
    finally { setLoading(false); }
  };

  const saveAndReview = async () => {
    if (!config || !session || !form.categoryId) return;
    const category = config.categories.find((item) => item.id === form.categoryId);
    if (!category) return;
    const nextErrors = validateRegistrationForm(form, { ...config.registration, educationLevel: category.educationLevel, pharmacyRule: category.pharmacyRule });
    setErrors(nextErrors);
    const firstMemberError = nextErrors.members.findIndex((item) => Object.keys(item).length > 0);
    if (firstMemberError >= 0) setActiveMember(firstMemberError);
    if (nextErrors.form || nextErrors.teamName || nextErrors.categoryId || firstMemberError >= 0) { setSystemError("กรุณาตรวจสอบข้อมูลที่ระบุด้วยสีแดงให้ครบถ้วน"); return; }
    setLoading(true); setSystemError("");
    try {
      const payload = buildRegistrationPayload(form, category.educationLevel);
      const saved = session.registrationId
        ? await teamRegistrationApi.updateRegistration(session.registrationId, payload, session.accessToken)
        : await teamRegistrationApi.createRegistration(payload, session.accessToken);
      const registrationId = saved.registration.id;
      await teamRegistrationApi.validateRegistration(registrationId, session.accessToken);
      const nextSession = { ...session, registrationId }; saveRegistrationSession(nextSession); setSession(nextSession); setStep(4);
    } catch (error) { setSystemError(readableError(error)); }
    finally { setLoading(false); }
  };

  const startPayment = async () => {
    if (!session?.registrationId) return;
    setLoading(true); setSystemError("");
    try {
      idempotencyKey.current ??= crypto.randomUUID();
      const payment = await teamRegistrationApi.createPaymentAttempt(session.registrationId, session.accessToken, idempotencyKey.current);
      const providerForm = document.createElement("form"); providerForm.method = payment.redirectForm.method; providerForm.action = payment.redirectForm.actionUrl;
      Object.entries(payment.redirectForm.fields).forEach(([name, value]) => { const input = document.createElement("input"); input.type = "hidden"; input.name = name; input.value = value; providerForm.appendChild(input); });
      document.body.appendChild(providerForm); providerForm.submit();
    } catch (error) {
      if (error instanceof TeamApiError && error.code === "PAYMENT_ATTEMPT_ACTIVE") router.push("/register/payment-result");
      else { idempotencyKey.current = null; setSystemError(readableError(error)); setLoading(false); }
    }
  };

  const category = useMemo(() => config?.categories.find((item) => item.id === form.categoryId) ?? null, [config, form.categoryId]);
  if (loading && !config) return <RegistrationFrame step={1} compact><Panel className="flex min-h-64 items-center justify-center gap-3 text-hh-text-muted"><LoaderCircle className="animate-spin text-hh-cyan" /> กำลังเชื่อมต่อระบบลงทะเบียน…</Panel></RegistrationFrame>;
  if (!config) return <RegistrationFrame step={1} compact><Panel><SystemError message={systemError || "ไม่พบการตั้งค่าลงทะเบียนสำหรับ Event นี้"} /></Panel></RegistrationFrame>;
  if (!config.registration.isOpen) return <RegistrationFrame step={1} compact><Panel className="text-center"><p className="font-mono text-xs uppercase tracking-widest text-hh-action">Registration unavailable</p><h1 className="mt-3 font-sora text-2xl font-extrabold text-white">ขณะนี้อยู่นอกช่วงรับสมัคร</h1><p className="mt-3 text-sm text-hh-text-muted">เปิดรับสมัคร {formatDate(config.registration.opensAt)} – {formatDate(config.registration.closesAt)}</p></Panel></RegistrationFrame>;

  return <RegistrationFrame step={step} compact={step <= 2}>
    {step === 1 ? <EmailStep email={email} setEmail={setEmail} onSubmit={requestOtp} loading={loading} error={systemError} /> : null}
    {step === 2 && challenge ? <OtpStep email={email} otp={otp} setOtp={setOtp} referenceCode={challenge.referenceCode} resendAvailableAt={challenge.resendAvailableAt} onVerify={verifyOtp} onResend={requestOtp} onBack={() => { setStep(1); setSystemError(""); }} loading={loading} error={systemError} /> : null}
    {step === 3 ? <><TeamFormStep config={config} form={form} setForm={setForm} errors={errors} onContinue={saveAndReview} loading={loading} activeIndex={activeMember} setActiveIndex={setActiveMember} />{systemError ? <div className="mt-4"><SystemError message={systemError} /></div> : null}</> : null}
    {step === 4 && category ? <ReviewPaymentStep config={config} category={category} form={form} onBack={() => { setStep(3); setSystemError(""); }} onPay={startPayment} loading={loading} error={systemError} /> : null}
  </RegistrationFrame>;
}

function formatDate(value: string) { return new Intl.DateTimeFormat("th-TH", { dateStyle: "long", timeZone: "Asia/Bangkok" }).format(new Date(value)); }
