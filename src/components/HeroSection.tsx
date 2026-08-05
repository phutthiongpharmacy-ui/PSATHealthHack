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
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 lg:pt-24 pb-6">
      {/* Seamless MP4 Loop Video Background */}
      <HeroVideoBackground videoSrc="/videos/hero-bg.mp4" />

      {/* Hero Core Content */}
      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop my-auto text-center flex flex-col items-center">
        <div className="space-y-4 sm:space-y-5 md:space-y-6 flex flex-col items-center w-full max-w-4xl">
          
          {/* Top Organization Logos Container */}
          <div className="flex items-center justify-center gap-5 sm:gap-7 pt-1 pb-1">
            {/* PSAT Logo */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 bg-white rounded-2xl p-2 border border-hh-cyan/50 shadow-[0_0_20px_rgba(99,210,229,0.35)] flex items-center justify-center transition-all hover:scale-105">
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
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 bg-white rounded-2xl p-2 border border-hh-cyan/50 shadow-[0_0_20px_rgba(99,210,229,0.35)] flex items-center justify-center transition-all hover:scale-105">
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

          {/* Headline */}
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight text-white font-extrabold tracking-tight">
            PSAT HealthHack 2026 <br />
            <span className="text-hh-cyan [text-shadow:0_0_25px_rgba(99,210,229,0.5)] text-xl sm:text-2xl md:text-3xl block mt-1.5 font-bold">
              นวัตกรรมเพื่อสุขภาพแห่งอนาคต
            </span>
          </h1>

          {/* Promise Statement (<= 20 words) */}
          <p className="font-hanken text-sm sm:text-base md:text-lg text-hh-text-muted max-w-xl leading-relaxed">
            พื้นที่สร้างสรรค์นวัตกรรมสาธารณสุขร่วมกับผู้เชี่ยวชาญหลากสาขา เพื่อยกระดับสุขภาพประชาชนไทย
          </p>

          {/* Countdown Timer Module - 100% Borderless Minimalist Divider Style */}
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

          {/* Registration Date Pill Badge directly under Countdown Timer */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-hh-surface/90 border border-hh-cyan/30 backdrop-blur-md">
            <span className="font-mono text-[11px] sm:text-xs text-hh-cyan tracking-wider uppercase font-semibold">
              PSAT HealthHack 2026 • Registration Open (15 Aug – 20 Sep 2026)
            </span>
          </div>

          {/* Action Conversion Buttons */}
          <div className="pt-2 flex flex-wrap gap-3.5 justify-center">
            <button
              onClick={onOpenEligibility}
              className="bg-hh-action text-black font-sora text-sm sm:text-base px-7 py-3.5 rounded-full font-bold hover:bg-orange-400 transition-all shadow-[0_0_25px_rgba(255,106,0,0.5)] active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              สมัครแข่งขันตอนนี้
              <span className="material-symbols-outlined text-lg sm:text-xl">
                arrow_forward
              </span>
            </button>
            <Link
              href="/schedule"
              className="bg-hh-surface-raised border border-hh-cyan/40 text-hh-cyan font-sora text-sm sm:text-base px-7 py-3.5 rounded-full font-bold hover:bg-hh-cyan/15 transition-all backdrop-blur-md flex items-center gap-2"
            >
              ดูกำหนดการ
              <span className="material-symbols-outlined text-lg sm:text-xl">
                calendar_month
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
