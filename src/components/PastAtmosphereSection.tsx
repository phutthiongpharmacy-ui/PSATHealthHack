import React from "react";

export default function PastAtmosphereSection() {
  const highlights = [
    { title: "Ideation & Team Formation", desc: "การร่วมกลุ่มระดมความคิดข้ามสายงาน" },
    { title: "Mentorship Sessions", desc: "รับคำปรึกษาเจาะลึกจากผู้เชี่ยวชาญทางการแพทย์" },
    { title: "48-Hour Prototype Build", desc: "การพัฒนาต้นแบบซอฟต์แวร์และนวัตกรรมแบบเข้มข้น" },
    { title: "Keynote & Tech Workshops", desc: "การบรรยายเชิงปฏิบัติการ AI & Health-Tech" },
    { title: "Final Pitching & Judging", desc: "นำเสนอผลงานต่อหน้าคณะกรรมการระดับประเทศ" },
    { title: "Award Ceremony & Networking", desc: "พิธีมอบรางวัลและสร้างเครือข่ายความร่วมมือ" },
  ];

  return (
    <section className="px-margin-mobile md:px-margin-desktop relative py-24 bg-surface-container-lowest/80">
      <div className="max-w-container-max mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-sora text-3xl md:text-[40px] text-white uppercase tracking-wider font-bold [text-shadow:0_0_15px_rgba(0,240,255,0.6)]">
            ภาพบรรยากาศงานปีที่แล้ว
          </h2>
          <div className="w-24 h-1 bg-primary-container mx-auto shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-primary-container/20 bg-primary-container/5 shadow-[0_0_15px_rgba(0,240,255,0.05)] hover:border-primary-container/50 hover:scale-105 transition-all duration-300 flex flex-col justify-between h-48 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 font-mono text-3xl text-primary-container/20 group-hover:text-primary-container/40 transition-colors font-bold">
                0{index + 1}
              </div>
              <div className="z-10 space-y-2 mt-auto">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-primary-container/10 text-primary-container border border-primary-container/30">
                  Highlight
                </span>
                <h3 className="font-sora text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="font-hanken text-xs text-on-surface-variant">
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
