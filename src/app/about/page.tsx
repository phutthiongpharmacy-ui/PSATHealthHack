"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EligibilityModal from "@/components/EligibilityModal";

export default function AboutPage() {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-on-surface overflow-x-hidden">
      <Navbar onOpenEligibility={() => setIsEligibilityOpen(true)} />

      <div className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="font-mono text-xs text-primary-container tracking-widest uppercase bg-primary-container/10 px-4 py-1.5 rounded-full border border-primary-container/30">
            About Us & Committee
          </span>
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            เกี่ยวกับ <span className="text-primary-container">PSAT HealthHack 2026</span>
          </h1>
          <p className="font-hanken text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto">
            องค์กรเภสัชกรรมและเครือข่ายนิสิตนักศึกษาเภสัชศาสตร์แห่งประเทศไทย
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-surface-container-low/80 backdrop-blur-xl border border-white/10 space-y-4 shadow-[0_0_20px_rgba(0,240,255,0.05)]">
            <div className="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/30 flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-2xl">flag</span>
            </div>
            <h2 className="font-sora text-2xl font-bold text-white">พันธกิจ (Mission)</h2>
            <p className="font-hanken text-on-surface-variant leading-relaxed">
              ส่งเสริมและสนับสนุนให้คนรุ่นใหม่สร้างสรรค์นวัตกรรมด้านสาธารณสุข
              ผสมผสานองค์ความรู้ด้านเภสัชกรรม เทคโนโลยีดิจิทัล และปัญญาประดิษฐ์
              เพื่อยกระดับการรักษาพยาบาลและการดูแลสุขภาพของประชาชนไทย
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-surface-container-low/80 backdrop-blur-xl border border-white/10 space-y-4 shadow-[0_0_20px_rgba(0,240,255,0.05)]">
            <div className="w-12 h-12 rounded-xl bg-primary-container/10 border border-primary-container/30 flex items-center justify-center text-primary-container">
              <span className="material-symbols-outlined text-2xl">visibility</span>
            </div>
            <h2 className="font-sora text-2xl font-bold text-white">วิสัยทัศน์ (Vision)</h2>
            <p className="font-hanken text-on-surface-variant leading-relaxed">
              เป็นเวทีระดับชาติที่ขับเคลื่อนนวัตกรรมสุขภาพ (Health Innovation Hub)
              ผลักดันไอเดียของนักศึกษาและบุคลากรทางการแพทย์ให้เกิดการใช้งานได้จริงในระดับอุตสาหกรรม
            </p>
          </div>
        </div>

        {/* About PSAT Section */}
        <div className="p-8 md:p-12 rounded-2xl bg-surface-container-low/60 backdrop-blur-2xl border border-primary-container/20 space-y-6">
          <h2 className="font-sora text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-primary-container rounded" />
            สโมสรนิสิตนักศึกษาเภสัชศาสตร์แห่งประเทศไทย (PSAT)
          </h2>
          <p className="font-hanken text-on-surface leading-relaxed text-base md:text-lg">
            สหพันธ์นิสิตนักศึกษาเภสัชศาสตร์แห่งประเทศไทย (Pharmacy Students’ Association of Thailand - PSAT)
            เป็นศูนย์กลางความร่วมมือของนิสิตนักศึกษาเภสัชศาสตร์จากทุกสถาบันทั่วประเทศ
            มุ่งเน้นการพัฒนาศักยภาพ บริการสังคม และขับเคลื่อนวิชาชีพเภสัชกรรมสู่อนาคต
          </p>
        </div>

        {/* Committee & Partners */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="font-sora text-2xl md:text-3xl font-bold text-white">
              คณะกรรมการและผู้จัดงาน
            </h2>
            <p className="font-hanken text-on-surface-variant text-sm mt-2">
              ทีมงานผู้ร่วมเนรมิตการแข่งขัน PSAT HealthHack 2026
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "ฝ่ายบริหารและอำนวยการ", role: "PSAT Central Committee" },
              { title: "ฝ่ายเทคโนโลยีและนวัตกรรม", role: "Tech & Innovation Lead" },
              { title: "ฝ่ายประสานงานผู้เชี่ยวชาญ", role: "Medical & Mentor Relations" },
              { title: "ฝ่ายการแข่งขันและกติกา", role: "Competition Standard Committee" },
              { title: "ฝ่ายประชาสัมพันธ์และสื่อ", role: "Media & Public Relations" },
              { title: "ฝ่ายสวัสดิการและสถานที่", role: "Logistics & Event Operations" },
            ].map((team, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-primary-container/40 transition-all space-y-2"
              >
                <span className="font-mono text-xs text-primary-container uppercase">
                  TEAM 0{idx + 1}
                </span>
                <h3 className="font-sora text-lg font-bold text-white">
                  {team.title}
                </h3>
                <p className="font-hanken text-xs text-on-surface-variant">
                  {team.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <EligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
      />
    </main>
  );
}
