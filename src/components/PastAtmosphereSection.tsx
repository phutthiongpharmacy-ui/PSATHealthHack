import React from "react";
import Image from "next/image";

interface AtmosphereItem {
  title: string;
  desc: string;
  imageUrl?: string;
}

export default function PastAtmosphereSection() {
  const highlights: AtmosphereItem[] = [
    { title: "Ideation & Team Formation", desc: "การร่วมกลุ่มระดมความคิดข้ามสายงาน", imageUrl: "" },
    { title: "Mentorship Sessions", desc: "รับคำปรึกษาเจาะลึกจากผู้เชี่ยวชาญทางการแพทย์", imageUrl: "" },
    { title: "48-Hour Prototype Build", desc: "การพัฒนาต้นแบบซอฟต์แวร์และนวัตกรรมแบบเข้มข้น", imageUrl: "" },
    { title: "Keynote & Tech Workshops", desc: "การบรรยายเชิงปฏิบัติการ AI & Health-Tech", imageUrl: "" },
    { title: "Final Pitching & Judging", desc: "นำเสนอผลงานต่อหน้าคณะกรรมการระดับประเทศ", imageUrl: "" },
    { title: "Award Ceremony & Networking", desc: "พิธีมอบรางวัลและสร้างเครือข่ายความร่วมมือ", imageUrl: "" },
  ];

  return (
    <section className="px-margin-mobile md:px-margin-desktop relative py-24 bg-hh-bg overflow-hidden">
      {/* Soft Boundary Gradient Fade at top edge */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-hh-surface/50 to-transparent pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-hh-cyan/25 to-transparent pointer-events-none" />

      <div className="max-w-container-max mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <h2 className="font-sora text-3xl md:text-[40px] text-white uppercase tracking-wider font-bold [text-shadow:0_0_15px_rgba(99,210,229,0.5)]">
            ภาพบรรยากาศงานปีที่แล้ว
          </h2>
          <div className="w-24 h-1 bg-hh-cyan mx-auto shadow-[0_0_15px_rgba(99,210,229,0.8)] rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl border border-hh-border/40 bg-hh-surface/60 backdrop-blur-xl shadow-[0_0_20px_rgba(4,26,29,0.6)] hover:border-hh-cyan/50 hover:shadow-[0_0_25px_rgba(99,210,229,0.15)] transition-all duration-300 flex flex-col space-y-4 group overflow-hidden"
            >
              {/* Photo Frame / Image Placeholder */}
              <div className="relative w-full aspect-video rounded-xl bg-hh-bg/80 border border-dashed border-hh-cyan/30 group-hover:border-hh-cyan/60 transition-colors overflow-hidden flex flex-col items-center justify-center">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-2 text-center p-4">
                    <div className="w-12 h-12 rounded-2xl bg-hh-surface/90 border border-hh-cyan/30 group-hover:border-hh-cyan flex items-center justify-center text-hh-cyan/70 group-hover:text-hh-cyan transition-colors shadow-inner">
                      <span className="material-symbols-outlined text-2xl">
                        add_photo_alternate
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-hh-text-muted group-hover:text-hh-cyan transition-colors">
                      ช่องใส่รูปภาพบรรยากาศ (Photo Slot)
                    </span>
                  </div>
                )}

                {/* Index Badge Overlay */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur border border-white/10 font-mono text-xs font-bold text-hh-cyan">
                  0{index + 1}
                </div>
              </div>

              {/* Title & Content */}
              <div className="space-y-2 pt-1">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-hh-cyan/10 text-hh-cyan border border-hh-cyan/30">
                  Highlight 0{index + 1}
                </span>
                <h3 className="font-sora text-lg font-bold text-white group-hover:text-hh-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="font-hanken text-xs text-hh-text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
