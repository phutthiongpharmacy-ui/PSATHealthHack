import React from "react";
import Image from "next/image";

const speakers = [
  {
    name: "ดร. อารยา สมบูรณ์",
    role: "Data Scientist for Health Tech",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1GAEIR2T5EMDkDM4mPuT5t-yZ1MucauFOQ_-JhOSMYqNEgG5FNnNJ_mvwe-DBlkIDSm-g1WTfUCeDWiZ4ieQxviVoM8jc2G7T2zspuRTL3isF2cQk7SUgoAd6ZJfiWGgI0s77vxtS9xsOyWzqxgjxQIBaICUAZnaWnuSg-nci3cWSjbBsWtoximoWfOmrZyH5noioS8frB78b7nvG-Za6oGg2qeI1Vu1XUoYsWJl7KaIvGlylDTj1m_yCPQuULejfQi4",
  },
  {
    name: "ดร. เอลิน เฉิน",
    role: "Biotechnology Specialist",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSW_rFAj5NuZBJmmjHZXZUc_oSE2rt0pQASI5cLxLmNF8kWsfzPxw3l0YLqfvMWUKRu3bYo4x7Hul1oG__6PvfPhma61iBfsUKNgyS3rG4ktiE80DneZmhyoJhl_sAdgXEUnVSyX6_7sxZYQ8kaahUzdyV0FzII9HlmSnDmN29KAZ0VYYj9AZFqTMujcpo9mabI8be6Wc76uPmFvGJQLMRb-V9S8Npx8WajGxl4qpjqsh_Qju9lpYFB0CjF78hvoC2huc",
  },
  {
    name: "คุณรดา รัตนไพศาล",
    role: "Healthcare Innovation Leader",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDN-ixRaXL3lKAr5Wbk57Y2ptJhY4a4MiMWlLpP7lAraR0OYnt1_uC-3dGE5UQg6VpVJtt9xqC-bVan1tXVtRJhL6VXtDLj63L5nkAtT1LzTND1DNplyGbzAN_V7IrsVnqqyDWcTm4jbPSzIrkyocDDuYmO60dUyOyHyiUZelKbBs0W2tMSxHYLWNg5euSBoThJx4YE2LAnAhTSyoi9vYa5QKN05rnjvdR2Hj2N8vu2MxmuO8rLwdFd7UB_zHGgsOSSsYs",
  },
  {
    name: "คุณเมธา วงศ์เทวัญ",
    role: "Cyber-Medic Expert",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv-QDg5XlP3-pzqCZuAsQ5k4uxZzLwMIuje2dBMy9hkdp9P6ijuCFDuzRFia1Ce9W6nikDS1dfkG0eJkzQr6aSoicfxEOFFVfFSrfs2dM-K3tkgUb7_3ssHWMncXVcwfA5o6Ger1kGEo866jAolgrKlK4IlSOmj_egpDNS-XTgbT4tDYFRotFMJc6UCeVcrubIG6l_eQ13TXTLICiDQZoNmocul0PX4-RE_grkoDUUYI--8v14hnwgiWm9TXJGT2au6kI",
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
          <div className="w-24 h-1 bg-primary-container mx-auto shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-surface-container-low/80 backdrop-blur-xl border border-white/10 flex flex-col items-center text-center space-y-4 transition-all hover:scale-105 hover:border-primary-container/40 shadow-[0_0_20px_rgba(0,240,255,0.05)]"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-primary-container/40 shadow-[0_0_15px_rgba(0,240,255,0.2)] bg-surface-container/60">
                <Image
                  src={speaker.img}
                  alt={speaker.name}
                  fill
                  className="object-contain p-4 opacity-80"
                  unoptimized
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-sora text-lg font-bold text-white">
                  {speaker.name}
                </h3>
                <p className="font-mono text-xs text-primary-container">
                  {speaker.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
