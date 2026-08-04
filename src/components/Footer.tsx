import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-16 border-t border-hh-border/40 bg-hh-bg bg-gradient-to-t from-black/90 via-hh-bg to-transparent">
      <div className="px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto space-y-12">
        {/* Main Footer Layout (Left: Address / Right: Contact List) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start justify-between">
          
          {/* Left Column: Organization & Detailed Address */}
          <div className="lg:col-span-7 space-y-6">
            {/* Title / Brand */}
            <div className="space-y-2">
              <div className="font-sora text-2xl md:text-3xl font-extrabold text-white tracking-wider [text-shadow:0_0_20px_rgba(99,210,229,0.5)]">
                PSAT <span className="text-hh-cyan">HealthHack 2026</span>
              </div>
              <p className="font-hanken text-xs text-hh-cyan uppercase tracking-widest font-mono">
                The Pharmaceutical Students&apos; Union of Chulalongkorn University
              </p>
            </div>

            {/* Address Block with Location Icon */}
            <div className="flex items-start gap-3.5 pt-2">
              <div className="w-9 h-9 rounded-full bg-hh-cyan/10 border border-hh-cyan/30 flex items-center justify-center shrink-0 mt-1">
                <span className="material-symbols-outlined text-hh-cyan text-lg">location_on</span>
              </div>
              <div className="space-y-3 font-hanken text-sm text-on-surface-variant leading-relaxed">
                <div>
                  <h4 className="font-bold text-white text-base">
                    สโมสรนิสิตเภสัชศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                  </h4>
                  <p className="text-xs text-hh-text-muted">
                    The Pharmaceutical Students&apos; Union of Chulalongkorn University
                  </p>
                </div>
                
                <div className="space-y-1 text-hh-text-muted text-xs md:text-sm">
                  <p>ที่ทำการกลาง: เลขที่ 254 ถนนพญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330</p>
                  <p className="font-mono text-xs opacity-80">Office: 254 Phayathai RD., Wangmai, Pathumwan, Bangkok 10330 Thailand</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Items List (Matching Reference Image) */}
          <div className="lg:col-span-5 space-y-6 lg:pl-8 lg:border-l border-white/10">
            {/* Contact Header */}
            <div className="flex items-center gap-3 font-sora text-sm uppercase tracking-wider text-hh-text-muted">
              <span className="w-6 h-px bg-hh-cyan/60" />
              <span>ติดต่อเรา</span>
            </div>

            {/* Contact List with Circular Icon Buttons */}
            <div className="space-y-4 font-mono text-sm">
              {/* Phone Item */}
              <a
                href="tel:022188418"
                className="flex items-center gap-4 text-white hover:text-hh-cyan transition-colors group"
              >
                <div className="w-11 h-11 rounded-full border border-white/15 bg-hh-surface/50 group-hover:border-hh-cyan/50 group-hover:bg-hh-cyan/10 transition-all flex items-center justify-center shrink-0 shadow-lg">
                  <span className="material-symbols-outlined text-hh-cyan text-lg">call</span>
                </div>
                <div>
                  <div className="text-xs text-hh-text-muted font-hanken">เบอร์โทรศัพท์ / Phone</div>
                  <div className="font-bold tracking-wide">02-2188418 <span className="text-xs text-hh-text-muted font-normal">(66-22-188418)</span></div>
                </div>
              </a>

              {/* Email Item */}
              <a
                href="mailto:contact@psathealthhack.org"
                className="flex items-center gap-4 text-white hover:text-hh-cyan transition-colors group"
              >
                <div className="w-11 h-11 rounded-full border border-white/15 bg-hh-surface/50 group-hover:border-hh-cyan/50 group-hover:bg-hh-cyan/10 transition-all flex items-center justify-center shrink-0 shadow-lg">
                  <span className="material-symbols-outlined text-hh-cyan text-lg">mail</span>
                </div>
                <div>
                  <div className="text-xs text-hh-text-muted font-hanken">อีเมล / Email</div>
                  <div className="font-bold tracking-wide">contact@psathealthhack.org</div>
                </div>
              </a>

              {/* Website Item */}
              <a
                href="https://psathealthhack.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white hover:text-hh-cyan transition-colors group"
              >
                <div className="w-11 h-11 rounded-full border border-white/15 bg-hh-surface/50 group-hover:border-hh-cyan/50 group-hover:bg-hh-cyan/10 transition-all flex items-center justify-center shrink-0 shadow-lg">
                  <span className="material-symbols-outlined text-hh-cyan text-lg">language</span>
                </div>
                <div>
                  <div className="text-xs text-hh-text-muted font-hanken">เว็บไซต์ / Website</div>
                  <div className="font-bold tracking-wide">www.psathealthhack.org</div>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Quick Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-hanken text-hh-text-muted">
          <div>
            © 2026 HealthHack. นวัตกรรมเพื่อสุขภาพแห่งอนาคต
          </div>
          <nav className="flex gap-6">
            <Link href="#" className="hover:text-hh-cyan transition-colors">
              นโยบายความเป็นส่วนตัว
            </Link>
            <Link href="#" className="hover:text-hh-cyan transition-colors">
              เงื่อนไขการใช้งาน
            </Link>
            <Link href="#" className="hover:text-hh-cyan transition-colors">
              ติดต่อเรา
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
