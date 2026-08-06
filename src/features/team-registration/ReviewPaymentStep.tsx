"use client";

import { ArrowLeft, ExternalLink, LoaderCircle, LockKeyhole, ReceiptText, ShieldCheck, UsersRound } from "lucide-react";
import { Panel, SystemError } from "./RegistrationFrame";
import type { RegistrationForm, TeamCategory, TeamEventConfig } from "./types";

export function ReviewPaymentStep({ config, category, form, onBack, onPay, loading, error }: { config: TeamEventConfig; category: TeamCategory; form: RegistrationForm; onBack: () => void; onPay: () => void; loading: boolean; error: string }) {
  return <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
    <Panel>
      <div className="border-b border-hh-border/40 pb-5"><p className="font-mono text-[11px] uppercase tracking-[.2em] text-hh-cyan">Final review</p><h1 className="mt-1 font-sora text-2xl font-extrabold text-white sm:text-3xl">ตรวจสอบข้อมูลก่อนชำระเงิน</h1><p className="mt-2 text-sm text-hh-text-muted">กรุณาตรวจสอบให้ครบถ้วน หลังชำระสำเร็จข้อมูลทั้งหมดจะถูกล็อก</p></div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2"><Summary icon={<UsersRound size={19} />} label="ชื่อทีม" value={form.teamName} /><Summary icon={<ShieldCheck size={19} />} label="ประเภททีม" value={category.name} /><Summary icon={<UsersRound size={19} />} label="จำนวนสมาชิก" value={`${form.members.length} คน`} /><Summary icon={<ReceiptText size={19} />} label="รอบราคา" value={config.activePricingRound?.name ?? "ไม่มีรอบราคาปัจจุบัน"} /></div>
      <section className="mt-7"><h2 className="mb-3 font-sora text-sm font-bold text-white">สมาชิกในทีม</h2><div className="divide-y divide-hh-border/30 rounded-2xl border border-hh-border/50 bg-hh-bg/50">{form.members.map((member, index) => <div key={`${member.email}-${index}`} className="flex flex-col justify-between gap-2 px-4 py-3 sm:flex-row sm:items-center"><div><span className="text-sm font-bold text-white">{member.firstName} {member.lastName}</span><span className="ml-2 font-mono text-[10px] uppercase text-hh-cyan">{index === 0 ? "Leader" : `Member ${index + 1}`}</span></div><div className="text-xs text-hh-text-muted">{member.email}{member.isPharmacyStudent ? " · นักศึกษาเภสัชศาสตร์" : ""}</div></div>)}</div></section>
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-hh-action/30 bg-hh-action/5 p-4"><LockKeyhole className="shrink-0 text-hh-action" size={20} /><p className="text-xs leading-5 text-hh-text-muted">เมื่อ PaySolutions ยืนยันว่าชำระสำเร็จ ระบบจะล็อกข้อมูลทีมและส่งรายละเอียดการแข่งขันให้สมาชิกทุกคน หากต้องการแก้ไขภายหลังต้องติดต่อผู้ดูแลระบบ</p></div>
    </Panel>
    <Panel className="h-fit lg:sticky lg:top-5">
      <p className="font-mono text-[11px] uppercase tracking-[.2em] text-hh-cyan">Payment summary</p><div className="mt-5 border-b border-hh-border/40 pb-5"><div className="flex justify-between text-sm text-hh-text-muted"><span>ค่าลงทะเบียนต่อทีม</span><span>THB</span></div><div className="mt-2 flex items-end justify-between"><span className="font-sora text-4xl font-extrabold text-white">฿{Number(category.price ?? 0).toLocaleString()}</span><span className="font-mono text-xs text-hh-text-muted">รวมค่าธรรมเนียมแล้ว</span></div></div>
      <ul className="my-5 list-disc space-y-2 pl-5 text-xs leading-5 text-hh-text-muted"><li>ชำระผ่าน QR PromptPay บนหน้า PaySolutions</li><li>ระบบจะพากลับมาหน้านี้หลังชำระ</li><li>สถานะสำเร็จยืนยันจาก PaySolutions Inquiry เท่านั้น</li></ul>
      {error ? <div className="mb-4"><SystemError message={error} /></div> : null}
      <button disabled={loading || !category.price} onClick={onPay} className="flex w-full items-center justify-center gap-2 rounded-xl bg-hh-action px-5 py-4 font-sora text-sm font-extrabold uppercase text-black shadow-[0_0_24px_rgba(255,106,0,.4)] hover:bg-orange-400 disabled:opacity-50">{loading ? <LoaderCircle className="animate-spin" size={18} /> : <ExternalLink size={18} />} ไปยัง PaySolutions เพื่อชำระ</button>
      <button disabled={loading} onClick={onBack} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-hh-border px-5 py-3 text-xs font-bold text-white hover:bg-white/5"><ArrowLeft size={16} /> กลับไปแก้ไขข้อมูล</button>
    </Panel>
  </div>;
}

function Summary({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="rounded-xl border border-hh-border/50 bg-hh-bg/50 p-4"><div className="flex items-center gap-2 text-hh-cyan">{icon}<span className="font-mono text-[10px] uppercase tracking-wider">{label}</span></div><div className="mt-2 font-sora text-sm font-bold text-white">{value}</div></div>; }
