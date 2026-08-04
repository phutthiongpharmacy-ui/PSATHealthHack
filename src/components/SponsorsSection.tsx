import React from "react";

export default function SponsorsSection() {
  const sponsors = [
    "สโมสรนิสิตนักศึกษาเภสัชศาสตร์ (PSAT)",
    "กระทรวงสาธารณสุข",
    "สำนักงานนวัตกรรมแห่งชาติ (NIA)",
    "HealthTech Thailand",
    "Bio-Tech Global",
    "CyberVitality Lab",
  ];

  return (
    <div className="w-full border-t border-b border-hh-border/30 bg-hh-surface/60 backdrop-blur-md py-8">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-hh-text-muted opacity-80">
          ORGANIZERS & SUPPORTING PARTNERS
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {sponsors.map((name, index) => (
            <div
              key={index}
              className="h-16 border border-hh-border/40 rounded-xl flex items-center justify-center bg-hh-bg/60 p-3 hover:border-hh-cyan/60 hover:bg-hh-cyan/5 transition-all"
            >
              <span className="font-sora text-xs font-semibold text-hh-cyan text-center line-clamp-2">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
