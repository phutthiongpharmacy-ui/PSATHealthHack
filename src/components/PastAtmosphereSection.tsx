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

  const renderCard = (item: AtmosphereItem, keyIdx: string | number) => (
    <div
      key={keyIdx}
      className="w-[306px] sm:w-[378px] md:w-[450px] lg:w-[504px] aspect-video flex-shrink-0 relative rounded-2xl border border-hh-border/40 bg-hh-surface/60 backdrop-blur-xl shadow-[0_0_25px_rgba(4,26,29,0.7)] hover:border-hh-cyan/60 hover:shadow-[0_0_30px_rgba(99,210,229,0.3)] transition-all duration-300 group overflow-hidden flex items-center justify-center"
    >
      {item.imageUrl ? (
        <Image
          src={item.imageUrl}
          alt={`ภาพบรรยากาศ ${item.badge || ""}`}
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
            ช่องใส่รูปภาพบรรยากาศ {item.badge}
          </span>
        </div>
      )}

      {/* Index Badge Overlay */}
      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur border border-white/10 font-mono text-xs font-bold text-hh-cyan">
        {item.badge}
      </div>
    </div>
  );

  return (
    <section className="w-full relative py-12 md:py-16 bg-hh-bg overflow-hidden">
      {/* Soft Boundary Gradient Fade at top & bottom edges */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-hh-bg via-hh-bg/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-hh-bg via-hh-bg/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-hh-cyan/25 to-transparent pointer-events-none" />

      {/* Centered Heading */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center space-y-2 mb-6 md:mb-8 relative z-10">
        <h2 className="font-sora text-3xl md:text-[40px] text-white uppercase tracking-wider font-bold [text-shadow:0_0_15px_rgba(99,210,229,0.5)]">
          ภาพบรรยากาศปีที่ผ่านมา
        </h2>
        <div className="w-20 h-1 bg-hh-cyan mx-auto shadow-[0_0_15px_rgba(99,210,229,0.8)] rounded-full" />
      </div>

      {/* 2 Horizontal Marquee Rows Container - Edge to Edge Full Width */}
      <div className="relative w-full space-y-4 md:space-y-5 py-2 overflow-hidden z-10">
        {/* Left & Right Side Gradient Fades for seamless marquee aesthetic */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-hh-bg to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-hh-bg to-transparent z-20 pointer-events-none" />

        {/* Row 1 (Top): Moves LEFT */}
        <div className="overflow-hidden w-full flex">
          <div className="flex gap-4 md:gap-5 w-max animate-marquee-left hover:[animation-play-state:paused]">
            {[...col1Items, ...col1Items, ...col1Items, ...col1Items].map((item, idx) =>
              renderCard(item, `row1-${idx}`)
            )}
          </div>
        </div>

        {/* Row 2 (Bottom): Moves RIGHT */}
        <div className="overflow-hidden w-full flex">
          <div className="flex gap-4 md:gap-5 w-max animate-marquee-right hover:[animation-play-state:paused]">
            {[...col2Items, ...col2Items, ...col2Items, ...col2Items].map((item, idx) =>
              renderCard(item, `row2-${idx}`)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
