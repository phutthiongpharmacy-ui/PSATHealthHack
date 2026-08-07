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
      details: ["เปิดเผยโจทย์ความท้าทายสาธารณสุขประจำปี 2026"],
      date: "25 กันยายน พ.ศ. 2569",
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
    <main className="min-h-screen bg-hh-bg text-hh-text overflow-x-hidden pt-24">
      <Navbar onOpenEligibility={handleOpenEligibility} />

      {/* Header */}
      <div className="relative py-16 px-margin-mobile md:px-margin-desktop text-left border-b border-hh-border/30">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="font-mono text-xs text-hh-cyan uppercase tracking-widest inline-block font-semibold">
            TIMELINE & SCHEDULE
          </span>
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            กำหนดการแข่งขัน <span className="text-hh-cyan [text-shadow:0_0_20px_rgba(99,210,229,0.5)]">PSAT HealthHacks 2026</span>
          </h1>
          <p className="font-hanken text-hh-text-muted text-base md:text-lg max-w-2xl leading-relaxed">
            กำหนดการอย่างเป็นทางการของการแข่งขันนวัตกรรมสุขภาพ
          </p>
        </div>
      </div>

      <div className="py-12 px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto space-y-8">
        {/* Single Sheet Schedule Table */}
        <div className="overflow-hidden rounded-2xl border border-hh-border/60 bg-hh-surface/90 shadow-2xl backdrop-blur-2xl">
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
            <tbody className="divide-y divide-hh-border/30 font-hanken">
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
