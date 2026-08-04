"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EligibilityModal({
  isOpen,
  onClose,
}: EligibilityModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="eligibility-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fadeIn"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-hh-bg/85 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-hh-border bg-hh-surface/95 shadow-2xl backdrop-blur-2xl">
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-hh-border/40 pb-4">
            <h2
              id="eligibility-title"
              className="font-sora text-xl md:text-2xl font-bold text-white flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-hh-cyan">
                verified
              </span>
              คุณสมบัติของผู้เข้าแข่งขัน (Eligibility)
            </h2>
            <button
              type="button"
              aria-label="ปิดหน้าต่างคุณสมบัติ"
              className="text-hh-text-muted hover:text-white p-1.5 transition-colors rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-hh-cyan"
              onClick={onClose}
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Criteria 1 */}
            <div className="flex gap-4 items-start p-4 rounded-2xl bg-hh-bg/60 border border-hh-border/40">
              <div className="shrink-0 w-10 h-10 rounded-full bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan">
                <span className="material-symbols-outlined text-xl">school</span>
              </div>
              <div>
                <h3 className="font-sora text-base font-bold text-white mb-1">
                  1. สถานะการศึกษาและอายุ
                </h3>
                <ul className="space-y-1 text-hh-text-muted text-sm font-hanken">
                  <li>• เป็นนักเรียนหรือนิสิตนักศึกษาที่มีอายุระหว่าง 15 – 30 ปี</li>
                  <li>
                    • กำลังศึกษาอยู่ในระดับ มัธยมศึกษาตอนปลาย, อาชีวศึกษา (ปวช., ปวส.)
                    หรือระดับปริญญาตรี (ทุกชั้นปี ทุกคณะ)
                  </li>
                  <li>
                    • วุฒิหรือการสอบเทียบเท่ามัธยมศึกษาตอนปลาย ที่หน่วยงานรัฐไทยรับรอง
                  </li>
                </ul>
              </div>
            </div>

            {/* Criteria 2 */}
            <div className="flex gap-4 items-start p-4 rounded-2xl bg-hh-bg/60 border border-hh-border/40">
              <div className="shrink-0 w-10 h-10 rounded-full bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan">
                <span className="material-symbols-outlined text-xl">groups</span>
              </div>
              <div>
                <h3 className="font-sora text-base font-bold text-white mb-1">
                  2. รูปแบบการสมัครเป็นทีม
                </h3>
                <ul className="space-y-1 text-hh-text-muted text-sm font-hanken">
                  <li>• สมัครเป็นทีม ทีมละ 3 – 5 คน</li>
                  <li>
                    • สมาชิกในทีม สามารถรวมทีมข้ามคณะ ข้ามสถาบัน หรือข้ามระดับชั้นได้
                  </li>
                  <li>• สมัครฟรี ไม่มีค่าใช้จ่ายในการเข้าร่วมใดๆ ทั้งสิ้น</li>
                </ul>
              </div>
            </div>

            {/* Criteria 3 */}
            <div className="flex gap-4 items-start p-4 rounded-2xl bg-hh-bg/60 border border-hh-border/40">
              <div className="shrink-0 w-10 h-10 rounded-full bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan">
                <span className="material-symbols-outlined text-xl">
                  location_on
                </span>
              </div>
              <div>
                <h3 className="font-sora text-base font-bold text-white mb-1">
                  3. ภูมิลำเนาและเงื่อนไขการสมัคร
                </h3>
                <p className="text-hh-text-muted text-sm font-hanken">
                  ผู้สมัครทุกคนต้องมีภูมิลำเนาหรือกำลังศึกษาอยู่ในประเทศไทย เปิดรับสมัครตั้งแต่วันที่{" "}
                  <span className="text-white font-bold">15 สิงหาคม – 20 กันยายน 2569</span>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-hh-border/40 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-1/3 py-3 border border-hh-border text-white font-sora text-sm rounded-full hover:bg-white/10 transition-colors"
            >
              ปิดหน้าต่าง
            </button>
            <Link
              href="/register"
              onClick={onClose}
              className="w-full sm:w-2/3 bg-hh-action text-black font-sora text-sm py-3 rounded-full hover:bg-orange-400 transition-all font-bold text-center shadow-[0_0_15px_rgba(255,106,0,0.4)] flex items-center justify-center gap-2"
            >
              รับทราบและสมัครแข่งขัน
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
