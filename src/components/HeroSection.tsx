"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HeroVideoBackground from "./HeroVideoBackground";

interface HeroSectionProps {
  onOpenEligibility?: (showNextButton?: boolean) => void;
}

export default function HeroSection({ onOpenEligibility }: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    mins: 30,
    secs: 0,
  });

  useEffect(() => {
    // Single source of truth deadline: Sept 20, 2026
    const targetDate = new Date("2026-09-20T23:59:59").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, mins, secs });
      } else {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 lg:pt-24 pb-6">
      {/* Seamless MP4 Loop Video Background */}
      <HeroVideoBackground videoSrc="/videos/hero-bg.mp4" />

      {/* Hero Core Content */}
      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop my-auto text-center flex flex-col items-center">
        <div className="space-y-4 sm:space-y-5 md:space-y-6 flex flex-col items-center w-full max-w-4xl">
          
          {/* 1. Top Organization Logos Container */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 pt-1 pb-1">
            {/* PSAT Logo */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center transition-all hover:scale-105 filter drop-shadow-[0_0_15px_rgba(99,210,229,0.4)]">
              <Image
                src="/images/psat-logo.png"
                alt="PSAT Logo"
                width={100}
                height={100}
                className="object-contain w-full h-full"
                priority
              />
            </div>

            <div className="w-px h-10 bg-hh-cyan/30" />

            {/* Pharmacy Council Logo */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center transition-all hover:scale-105 filter drop-shadow-[0_0_15px_rgba(99,210,229,0.4)]">
              <Image
                src="/images/pharmacy-council-logo.png"
                alt="The Pharmacy Council Logo"
                width={100}
                height={100}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </div>

          {/* 2. Main Headline Banner */}
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight text-white font-extrabold tracking-tight">
            PSAT HealthHacks 2026 <br />
            <span className="text-hh-cyan [text-shadow:0_0_25px_rgba(99,210,229,0.5)] text-xl sm:text-2xl md:text-3xl block mt-1.5 font-bold">
              นวัตกรรมสุขภาพเพื่ออนาคต
            </span>
          </h1>

          {/* Promise Statement */}
          <p className="font-hanken text-sm sm:text-base md:text-lg text-hh-text-muted max-w-xl leading-relaxed">
            พื้นที่สร้างสรรค์นวัตกรรมสาธารณสุขร่วมกับผู้เชี่ยวชาญหลากสาขา <br className="hidden sm:inline" />
            เพื่อยกระดับสุขภาพประชาชนไทย
          </p>

          {/* 3. Event Date Badge (Centered) */}
          <div className="flex items-center justify-center font-hanken text-xs sm:text-sm text-white/90">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-hh-surface/90 border border-hh-cyan/30 backdrop-blur-md shadow-[0_0_15px_rgba(99,210,229,0.2)]">
              <span className="material-symbols-outlined text-hh-cyan text-base">calendar_month</span>
              <span className="font-semibold">เปิดรับสมัคร ตั้งแต่ 15 สิงหาคม – 20 กันยายน 2569</span>
            </div>
          </div>

          {/* 4. Premium Action Conversion Buttons (Reference Image Style) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            {/* Primary Orange Button */}
            <button
              onClick={() => onOpenEligibility?.(true)}
              className="relative flex items-center justify-between w-full sm:w-auto min-w-[260px] sm:min-w-[280px] px-5 py-3.5 rounded-full bg-gradient-to-r from-[#FF5500] via-[#FF6A00] to-[#FF8800] text-white font-sora font-extrabold text-base shadow-[0_0_30px_rgba(255,106,0,0.6)] hover:brightness-110 active:scale-95 transition-all cursor-pointer group"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
              <span className="px-3">สมัครแข่งขันตอนนี้</span>
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#FF6A00] shadow-md group-hover:translate-x-0.5 transition-transform">
                <span className="material-symbols-outlined text-lg font-bold">arrow_forward</span>
              </span>
            </button>

            {/* Secondary Glossy White Button */}
            <Link
              href="/schedule"
              className="relative flex items-center justify-between w-full sm:w-auto min-w-[260px] sm:min-w-[280px] px-5 py-3.5 rounded-full bg-gradient-to-r from-white via-cyan-50 to-cyan-100 text-slate-900 font-sora font-extrabold text-base shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:bg-white active:scale-95 transition-all group"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A8CC] shadow-[0_0_8px_#00A8CC]" />
              <span className="px-3">ดูกำหนดการ</span>
              <span className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-md group-hover:translate-x-0.5 transition-transform">
                <span className="material-symbols-outlined text-lg font-bold">arrow_forward</span>
              </span>
            </Link>
          </div>

          {/* 5. Countdown Section Header Label */}
          <div className="pt-2">
            <p className="font-mono text-xs text-white/70 uppercase tracking-[0.25em] font-bold">
              นับถอยหลังสู่ PSAT HealthHacks 2026
            </p>
          </div>

          {/* 6. Countdown Timer Module at the Bottom */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 py-1">
            {/* Days */}
            <div className="flex flex-col items-center min-w-[45px] sm:min-w-[60px]">
              <span className="font-sora text-3xl sm:text-4xl md:text-5xl text-white font-extrabold tracking-tight [text-shadow:0_0_20px_rgba(255,255,255,0.5)]">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="font-sans text-[11px] sm:text-xs md:text-sm text-white/90 font-bold mt-0.5 tracking-wide">
                วัน
              </span>
            </div>

            <div className="w-px h-8 sm:h-12 bg-white/25 shrink-0" />

            {/* Hours */}
            <div className="flex flex-col items-center min-w-[45px] sm:min-w-[60px]">
              <span className="font-sora text-3xl sm:text-4xl md:text-5xl text-white font-extrabold tracking-tight [text-shadow:0_0_20px_rgba(255,255,255,0.5)]">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="font-sans text-[11px] sm:text-xs md:text-sm text-white/90 font-bold mt-0.5 tracking-wide">
                ชั่วโมง
              </span>
            </div>

            <div className="w-px h-8 sm:h-12 bg-white/25 shrink-0" />

            {/* Mins */}
            <div className="flex flex-col items-center min-w-[45px] sm:min-w-[60px]">
              <span className="font-sora text-3xl sm:text-4xl md:text-5xl text-white font-extrabold tracking-tight [text-shadow:0_0_20px_rgba(255,255,255,0.5)]">
                {String(timeLeft.mins).padStart(2, "0")}
              </span>
              <span className="font-sans text-[11px] sm:text-xs md:text-sm text-white/90 font-bold mt-0.5 tracking-wide">
                นาที
              </span>
            </div>

            <div className="w-px h-8 sm:h-12 bg-white/25 shrink-0" />

            {/* Secs */}
            <div className="flex flex-col items-center min-w-[45px] sm:min-w-[60px]">
              <span className="font-sora text-3xl sm:text-4xl md:text-5xl text-hh-cyan font-extrabold tracking-tight [text-shadow:0_0_20px_rgba(99,210,229,0.7)]">
                {String(timeLeft.secs).padStart(2, "0")}
              </span>
              <span className="font-sans text-[11px] sm:text-xs md:text-sm text-hh-cyan/90 font-bold mt-0.5 tracking-wide">
                วินาที
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
