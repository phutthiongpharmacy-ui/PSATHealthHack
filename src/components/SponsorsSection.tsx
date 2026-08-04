import React from "react";
import Image from "next/image";

interface Sponsor {
  name: string;
  logoUrl?: string;
}

export default function SponsorsSection() {
  const sponsors: Sponsor[] = [
    { name: "สโมสรนิสิตนักศึกษาเภสัชศาสตร์ (PSAT)", logoUrl: "" },
    { name: "กระทรวงสาธารณสุข", logoUrl: "" },
    { name: "สำนักงานนวัตกรรมแห่งชาติ (NIA)", logoUrl: "" },
    { name: "HealthTech Thailand", logoUrl: "" },
    { name: "Bio-Tech Global", logoUrl: "" },
    { name: "CyberVitality Lab", logoUrl: "" },
  ];

  return (
    <div className="w-full border-t border-b border-hh-border/30 bg-hh-surface/60 backdrop-blur-md py-10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center space-y-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-hh-text-muted opacity-80 flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-hh-cyan/40" />
          ORGANIZERS & SUPPORTING PARTNERS
          <span className="w-8 h-px bg-hh-cyan/40" />
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-stretch">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="group relative border border-dashed border-hh-cyan/30 hover:border-hh-cyan hover:border-solid rounded-2xl bg-hh-bg/80 backdrop-blur p-4 flex flex-col items-center justify-center min-h-[110px] transition-all hover:scale-105 hover:bg-hh-cyan/10 hover:shadow-[0_0_20px_rgba(99,210,229,0.15)]"
            >
              {sponsor.logoUrl ? (
                <div className="relative w-full h-12">
                  <Image
                    src={sponsor.logoUrl}
                    alt={sponsor.name}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
              ) : (
                /* Empty Logo Placeholder Box */
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <div className="w-10 h-10 rounded-xl bg-hh-surface/80 border border-hh-cyan/20 group-hover:border-hh-cyan/60 flex items-center justify-center text-hh-cyan/60 group-hover:text-hh-cyan transition-colors">
                    <span className="material-symbols-outlined text-xl">
                      add_photo_alternate
                    </span>
                  </div>
                  <span className="font-sora text-[11px] font-medium text-hh-text-muted group-hover:text-white transition-colors line-clamp-2 leading-tight">
                    {sponsor.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
