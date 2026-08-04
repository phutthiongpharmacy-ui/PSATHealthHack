import React from "react";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop relative py-20 bg-hh-bg overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-8 font-hanken">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-8 bg-hh-cyan rounded-full" />
            <h2 className="font-sora text-3xl md:text-4xl text-white font-extrabold">
              เกี่ยวกับโครงการ PSAT HealthHacks 2026
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-white/90 leading-relaxed font-semibold pl-5 border-l-2 border-hh-cyan/30">
            จัดขึ้นโดย สหพันธ์นิสิตนักศึกษาเภสัชศาสตร์แห่งประเทศไทย (สนภท.) ร่วมกับ 20 มหาวิทยาลัยทั่วประเทศ
          </p>

          <p className="text-base md:text-lg text-hh-text-muted leading-relaxed pl-5">
            PSAT HealthHacks 2026 เกิดขึ้นภายใต้บริบทที่ประเทศไทยก้าวเข้าสู่ &ldquo;สังคมผู้สูงอายุอย่างสมบูรณ์ (Aged Society)&rdquo; ซึ่งส่งผลให้ภาระโรคเรื้อรังและค่าใช้จ่ายด้านสาธารณสุขเพิ่มสูงขึ้นอย่างต่อเนื่อง การดูแลสุขภาพจึงต้องเปลี่ยนผ่านจากแนวคิด &ldquo;รักษาเมื่อเจ็บป่วย&rdquo; ไปสู่ &ldquo;การมีอายุยืนอย่างมีคุณภาพ (Longevity)&rdquo; และการมีความเป็นอยู่ที่ดี (Wellness) ในทุกมิติตลอดช่วงชีวิต
          </p>
        </div>

        <div className="py-6 border-y border-hh-cyan/20 flex flex-col md:flex-row items-center justify-between gap-6 pl-5">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-hh-cyan font-bold">CORE CONCEPT</span>
            <p className="font-sora text-lg md:text-xl font-bold text-white">
              “การมีอายุยืนอย่างมีคุณภาพคือเป้าหมายของสุขภาพที่ยั่งยืน”
            </p>
          </div>

          <Link
            href="/about"
            className="shrink-0 bg-hh-surface-raised border border-hh-cyan/40 text-hh-cyan font-sora text-sm px-6 py-3 rounded-full font-bold hover:bg-hh-cyan/20 transition-all flex items-center gap-2"
          >
            อ่านเนื้อหาฉบับเต็ม
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
