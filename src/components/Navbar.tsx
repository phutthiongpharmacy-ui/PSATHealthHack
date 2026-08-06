"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onOpenEligibility?: (showNextButton?: boolean) => void;
}

export default function Navbar({ onOpenEligibility }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-3.5 sm:py-4 transition-colors duration-300 ${scrolled
        ? "bg-hh-bg/85 backdrop-blur-xl border-b border-hh-border/60 shadow-lg"
        : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 mx-auto flex items-center justify-between">
        {/* Brand Logo & Event Header */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-hh-cyan to-hh-mint flex items-center justify-center text-black font-sora font-extrabold text-lg shadow-[0_0_15px_rgba(99,210,229,0.5)] group-hover:scale-105 transition-transform">
            HH
          </div>
          <div className="flex flex-col">
            <span className="font-sora font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-hh-cyan transition-colors">
              HealthHack 2026
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-hh-cyan/80 tracking-widest uppercase font-semibold">
              PSAT Cyber-Healthcare
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-sora">
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className={`text-sm transition-colors py-1 px-3.5 ${isActive("/")
                ? "text-hh-cyan font-extrabold"
                : "text-hh-text-muted hover:text-white"
                }`}
            >
              หน้าแรก
            </Link>
            <Link
              href="/about"
              className={`text-sm transition-colors py-1 px-3.5 ${isActive("/about")
                ? "text-hh-cyan font-extrabold"
                : "text-hh-text-muted hover:text-white"
                }`}
            >
              เกี่ยวกับเรา
            </Link>
            <Link
              href="/schedule"
              className={`text-sm transition-colors py-1 px-3.5 ${isActive("/schedule")
                ? "text-hh-cyan font-extrabold"
                : "text-hh-text-muted hover:text-white"
                }`}
            >
              กำหนดการ
            </Link>
            <Link
              href="/challenge"
              className={`text-sm transition-colors py-1 px-3.5 ${isActive("/challenge")
                ? "text-hh-cyan font-extrabold"
                : "text-hh-text-muted hover:text-white"
                }`}
            >
              โจทย์การแข่งขัน
            </Link>
            {onOpenEligibility && (
              <button
                onClick={() => onOpenEligibility(false)}
                className="text-sm text-white hover:text-hh-cyan transition-colors px-3.5 py-1 cursor-pointer font-bold"
              >
                คุณสมบัติ
              </button>
            )}
          </nav>

          {/* PRIS Orange Primary Conversion Button */}
          {onOpenEligibility ? (
            <button
              onClick={() => onOpenEligibility(true)}
              className="bg-hh-action text-white font-sora text-xs uppercase tracking-wider px-6 py-2.5 rounded-full font-extrabold hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(255,106,0,0.4)] active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              สมัครแข่งขัน
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          ) : (
            <Link
              href="/register"
              className="bg-hh-action text-white font-sora text-xs uppercase tracking-wider px-6 py-2.5 rounded-full font-extrabold hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(255,106,0,0.4)] active:scale-95 flex items-center gap-2"
            >
              สมัครแข่งขัน
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 focus:outline-none rounded-lg hover:bg-white/10"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-hh-bg/95 backdrop-blur-2xl border-b border-hh-border/60 px-margin-mobile py-6 space-y-4 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col gap-3 font-sora">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-hh-cyan transition-colors py-2 flex items-center justify-between"
            >
              <span>หน้าแรก</span>
              <span className="material-symbols-outlined text-sm text-hh-text-muted">chevron_right</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-hh-cyan transition-colors py-2 flex items-center justify-between"
            >
              <span>เกี่ยวกับเรา</span>
              <span className="material-symbols-outlined text-sm text-hh-text-muted">chevron_right</span>
            </Link>
            <Link
              href="/schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-hh-cyan transition-colors py-2 flex items-center justify-between"
            >
              <span>กำหนดการ</span>
              <span className="material-symbols-outlined text-sm text-hh-text-muted">chevron_right</span>
            </Link>
            <Link
              href="/challenge"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-hh-cyan transition-colors py-2 flex items-center justify-between"
            >
              <span>โจทย์การแข่งขัน</span>
              <span className="material-symbols-outlined text-sm text-hh-text-muted">chevron_right</span>
            </Link>
            {onOpenEligibility && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEligibility(false);
                }}
                className="text-left text-white hover:text-hh-cyan transition-colors py-2 flex items-center justify-between w-full"
              >
                <span>คุณสมบัติผู้สมัคร</span>
                <span className="material-symbols-outlined text-sm text-hh-text-muted">chevron_right</span>
              </button>
            )}
          </nav>
          <div className="pt-2">
            {onOpenEligibility ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEligibility(true);
                }}
                className="w-full bg-hh-action text-white font-sora text-xs uppercase tracking-wider py-3 rounded-xl font-extrabold hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(255,106,0,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>สมัครแข่งขัน</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            ) : (
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block bg-hh-action text-white font-sora text-sm uppercase tracking-wider py-3.5 rounded-full font-extrabold shadow-[0_0_15px_rgba(255,106,0,0.5)]"
              >
                สมัครแข่งขันตอนนี้
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
