"use client";

import React, { useEffect } from "react";

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  showNextButton?: boolean;
}

export default function EligibilityModal({
  isOpen,
  onClose,
  onNext,
  showNextButton = false,
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-hh-bg/85 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Compact Modal Container */}
      <div className="relative z-[101] w-full max-w-lg sm:max-w-xl flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-hh-border bg-hh-surface/95 shadow-[0_0_50px_rgba(4,26,29,0.8)] backdrop-blur-2xl max-h-[82vh] -translate-y-10 sm:translate-y-0">
        {/* Header */}
        <div className="px-3.5 py-2.5 sm:px-5 sm:py-3.5 flex items-center justify-between border-b border-hh-border/40 shrink-0 bg-hh-bg/60">
          <h2
            id="eligibility-title"
            className="font-sora text-[11px] sm:text-sm md:text-base font-bold text-white flex items-center gap-1.5 sm:gap-2"
          >
            <span className="material-symbols-outlined text-hh-cyan text-sm sm:text-lg md:text-xl">
              verified
            </span>
            <span>คุณสมบัติของผู้เข้าแข่งขัน</span>
          </h2>
          <button
            type="button"
            aria-label="ปิดหน้าต่างคุณสมบัติ"
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-hh-surface-raised/80 border border-hh-border/40 text-hh-text-muted hover:text-white flex items-center justify-center transition-colors focus:outline-none cursor-pointer shrink-0"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-xs sm:text-base">close</span>
          </button>
        </div>

        {/* Scrollable Content Body - min-h-0 enables proper flex scroll constraint */}
        <div className="p-2.5 sm:p-5 overflow-y-auto custom-scrollbar flex-1 min-h-0">
          {/* Single Unified Container Card */}
          <div className="rounded-xl sm:rounded-2xl bg-hh-bg/60 border border-hh-border/40 p-2.5 sm:p-5 space-y-2.5 sm:space-y-4">
            {/* Criteria 1 */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan">
                  <span className="material-symbols-outlined text-xs sm:text-base">school</span>
                </div>
                <h3 className="font-sora text-[11px] sm:text-sm font-bold text-white">
                  1. สถานะการศึกษาและอายุ
                </h3>
              </div>
              <ul className="space-y-1 sm:space-y-1.5 text-hh-text-muted text-[10px] sm:text-xs md:text-sm font-hanken leading-relaxed pl-1">
                <li className="flex items-start gap-1 sm:gap-1.5">
                  <span className="text-hh-cyan shrink-0 select-none mt-0.5">•</span>
                  <span className="flex-1">เป็นนักเรียนหรือนิสิตนักศึกษาที่มีอายุระหว่าง 15 – 30 ปี</span>
                </li>
                <li className="flex items-start gap-1 sm:gap-1.5">
                  <span className="text-hh-cyan shrink-0 select-none mt-0.5">•</span>
                  <span className="flex-1">กำลังศึกษาอยู่ในระดับ มัธยมศึกษาตอนปลาย, อาชีวศึกษา (ปวช., ปวส.) หรือ อุดมศึกษา (ระดับปริญญาตรี ทุกชั้นปี ทุกคณะ หลักสูตรนานาชาติในไทย)</span>
                </li>
                <li className="flex items-start gap-1 sm:gap-1.5">
                  <span className="text-hh-cyan shrink-0 select-none mt-0.5">•</span>
                  <span className="flex-1">หรือมีวุฒิการสอบเทียบเท่ามัธยมศึกษาตอนปลาย ที่หน่วยงานรัฐไทยรับรอง</span>
                </li>
              </ul>
            </div>

            <hr className="border-hh-border/20" />

            {/* Criteria 2 */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan">
                  <span className="material-symbols-outlined text-xs sm:text-base">groups</span>
                </div>
                <h3 className="font-sora text-[11px] sm:text-sm font-bold text-white">
                  2. รูปแบบการสมัครเป็นทีม
                </h3>
              </div>
              <ul className="space-y-1 sm:space-y-1.5 text-hh-text-muted text-[10px] sm:text-xs md:text-sm font-hanken leading-relaxed pl-1">
                <li className="flex items-start gap-1 sm:gap-1.5">
                  <span className="text-hh-cyan shrink-0 select-none mt-0.5">•</span>
                  <span className="flex-1">สมัครเป็นทีม ทีมละ 3 – 5 คน</span>
                </li>
                <li className="flex items-start gap-1 sm:gap-1.5">
                  <span className="text-hh-cyan shrink-0 select-none mt-0.5">•</span>
                  <span className="flex-1">สมาชิกในทีม ไม่จำเป็นต้องมาจากสถาบันเดียวกัน สามารถรวมทีมข้ามคณะหรือข้ามสถาบันได้</span>
                </li>
              </ul>
            </div>

            <hr className="border-hh-border/20" />

            {/* Criteria 3 */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan">
                  <span className="material-symbols-outlined text-xs sm:text-base">location_on</span>
                </div>
                <h3 className="font-sora text-[11px] sm:text-sm font-bold text-white">
                  3. ภูมิลำเนาและระยะเวลาสมัคร
                </h3>
              </div>
              <ul className="space-y-1 sm:space-y-1.5 text-hh-text-muted text-[10px] sm:text-xs md:text-sm font-hanken leading-relaxed pl-1">
                <li className="flex items-start gap-1 sm:gap-1.5">
                  <span className="text-hh-cyan shrink-0 select-none mt-0.5">•</span>
                  <span className="flex-1">ผู้สมัครทุกคนต้องมีภูมิลำเนาหรือกำลังศึกษาอยู่ในประเทศไทย</span>
                </li>
                <li className="flex items-start gap-1 sm:gap-1.5">
                  <span className="text-hh-cyan shrink-0 select-none mt-0.5">•</span>
                  <span className="flex-1">
                    เปิดรับสมัครตั้งแต่วันที่{" "}
                    <span className="text-white font-bold">15 สิงหาคม – 20 กันยายน 2569</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Action - ONLY shown when opened via Register button */}
        {showNextButton && (
          <div className="p-2.5 sm:p-4 shrink-0 bg-hh-bg/95 border-t border-hh-border/40 flex items-center justify-center">
            <button
              type="button"
              onClick={() => {
                if (onNext) {
                  onNext();
                } else {
                  onClose();
                }
              }}
              className="w-full sm:w-auto min-w-[140px] px-5 bg-hh-action text-black font-sora text-xs sm:text-sm py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-orange-400 transition-all font-extrabold text-center flex items-center justify-center gap-1.5 cursor-pointer uppercase shadow-[0_0_20px_rgba(255,106,0,0.3)]"
            >
              <span>ถัดไป</span>
              <span className="material-symbols-outlined text-sm sm:text-lg">arrow_forward</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
