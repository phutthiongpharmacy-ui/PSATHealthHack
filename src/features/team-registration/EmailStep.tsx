"use client";

import { ArrowRight, LoaderCircle, Mail } from "lucide-react";
import { Panel, SystemError } from "./RegistrationFrame";

export function EmailStep({ email, setEmail, onSubmit, loading, error }: { email: string; setEmail: (value: string) => void; onSubmit: () => void; loading: boolean; error: string }) {
  return <Panel className="mx-auto max-w-xl">
    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-hh-cyan/40 bg-hh-cyan/10 text-hh-cyan shadow-[0_0_24px_rgba(99,210,229,.2)]"><Mail size={30} /></div>
    <div className="text-center"><p className="font-mono text-[11px] uppercase tracking-[.2em] text-hh-cyan">Identity checkpoint</p><h1 className="mt-2 font-sora text-2xl font-extrabold text-white sm:text-3xl">ยืนยันอีเมลหัวหน้าทีม</h1><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-hh-text-muted">หัวหน้าทีมเป็นผู้กรอกข้อมูลทั้งหมดและชำระเงิน ระบบจะส่ง OTP อายุ 1 ชั่วโมงไปยังอีเมลนี้</p></div>
    <form className="mt-7 space-y-4" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-hh-cyan">Email ของหัวหน้าทีม<input autoFocus type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="leader@example.com" className="mt-2 w-full rounded-xl border border-hh-border bg-hh-bg px-4 py-3.5 font-sora text-base normal-case tracking-normal text-white outline-none transition focus:border-hh-cyan focus:ring-2 focus:ring-hh-cyan/20" /></label>
      {error ? <SystemError message={error} /> : null}
      <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-hh-action px-5 py-4 font-sora text-sm font-extrabold uppercase tracking-wider text-black shadow-[0_0_22px_rgba(255,106,0,.4)] transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60">{loading ? <LoaderCircle className="animate-spin" size={19} /> : <Mail size={18} />} ขอรับรหัส OTP <ArrowRight size={18} /></button>
    </form>
  </Panel>;
}
