"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EligibilityModal from "@/components/EligibilityModal";
import Link from "next/link";

export default function AboutPage() {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);

  return (
    <main className="min-h-screen bg-hh-bg text-hh-text overflow-x-hidden pt-24">
      <Navbar onOpenEligibility={() => setIsEligibilityOpen(true)} />

      {/* Header */}
      <div className="relative py-16 px-margin-mobile md:px-margin-desktop text-center border-b border-hh-border/40 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-hh-cyan/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-container-max mx-auto space-y-4 relative z-10">
          <span className="font-mono text-xs text-hh-cyan uppercase tracking-widest px-4 py-1.5 rounded-full bg-hh-surface border border-hh-cyan/30">
            ABOUT US & INTRODUCTION
          </span>
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            เกี่ยวกับ <span className="text-hh-cyan [text-shadow:0_0_20px_rgba(99,210,229,0.5)]">PSAT HealthHacks 2026</span>
          </h1>
          <p className="font-hanken text-hh-text-muted text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            สหพันธ์นิสิตนักศึกษาเภสัชศาสตร์แห่งประเทศไทย (สนภท.) | The Pharmaceutical Students&apos; Association of Thailand (PSAT)
          </p>
        </div>
      </div>

      <div className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto space-y-16">
        
        {/* Section 1: เกี่ยวกับเรา (About Us) & พันธกิจหลัก */}
        <div className="p-8 md:p-12 rounded-3xl bg-hh-surface/70 backdrop-blur-2xl border border-hh-cyan/20 space-y-8 shadow-[0_0_30px_rgba(4,26,29,0.8)]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-8 bg-hh-cyan rounded-full shadow-[0_0_15px_rgba(99,210,229,0.8)]" />
              <h2 className="font-sora text-2xl md:text-3xl font-bold text-white">
                เกี่ยวกับเรา (About Us)
              </h2>
            </div>
            <p className="font-hanken text-base md:text-lg text-white/90 leading-relaxed pl-5 border-l-2 border-hh-cyan/30">
              สหพันธ์นิสิตนักศึกษาเภสัชศาสตร์แห่งประเทศไทย (สนภท.) หรือ The Pharmaceutical Students&apos; Association of Thailand (PSAT) คือองค์กรเครือข่ายศูนย์กลางที่รวบรวมนิสิตนักศึกษาเภสัชศาสตร์จากสถาบันที่ผ่านการรับรองโดยสภาเภสัชกรรม รวมทั้งสิ้น 20 มหาวิทยาลัยทั่วประเทศ
            </p>
          </div>

          {/* พันธกิจหลัก 3 ข้อ */}
          <div className="space-y-4 pt-4">
            <h3 className="font-sora text-lg font-bold text-hh-cyan uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">flag</span>
              พันธกิจหลักของเรา (Our Core Missions)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-hh-bg/80 border border-hh-border/50 space-y-3 hover:border-hh-cyan/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-hh-cyan/10 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan font-bold font-mono">
                  01
                </div>
                <h4 className="font-sora font-bold text-white text-base">เป็นศูนย์กลางการประสานงาน</h4>
                <p className="font-hanken text-xs md:text-sm text-hh-text-muted leading-relaxed">
                  ขับเคลื่อนการดำเนินงานและกิจกรรมต่างๆ ร่วมกันระหว่างสถาบันทั่วประเทศ
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-hh-bg/80 border border-hh-border/50 space-y-3 hover:border-hh-cyan/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-hh-cyan/10 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan font-bold font-mono">
                  02
                </div>
                <h4 className="font-sora font-bold text-white text-base">พัฒนาศักยภาพ</h4>
                <p className="font-hanken text-xs md:text-sm text-hh-text-muted leading-relaxed">
                  เสริมสร้างความรู้ ทักษะความเป็นผู้นำ ความคิดสร้างสรรค์ และทัศนคติที่ดีต่อวิชาชีพ
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-hh-bg/80 border border-hh-border/50 space-y-3 hover:border-hh-cyan/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-hh-cyan/10 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan font-bold font-mono">
                  03
                </div>
                <h4 className="font-sora font-bold text-white text-base">ปกป้องสิทธิประโยชน์</h4>
                <p className="font-hanken text-xs md:text-sm text-hh-text-muted leading-relaxed">
                  คุ้มครองและรักษาสิทธิ์ของนิสิตนักศึกษา เพื่อก้าวสู่การเป็นบัณฑิตเภสัชศาสตร์ที่มีคุณภาพและรับผิดชอบต่อสังคมอย่างยั่งยืน
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: บทนำโครงการ (Introduction) */}
        <div className="p-8 md:p-12 rounded-3xl bg-hh-surface/70 backdrop-blur-2xl border border-hh-cyan/20 space-y-8 shadow-[0_0_30px_rgba(4,26,29,0.8)]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-8 bg-hh-mint rounded-full shadow-[0_0_15px_rgba(48,214,188,0.8)]" />
              <h2 className="font-sora text-2xl md:text-3xl font-bold text-white">
                บทนำโครงการ (Introduction)
              </h2>
            </div>

            <div className="space-y-4 font-hanken text-base text-hh-text-muted leading-relaxed">
              <p>
                <strong className="text-white">PSAT HealthHacks 2026</strong> เกิดขึ้นภายใต้บริบทที่ประเทศไทยได้ก้าวเข้าสู่ <span className="text-hh-cyan font-semibold">&ldquo;สังคมผู้สูงอายุอย่างสมบูรณ์ (Aged Society)&rdquo;</span> ซึ่งส่งผลให้ภาระโรคเรื้อรังและค่าใช้จ่ายด้านสาธารณสุขเพิ่มสูงขึ้นอย่างต่อเนื่อง การดูแลสุขภาพจึงต้องเปลี่ยนผ่านจากแนวคิด &ldquo;รักษาเมื่อเจ็บป่วย&rdquo; ไปสู่ <span className="text-white font-semibold">&ldquo;การมีอายุยืนอย่างมีคุณภาพ (Longevity)&rdquo;</span> และการมีความเป็นอยู่ที่ดี (Wellness) ในทุกมิติตลอดช่วงชีวิต
              </p>
              <p>
                อย่างไรก็ตาม นวัตกรรมและบริการด้านนี้มักมีราคาสูง เราจึงตั้งเป้าหมายที่จะสร้างสรรค์นวัตกรรมที่ทำให้ทุกคนสามารถ <span className="text-hh-cyan font-semibold">&ldquo;เข้าถึงการมีสุขภาพดีและอายุยืนได้จริง&rdquo;</span>
              </p>
              <p>
                ด้วยบทบาทของ <strong className="text-white">&ldquo;เภสัชกร&rdquo;</strong> ในฐานะบุคลากรด่านหน้าทางสุขภาพ สนภท. จึงเล็งเห็นความสำคัญในการปลุกพลังเยาวชนรุ่นใหม่และนิสิตนักศึกษาเภสัชศาสตร์ให้ลุกขึ้นมาเป็น <strong className="text-hh-cyan">&ldquo;นวัตกร&rdquo;</strong> ผ่านโครงการ PSAT HealthHacks 2026 ภายใต้แนวคิดหลัก:
              </p>
            </div>
          </div>

          {/* Banner แนวคิดหลัก */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-hh-cyan/20 via-hh-surface to-hh-mint/20 border border-hh-cyan/40 text-center space-y-2 shadow-inner">
            <span className="font-mono text-xs uppercase tracking-widest text-hh-cyan font-bold">CORE CONCEPT</span>
            <blockquote className="font-sora text-lg sm:text-xl md:text-2xl font-extrabold text-white leading-snug">
              &ldquo;การมีอายุยืนอย่างมีคุณภาพคือเป้าหมายของสุขภาพที่ยั่งยืน&rdquo;
            </blockquote>
            <p className="font-mono text-xs md:text-sm text-hh-mint font-medium">
              (Sustainable Longevity and Wellness Across a Lifetime)
            </p>
          </div>
        </div>

        {/* Section 3: วัตถุประสงค์ของโครงการ (Objectives) */}
        <div className="p-8 md:p-12 rounded-3xl bg-hh-surface/70 backdrop-blur-2xl border border-hh-cyan/20 space-y-8 shadow-[0_0_30px_rgba(4,26,29,0.8)]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-8 bg-hh-action rounded-full shadow-[0_0_15px_rgba(255,106,0,0.8)]" />
            <h2 className="font-sora text-2xl md:text-3xl font-bold text-white">
              วัตถุประสงค์ของโครงการ (Objectives)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Objective 1 */}
            <div className="p-6 rounded-2xl bg-hh-bg/80 border border-hh-border/50 space-y-4 hover:border-hh-action/50 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-hh-action/10 border border-hh-action/30 flex items-center justify-center text-hh-action group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">lightbulb</span>
              </div>
              <h3 className="font-sora text-lg font-bold text-white group-hover:text-hh-action transition-colors">
                1. สร้างสรรค์นวัตกรรม
              </h3>
              <p className="font-hanken text-sm text-hh-text-muted leading-relaxed">
                เพื่อพัฒนาโซลูชันด้านสุขภาพที่ตอบรับการก้าวเข้าสู่สังคมผู้สูงอายุของประเทศไทย ภายใต้แนวคิด Sustainable Longevity
              </p>
            </div>

            {/* Objective 2 */}
            <div className="p-6 rounded-2xl bg-hh-bg/80 border border-hh-border/50 space-y-4 hover:border-hh-cyan/50 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-hh-cyan/10 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">psychology</span>
              </div>
              <h3 className="font-sora text-lg font-bold text-white group-hover:text-hh-cyan transition-colors">
                2. เสริมสร้างความรู้เชิงลึก
              </h3>
              <p className="font-hanken text-sm text-hh-text-muted leading-relaxed">
                ให้ผู้เข้าร่วมตระหนักและเข้าใจถึงแนวคิดการมีอายุยืนยาวอย่างมีคุณภาพ (Longevity) และความเป็นอยู่ที่ดี (Wellness)
              </p>
            </div>

            {/* Objective 3 */}
            <div className="p-6 rounded-2xl bg-hh-bg/80 border border-hh-border/50 space-y-4 hover:border-hh-mint/50 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-hh-mint/10 border border-hh-mint/30 flex items-center justify-center text-hh-mint group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">storefront</span>
              </div>
              <h3 className="font-sora text-lg font-bold text-white group-hover:text-hh-mint transition-colors">
                3. ต่อยอดสู่ธุรกิจจริง
              </h3>
              <p className="font-hanken text-sm text-hh-text-muted leading-relaxed">
                ติดอาวุธทักษะกระบวนการสร้างนวัตกรรม เปลี่ยนจาก &ldquo;ไอเดีย&rdquo; สู่ &ldquo;การใช้งานจริงในเชิงพาณิชย์&rdquo; ที่ยั่งยืนและทุกคนเข้าถึงได้
              </p>
            </div>
          </div>

          {/* CTA Box */}
          <div className="pt-6 text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-3 bg-hh-action text-black font-sora text-base px-8 py-4 rounded-full font-bold hover:bg-orange-400 transition-all shadow-[0_0_25px_rgba(255,106,0,0.5)] active:scale-95"
            >
              สมัครเข้าร่วมการแข่งขัน
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </Link>
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
