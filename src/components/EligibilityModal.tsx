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
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-hh-bg/85 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Compact Modal Container */}
      <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden rounded-2xl border border-hh-border bg-hh-surface/95 shadow-2xl backdrop-blur-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-hh-border/40 shrink-0">
          <h2
            id="eligibility-title"
            className="font-sora text-base sm:text-lg font-bold text-white flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-hh-cyan text-xl">
              verified
            </span>
            คุณสมบัติของผู้เข้าแข่งขัน
          </h2>
          <button
            type="button"
            aria-label="ปิดหน้าต่างคุณสมบัติ"
            className="text-hh-text-muted hover:text-white p-1 transition-colors rounded-lg hover:bg-white/10 focus:outline-none"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 custom-scrollbar">
          {/* Criteria 1 */}
          <div className="flex gap-3 items-start p-3 rounded-xl bg-hh-bg/60 border border-hh-border/40">
            <div className="shrink-0 w-8 h-8 rounded-full bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan">
              <span className="material-symbols-outlined text-base">school</span>
            </div>
            <div>
              <h3 className="font-sora text-xs sm:text-sm font-bold text-white mb-0.5">
                1. สถานะการศึกษาและอายุ
              </h3>
              <ul className="space-y-0.5 text-hh-text-muted text-xs font-hanken">
                <li>• นักเรียนหรือนิสิตนักศึกษา อายุระหว่าง 15 – 30 ปี</li>
                <li>• ระดับมัธยมปลาย, ปวช., ปวส. หรือปริญญาตรี (ทุกชั้นปี/คณะ)</li>
                <li>• วุฒิการศึกษาหรือเทียบเท่าที่หน่วยงานรัฐไทยรับรอง</li>
              </ul>
            </div>
          </div>

          {/* Criteria 2 */}
          <div className="flex gap-3 items-start p-3 rounded-xl bg-hh-bg/60 border border-hh-border/40">
            <div className="shrink-0 w-8 h-8 rounded-full bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan">
              <span className="material-symbols-outlined text-base">groups</span>
            </div>
            <div>
              <h3 className="font-sora text-xs sm:text-sm font-bold text-white mb-0.5">
                2. รูปแบบการสมัครเป็นทีม
              </h3>
              <ul className="space-y-0.5 text-hh-text-muted text-xs font-hanken">
                <li>• สมัครเป็นทีม ทีมละ 3 – 5 คน</li>
                <li>• สามารถรวมทีมข้ามคณะ ข้ามสถาบัน หรือข้ามระดับชั้นได้</li>
                <li>• สมัครฟรี ไม่มีค่าใช้จ่ายในการเข้าร่วมใดๆ ทั้งสิ้น</li>
              </ul>
            </div>
          </div>

          {/* Criteria 3 */}
          <div className="flex gap-3 items-start p-3 rounded-xl bg-hh-bg/60 border border-hh-border/40">
            <div className="shrink-0 w-8 h-8 rounded-full bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan">
              <span className="material-symbols-outlined text-base">location_on</span>
            </div>
            <div>
              <h3 className="font-sora text-xs sm:text-sm font-bold text-white mb-0.5">
                3. ภูมิลำเนาและระยะเวลาสมัคร
              </h3>
              <p className="text-hh-text-muted text-xs font-hanken leading-relaxed">
                มีภูมิลำเนาหรือกำลังศึกษาอยู่ในประเทศไทย เปิดรับสมัครตั้งแต่วันที่{" "}
                <span className="text-white font-bold">15 สิงหาคม – 20 กันยายน 2569</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-hh-border/40 shrink-0 flex flex-col sm:flex-row gap-2.5 bg-hh-surface/95">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-1/3 py-2.5 border border-hh-border/80 text-white font-sora text-xs rounded-xl hover:bg-white/10 transition-colors font-semibold"
          >
            ปิดหน้าต่าง
          </button>
          <Link
            href="/register"
            onClick={onClose}
            className="w-full sm:w-2/3 bg-hh-action text-black font-sora text-xs py-2.5 rounded-xl hover:bg-orange-400 transition-all font-extrabold text-center shadow-[0_0_15px_rgba(255,106,0,0.4)] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            ยอมรับและสมัครแข่งขัน
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
