"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onOpenEligibility?: () => void;
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-hh-bg/90 backdrop-blur-xl border-b border-hh-border/40 shadow-[0_4px_30px_rgba(4,26,29,0.8)] py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="font-sora text-xl md:text-2xl font-extrabold text-white tracking-tighter flex items-center">
            <span className="text-hh-cyan mr-1.5 font-bold">PSAT</span>
            HealthHack 2026
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6 items-center font-sora">
            <Link
              href="/"
              className={`text-sm transition-all py-1.5 px-3 rounded-lg ${isActive("/")
                ? "text-hh-cyan font-bold bg-hh-cyan/10 border border-hh-cyan/30"
                : "text-hh-text-muted hover:text-white hover:bg-white/5"
                }`}
            >
              หน้าแรก
            </Link>
            <Link
              href="/about"
              className={`text-sm transition-all py-1.5 px-3 rounded-lg ${isActive("/about")
                ? "text-hh-cyan font-bold bg-hh-cyan/10 border border-hh-cyan/30"
                : "text-hh-text-muted hover:text-white hover:bg-white/5"
                }`}
            >
              เกี่ยวกับเรา
            </Link>
            <Link
              href="/schedule"
              className={`text-sm transition-all py-1.5 px-3 rounded-lg ${isActive("/schedule")
                ? "text-hh-cyan font-bold bg-hh-cyan/10 border border-hh-cyan/30"
                : "text-hh-text-muted hover:text-white hover:bg-white/5"
                }`}
            >
              กำหนดการ
            </Link>
            {onOpenEligibility && (
              <button
                onClick={onOpenEligibility}
                className="text-sm text-hh-text-muted hover:text-white transition-colors px-3 py-1.5 hover:bg-white/5 rounded-lg"
              >
                คุณสมบัติ
              </button>
            )}
            <Link
              href="/#faq"
              className="text-sm text-hh-text-muted hover:text-white transition-colors px-3 py-1.5 hover:bg-white/5 rounded-lg"
            >
              คำถามที่พบบ่อย
            </Link>
          </nav>

          {/* PRIS Orange Primary Conversion Button */}
          <Link
            href="/register"
            className="bg-hh-action text-black font-sora text-xs uppercase tracking-wider px-6 py-2.5 rounded-full font-bold hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(255,106,0,0.4)] active:scale-95 flex items-center gap-2"
          >
            สมัครแข่งขัน
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
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
              className="text-white hover:text-hh-cyan transition-colors py-2 border-b border-white/5 flex items-center justify-between"
            >
              <span>หน้าแรก</span>
              <span className="material-symbols-outlined text-sm text-hh-text-muted">chevron_right</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-hh-cyan transition-colors py-2 border-b border-white/5 flex items-center justify-between"
            >
              <span>เกี่ยวกับเรา</span>
              <span className="material-symbols-outlined text-sm text-hh-text-muted">chevron_right</span>
            </Link>
            <Link
              href="/schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-hh-cyan transition-colors py-2 border-b border-white/5 flex items-center justify-between"
            >
              <span>กำหนดการ</span>
              <span className="material-symbols-outlined text-sm text-hh-text-muted">chevron_right</span>
            </Link>
            {onOpenEligibility && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEligibility();
                }}
                className="text-left text-white hover:text-hh-cyan transition-colors py-2 border-b border-white/5 flex items-center justify-between w-full"
              >
                <span>คุณสมบัติผู้สมัคร</span>
                <span className="material-symbols-outlined text-sm text-hh-text-muted">chevron_right</span>
              </button>
            )}
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-hh-cyan transition-colors py-2 border-b border-white/5 flex items-center justify-between"
            >
              <span>คำถามที่พบบ่อย</span>
              <span className="material-symbols-outlined text-sm text-hh-text-muted">chevron_right</span>
            </Link>
          </nav>
          <div className="pt-2">
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center block bg-hh-action text-black font-sora text-sm uppercase tracking-wider py-3.5 rounded-full font-bold shadow-[0_0_15px_rgba(255,106,0,0.5)]"
            >
              สมัครแข่งขันตอนนี้
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
