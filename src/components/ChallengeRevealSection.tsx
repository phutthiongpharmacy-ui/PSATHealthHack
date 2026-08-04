import React from "react";

export default function ChallengeRevealSection() {

  return (
    <section className="px-margin-mobile md:px-margin-desktop py-20 relative overflow-hidden">
      <div className="max-w-container-max mx-auto">
        <div className="relative p-8 md:p-12 rounded-3xl bg-hh-surface/90 border border-hh-border/60 backdrop-blur-2xl shadow-[0_0_40px_rgba(4,26,29,0.8)] overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-hh-cyan/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-hh-action/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-hh-time/15 border border-hh-time/40 text-hh-time font-mono text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">lock_clock</span>
                72-Hour Secret Challenge
              </div>

              <h2 className="font-sora text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                การปล่อยโจทย์ความท้าทาย <br />
                <span className="text-hh-cyan [text-shadow:0_0_15px_rgba(99,210,229,0.5)]">
                  PSATHealthHack 2026
                </span>
              </h2>

              <p className="font-hanken text-hh-text-muted text-base md:text-lg leading-relaxed max-w-xl">
                โจทย์การแข่งขันจริงจะถูกเปิดเผยพร้อมกันทั่วประเทศในวันที่{" "}
                <span className="text-white font-bold font-mono">25 กันยายน 2569</span>{" "}
                ทุกทีมจะมีเวลา 72 ชั่วโมงในการจัดทำและยื่นเสนอเค้าโครงนวัตกรรม
              </p>

              <div className="pt-2 flex items-center gap-4">
                <span className="font-mono text-xs text-hh-text-muted bg-hh-surface-raised/80 px-4 py-2 rounded-full border border-hh-border/40">
                  เปิดระบบรับผลงาน: 25 – 28 ก.ย. 2569
                </span>
              </div>
            </div>

            {/* Right Locked Capsule Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md p-8 rounded-2xl bg-hh-bg/90 border border-hh-cyan/30 text-center space-y-6 shadow-2xl relative group">
                <div className="w-20 h-20 mx-auto rounded-full bg-hh-cyan/10 border-2 border-hh-cyan/40 flex items-center justify-center text-hh-cyan shadow-[0_0_20px_rgba(99,210,229,0.3)]">
                  <span className="material-symbols-outlined text-4xl">
                    verified_user
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs text-hh-time uppercase tracking-widest block font-bold">
                    Status: Locked Confidential
                  </span>
                  <h3 className="font-sora text-xl font-bold text-white">
                    โจทย์การแข่งขัน 2026
                  </h3>
                  <p className="font-hanken text-xs text-hh-text-muted">
                    จะปลดล็อกระบบอัตโนมัติเมื่อถึงเวลากำหนด
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-hh-surface/60 border border-hh-border/40 font-mono text-sm text-hh-cyan font-bold flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-base">calendar_today</span>
                  25 ก.ย. 2569 • 09:00 น.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
