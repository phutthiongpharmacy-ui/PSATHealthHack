"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HeroVideoBackground from "./HeroVideoBackground";

interface HeroSectionProps {
  onOpenEligibility?: () => void;
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
    <section className="relative min-h-[90dvh] flex flex-col justify-between overflow-hidden pt-28 pb-8">
      {/* Seamless MP4 Loop Video Background */}
      <HeroVideoBackground videoSrc="/videos/hero-bg.mp4" />

      {/* Hero Core Content */}
      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop my-auto text-center flex flex-col items-center">
        <div className="space-y-8 flex flex-col items-center w-full max-w-4xl">
          
          {/* Top Organization Logos Container */}
          <div className="flex items-center justify-center gap-7 sm:gap-9 pt-2 pb-1">
            {/* PSAT Logo */}
            <div className="relative w-22 h-22 sm:w-26 sm:h-26 md:w-28 md:h-28 bg-white rounded-2xl p-2.5 border border-hh-cyan/50 shadow-[0_0_22px_rgba(99,210,229,0.35)] flex items-center justify-center transition-all hover:scale-105">
              <Image
                src="/images/psat-logo.png"
                alt="PSAT Logo"
                width={120}
                height={120}
                className="object-contain w-full h-full"
                priority
              />
            </div>

            <div className="w-px h-12 bg-hh-cyan/30" />

            {/* Pharmacy Council Logo */}
            <div className="relative w-22 h-22 sm:w-26 sm:h-26 md:w-28 md:h-28 bg-white rounded-2xl p-2.5 border border-hh-cyan/50 shadow-[0_0_22px_rgba(99,210,229,0.35)] flex items-center justify-center transition-all hover:scale-105">
              <Image
                src="/images/pharmacy-council-logo.png"
                alt="The Pharmacy Council Logo"
                width={120}
                height={120}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-sora text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-tight text-white font-extrabold tracking-tight">
            PSAT HealthHack 2026 <br />
            <span className="text-hh-cyan [text-shadow:0_0_25px_rgba(99,210,229,0.5)] text-2xl sm:text-3xl md:text-[40px] block mt-2 font-bold">
              นวัตกรรมเพื่อสุขภาพแห่งอนาคต
            </span>
          </h1>

          {/* Promise Statement (<= 20 words) */}
          <p className="font-hanken text-lg md:text-xl text-hh-text-muted max-w-2xl leading-relaxed">
            พื้นที่สร้างสรรค์นวัตกรรมสาธารณสุขร่วมกับผู้เชี่ยวชาญหลากสาขา เพื่อยกระดับสุขภาพประชาชนไทย
          </p>

          {/* Countdown Timer Module - Frameless Minimalist Divider Style */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-10 py-4 px-6 sm:px-8 rounded-3xl bg-hh-bg/40 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            {/* Days */}
            <div className="flex flex-col items-center min-w-[50px] sm:min-w-[70px]">
              <span className="font-sora text-4xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-tight [text-shadow:0_0_20px_rgba(255,255,255,0.5)]">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="font-sans text-xs sm:text-sm md:text-base text-white/90 font-bold mt-1 tracking-wide">
                วัน
              </span>
            </div>

            <div className="w-px h-10 sm:h-14 bg-white/25 shrink-0" />

            {/* Hours */}
            <div className="flex flex-col items-center min-w-[50px] sm:min-w-[70px]">
              <span className="font-sora text-4xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-tight [text-shadow:0_0_20px_rgba(255,255,255,0.5)]">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="font-sans text-xs sm:text-sm md:text-base text-white/90 font-bold mt-1 tracking-wide">
                ชั่วโมง
              </span>
            </div>

            <div className="w-px h-10 sm:h-14 bg-white/25 shrink-0" />

            {/* Mins */}
            <div className="flex flex-col items-center min-w-[50px] sm:min-w-[70px]">
              <span className="font-sora text-4xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-tight [text-shadow:0_0_20px_rgba(255,255,255,0.5)]">
                {String(timeLeft.mins).padStart(2, "0")}
              </span>
              <span className="font-sans text-xs sm:text-sm md:text-base text-white/90 font-bold mt-1 tracking-wide">
                นาที
              </span>
            </div>

            <div className="w-px h-10 sm:h-14 bg-white/25 shrink-0" />

            {/* Secs */}
            <div className="flex flex-col items-center min-w-[50px] sm:min-w-[70px]">
              <span className="font-sora text-4xl sm:text-5xl md:text-6xl text-hh-cyan font-extrabold tracking-tight [text-shadow:0_0_20px_rgba(99,210,229,0.7)]">
                {String(timeLeft.secs).padStart(2, "0")}
              </span>
              <span className="font-sans text-xs sm:text-sm md:text-base text-hh-cyan/90 font-bold mt-1 tracking-wide">
                วินาที
              </span>
            </div>
          </div>

          {/* Registration Date Pill Badge directly under Countdown Timer */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-hh-surface border border-hh-cyan/30 backdrop-blur-md mt-2">
            <span className="font-mono text-xs text-hh-cyan tracking-wider uppercase font-semibold">
              PSAT HealthHack 2026 • Registration Open (15 Aug – 20 Sep 2026)
            </span>
          </div>

          {/* Action Conversion Buttons */}
          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <button
              onClick={onOpenEligibility}
              className="bg-hh-action text-black font-sora text-base px-8 py-4 rounded-full font-bold hover:bg-orange-400 transition-all shadow-[0_0_25px_rgba(255,106,0,0.5)] active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              สมัครแข่งขันตอนนี้
              <span className="material-symbols-outlined text-xl">
                arrow_forward
              </span>
            </button>
            <Link
              href="/schedule"
              className="bg-hh-surface-raised border border-hh-cyan/40 text-hh-cyan font-sora text-base px-8 py-4 rounded-full font-bold hover:bg-hh-cyan/15 transition-all backdrop-blur-md flex items-center gap-2"
            >
              ดูกำหนดการ
              <span className="material-symbols-outlined text-xl">
                calendar_month
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
