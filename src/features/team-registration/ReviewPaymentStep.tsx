"use client";

import { ArrowLeft, ExternalLink, LoaderCircle, LockKeyhole, ReceiptText, ShieldCheck, UsersRound } from "lucide-react";
import { Panel, SystemError } from "./RegistrationFrame";
import type { RegistrationForm, TeamCategory, TeamEventConfig } from "./types";

export function ReviewPaymentStep({
  config,
  category,
  form,
  onBack,
  onPay,
  loading,
  error,
}: {
  config: TeamEventConfig;
  category: TeamCategory;
  form: RegistrationForm;
  onBack: () => void;
  onPay: () => void;
  loading: boolean;
  error: string;
}) {
  return (
    <div className="grid gap-4 sm:gap-5 lg:grid-cols-[1fr_360px]">
      <Panel className="p-4 sm:p-8">
        <div className="border-b border-hh-border/40 pb-5">
          <p className="font-mono text-xs uppercase tracking-widest text-hh-cyan">FINAL REVIEW</p>
          <h1 className="mt-1.5 font-sora text-2xl sm:text-3xl font-extrabold text-white">ตรวจสอบข้อมูลก่อนชำระเงิน</h1>
          <p className="mt-2 text-sm text-hh-text-muted">กรุณาตรวจสอบให้ครบถ้วน หลังชำระสำเร็จข้อมูลทั้งหมดจะถูกล็อก</p>
        </div>

        {/* Team Overview Summary (2x2 grid matching exact design) */}
        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-4">
          <Summary icon={<UsersRound size={18} className="text-hh-cyan" />} label="ชื่อทีม" value={form.teamName} />
          <Summary icon={<ShieldCheck size={18} className="text-hh-cyan" />} label="ประเภททีม" value={category.name} />
          <Summary icon={<UsersRound size={18} className="text-hh-cyan" />} label="จำนวนสมาชิก" value={`${form.members.length} คน`} />
          <Summary icon={<ReceiptText size={18} className="text-hh-cyan" />} label="รอบราคา" value={config.activePricingRound?.name ?? "Early Bird"} />
        </div>

        {/* Team Members List */}
        <section className="mt-7">
          <h2 className="mb-3 font-sora text-sm font-bold text-white">สมาชิกในทีม ({form.members.length} คน)</h2>
          <div className="divide-y divide-hh-border/30 rounded-2xl border border-hh-border/60 bg-[#062429] overflow-hidden">
            {form.members.map((member, index) => (
              <div key={`${member.email}-${index}`} className="flex items-center justify-between gap-3 px-4 py-3.5">
                {/* Left: Name & Email */}
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="text-sm font-bold text-white break-words leading-snug">
                    {member.title ? (member.title === "mr" ? "นาย " : "นางสาว ") : ""}{member.firstName} {member.lastName}
                  </div>
                  <div className="text-xs text-hh-text-muted break-all">
                    {member.email}
                    {member.isPharmacyStudent ? <span className="text-hh-cyan font-medium"> · นศ.เภสัชศาสตร์</span> : ""}
                  </div>
                </div>

                {/* Right: Role Badge on the far right */}
                <div className="shrink-0 pl-2">
                  <span
                    className={`inline-flex items-center justify-center rounded-lg font-mono text-xs font-extrabold uppercase px-2.5 py-1 tracking-wide ${
                      index === 0
                        ? "bg-hh-cyan/20 border border-hh-cyan text-hh-cyan shadow-[0_0_10px_rgba(99,210,229,0.25)]"
                        : "bg-white/5 border border-hh-border/80 text-hh-text-muted"
                    }`}
                  >
                    {index === 0 ? "LEADER" : `MEMBER ${index + 1}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lock Warning Notice */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-hh-action/30 bg-hh-action/5 p-4">
          <LockKeyhole className="shrink-0 text-hh-action mt-0.5" size={18} />
          <p className="text-xs leading-relaxed text-hh-text-muted">
            เมื่อ PaySolutions ยืนยันว่าชำระสำเร็จ ระบบจะล็อกข้อมูลทีมและส่งรายละเอียดการแข่งขันให้สมาชิกทุกคน หากต้องการแก้ไขภายหลังต้องติดต่อผู้ดูแลระบบ
          </p>
        </div>
      </Panel>

      {/* Payment Summary Panel */}
      <Panel className="h-fit lg:sticky lg:top-5 p-4 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-hh-cyan">PAYMENT SUMMARY</p>
        <div className="mt-5 border-b border-hh-border/40 pb-5">
          <div className="flex justify-between text-sm text-hh-text-muted">
            <span>ค่าลงทะเบียนต่อทีม</span>
            <span className="font-mono">THB</span>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-sora text-3xl sm:text-4xl font-extrabold text-white">
              ฿{Number(category.price ?? 0).toLocaleString()}
            </span>
            <span className="font-mono text-xs text-hh-text-muted">รวมค่าธรรมเนียมแล้ว</span>
          </div>
        </div>

        <ul className="my-5 list-disc space-y-2 pl-5 text-xs leading-relaxed text-hh-text-muted">
          <li>ชำระผ่าน QR PromptPay บนหน้า PaySolutions</li>
          <li>ระบบจะพากลับมาหน้านี้หลังชำระ</li>
          <li>สถานะสำเร็จยืนยันจาก PaySolutions Inquiry เท่านั้น</li>
        </ul>

        {error ? <div className="mb-4"><SystemError message={error} /></div> : null}

        <button
          type="button"
          disabled={loading || !category.price}
          onClick={onPay}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-hh-action px-5 py-4 font-sora text-sm font-extrabold uppercase tracking-wider text-black shadow-[0_0_24px_rgba(255,106,0,.4)] transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-hh-border/60 disabled:text-hh-text-muted/60 disabled:shadow-none cursor-pointer"
        >
          {loading ? <LoaderCircle className="animate-spin" size={18} /> : <ExternalLink size={18} />} ไปยัง PaySolutions เพื่อชำระ
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={onBack}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-hh-border/60 px-5 py-3 text-xs font-bold text-white hover:bg-white/5 transition cursor-pointer"
        >
          <ArrowLeft size={16} /> กลับไปแก้ไขข้อมูล
        </button>
      </Panel>
    </div>
  );
}

function Summary({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-hh-border/70 bg-[#062429] px-3.5 py-3 sm:px-5 sm:py-4 flex flex-col justify-between transition-all hover:border-hh-cyan/40">
      <div className="flex items-center gap-2 text-hh-cyan">
        <span className="shrink-0">{icon}</span>
        <span className="font-mono text-xs font-bold text-hh-cyan">{label}</span>
      </div>
      <div className="mt-2 font-sora text-sm sm:text-base font-bold text-white leading-snug break-words">
        {value}
      </div>
    </div>
  );
}
