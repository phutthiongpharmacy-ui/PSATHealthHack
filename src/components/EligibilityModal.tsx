"use client";

import React, { useEffect } from "react";
import Link from "next/link";

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
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-hh-bg/85 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Compact Modal Container */}
      <div className="relative w-full max-w-xl flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-hh-border bg-hh-surface/95 shadow-[0_0_50px_rgba(4,26,29,0.8)] backdrop-blur-2xl">
        {/* Header */}
        <div className="pl-4 pr-3 py-3 flex items-center justify-between border-b border-hh-border/40 shrink-0 bg-hh-bg/40">
          <h2
            id="eligibility-title"
            className="font-sora text-sm sm:text-base font-bold text-white flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-hh-cyan text-lg sm:text-xl">
              verified
            </span>
            คุณสมบัติของผู้เข้าแข่งขัน
          </h2>
          <button
            type="button"
            aria-label="ปิดหน้าต่างคุณสมบัติ"
            className="text-hh-text-muted hover:text-white p-1 transition-colors rounded-lg hover:bg-white/10 focus:outline-none cursor-pointer"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-lg sm:text-xl">close</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-3 sm:p-4 overflow-y-auto custom-scrollbar max-h-[75vh]">
          {/* Single Unified Container Card */}
          <div className="rounded-2xl bg-hh-bg/60 border border-hh-border/40 p-3.5 sm:p-4 space-y-3.5">
            {/* Criteria 1 */}
            <div className="flex gap-2.5 items-start">
              <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan mt-0.5">
                <span className="material-symbols-outlined text-base sm:text-lg">school</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-sora text-xs sm:text-sm font-bold text-white mb-1.5">
                  1. สถานะการศึกษาและอายุ
                </h3>
                <ul className="space-y-1 text-hh-text-muted text-xs sm:text-sm font-hanken leading-relaxed -ml-1">
                  <li className="flex items-start gap-1">
                    <span className="text-hh-cyan shrink-0 select-none mt-0.5">•</span>
                    <span className="flex-1">เป็นนักเรียนหรือนิสิตนักศึกษาที่มีอายุระหว่าง 15 – 30 ปี</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-hh-cyan shrink-0 select-none mt-0.5">•</span>
                    <span className="flex-1">กำลังศึกษาอยู่ในระดับ มัธยมศึกษาตอนปลาย, อาชีวศึกษา (ปวช., ปวส.) หรือ อุดมศึกษา (ระดับปริญญาตรี ทุกชั้นปี ทุกคณะ หลักสูตรนานาชาติในไทย)</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-hh-cyan shrink-0 select-none mt-0.5">•</span>
                    <span className="flex-1">หรือมีวุฒิการสอบเทียบเท่ามัธยมศึกษาตอนปลาย ที่หน่วยงานรัฐไทยรับรอง</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Criteria 2 */}
            <div className="flex gap-2.5 items-start">
              <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan mt-0.5">
                <span className="material-symbols-outlined text-base sm:text-lg">groups</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-sora text-xs sm:text-sm font-bold text-white mb-1.5">
                  2. รูปแบบการสมัครเป็นทีม
                </h3>
                <ul className="space-y-1 text-hh-text-muted text-xs sm:text-sm font-hanken leading-relaxed -ml-1">
                  <li className="flex items-start gap-1">
                    <span className="text-hh-cyan shrink-0 select-none mt-0.5">•</span>
                    <span className="flex-1">สมัครเป็นทีม ทีมละ 3 – 5 คน</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-hh-cyan shrink-0 select-none mt-0.5">•</span>
                    <span className="flex-1">สมาชิกในทีม ไม่จำเป็นต้องมาจากสถาบันเดียวกัน สามารถรวมทีมข้ามคณะหรือข้ามสถาบันได้</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Criteria 3 */}
            <div className="flex gap-2.5 items-start">
              <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan mt-0.5">
                <span className="material-symbols-outlined text-base sm:text-lg">location_on</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-sora text-xs sm:text-sm font-bold text-white mb-1.5">
                  3. ภูมิลำเนาและระยะเวลาสมัคร
                </h3>
                <ul className="space-y-1 text-hh-text-muted text-xs sm:text-sm font-hanken leading-relaxed -ml-1">
                  <li className="flex items-start gap-1">
                    <span className="text-hh-cyan shrink-0 select-none mt-0.5">•</span>
                    <span className="flex-1">ผู้สมัครทุกคนต้องมีภูมิลำเนาหรือกำลังศึกษาอยู่ในประเทศไทย</span>
                  </li>
                  <li className="flex items-start gap-1">
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
        </div>

        {/* Footer Action - ONLY shown when opened via Register button */}
        {showNextButton && (
          <div className="px-4 py-2.5 sm:px-5 sm:py-3 shrink-0 bg-hh-surface/95 flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (onNext) {
                  onNext();
                } else {
                  onClose();
                }
              }}
              className="w-full sm:w-auto px-6 bg-hh-action text-black font-sora text-xs sm:text-sm py-2 rounded-xl hover:bg-orange-400 transition-all font-extrabold text-center flex items-center justify-center gap-2 cursor-pointer uppercase shadow-[0_0_20px_rgba(255,106,0,0.3)]"
            >
              <span>ถัดไป</span>
              <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
