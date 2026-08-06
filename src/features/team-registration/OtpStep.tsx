"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, KeyRound, LoaderCircle, RotateCcw } from "lucide-react";
import { Panel, SystemError } from "./RegistrationFrame";
import { applyOtpInput } from "./form";
import { getRemainingSeconds } from "./storage";

export function OtpStep({ email, otp, setOtp, referenceCode, resendAvailableAt, onVerify, onResend, onBack, loading, error }: { email: string; otp: string; setOtp: (value: string) => void; referenceCode: string; resendAvailableAt: string; onVerify: () => void; onResend: () => void; onBack: () => void; loading: boolean; error: string }) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const [nowMs, setNowMs] = useState(() => Date.now());
  const resendSeconds = getRemainingSeconds(resendAvailableAt, nowMs);
  useEffect(() => {
    setNowMs(Date.now());
    const timer = window.setInterval(() => setNowMs(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [resendAvailableAt]);
  const digits = Array.from({ length: 6 }, (_, index) => otp[index] ?? "");
  const update = (index: number, value: string) => {
    const result = applyOtpInput(otp, index, value);
    setOtp(result.otp);
    if (/\d/.test(value)) refs.current[result.focusIndex]?.focus();
  };
  return <Panel className="mx-auto max-w-xl">
    <div className="text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-hh-cyan/40 bg-hh-cyan/10 text-hh-cyan"><KeyRound size={30} /></div><h1 className="font-sora text-2xl font-extrabold text-white">กรอกรหัส OTP 6 หลัก</h1><p className="mt-3 text-sm text-hh-text-muted">ส่งไปที่ <strong className="text-white">{email}</strong></p><p className="mt-1 font-mono text-xs text-hh-cyan">รหัสอ้างอิง: <strong>{referenceCode}</strong></p></div>
    <form className="mt-7 space-y-5" onSubmit={(event) => { event.preventDefault(); onVerify(); }}>
      <div className="flex justify-center gap-2 sm:gap-3">{digits.map((digit, index) => <input key={index} ref={(element) => { refs.current[index] = element; }} inputMode="numeric" autoComplete={index === 0 ? "one-time-code" : "off"} value={digit} onChange={(event) => update(index, event.target.value)} onPaste={(event) => { event.preventDefault(); update(index, event.clipboardData.getData("text")); }} onKeyDown={(event) => { if (event.key === "Backspace" && !digit && index > 0) refs.current[index - 1]?.focus(); }} className="h-12 w-10 rounded-xl border-2 border-hh-cyan/40 bg-hh-bg text-center font-mono text-xl font-bold text-hh-cyan outline-none focus:border-hh-cyan focus:ring-2 focus:ring-hh-cyan/20 sm:h-14 sm:w-12" />)}</div>
      {error ? <SystemError message={error} /> : null}
      <button disabled={loading || otp.length !== 6} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-4 font-sora text-sm font-extrabold uppercase tracking-wider text-hh-bg transition hover:bg-hh-highlight disabled:opacity-50">{loading ? <LoaderCircle className="animate-spin" size={18} /> : null} ยืนยัน OTP <ArrowRight size={18} /></button>
      <div className="flex items-center justify-between gap-4 text-xs"><button type="button" onClick={onBack} className="inline-flex shrink-0 items-center gap-1 text-hh-text-muted hover:text-white"><ArrowLeft size={14} /> เปลี่ยนอีเมล</button><button type="button" onClick={onResend} disabled={loading || resendSeconds > 0} aria-live="polite" className="inline-flex items-center justify-end gap-1 text-right font-mono text-hh-cyan hover:text-white disabled:cursor-not-allowed disabled:text-hh-text-muted/60"><RotateCcw size={14} /> {resendSeconds > 0 ? `ส่ง OTP ใหม่ได้ใน 00:${String(resendSeconds).padStart(2, "0")}` : "ส่ง OTP ใหม่"}</button></div>
    </form>
  </Panel>;
}
