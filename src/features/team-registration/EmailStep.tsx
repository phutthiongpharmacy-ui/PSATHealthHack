"use client";

import { ArrowRight, LoaderCircle, Mail } from "lucide-react";
import { Panel, SystemError } from "./RegistrationFrame";

export function EmailStep({ email, setEmail, onSubmit, loading, error }: { email: string; setEmail: (value: string) => void; onSubmit: () => void; loading: boolean; error: string }) {
  return (
    <Panel className="mx-auto max-w-xl p-4 sm:p-8">
      <div className="mx-auto mb-2.5 sm:mb-5 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl border border-hh-cyan/40 bg-hh-cyan/10 text-hh-cyan shadow-[0_0_20px_rgba(99,210,229,.2)]">
        <Mail className="w-5 h-5 sm:w-7 sm:h-7" />
      </div>
      <div className="text-center">
        <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[.2em] text-hh-cyan">Identity checkpoint</p>
        <h1 className="mt-1 sm:mt-2 font-sora text-lg sm:text-2xl md:text-3xl font-extrabold text-white">ยืนยันอีเมลหัวหน้าทีม</h1>
        <p className="mx-auto mt-1 sm:mt-2.5 max-w-md text-xs sm:text-sm leading-relaxed text-hh-text-muted">
          หัวหน้าทีมเป็นผู้กรอกข้อมูลทั้งหมดและชำระเงิน ระบบจะส่ง OTP อายุ 1 ชั่วโมงไปยังอีเมลนี้
        </p>
      </div>
      <form className="mt-2.5 sm:mt-6 space-y-3 sm:space-y-4" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
        <label className="block font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-hh-cyan">
          Email ของหัวหน้าทีม
          <input
            autoFocus
            type="email"
            required
            maxLength={50}
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="leader@example.com"
            className="mt-1.5 h-11 sm:h-12 w-full rounded-xl border border-hh-border bg-hh-bg px-3.5 sm:px-4 font-sora text-xs sm:text-sm normal-case tracking-normal text-white outline-none transition focus:border-hh-cyan focus:ring-2 focus:ring-hh-cyan/20"
          />
        </label>
        {error ? <SystemError message={error} /> : null}
        <button
          disabled={loading}
          className="flex h-11 sm:h-12 w-full items-center justify-center gap-2 rounded-xl bg-hh-action px-4 sm:px-5 py-2.5 sm:py-3.5 font-sora text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black shadow-[0_0_22px_rgba(255,106,0,.4)] transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {loading ? <LoaderCircle className="animate-spin" size={17} /> : <Mail size={16} />} ขอรับรหัส OTP <ArrowRight size={16} />
        </button>
      </form>
    </Panel>
  );
}
