import React from "react";

export default function AboutSection() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop relative py-16">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 gap-12 items-center">
          <div className="p-8 md:p-12 rounded-2xl bg-surface-container-low/80 backdrop-blur-2xl border border-white/10 space-y-8 shadow-[0_0_30px_rgba(0,240,255,0.05)]">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-12 bg-primary-container shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
                <h2 className="font-sora text-3xl md:text-[40px] text-white font-bold">
                  เกี่ยวกับงาน
                </h2>
              </div>
              <p className="font-hanken text-lg md:text-xl text-on-surface leading-relaxed font-semibold">
                Health Hack 2026
                เป็นพื้นที่สำหรับนักพัฒนาซอฟต์แวร์, บุคลากรทางการแพทย์,
                นักออกแบบ, และผู้ประกอบการ
                มาร่วมกันสร้างสรรค์นวัตกรรมเพื่อแก้ไขปัญหาความท้าทายในระบบสาธารณสุขของประเทศ
              </p>
            </div>
            <div className="space-y-6 border-l-2 border-primary-container/30 pl-6 md:pl-8">
              <p className="font-hanken text-base text-on-surface-variant leading-relaxed">
                เราเชื่อว่าเทคโนโลยีสามารถยกระดับคุณภาพชีวิตและเพิ่มประสิทธิภาพในการเข้าถึงการรักษาพยาบาลได้
                ภายใน 48 ชั่วโมง
                คุณจะได้ร่วมทีมกับผู้เชี่ยวชาญหลากสาขา
                เพื่อเปลี่ยนไอเดียให้กลายเป็นโปรโตไทป์ที่ใช้งานได้จริง
              </p>
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="flex flex-col">
                  <span className="font-sora text-3xl font-bold text-primary-container [text-shadow:0_0_10px_rgba(0,240,255,0.5)]">
                    48
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant mt-1">
                    ชั่วโมงแห่งการสร้างสรรค์
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sora text-3xl font-bold text-primary-container [text-shadow:0_0_10px_rgba(0,240,255,0.5)]">
                    500,000+
                  </span>
                  <span className="font-mono text-xs text-on-surface-variant mt-1">
                    บาท รางวัลรวมมูลค่า
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
