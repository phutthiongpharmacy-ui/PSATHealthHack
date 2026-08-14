import React from "react";
import Image from "next/image";

const speakers = [
  {
    name: "ดร.กริชผกา บุญเฟื่อง",
    role: "ผู้อำนวยการ สำนักงานนวัตกรรมแห่งชาติ (NIA)",
    img: "/images/speaker-dr-krithpaka.jpg",
    imageClass: "object-cover object-[center_12%]",
  },
  {
    name: "คุณจิรายุส ทรัพย์ศรีโสภา",
    role: "CEO Bitkub Capital Group",
    img: "/images/speaker-jirayut.jpg",
    imageClass: "object-cover object-[center_18%]",
  },
  {
    name: "ผศ.ดร.กวิน อัศวานันท์",
    role: "ผู้อำนวยการหลักสูตร CU TIP จุฬาลงกรณ์มหาวิทยาลัย",
    img: "/images/speaker-kawin.jpg",
    imageClass: "object-cover object-[center_12%]",
  },
  {
    name: "คุณรดา รัตนไพศาล",
    role: "Healthcare Innovation Leader",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN-ixRaXL3lKAr5Wbk57Y2ptJhY4a4MiMWlLpP7lAraR0OYnt1_uC-3dGE5UQg6VpVJtt9xqC-bVan1tXVtRJhL6VXtDLj63L5nkAtT1LzTND1DNplyGbzAN_V7IrsVnqqyDWcTm4jbPSzIrkyocDDuYmO60dUyOyHyiUZelKbBs0W2tMSxHYLWNg5euSBoThJx4YE2LAnAhTSyoi9vYa5QKN05rnjvdR2Hj2N8vu2MxmuO8rLwdFd7UB_zHGgsOSSsYs",
    imageClass: "object-contain p-2 opacity-80",
  },
];

export default function SpeakersSection() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop relative py-16">
      <div className="max-w-container-max mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-sora text-3xl md:text-[40px] text-white uppercase tracking-wider font-bold">
            วิทยากรรับเชิญ
          </h2>
          <div className="w-24 h-1 bg-hh-cyan mx-auto shadow-[0_0_15px_rgba(99,210,229,0.8)]" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="group p-3 sm:p-5 lg:p-6 rounded-2xl bg-hh-surface/80 backdrop-blur-xl border border-hh-border/60 flex flex-col items-center text-center justify-between space-y-3 sm:space-y-4 transition-all hover:scale-[1.03] hover:border-hh-cyan/50 shadow-[0_0_20px_rgba(99,210,229,0.08)] h-full"
            >
              <div className="w-full space-y-3 sm:space-y-4 flex flex-col items-center">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-hh-cyan/30 shadow-[0_0_15px_rgba(99,210,229,0.2)] bg-hh-bg/80">
                  <Image
                    src={speaker.img}
                    alt={speaker.name}
                    fill
                    className={`transition-transform duration-300 group-hover:scale-105 ${speaker.imageClass}`}
                    unoptimized={speaker.img.startsWith("http")}
                  />
                </div>
                <div className="space-y-1 w-full">
                  <h3 className="font-sora text-sm sm:text-base lg:text-lg font-bold text-white leading-snug">
                    {speaker.name}
                  </h3>
                  <p className="font-hanken text-[11px] sm:text-xs text-hh-cyan font-medium leading-relaxed">
                    {speaker.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
