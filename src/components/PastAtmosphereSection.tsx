import React from "react";
import Image from "next/image";

interface AtmosphereItem {
  title: string;
  desc: string;
  imageUrl?: string;
  badge?: string;
}

export default function PastAtmosphereSection() {
  const col1Items: AtmosphereItem[] = [
    { badge: "01", title: "Ideation & Team Formation", desc: "การร่วมกลุ่มระดมความคิดข้ามสายงาน เภสัชกร แพทย์ และนักพัฒนา", imageUrl: "" },
    { badge: "02", title: "48-Hour Prototype Build", desc: "การพัฒนาต้นแบบซอฟต์แวร์และนวัตกรรมด้านสุขภาพแบบเข้มข้น", imageUrl: "" },
    { badge: "03", title: "Pitch Practice & Feedback", desc: "การซ้อมนำเสนอผลงานและรับคำแนะนำเพื่อปรับปรุงโมเดลธุรกิจ", imageUrl: "" },
    { badge: "04", title: "Keynote & Tech Workshops", desc: "การบรรยายเชิงปฏิบัติการ AI & Health-Tech โดยวิทยากรชั้นนำ", imageUrl: "" },
  ];

  const col2Items: AtmosphereItem[] = [
    { badge: "05", title: "Mentorship Sessions", desc: "รับคำปรึกษาเจาะลึกจากผู้เชี่ยวชาญทางการแพทย์และเภสัชกรรม", imageUrl: "" },
    { badge: "06", title: "Final Pitching & Judging", desc: "นำเสนอผลงานต่อหน้าคณะกรรมการระดับประเทศและนักลงทุน", imageUrl: "" },
    { badge: "07", title: "Design Sprint & UI/UX", desc: "การออกแบบอินเทอร์เฟซนวัตกรรมสุขภาพให้ตอบโจทย์ผู้ใช้งานจริง", imageUrl: "" },
    { badge: "08", title: "Award Ceremony & Networking", desc: "พิธีมอบรางวัลและสร้างเครือข่ายความร่วมมือในอุตสาหกรรมสุขภาพ", imageUrl: "" },
  ];

  const col3Items: AtmosphereItem[] = [
    { badge: "09", title: "Keynote & Tech Workshops", desc: "เทคโนโลยี AI เภสัชกรรมและโซลูชันดูแลสุขภาพดิจิทัลแห่งอนาคต", imageUrl: "" },
    { badge: "10", title: "Award Ceremony & Networking", desc: "เวทีแลกเปลี่ยนประสบการณ์และโอกาสต่อยอดเชิงพาณิชย์", imageUrl: "" },
    { badge: "11", title: "Expert Panel Q&A", desc: "กิจกรรมถาม-ตอบกับผู้นำด้านสุขภาพดิจิทัลและนวัตกรรมทางการแพทย์", imageUrl: "" },
    { badge: "12", title: "Ideation & Team Formation", desc: "การผนึกกำลังเยาวชนรุ่นใหม่สร้างสรรค์สิ่งใหม่ให้ระบบสาธารณสุข", imageUrl: "" },
  ];

  const renderCard = (item: AtmosphereItem, idx: number) => (
    <div
      key={idx}
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
          {item.badge}
        </div>
      </div>

      {/* Title & Content */}
      <div className="space-y-2 pt-1">
        <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-hh-cyan/10 text-hh-cyan border border-hh-cyan/30">
          Highlight {item.badge}
        </span>
        <h3 className="font-sora text-lg font-bold text-white group-hover:text-hh-cyan transition-colors">
          {item.title}
        </h3>
        <p className="font-hanken text-xs text-hh-text-muted leading-relaxed">
          {item.desc}
        </p>
      </div>
    </div>
  );

  return (
    <section className="px-margin-mobile md:px-margin-desktop relative py-24 bg-hh-bg overflow-hidden">
      {/* Soft Boundary Gradient Fade at top & bottom edges */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-hh-bg via-hh-bg/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-hh-bg via-hh-bg/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-hh-cyan/25 to-transparent pointer-events-none" />

      <div className="max-w-container-max mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <h2 className="font-sora text-3xl md:text-[40px] text-white uppercase tracking-wider font-bold [text-shadow:0_0_15px_rgba(99,210,229,0.5)]">
            ภาพบรรยากาศงานปีที่แล้ว
          </h2>
          <div className="w-24 h-1 bg-hh-cyan mx-auto shadow-[0_0_15px_rgba(99,210,229,0.8)] rounded-full" />
        </div>

        {/* 3-Column Vertical Infinite Marquee Container */}
        <div className="relative h-[640px] overflow-hidden rounded-3xl p-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">

            {/* Column 1: Scrolls UP (Bottom -> Top) */}
            <div className="relative overflow-hidden h-full">
              <div className="flex flex-col gap-6 animate-scroll-up hover:[animation-play-state:paused]">
                {[...col1Items, ...col1Items].map((item, idx) => renderCard(item, idx))}
              </div>
            </div>

            {/* Column 2: Scrolls DOWN (Top -> Bottom) */}
            <div className="relative overflow-hidden h-full hidden md:block">
              <div className="flex flex-col gap-6 animate-scroll-down hover:[animation-play-state:paused]">
                {[...col2Items, ...col2Items].map((item, idx) => renderCard(item, idx))}
              </div>
            </div>

            {/* Column 3: Scrolls UP (Bottom -> Top) */}
            <div className="relative overflow-hidden h-full hidden lg:block">
              <div className="flex flex-col gap-6 animate-scroll-up hover:[animation-play-state:paused]">
                {[...col3Items, ...col3Items].map((item, idx) => renderCard(item, idx))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
