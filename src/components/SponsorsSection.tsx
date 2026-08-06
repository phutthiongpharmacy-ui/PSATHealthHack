import React from "react";
import Image from "next/image";

interface Sponsor {
  name: string;
  logoUrl?: string;
}

export default function SponsorsSection() {
  const sponsors: Sponsor[] = [
    { name: "สหพันธ์นิสิตนักศึกษาเภสัชศาสตร์แห่งประเทศไทย (สนภท.)", logoUrl: "/images/psat-logo.png" },
    { name: "สภาเภสัชกรรม", logoUrl: "/images/pharmacy-council-logo.png" },
    { name: "กระทรวงสาธารณสุข" },
    { name: "สำนักงานนวัตกรรมแห่งชาติ (NIA)" },
    { name: "สำนักงานคณะกรรมการอาหารและยา (อย.)" },
    { name: "HealthTech Thailand" },
    { name: "สมาคมเภสัชกรรมโรงพยาบาล" },
    { name: "สมาคมเภสัชกรรมชุมชน" },
    { name: "Bio-Tech Global" },
    { name: "CyberVitality Lab" },
    { name: "คณะเภสัชศาสตร์ จุฬาลงกรณ์" },
    { name: "คณะเภสัชศาสตร์ มหิดล" },
    { name: "คณะเภสัชศาสตร์ เชียงใหม่" },
    { name: "คณะเภสัชศาสตร์ ศิลปากร" },
    { name: "คณะเภสัชศาสตร์ ขอนแก่น" },
    { name: "คณะเภสัชศาสตร์ สงขลานครินทร์" },
    { name: "คณะเภสัชศาสตร์ ธรรมศาสตร์" },
    { name: "คณะเภสัชศาสตร์ นเรศวร" },
    { name: "คณะเภสัชศาสตร์ ศรีนครินทรวิโรฒ" },
    { name: "คณะเภสัชศาสตร์ อุบลราชธานี" },
  ];

  return (
    <div className="w-full border-t border-b border-hh-border/30 bg-hh-surface/60 backdrop-blur-md py-10 overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center space-y-8">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-hh-text-muted opacity-80 flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-hh-cyan/40" />
          ORGANIZERS & SUPPORTING PARTNERS
          <span className="w-8 h-px bg-hh-cyan/40" />
        </h2>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div className="relative mt-6">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-hh-surface/60 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-hh-surface/60 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {/* Render sponsors twice for seamless loop */}
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-2.5"
            >
              <div className="group w-[140px] sm:w-[160px] h-[100px] sm:h-[110px] border border-dashed border-hh-border/40 hover:border-hh-cyan/60 hover:border-solid rounded-2xl bg-hh-bg/60 backdrop-blur p-3 flex flex-col items-center justify-center transition-all hover:bg-hh-cyan/10">
                {sponsor.logoUrl ? (
                  <div className="relative w-full h-10 sm:h-12">
                    <Image
                      src={sponsor.logoUrl}
                      alt={sponsor.name}
                      fill
                      className="object-contain filter grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-1.5 text-center">
                    <div className="w-8 h-8 rounded-lg bg-hh-surface/80 border border-hh-cyan/20 group-hover:border-hh-cyan/50 flex items-center justify-center text-hh-cyan/50 group-hover:text-hh-cyan transition-colors">
                      <span className="material-symbols-outlined text-lg">
                        add_photo_alternate
                      </span>
                    </div>
                    <span className="font-sora text-[9px] sm:text-[10px] font-medium text-hh-text-muted group-hover:text-white transition-colors line-clamp-2 leading-tight px-1">
                      {sponsor.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
