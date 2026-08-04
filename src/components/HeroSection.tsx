"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SponsorsSection from "./SponsorsSection";
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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-hh-surface border border-hh-cyan/30 backdrop-blur-md">
            <span className="font-mono text-xs text-hh-cyan tracking-wider uppercase font-semibold">
              PSAT HealthHack 2026 • Registration Open (15 Aug – 20 Sep 2026)
            </span>
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

          {/* Countdown Timer Module */}
          <div className="flex gap-3 sm:gap-4 pt-2 pb-2 justify-center flex-wrap">
            <div className="flex flex-col items-center justify-center bg-hh-surface/80 backdrop-blur border border-hh-cyan/30 rounded-2xl w-20 h-20 sm:w-24 sm:h-24 shadow-[0_0_20px_rgba(99,210,229,0.1)]">
              <span className="font-sora text-2xl sm:text-3xl text-white font-bold">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-hh-text-muted mt-1 tracking-wider">
                DAYS
              </span>
            </div>
            <div className="flex flex-col items-center justify-center bg-hh-surface/80 backdrop-blur border border-hh-cyan/30 rounded-2xl w-20 h-20 sm:w-24 sm:h-24 shadow-[0_0_20px_rgba(99,210,229,0.1)]">
              <span className="font-sora text-2xl sm:text-3xl text-white font-bold">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-hh-text-muted mt-1 tracking-wider">
                HOURS
              </span>
            </div>
            <div className="flex flex-col items-center justify-center bg-hh-surface/80 backdrop-blur border border-hh-cyan/30 rounded-2xl w-20 h-20 sm:w-24 sm:h-24 shadow-[0_0_20px_rgba(99,210,229,0.1)]">
              <span className="font-sora text-2xl sm:text-3xl text-white font-bold">
                {String(timeLeft.mins).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-hh-text-muted mt-1 tracking-wider">
                MINS
              </span>
            </div>
            <div className="flex flex-col items-center justify-center bg-hh-surface/80 backdrop-blur border border-hh-cyan/30 rounded-2xl w-20 h-20 sm:w-24 sm:h-24 shadow-[0_0_20px_rgba(99,210,229,0.1)]">
              <span className="font-sora text-2xl sm:text-3xl text-hh-cyan font-bold">
                {String(timeLeft.secs).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-hh-text-muted mt-1 tracking-wider">
                SECS
              </span>
            </div>
          </div>

          {/* Action Conversion Buttons */}
          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <Link
              href="/register"
              className="bg-hh-action text-black font-sora text-base px-8 py-4 rounded-full font-bold hover:bg-orange-400 transition-all shadow-[0_0_25px_rgba(255,106,0,0.5)] active:scale-95 flex items-center gap-2"
            >
              สมัครแข่งขันตอนนี้
              <span className="material-symbols-outlined text-xl">
                arrow_forward
              </span>
            </Link>
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

      {/* Credibility Sponsor Wall directly under Hero */}
      <div className="relative z-10 w-full pt-12">
        <SponsorsSection />
      </div>
    </section>
  );
}
