import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-16 border-t border-primary-container/20 bg-background bg-gradient-to-t from-black to-transparent">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop gap-6 w-full max-w-container-max mx-auto">
        <div className="font-sora text-xl font-bold text-primary opacity-80 hover:opacity-100 transition-opacity [text-shadow:0_0_15px_rgba(0,240,255,0.6)]">
          HealthHack 2026
        </div>
        <div className="font-hanken text-sm text-on-surface-variant text-center md:text-left">
          © 2026 HealthHack. นวัตกรรมเพื่อสุขภาพแห่งอนาคต
        </div>
        <nav className="flex gap-6 font-hanken text-sm">
          <Link
            href="#"
            className="text-on-surface-variant hover:text-primary-container transition-colors opacity-80 hover:opacity-100"
          >
            นโยบายความเป็นส่วนตัว
          </Link>
          <Link
            href="#"
            className="text-on-surface-variant hover:text-primary-container transition-colors opacity-80 hover:opacity-100"
          >
            เงื่อนไขการใช้งาน
          </Link>
          <Link
            href="#"
            className="text-on-surface-variant hover:text-primary-container transition-colors opacity-80 hover:opacity-100"
          >
            ติดต่อเรา
          </Link>
        </nav>
      </div>
    </footer>
  );
}
