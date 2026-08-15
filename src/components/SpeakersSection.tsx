import React from "react";
import Image from "next/image";

const speakers = [
  {
    name: "ดร.กริชผกา บุญเฟื่อง",
    role: "ผู้อำนวยการ สำนักงานนวัตกรรมแห่งชาติ (NIA)",
    img: "/images/speaker-dr-krithpaka.jpg",
    imageClass: "object-cover object-[center_12%]",
  },
  // รอการยืนยันเพื่อเปิดแสดงผลเพิ่มเติม:
  // {
  //   name: "คุณจิรายุส ทรัพย์ศรีโสภา",
  //   role: "CEO Bitkub Capital Group",
  //   img: "/images/speaker-jirayut.jpg",
  //   imageClass: "object-cover object-[center_18%]",
  // },
  // {
  //   name: "ผศ.ดร.กวิน อัศวานันท์",
  //   role: "ผู้อำนวยการหลักสูตร CU TIP จุฬาลงกรณ์มหาวิทยาลัย",
  //   img: "/images/speaker-kawin.jpg",
  //   imageClass: "object-cover object-[center_12%]",
  // },
];

export default function SpeakersSection() {
  return (
    <section className="px-3 sm:px-margin-mobile md:px-margin-desktop relative py-12 md:py-16">
      <div className="max-w-container-max mx-auto space-y-8 sm:space-y-12">
        <div className="text-center space-y-3 sm:space-y-4">
          <h2 className="font-sora text-2xl sm:text-3xl md:text-[40px] text-white uppercase tracking-wider font-bold">
            วิทยากรรับเชิญ
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-hh-cyan mx-auto shadow-[0_0_15px_rgba(99,210,229,0.8)]" />
        </div>

        <div className={`grid gap-4 sm:gap-6 lg:gap-8 mx-auto ${speakers.length === 1 ? "max-w-xs sm:max-w-sm grid-cols-1" : "grid-cols-3 max-w-5xl"}`}>
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="group p-2 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-hh-surface/80 backdrop-blur-xl border border-hh-border/60 flex flex-col items-center text-center justify-between space-y-1.5 sm:space-y-4 transition-all hover:scale-[1.03] hover:border-hh-cyan/50 shadow-[0_0_20px_rgba(99,210,229,0.08)] h-full w-full"
            >
              <div className="w-full space-y-1.5 sm:space-y-4 flex flex-col items-center">
                <div className="relative w-full aspect-square rounded-lg sm:rounded-xl overflow-hidden border border-hh-cyan/30 sm:border-2 shadow-[0_0_10px_rgba(99,210,229,0.15)] sm:shadow-[0_0_15px_rgba(99,210,229,0.2)] bg-hh-bg/80">
                  <Image
                    src={speaker.img}
                    alt={speaker.name}
                    fill
                    className={`transition-transform duration-300 group-hover:scale-105 ${speaker.imageClass}`}
                  />
                </div>
                <div className="space-y-0.5 sm:space-y-1.5 w-full">
                  <h3 className="font-sora text-[11px] sm:text-base lg:text-lg font-bold text-white leading-tight sm:leading-snug">
                    {speaker.name}
                  </h3>
                  <p className="font-hanken text-[9px] sm:text-xs lg:text-sm text-hh-cyan font-medium leading-tight sm:leading-relaxed">
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
