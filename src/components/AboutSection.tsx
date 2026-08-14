import React from "react";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop relative py-12 sm:py-16 md:py-20 bg-hh-bg overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 font-hanken">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="w-1.5 h-6 sm:w-2 sm:h-8 bg-hh-cyan rounded-full shrink-0" />
            <h2 className="font-sora text-xl sm:text-3xl md:text-4xl text-white font-extrabold leading-snug">
              เกี่ยวกับโครงการ PSAT HealthHacks 2026
            </h2>
          </div>
          
          <p className="text-sm sm:text-lg md:text-xl text-white/90 leading-relaxed font-semibold pl-3 sm:pl-5 border-l-2 border-hh-cyan/30">
            จัดขึ้นโดย สหพันธ์นิสิตนักศึกษาเภสัชศาสตร์แห่งประเทศไทย (สนภท.)
          </p>

          <p className="text-xs sm:text-base md:text-lg text-hh-text-muted leading-relaxed pl-3 sm:pl-5">
            สหพันธ์นิสิตนักศึกษาเภสัชศาสตร์แห่งประเทศไทย (สนภท.) เล็งเห็นถึงความสำคัญของปัญหาการเข้าสู่สังคมผู้สูงอายุอย่างสมบูรณ์ (Aged Society) ในประเทศไทย ซึ่งส่งผลให้ภาระโรคเรื้อรังและค่าใช้จ่ายด้านสาธารณสุขเพิ่มขึ้นอย่างต่อเนื่อง เพื่อลดผลกระทบด้านสาธารณสุขของประเทศไทย สหพันธ์นิสิตนักศึกษาเภสัชศาสตร์แห่งประเทศไทย (สนภท.) จึงจัดตั้งโครงการ PSAT HealthHacks 2026 ขึ้นเพื่อส่งเสริมให้เกิดการปรับเปลี่ยนแนวคิดในการรักษาจาก &ldquo;การรักษาเมื่อเจ็บป่วย&rdquo; สู่ การมีอายุยืนอย่างมีคุณภาพ (Longevity) และการมีความเป็นอยู่ที่ดี (Wellness) ในทุกช่วงวัย
          </p>
        </div>

        <div className="p-4 sm:p-6 border border-hh-cyan/30 rounded-2xl bg-hh-surface/50 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-[0_0_20px_rgba(99,210,229,0.08)]">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-hh-cyan font-bold block">CORE CONCEPT</span>
            <p className="font-sora text-sm sm:text-lg md:text-xl font-bold text-white leading-relaxed">
              “การมีอายุยืนอย่างมีคุณภาพคือเป้าหมายของสุขภาพที่ยั่งยืน”
            </p>
          </div>

          <Link
            href="/about"
            className="w-full sm:w-auto shrink-0 bg-hh-surface-raised border border-hh-cyan/40 text-hh-cyan font-sora text-xs sm:text-sm px-6 py-3 rounded-full font-bold hover:bg-hh-cyan/20 transition-all flex items-center justify-center gap-2"
          >
            <span>อ่านเนื้อหาฉบับเต็ม</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
