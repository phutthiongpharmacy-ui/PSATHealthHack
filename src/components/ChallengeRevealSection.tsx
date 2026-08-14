import React from "react";

export default function ChallengeRevealSection() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop py-12 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-container-max mx-auto">
        <div className="relative p-5 sm:p-8 md:p-12 rounded-3xl bg-hh-surface/90 border border-hh-border/60 backdrop-blur-2xl shadow-[0_0_40px_rgba(4,26,29,0.8)] overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-hh-cyan/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-hh-action/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 space-y-6 sm:space-y-8">
            {/* Top Content */}
            <div className="space-y-4 sm:space-y-6 text-left max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-hh-time/15 border border-hh-time/40 text-hh-time font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">lock_clock</span>
                72-Hour Secret Challenge
              </div>

              <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                การปล่อยโจทย์ความท้าทาย <br className="hidden sm:inline" />
                <span className="text-hh-cyan [text-shadow:0_0_15px_rgba(99,210,229,0.5)]">
                  PSATHealthHack 2026
                </span>
              </h2>

              <p className="font-hanken text-hh-text-muted text-sm sm:text-base md:text-lg leading-relaxed">
                โจทย์การแข่งขันจริงจะถูกเปิดเผยพร้อมกันทั่วประเทศในวันที่{" "}
                <span className="text-white font-bold font-mono">25 กันยายน 2569 เวลา 20.00 น.</span>{" "}
                ทุกทีมจะมีเวลา 72 ชั่วโมงในการจัดทำและยื่นเสนอเค้าโครงนวัตกรรม
              </p>

              <div className="pt-1 sm:pt-2">
                <span className="inline-block font-mono text-[11px] sm:text-xs text-hh-text-muted bg-hh-surface-raised/80 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-hh-border/40">
                  เปิดระบบรับผลงาน: 25 – 28 ก.ย. 2569
                </span>
              </div>
            </div>

            {/* Bottom Full-Width Horizontal Locked Capsule Banner */}
            <div className="w-full p-4 sm:p-6 rounded-2xl bg-hh-bg/90 border border-hh-cyan/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl relative group">
              <div className="flex items-center gap-3.5 sm:gap-4 text-left w-full sm:w-auto">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-hh-cyan/10 border-2 border-hh-cyan/40 flex items-center justify-center text-hh-cyan shrink-0 shadow-[0_0_20px_rgba(99,210,229,0.3)]">
                  <span className="material-symbols-outlined text-2xl sm:text-3xl">
                    verified_user
                  </span>
                </div>

                <div className="space-y-0.5 sm:space-y-1">
                  <span className="font-mono text-[10px] sm:text-xs text-hh-time uppercase tracking-widest block font-bold">
                    Status: Locked Confidential
                  </span>
                  <h3 className="font-sora text-base sm:text-lg font-bold text-white leading-snug">
                    โจทย์การแข่งขัน 2026
                  </h3>
                  <p className="font-hanken text-[11px] sm:text-xs text-hh-text-muted">
                    ระบบจะปลดล็อกอัตโนมัติเมื่อถึงเวลาที่กำหนด
                  </p>
                </div>
              </div>

              <div className="w-full sm:w-auto shrink-0 p-3 sm:p-3.5 rounded-xl bg-hh-surface/60 border border-hh-border/40 font-mono text-xs sm:text-sm text-hh-cyan font-bold flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">calendar_today</span>
                <span>25 ก.ย. 2569 • 20:00 น.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
