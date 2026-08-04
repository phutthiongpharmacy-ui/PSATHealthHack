import React from "react";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop relative py-20 bg-hh-bg overflow-hidden">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 gap-12 items-center">
          <div className="p-8 md:p-12 rounded-3xl bg-hh-surface/70 backdrop-blur-2xl border border-hh-cyan/20 space-y-8 shadow-[0_0_30px_rgba(4,26,29,0.8)]">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-12 bg-hh-cyan rounded-full shadow-[0_0_15px_rgba(99,210,229,0.8)]" />
                <h2 className="font-sora text-3xl md:text-[40px] text-white font-bold">
                  เกี่ยวกับโครงการ PSAT HealthHacks 2026
                </h2>
              </div>
              <p className="font-hanken text-lg md:text-xl text-white leading-relaxed font-semibold">
                จัดขึ้นโดย สหพันธ์นิสิตนักศึกษาเภสัชศาสตร์แห่งประเทศไทย (สนภท.) ร่วมกับ 20 มหาวิทยาลัยทั่วประเทศ
              </p>
              <p className="font-hanken text-base text-hh-text-muted leading-relaxed">
                PSAT HealthHacks 2026 เกิดขึ้นภายใต้บริบทที่ประเทศไทยก้าวเข้าสู่ &ldquo;สังคมผู้สูงอายุอย่างสมบูรณ์ (Aged Society)&rdquo; เพื่อสร้างสรรค์นวัตกรรมด้านการดูแลสุขภาพจากแนวคิด &ldquo;รักษาเมื่อเจ็บป่วย&rdquo; ไปสู่ &ldquo;การมีอายุยืนอย่างมีคุณภาพ (Longevity)&rdquo; และมีความเป็นอยู่ที่ดี (Wellness) ในทุกมิติตลอดช่วงชีวิต
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-hh-cyan/15 via-hh-bg to-hh-mint/15 border border-hh-cyan/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <span className="font-mono text-xs uppercase tracking-widest text-hh-cyan font-bold">CORE CONCEPT</span>
                <p className="font-sora text-lg md:text-xl font-bold text-white">
                  &ldquo;การมีอายุยืนอย่างมีคุณภาพคือเป้าหมายของสุขภาพที่ยั่งยืน&rdquo;
                </p>
              </div>

              <Link
                href="/about"
                className="shrink-0 bg-hh-surface-raised border border-hh-cyan/40 text-hh-cyan font-sora text-sm px-6 py-3 rounded-full font-bold hover:bg-hh-cyan/20 transition-all flex items-center gap-2"
              >
                อ่านเนื้อหาทั้งหมดเกี่ยวกับ สนภท.
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
