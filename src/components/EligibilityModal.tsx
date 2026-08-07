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

      {/* Expanded Modal Container */}
      <div className="relative w-full max-w-2xl flex flex-col overflow-hidden rounded-3xl border border-hh-border bg-hh-surface/95 shadow-[0_0_50px_rgba(4,26,29,0.8)] backdrop-blur-2xl">
        {/* Header */}
        <div className="pl-4 sm:pl-5 pr-4 sm:pr-5 py-3.5 sm:py-4 flex items-center justify-between border-b border-hh-border/40 shrink-0 bg-hh-bg/40">
          <h2
            id="eligibility-title"
            className="font-sora text-base sm:text-lg font-bold text-white flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-hh-cyan text-xl sm:text-2xl">
              verified
            </span>
            คุณสมบัติของผู้เข้าแข่งขัน
          </h2>
          <button
            type="button"
            aria-label="ปิดหน้าต่างคุณสมบัติ"
            className="text-hh-text-muted hover:text-white p-1.5 transition-colors rounded-xl hover:bg-white/10 focus:outline-none"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-xl sm:text-2xl">close</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 custom-scrollbar max-h-[75vh]">
          {/* Criteria 1 */}
          <div className="flex gap-3.5 items-start p-3.5 sm:p-4 rounded-2xl bg-hh-bg/60 border border-hh-border/40 hover:border-hh-cyan/40 transition-colors">
            <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan">
              <span className="material-symbols-outlined text-lg sm:text-xl">school</span>
            </div>
            <div>
              <h3 className="font-sora text-xs sm:text-sm font-bold text-white mb-1">
                1. สถานะการศึกษาและอายุ
              </h3>
              <ul className="space-y-0.5 text-hh-text-muted text-xs sm:text-sm font-hanken leading-snug">
                <li>• เป็นนักเรียนหรือนิสิตนักศึกษาที่มีอายุระหว่าง 15 – 30 ปี</li>
                <li>• กำลังศึกษาอยู่ในระดับ มัธยมศึกษาตอนปลาย, อาชีวศึกษา (ปวช., ปวส.) หรือ อุดมศึกษา (ระดับปริญญาตรี ทุกชั้นปี ทุกคณะ หลักสูตรนานาชาติในไทย)</li>
                <li>• หรือมีวุฒิการสอบเทียบเท่ามัธยมศึกษาตอนปลาย ที่หน่วยงานรัฐไทยรับรอง</li>
              </ul>
            </div>
          </div>

          {/* Criteria 2 */}
          <div className="flex gap-3.5 items-start p-3.5 sm:p-4 rounded-2xl bg-hh-bg/60 border border-hh-border/40 hover:border-hh-cyan/40 transition-colors">
            <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan">
              <span className="material-symbols-outlined text-lg sm:text-xl">groups</span>
            </div>
            <div>
              <h3 className="font-sora text-xs sm:text-sm font-bold text-white mb-1">
                2. รูปแบบการสมัครเป็นทีม
              </h3>
              <ul className="space-y-0.5 text-hh-text-muted text-xs sm:text-sm font-hanken leading-snug">
                <li>• สมัครเป็นทีม ทีมละ 3 – 5 คน</li>
                <li>• สมาชิกในทีม ไม่จำเป็นต้องมาจากสถาบันเดียวกัน สามารถรวมทีมข้ามคณะหรือข้ามสถาบันได้</li>
              </ul>
            </div>
          </div>

          {/* Criteria 3 */}
          <div className="flex gap-3.5 items-start p-3.5 sm:p-4 rounded-2xl bg-hh-bg/60 border border-hh-border/40 hover:border-hh-cyan/40 transition-colors">
            <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan">
              <span className="material-symbols-outlined text-lg sm:text-xl">location_on</span>
            </div>
            <div>
              <h3 className="font-sora text-xs sm:text-sm font-bold text-white mb-1">
                3. ภูมิลำเนาและระยะเวลาสมัคร
              </h3>
              <p className="text-hh-text-muted text-xs sm:text-sm font-hanken leading-snug">
                ผู้สมัครทุกคนต้องมีภูมิลำเนาหรือกำลังศึกษาอยู่ในประเทศไทย เปิดรับสมัครตั้งแต่วันที่{" "}
                <span className="text-white font-bold">15 สิงหาคม – 20 กันยายน 2569</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Action - ONLY shown when opened via Register button */}
        {showNextButton && (
          <div className="px-5 py-3 sm:px-6 sm:py-3.5 border-t border-hh-border/40 shrink-0 bg-hh-surface/95 flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (onNext) {
                  onNext();
                } else {
                  onClose();
                }
              }}
              className="w-full sm:w-auto px-7 bg-hh-action text-black font-sora text-xs sm:text-sm py-2.5 rounded-xl hover:bg-orange-400 transition-all font-extrabold text-center flex items-center justify-center gap-2 cursor-pointer uppercase shadow-[0_0_20px_rgba(255,106,0,0.3)]"
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
