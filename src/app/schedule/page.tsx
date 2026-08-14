"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EligibilityModal from "@/components/EligibilityModal";
import PdpaModal from "@/components/PdpaModal";

export default function SchedulePage() {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [isPdpaOpen, setIsPdpaOpen] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const handleOpenEligibility = (showNext: boolean = false) => {
    setShowNextButton(showNext);
    setIsEligibilityOpen(true);
  };

  const scheduleItems = [
    {
      title: "รับสมัครผู้เข้าแข่งขัน",
      details: [
        "รอบ Early Bird: 15 – 31 สิงหาคม พ.ศ. 2569",
        "รอบทั่วไป: 1 – 20 กันยายน พ.ศ. 2569",
      ],
      date: "15 ส.ค. – 20 ก.ย. 2569",
    },
    {
      title: "Pre-Conference",
      details: ["ปฐมนิเทศและแนะแนวการเตรียมตัวสำหรับการแข่งขัน (ผ่าน Zoom Conference)"],
      date: "29 สิงหาคม พ.ศ. 2569",
    },
    {
      title: "ปล่อยโจทย์การแข่งขัน",
      details: ["เปิดเผยโจทย์ความท้าทายสาธารณสุขประจำปี 2026 (เวลา 20.00 น.)"],
      date: "25 ก.ย. 2569 (20.00 น.)",
    },
    {
      title: "การแข่งขันรอบระดมความคิดและพัฒนานวัตกรรมออนไลน์ 72 ชั่วโมง (72-Hour Hackathon Round)",
      details: ["ส่งผลงานต้นแบบ (Prototype), Wireframe/Mockup หรือ Process Flowchart"],
      date: "25 – 28 กันยายน พ.ศ. 2569",
    },
    {
      title: "คณะกรรมการพิจารณาเค้าโครงนวัตกรรม",
      details: ["คณะกรรมการผู้เชี่ยวชาญประเมินผลงานรอบคัดเลือก คัดเหลือ 20 ทีมสุดท้าย"],
      date: "29 ก.ย. – 4 ต.ค. 2569",
    },
    {
      title: "ประกาศผลผู้ผ่านเข้ารอบสุดท้าย",
      details: ["ประกาศผลทีมผู้ผ่านเข้ารอบสุดท้ายผ่าน Instagram: psathealthhacks.2026"],
      date: "5 ตุลาคม พ.ศ. 2569",
    },
  ];

  const finalistSchedule = [
    {
      title: "การปฐมนิเทศผู้ผ่านเข้ารอบตัดสิน & กิจกรรมอบรมเชิงปฏิบัติการ (Lecture Session)",
      date: "10 ตุลาคม พ.ศ. 2569",
    },
    {
      title: "การปฐมนิเทศผู้ผ่านเข้ารอบตัดสิน & กิจกรรมพบปะเมนเทอร์ (Mentor Session)",
      details: ["17 ต.ค. สำหรับทีมมัธยมศึกษา / 18 ต.ค. สำหรับทีมอุดมศึกษา"],
      date: "17 – 18 ตุลาคม พ.ศ. 2569",
    },
    {
      title: "พัฒนาและปรับปรุงนวัตกรรม (Prototype Development)",
      date: "19 – 27 ตุลาคม พ.ศ. 2569",
    },
    {
      title: "การแข่งขันรอบตัดสิน (Final Pitching Round)",
      details: ["ออนไซต์ ณ ห้องจูปิเตอร์ 13 – 14 อาคารชาเลนเจอร์ อิมแพ็ค เมืองทองธานี จังหวัดนนทบุรี"],
      date: "30 ตุลาคม พ.ศ. 2569",
      highlight: true,
    },
  ];

  return (
    <main className="min-h-screen bg-hh-bg text-hh-text overflow-x-hidden pt-20 sm:pt-24">
      <Navbar onOpenEligibility={handleOpenEligibility} />

      {/* Header */}
      <div className="relative py-10 sm:py-16 px-margin-mobile md:px-margin-desktop text-left border-b border-hh-border/30">
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          <span className="font-mono text-xs text-hh-cyan uppercase tracking-widest inline-block font-semibold">
            TIMELINE & SCHEDULE
          </span>
          <h1 className="font-sora text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            กำหนดการแข่งขัน <span className="text-hh-cyan [text-shadow:0_0_20px_rgba(99,210,229,0.5)]">PSAT HealthHacks 2026</span>
          </h1>
          <p className="font-hanken text-hh-text-muted text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            กำหนดการอย่างเป็นทางการของการแข่งขันนวัตกรรมสุขภาพ
          </p>
        </div>
      </div>

      <div className="py-8 sm:py-12 px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto space-y-6 sm:space-y-8 font-hanken">

        {/* 1. Mobile Vertical Timeline Card View (< sm) */}
        <div className="sm:hidden space-y-4">
          {scheduleItems.map((item, idx) => (
            <div
              key={`mob-item-${idx}`}
              className="p-4 rounded-2xl border border-hh-border/60 bg-hh-surface/90 shadow-xl space-y-2.5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hh-cyan/15 border border-hh-cyan/30 text-hh-cyan font-mono text-xs font-bold">
                <span className="material-symbols-outlined text-sm">calendar_month</span>
                <span>{item.date}</span>
              </div>
              <h2 className="font-sora text-base font-bold text-white leading-snug">
                {item.title}
              </h2>
              {item.details && (
                <ul className="space-y-1 text-xs text-hh-text-muted">
                  {item.details.map((d, i) => (
                    <li key={i}>• {d}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Mobile Final Pitching Round Banner */}
          <div className="p-3.5 rounded-2xl bg-hh-cyan/15 border border-hh-cyan/40 text-center font-sora text-sm font-extrabold text-hh-cyan shadow-lg">
            การแข่งขันรอบตัดสิน (Final Pitching Round)
          </div>

          {finalistSchedule.map((item, idx) => (
            <div
              key={`mob-finalist-${idx}`}
              className={`p-4 rounded-2xl border shadow-xl space-y-2.5 ${
                item.highlight
                  ? "bg-hh-action/15 border-hh-action/50 shadow-[0_0_20px_rgba(255,106,0,0.15)]"
                  : "bg-hh-surface/90 border-hh-border/60"
              }`}
            >
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs font-bold ${
                  item.highlight
                    ? "bg-hh-action/20 border border-hh-action/40 text-hh-action"
                    : "bg-hh-cyan/15 border border-hh-cyan/30 text-hh-cyan"
                }`}
              >
                <span className="material-symbols-outlined text-sm">event</span>
                <span>{item.date}</span>
              </div>
              <h2 className="font-sora text-base font-bold text-white leading-snug">
                {item.title}
              </h2>
              {item.details && (
                <ul className="space-y-1 text-xs text-hh-text-muted">
                  {item.details.map((d, i) => (
                    <li key={i}>• {d}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* 2. Desktop & Tablet Table Sheet (sm+) */}
        <div className="hidden sm:block overflow-hidden rounded-2xl border border-hh-border/60 bg-hh-surface/90 shadow-2xl backdrop-blur-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-hh-cyan/15 border-b border-hh-border/60">
                <th className="p-4 sm:p-5 font-sora text-sm sm:text-base text-hh-cyan font-bold w-1/3 sm:w-72">
                  วันจัดกิจกรรม
                </th>
                <th className="p-4 sm:p-5 font-sora text-sm sm:text-base text-hh-cyan font-bold">
                  กิจกรรม / รายละเอียด
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hh-border/30">
              {scheduleItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 sm:p-5 align-top">
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm md:text-base font-mono font-bold text-hh-cyan whitespace-nowrap">
                      <span className="material-symbols-outlined text-base">calendar_month</span>
                      <span>{item.date}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 align-top space-y-1">
                    <div className="font-bold text-white text-base sm:text-lg font-sora">
                      {item.title}
                    </div>
                    {item.details && (
                      <ul className="space-y-1 text-xs sm:text-sm text-hh-text-muted">
                        {item.details.map((d, i) => (
                          <li key={i}>• {d}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              ))}

              {/* Pitching Round Header Banner */}
              <tr className="bg-hh-cyan/10">
                <td
                  colSpan={2}
                  className="p-3.5 sm:p-4 text-center font-sora text-base sm:text-lg font-extrabold text-hh-cyan tracking-wide"
                >
                  การแข่งขันรอบตัดสิน (Final Pitching Round)
                </td>
              </tr>

              {finalistSchedule.map((item, idx) => (
                <tr
                  key={idx}
                  className={
                    item.highlight
                      ? "bg-hh-action/10 hover:bg-hh-action/20 transition-colors"
                      : "hover:bg-white/5 transition-colors"
                  }
                >
                  <td className="p-4 sm:p-5 align-top">
                    <div
                      className={`inline-flex items-center gap-2 text-xs sm:text-sm md:text-base font-mono font-bold whitespace-nowrap ${
                        item.highlight
                          ? "text-hh-action text-sm sm:text-base md:text-lg"
                          : "text-hh-cyan"
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">event</span>
                      <span>{item.date}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 align-top font-bold text-white text-base sm:text-lg font-sora">
                    {item.title}
                    {item.details && (
                      <ul className="space-y-1 text-xs sm:text-sm text-hh-text-muted mt-1 font-normal font-hanken">
                        {item.details.map((d, i) => (
                          <li key={i}>• {d}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
      <EligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onNext={() => {
          setIsEligibilityOpen(false);
          setIsPdpaOpen(true);
        }}
        showNextButton={showNextButton}
      />
      <PdpaModal
        isOpen={isPdpaOpen}
        onClose={() => setIsPdpaOpen(false)}
      />
    </main>
  );
}
