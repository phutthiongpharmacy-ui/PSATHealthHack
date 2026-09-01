"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, CheckCircle2, Clock3, ExternalLink, LoaderCircle, RefreshCw } from "lucide-react";
import { teamRegistrationApi } from "./api";
import { loadRegistrationSession } from "./storage";
import { Panel, RegistrationFrame, SystemError } from "./RegistrationFrame";
import type { PaymentStatusResponse, TeamRegistrationRecord } from "./types";

export function PaymentResult() {
  const [session, setSession] = useState<ReturnType<typeof loadRegistrationSession> | undefined>(undefined);
  const [status, setStatus] = useState<PaymentStatusResponse | null>(null);
  const [registration, setRegistration] = useState<TeamRegistrationRecord | null>(null);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);
  const [retrying, setRetrying] = useState(false);
  const attempts = useRef(0);

  const check = useCallback(async () => {
    const session = loadRegistrationSession();
    if (!session?.registrationId) { setChecking(false); return; }
    try {
      const result = await teamRegistrationApi.getPaymentStatus(session.registrationId, session.accessToken);
      setStatus(result); setError(""); attempts.current += 1;
      const terminal = result.paymentStatus === "paid" || result.paymentStatus === "failed" || result.paymentStatus === "expired" || result.paymentStatus === "verification_required";
      if (terminal || attempts.current >= 5) setChecking(false);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "ไม่สามารถตรวจสอบสถานะการชำระเงินได้"); setChecking(false); }
  }, []);

  const retryPayment = async () => {
    const currentSession = loadRegistrationSession();
    if (!currentSession?.registrationId) return;
    setRetrying(true);
    setError("");
    try {
      const idempotencyKey = crypto.randomUUID();
      const payment = await teamRegistrationApi.createPaymentAttempt(
        currentSession.registrationId,
        currentSession.accessToken,
        idempotencyKey
      );
      const providerForm = document.createElement("form");
      providerForm.method = payment.redirectForm.method;
      providerForm.action = payment.redirectForm.actionUrl;
      Object.entries(payment.redirectForm.fields).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        providerForm.appendChild(input);
      });
      document.body.appendChild(providerForm);
      providerForm.submit();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "ไม่สามารถสร้างรายการชำระเงินใหม่ได้ กรุณาลองใหม่อีกครั้ง");
      setRetrying(false);
    }
  };

  useEffect(() => {
    const session = loadRegistrationSession();
    setSession(session);
    if (!session?.registrationId) { setChecking(false); return; }
    void Promise.all([
      check(),
      teamRegistrationApi.getRegistration(session.registrationId, session.accessToken).then((result) => setRegistration(result.registration)).catch(() => null),
    ]);
  }, [check]);

  useEffect(() => {
    if (!checking || status?.paymentStatus === "paid") return;
    const timer = window.setInterval(() => { void check(); }, 3000);
    return () => window.clearInterval(timer);
  }, [checking, status?.paymentStatus, check]);

  if (session === undefined) return <RegistrationFrame step={5} compact><Panel className="text-center"><LoaderCircle className="mx-auto animate-spin text-hh-cyan" size={48} /><p className="mt-4 text-sm text-hh-text-muted">กำลังโหลดสถานะการชำระเงิน</p></Panel></RegistrationFrame>;
  if (!session?.registrationId) return <RegistrationFrame step={5} compact><Panel className="text-center"><AlertTriangle className="mx-auto text-hh-action" size={48} /><h1 className="mt-4 font-sora text-2xl font-extrabold text-white">ไม่พบ Session การลงทะเบียน</h1><p className="mt-3 text-sm text-hh-text-muted">กรุณายืนยัน Email และ OTP ใหม่เพื่อเปิดข้อมูลทีมเดิม</p><Link href="/register?resume=1" className="mt-6 inline-flex rounded-xl bg-hh-action px-6 py-3 font-bold text-black">ยืนยัน OTP ใหม่</Link></Panel></RegistrationFrame>;
  const paid = status?.paymentStatus === "paid" || status?.registrationStatus === "paid";
  const failed = status?.paymentStatus === "failed" || status?.paymentStatus === "expired" || status?.paymentStatus === "verification_required" || (!checking && !paid);
  return <RegistrationFrame step={5} compact>
    <Panel className="text-center">
      {paid ? <CheckCircle2 className="mx-auto text-hh-emerald drop-shadow-[0_0_18px_rgba(42,194,152,.6)]" size={68} /> : failed ? <AlertTriangle className="mx-auto text-hh-action" size={64} /> : <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-hh-cyan/40 bg-hh-cyan/10 text-hh-cyan"><LoaderCircle className="animate-spin" size={32} /></div>}
      <p className={`mt-5 font-mono text-[11px] uppercase tracking-[.2em] ${paid ? "text-hh-emerald" : failed ? "text-hh-action" : "text-hh-cyan"}`}>{paid ? "Payment verified" : failed ? "Payment not completed" : "Verifying payment"}</p>
      <h1 className="mt-2 font-sora text-2xl font-extrabold text-white sm:text-3xl">{paid ? "ชำระเงินและลงทะเบียนสำเร็จ" : failed ? "การชำระเงินยังไม่สำเร็จ" : "กำลังตรวจสอบการชำระเงิน"}</h1>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-hh-text-muted">{paid ? "ระบบล็อกข้อมูลทีมแล้ว และกำลังส่งรายละเอียดการแข่งขันให้สมาชิกทุกคนทาง Email" : failed ? "ยังไม่พบการยืนยันยอดชำระเงินจาก PaySolutions หากคุณยังไม่ได้ชำระเงิน หรือหน้าต่างหมดเวลา สามารถกดปุ่ม 'ชำระเงินอีกครั้ง' เพื่อรับ QR Code ใหม่ได้ทันที" : "PaySolutions กำลังประมวลผลสถานะ กรุณารอสักครู่..."}</p>
      {error ? <div className="mt-5"><SystemError message={error} /></div> : null}
      <div className="mx-auto mt-6 max-w-md divide-y divide-hh-border/30 rounded-2xl border border-hh-border/50 bg-hh-bg/60 p-4 text-left text-sm">
        <Row label="ทีม" value={registration?.teamName ?? "—"} /><Row label="Registration ID" value={registration?.registrationCode ?? "—"} mono /><Row label="Reference No." value={status?.referenceNo ?? "—"} mono /><Row label="ยอดชำระ" value={status?.amount ? `฿${Number(status.amount).toLocaleString()}` : "—"} /><Row label="สถานะ" value={failed && status?.paymentStatus === "pending" ? "ยังไม่ชำระเงิน (Pending)" : (status?.paymentStatus ?? "pending").replaceAll("_", " ")} />
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        {checking ? null : paid ? (
          <>
            <Link href="/schedule" className="rounded-xl bg-hh-action px-6 py-3 text-sm font-extrabold text-black">
              ดูกำหนดการแข่งขัน
            </Link>
            <Link href="/" className="rounded-xl border border-hh-border px-6 py-3 text-sm font-bold text-white">
              กลับหน้าหลัก
            </Link>
          </>
        ) : (
          <>
            <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-xl border border-hh-border px-6 py-3 text-sm font-bold text-white hover:bg-white/5 transition">
              <ArrowLeft size={16} /> ตรวจสอบข้อมูล
            </Link>
            <button type="button" disabled={checking || retrying} onClick={() => { setChecking(true); attempts.current = 0; void check(); }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-hh-cyan/40 px-6 py-3 text-sm font-bold text-hh-cyan hover:bg-hh-cyan/10 transition cursor-pointer">
              <RefreshCw className={checking ? "animate-spin" : ""} size={16} /> ตรวจสอบอีกครั้ง
            </button>
            <button type="button" disabled={retrying} onClick={retryPayment} className="inline-flex items-center justify-center gap-2 rounded-xl bg-hh-action px-6 py-3 text-sm font-extrabold text-black shadow-[0_0_20px_rgba(255,106,0,0.3)] transition hover:bg-orange-400 disabled:opacity-50 cursor-pointer">
              {retrying ? <LoaderCircle className="animate-spin" size={16} /> : <ExternalLink size={16} />} ชำระเงินอีกครั้ง
            </button>
          </>
        )}
      </div>
    </Panel>
  </RegistrationFrame>;
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) { return <div className="flex justify-between gap-4 py-2.5 first:pt-0 last:pb-0"><span className="text-hh-text-muted">{label}</span><span className={`text-right font-bold capitalize text-white ${mono ? "font-mono text-xs" : ""}`}>{value}</span></div>; }
