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
      details: ["ปฐมนิเทศและแนะแนวการเตรียมตัวสำหรับการแข่งขัน"],
      date: "29 สิงหาคม พ.ศ. 2569",
    },
    {
      title: "ปล่อยโจทย์การแข่งขัน",
      details: ["เปิดเผยโจทย์ความท้าทายสาธารณสุขประจำปี 2026"],
      date: "25 กันยายน พ.ศ. 2569",
    },
    {
      title: "จัดทำและยื่นเสนอเค้าโครงนวัตกรรม",
      details: ["ส่งเอกสารและวิดีโอ Pitching เค้าโครงนวัตกรรมเบื้องต้น"],
      date: "25 – 28 กันยายน พ.ศ. 2569",
    },
    {
      title: "คณะกรรมการพิจารณาเค้าโครงนวัตกรรม",
      details: ["คณะกรรมการผู้เชี่ยวชาญประเมินผลงานรอบคัดเลือก"],
      date: "29 ก.ย. – 4 ต.ค. 2569",
    },
    {
      title: "ประกาศผลผู้ผ่านเข้ารอบสุดท้าย",
      details: ["ประกาศรายชื่อทีมผู้ผ่านเข้ารอบสุดท้ายทางเว็บไซต์"],
      date: "5 ตุลาคม พ.ศ. 2569",
    },
  ];

  const finalistSchedule = [
    {
      title: "ปฐมนิเทศผู้ผ่านเข้าการแข่งขันรอบตัดสิน",
      date: "10 ตุลาคม พ.ศ. 2569",
    },
    {
      title: "การอบรมเชิงปฏิบัติการ (Workshop & Mentoring)",
      date: "17 – 18 ตุลาคม พ.ศ. 2569",
    },
    {
      title: "พัฒนาและปรับปรุงนวัตกรรม (Prototype Development)",
      date: "19 – 28 ตุลาคม พ.ศ. 2569",
    },
    {
      title: "การแข่งขันรอบตัดสิน (Pitching Round & Award Ceremony)",
      date: "29 – 30 ตุลาคม พ.ศ. 2569",
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
            กำหนดการแข่งขัน <span className="text-hh-cyan [text-shadow:0_0_20px_rgba(99,210,229,0.5)]">PSAT HealthHack 2026</span>
          </h1>
          <p className="font-hanken text-hh-text-muted text-base md:text-lg max-w-2xl leading-relaxed">
            กำหนดการอย่างเป็นทางการของการแข่งขันนวัตกรรมสุขภาพ
          </p>
        </div>
      </div>

      <div className="py-16 px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto space-y-12">

        {/* Schedule Table Container */}
        <div className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-white/10 bg-surface-container-lowest shadow-[0_0_30px_rgba(0,240,255,0.05)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-container/10 border-b border-white/10">
                <th className="p-6 font-sora text-lg text-primary-container font-bold">
                  กิจกรรม / รายละเอียด
                </th>
                <th className="p-6 font-sora text-lg text-primary-container font-bold w-1/3">
                  วันจัดกิจกรรม
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-hanken">
              {scheduleItems.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="p-6">
                    <div className="font-bold text-white text-base md:text-lg font-sora">
                      {item.title}
                    </div>
                    {item.details && (
                      <ul className="mt-2 space-y-1 text-on-surface-variant text-sm">
                        {item.details.map((d, i) => (
                          <li key={i}>• {d}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="p-6 font-mono text-primary-container font-medium text-sm md:text-base">
                    {item.date}
                  </td>
                </tr>
              ))}

              {/* Pitching Round Header */}
              <tr className="bg-primary-container/10">
                <td
                  colSpan={2}
                  className="p-4 text-center font-sora text-xl font-bold text-primary-container tracking-tight [text-shadow:0_0_10px_rgba(0,240,255,0.5)]"
                >
                  การแข่งขันรอบตัดสิน (Final Pitching Round)
                </td>
              </tr>

              {finalistSchedule.map((item, idx) => (
                <tr
                  key={idx}
                  className={
                    item.highlight
                      ? "bg-error-container/20 hover:bg-error-container/30 transition-colors"
                      : "hover:bg-white/5 transition-colors"
                  }
                >
                  <td className="p-6 font-bold text-white text-base md:text-lg font-sora">
                    {item.title}
                  </td>
                  <td
                    className={`p-6 font-mono font-bold text-sm md:text-base ${
                      item.highlight ? "text-error text-lg" : "text-primary-container"
                    }`}
                  >
                    {item.date}
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
