"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface AtmosphereItem {
  title: string;
  desc: string;
  imageUrl?: string;
  badge?: string;
}

export default function PastAtmosphereSection() {
  const [selectedImage, setSelectedImage] = useState<AtmosphereItem | null>(null);
  const [mobilePage, setMobilePage] = useState(0);

  const col1Items: AtmosphereItem[] = [
    { badge: "01", title: "Award Ceremony & Team Photo", desc: "ภาพถ่ายรวมผู้เข้าแข่งขันและผู้ได้รับรางวัลบนเวที", imageUrl: "/images/past-atmosphere/past-1.jpg" },
    { badge: "02", title: "Team Presentation & Pitching", desc: "การนำเสนอสไลด์ข้อมูลนวัตกรรมบนเวทีต่อหน้าคณะกรรมการ", imageUrl: "/images/past-atmosphere/past-2.jpg" },
    { badge: "03", title: "Mentorship & Group Discussion", desc: "การร่วมแลกเปลี่ยนและรับคำแนะนำอย่างใกล้ชิดในกลุ่ม", imageUrl: "/images/past-atmosphere/past-3.jpg" },
    { badge: "04", title: "Final Stage Pitching & Judge Panel", desc: "บรรยากาศการนำเสนอผลงานรอบตัดสินและคณะกรรมการประเมิน", imageUrl: "/images/past-atmosphere/past-4.jpg" },
    { badge: "05", title: "Live Demo & Pitching Round", desc: "การสาธิตผลงานนวัตกรรมสดพร้อมการจับเวลาบนเวทีใหญ่", imageUrl: "/images/past-atmosphere/past-5.jpg" },
  ];

  const col2Items: AtmosphereItem[] = [
    { badge: "06", title: "Team Backdrop Photo", desc: "ภาพถ่ายทีมผู้เข้าแข่งขันคู่กับฉากหลังแบรนด์ PSAT HealthHacks", imageUrl: "/images/past-atmosphere/past-6.jpg" },
    { badge: "07", title: "Benefits Presentation", desc: "การนำเสนอสไลด์คุณประโยชน์และจุดเด่นของโซลูชันนวัตกรรม", imageUrl: "/images/past-atmosphere/past-7.jpg" },
    { badge: "08", title: "Background & Rationale Pitch", desc: "การนำเสนอที่มาและหลักการเหตุผลของการพัฒนานวัตกรรม", imageUrl: "/images/past-atmosphere/past-8.jpg" },
    { badge: "09", title: "Problem Statement Pitching", desc: "การนำเสนอโจทย์ปัญหาและข้อมูลสถิติสาธารณสุขบนเวที", imageUrl: "/images/past-atmosphere/past-9.jpg" },
    { badge: "10", title: "Team Collaboration & Workshop", desc: "บรรยากาศการทำงานกลุ่มและพัฒนาซอฟต์แวร์ต้นแบบด้วยคอมพิวเตอร์", imageUrl: "/images/past-atmosphere/past-10.jpg" },
  ];

  const mobilePages = [
    [col1Items[0], col2Items[0], col1Items[1], col2Items[1]],
    [col1Items[2], col2Items[2], col1Items[3], col2Items[3]],
    [col1Items[4], col2Items[4], col1Items[0], col2Items[1]],
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMobilePage((prev) => (prev + 1) % mobilePages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [mobilePages.length]);

  const renderCard = (item: AtmosphereItem, keyIdx: string | number) => (
    <div
      key={keyIdx}
      onClick={() => setSelectedImage(item)}
      className="w-[275px] sm:w-[340px] md:w-[405px] lg:w-[454px] aspect-video flex-shrink-0 relative rounded-2xl border border-hh-border/40 bg-hh-surface/60 backdrop-blur-xl shadow-[0_0_25px_rgba(4,26,29,0.7)] hover:border-hh-cyan/60 hover:shadow-[0_0_30px_rgba(99,210,229,0.3)] transition-all duration-300 group overflow-hidden flex items-center justify-center cursor-pointer"
    >
      {item.imageUrl ? (
        <>
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Subtle Hover Zoom Overlay Icon */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-hh-cyan/20 border border-hh-cyan text-hh-cyan flex items-center justify-center shadow-[0_0_15px_rgba(99,210,229,0.5)]">
              <span className="material-symbols-outlined text-2xl">zoom_in</span>
            </div>
          </div>
        </>
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
    </div>
  );

  return (
    <section className="w-full relative py-12 md:py-16 bg-hh-bg overflow-hidden">
      {/* Soft Boundary Gradient Fade at top & bottom edges */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-hh-bg via-hh-bg/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-hh-bg via-hh-bg/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-hh-cyan/25 to-transparent pointer-events-none" />

      {/* Centered Heading */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center space-y-2 mb-4 sm:mb-6 relative z-10">
        <h2 className="font-sora text-3xl md:text-[40px] text-white uppercase tracking-wider font-bold [text-shadow:0_0_15px_rgba(99,210,229,0.5)]">
          ภาพบรรยากาศปีที่ผ่านมา
        </h2>
        <div className="w-20 h-1 bg-hh-cyan mx-auto shadow-[0_0_15px_rgba(99,210,229,0.8)] rounded-full" />
      </div>

      {/* Mobile Vertical Dual-Marquee (Left UP, Right DOWN) (< md) */}
      <div className="md:hidden px-margin-mobile my-4 relative z-10 max-w-container-max mx-auto h-[440px] overflow-hidden">
        {/* Top & Bottom Side Gradient Fades for seamless vertical scrolling */}
        <div className="absolute left-0 right-0 top-0 h-12 bg-gradient-to-b from-hh-bg via-hh-bg/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute left-0 right-0 bottom-0 h-12 bg-gradient-to-t from-hh-bg via-hh-bg/90 to-transparent z-20 pointer-events-none" />

        <div className="grid grid-cols-2 gap-2.5 h-full overflow-hidden">
          {/* Column 1 (Left): Moves UPWARDS */}
          <div className="overflow-hidden h-full">
            <div className="flex flex-col gap-2.5 animate-scroll-up hover:[animation-play-state:paused]">
              {[...col1Items, ...col1Items, ...col1Items, ...col1Items].map((item, idx) => (
                <div
                  key={`mobile-left-${idx}`}
                  onClick={() => setSelectedImage(item)}
                  className="aspect-video relative rounded-xl border border-hh-border/50 bg-hh-surface/80 shadow-md overflow-hidden shrink-0 cursor-pointer group"
                >
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 (Right): Moves DOWNWARDS */}
          <div className="overflow-hidden h-full">
            <div className="flex flex-col gap-2.5 animate-scroll-down hover:[animation-play-state:paused]">
              {[...col2Items, ...col2Items, ...col2Items, ...col2Items].map((item, idx) => (
                <div
                  key={`mobile-right-${idx}`}
                  onClick={() => setSelectedImage(item)}
                  className="aspect-video relative rounded-xl border border-hh-border/50 bg-hh-surface/80 shadow-md overflow-hidden shrink-0 cursor-pointer group"
                >
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Marquee Rows (md+) */}
      <div className="hidden md:block relative w-full space-y-5 py-2 overflow-hidden z-10">
        {/* Left & Right Side Gradient Fades for seamless marquee aesthetic */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-hh-bg to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-hh-bg to-transparent z-20 pointer-events-none" />

        {/* Row 1 (Top): Moves LEFT */}
        <div className="overflow-hidden w-full flex">
          <div className="flex gap-5 w-max animate-marquee-left hover:[animation-play-state:paused]">
            {[...col1Items, ...col1Items, ...col1Items, ...col1Items].map((item, idx) =>
              renderCard(item, `row1-${idx}`)
            )}
          </div>
        </div>

        {/* Row 2 (Bottom): Moves RIGHT */}
        <div className="overflow-hidden w-full flex">
          <div className="flex gap-5 w-max animate-marquee-right hover:[animation-play-state:paused]">
            {[...col2Items, ...col2Items, ...col2Items, ...col2Items].map((item, idx) =>
              renderCard(item, `row2-${idx}`)
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[85vh] inline-block overflow-hidden rounded-2xl shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button Inside Image Frame (Top-Right) */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 backdrop-blur border border-white/20 text-white hover:bg-black hover:text-hh-cyan hover:border-hh-cyan flex items-center justify-center transition-all z-20 cursor-pointer shadow-lg"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Pure Modal Image */}
            {selectedImage.imageUrl && (
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-w-full max-h-[85vh] object-contain block"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
