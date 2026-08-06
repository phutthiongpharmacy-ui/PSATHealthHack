"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EligibilityModal from "@/components/EligibilityModal";
import PdpaModal from "@/components/PdpaModal";
import Link from "next/link";

export default function AboutPage() {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [isPdpaOpen, setIsPdpaOpen] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const handleOpenEligibility = (showNext: boolean = false) => {
    setShowNextButton(showNext);
    setIsEligibilityOpen(true);
  };

  return (
    <main className="min-h-screen bg-hh-bg text-hh-text overflow-x-hidden pt-24">
      <Navbar onOpenEligibility={handleOpenEligibility} />

      {/* Header */}
      <div className="relative py-16 px-margin-mobile md:px-margin-desktop text-left border-b border-hh-border/30">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="font-mono text-xs text-hh-cyan uppercase tracking-widest inline-block font-semibold">
            ABOUT US & INTRODUCTION
          </span>
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            เกี่ยวกับ <span className="text-hh-cyan [text-shadow:0_0_20px_rgba(99,210,229,0.5)]">PSAT HealthHacks 2026</span>
          </h1>
          <p className="font-hanken text-hh-text-muted text-base md:text-lg max-w-2xl leading-relaxed">
            สหพันธ์นิสิตนักศึกษาเภสัชศาสตร์แห่งประเทศไทย (สนภท.)
          </p>
        </div>
      </div>

      {/* Main Content Area - Clean Frameless Sequential Flow */}
      <div className="py-16 px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto space-y-20 font-hanken">
        
        {/* 1. เกี่ยวกับเรา (About Us) */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-sora text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
              <span className="w-2 h-7 bg-hh-cyan rounded-full" />
              เกี่ยวกับเรา (About Us)
            </h2>
            <div className="w-16 h-0.5 bg-hh-cyan/40 ml-5" />
          </div>

          <p className="text-lg text-white/90 leading-relaxed font-normal pl-5 border-l-2 border-hh-cyan/20">
            สหพันธ์นิสิตนักศึกษาเภสัชศาสตร์แห่งประเทศไทย (สนภท.) หรือ The Pharmaceutical Students&apos; Association of Thailand (PSAT) คือองค์กรเครือข่ายศูนย์กลางที่รวบรวมนิสิตนักศึกษาเภสัชศาสตร์จากสถาบันที่ผ่านการรับรองโดยสภาเภสัชกรรม รวมทั้งสิ้น 20 มหาวิทยาลัยทั่วประเทศ
          </p>

          <div className="pt-4 pl-5 space-y-4">
            <h3 className="font-sora text-base font-bold text-hh-cyan uppercase tracking-wider">
              พันธกิจหลักของเรา:
            </h3>

            <ul className="space-y-4 text-base text-hh-text-muted leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-hh-cyan mt-2 shrink-0" />
                <div>
                  <strong className="text-white">เป็นศูนย์กลางการประสานงาน:</strong> ขับเคลื่อนการดำเนินงานและกิจกรรมต่างๆ ร่วมกันระหว่างสถาบัน
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-hh-cyan mt-2 shrink-0" />
                <div>
                  <strong className="text-white">พัฒนาศักยภาพ:</strong> เสริมสร้างความรู้ ทักษะความเป็นผู้นำ ความคิดสร้างสรรค์ และทัศนคติที่ดีต่อวิชาชีพ
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-hh-cyan mt-2 shrink-0" />
                <div>
                  <strong className="text-white">ปกป้องสิทธิประโยชน์:</strong> คุ้มครองและรักษาสิทธิ์ของนิสิตนักศึกษา เพื่อก้าวสู่การเป็นบัณฑิตเภสัชศาสตร์ที่มีคุณภาพและรับผิดชอบต่อสังคมอย่างยั่งยืน
                </div>
              </li>
            </ul>
          </div>
        </section>

        <hr className="border-hh-border/20" />

        {/* 2. บทนำโครงการ (Introduction) */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-sora text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
              <span className="w-2 h-7 bg-hh-mint rounded-full" />
              บทนำโครงการ (Introduction)
            </h2>
            <div className="w-16 h-0.5 bg-hh-mint/40 ml-5" />
          </div>

          <div className="pl-5 space-y-6 text-base md:text-lg text-hh-text-muted leading-relaxed">
            <p>
              PSAT HealthHacks 2026 เกิดขึ้นภายใต้บริบทที่ประเทศไทยได้ก้าวเข้าสู่ &ldquo;สังคมผู้สูงอายุอย่างสมบูรณ์ (Aged Society)&rdquo; ซึ่งส่งผลให้ภาระโรคเรื้อรังและค่าใช้จ่ายด้านสาธารณสุขเพิ่มสูงขึ้นอย่างต่อเนื่อง การดูแลสุขภาพจึงต้องเปลี่ยนผ่านจากแนวคิด &ldquo;รักษาเมื่อเจ็บป่วย&rdquo; ไปสู่ &ldquo;การมีอายุยืนอย่างมีคุณภาพ (Longevity)&rdquo; และการมีความเป็นอยู่ที่ดี (Wellness) ในทุกมิติตลอดช่วงชีวิต
            </p>

            <p>
              อย่างไรก็ตาม นวัตกรรมและบริการด้านนี้มักมีราคาสูง เราจึงตั้งเป้าหมายที่จะสร้างสรรค์นวัตกรรมที่ทำให้ทุกคนสามารถ &ldquo;เข้าถึงการมีสุขภาพดีและอายุยืนได้จริง&rdquo;
            </p>

            <p>
              ด้วยบทบาทของ &ldquo;เภสัชกร&rdquo; ในฐานะบุคลากรด่านหน้าทางสุขภาพ สนภท. จึงเล็งเห็นความสำคัญในการปลุกพลังเยาวชนรุ่นใหม่และนิสิตนักศึกษาเภสัชศาสตร์ให้ลุกขึ้นมาเป็น &ldquo;นวัตกร&rdquo; ผ่านโครงการ PSAT HealthHacks 2026 ภายใต้แนวคิดหลัก:
            </p>

            <div className="py-6 my-2 border-y border-hh-cyan/30 text-center space-y-2">
              <p className="font-sora text-xl sm:text-2xl font-extrabold text-white leading-relaxed">
                “การมีอายุยืนอย่างมีคุณภาพคือเป้าหมายของสุขภาพที่ยั่งยืน”
              </p>
              <p className="font-mono text-sm text-hh-cyan">
                (Sustainable Longevity and Wellness Across a Lifetime)
              </p>
            </div>
          </div>
        </section>

        <hr className="border-hh-border/20" />

        {/* 3. วัตถุประสงค์ของโครงการ (Objectives) */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-sora text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
              <span className="w-2 h-7 bg-hh-action rounded-full" />
              วัตถุประสงค์ของโครงการ (Objectives)
            </h2>
            <div className="w-16 h-0.5 bg-hh-action/40 ml-5" />
          </div>

          <ol className="pl-5 space-y-6 text-base md:text-lg text-hh-text-muted leading-relaxed">
            <li className="flex items-start gap-4">
              <span className="font-mono font-bold text-hh-action text-xl shrink-0 mt-0.5">1.</span>
              <div>
                <strong className="text-white">สร้างสรรค์นวัตกรรม:</strong> เพื่อพัฒนาโซลูชันด้านสุขภาพที่ตอบรับการก้าวเข้าสู่สังคมผู้สูงอายุของประเทศไทย ภายใต้แนวคิด Sustainable Longevity
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-mono font-bold text-hh-action text-xl shrink-0 mt-0.5">2.</span>
              <div>
                <strong className="text-white">เสริมสร้างความรู้เชิงลึก:</strong> ให้ผู้เข้าร่วมตระหนักและเข้าใจถึงแนวคิดการมีอายุยืนยาวอย่างมีคุณภาพ (Longevity) และความเป็นอยู่ที่ดี (Wellness)
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="font-mono font-bold text-hh-action text-xl shrink-0 mt-0.5">3.</span>
              <div>
                <strong className="text-white">ต่อยอดสู่ธุรกิจจริง:</strong> ติดอาวุธทักษะกระบวนการสร้างนวัตกรรม เปลี่ยนจาก &ldquo;ไอเดีย&rdquo; สู่ &ldquo;การใช้งานจริงในเชิงพาณิชย์&rdquo; ที่ยั่งยืนและทุกคนเข้าถึงได้
              </div>
            </li>
          </ol>
        </section>

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
