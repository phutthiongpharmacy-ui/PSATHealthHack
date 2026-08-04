import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-16 border-t border-hh-border/40 bg-hh-bg bg-gradient-to-t from-black/80 to-transparent">
      <div className="px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto space-y-12">
        {/* Top Section: Brand & Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-sora text-2xl font-extrabold text-white tracking-wider [text-shadow:0_0_20px_rgba(99,210,229,0.5)]">
              PSAT <span className="text-hh-cyan">HealthHack 2026</span>
            </div>
            <p className="font-hanken text-sm text-hh-text-muted leading-relaxed max-w-sm">
              เวทีแข่งขันแฮกกาธอนด้านนวัตกรรมสุขภาพและเทคโนโลยีทางการแพทย์ระดับประเทศ เพื่ออนาคตสุขภาวะที่ดีขึ้นอย่างยั่งยืน
            </p>
          </div>

          {/* Right Column: Address & Contact Details */}
          <div className="lg:col-span-8 p-6 md:p-8 rounded-2xl bg-hh-surface/60 border border-hh-cyan/20 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-hh-cyan text-xl">location_on</span>
              <h3 className="font-sora text-base font-bold text-white uppercase tracking-wider">
                ข้อมูลการติดต่อ & ที่ทำการกลาง (Contact Information)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/10 text-xs md:text-sm font-hanken text-on-surface-variant">
              {/* Thai Address */}
              <div className="space-y-2 leading-relaxed">
                <div className="font-bold text-white">
                  ที่ทำการกลาง : สโมสรนิสิตเภสัชศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                </div>
                <p className="text-hh-text-muted">
                  เลขที่ 254 ถนนพญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330
                </p>
                <div className="flex items-center gap-2 text-hh-cyan font-mono pt-1">
                  <span className="material-symbols-outlined text-sm">call</span>
                  <span>โทรศัพท์: 02-2188418</span>
                </div>
              </div>

              {/* English Address */}
              <div className="space-y-2 leading-relaxed border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                <div className="font-bold text-white">
                  Office: The Pharmaceutical Students&apos; Union of Chulalongkorn University
                </div>
                <p className="text-hh-text-muted">
                  254 Phayathai RD., Wangmai, Pathumwan, Bangkok 10330 Thailand
                </p>
                <div className="flex items-center gap-2 text-hh-cyan font-mono pt-1">
                  <span className="material-symbols-outlined text-sm">call</span>
                  <span>Tel. 66-22-188418</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Quick Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-hanken text-hh-text-muted">
          <div>
            © 2026 HealthHack. นวัตกรรมเพื่อสุขภาพแห่งอนาคต
          </div>
          <nav className="flex gap-6">
            <Link
              href="#"
              className="hover:text-hh-cyan transition-colors"
            >
              นโยบายความเป็นส่วนตัว
            </Link>
            <Link
              href="#"
              className="hover:text-hh-cyan transition-colors"
            >
              เงื่อนไขการใช้งาน
            </Link>
            <Link
              href="#"
              className="hover:text-hh-cyan transition-colors"
            >
              ติดต่อเรา
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
