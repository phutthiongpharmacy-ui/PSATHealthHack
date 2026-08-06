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
      <div className="relative w-full max-w-md flex flex-col overflow-hidden rounded-2xl border border-hh-border bg-hh-surface/95 shadow-2xl backdrop-blur-2xl">
        {/* Header */}
        <div className="px-4 py-3 sm:py-3.5 flex items-center justify-between border-b border-hh-border/40 shrink-0">
          <h2
            id="eligibility-title"
            className="font-sora text-xs sm:text-sm font-bold text-white flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-hh-cyan text-lg">
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
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-3 sm:p-3.5 overflow-y-auto space-y-2.5 custom-scrollbar max-h-[60vh]">
          {/* Criteria 1 */}
          <div className="flex gap-2.5 items-start p-2.5 sm:p-3 rounded-xl bg-hh-bg/60 border border-hh-border/40">
            <div className="shrink-0 w-7 h-7 rounded-full bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan">
              <span className="material-symbols-outlined text-sm">school</span>
            </div>
            <div>
              <h3 className="font-sora text-xs font-bold text-white mb-0.5">
                1. สถานะการศึกษาและอายุ
              </h3>
              <ul className="space-y-0.5 text-hh-text-muted text-[11px] sm:text-xs font-hanken leading-tight">
                <li>• นักเรียนหรือนิสิตนักศึกษา อายุระหว่าง 15 – 30 ปี</li>
                <li>• ระดับมัธยมปลาย, ปวช., ปวส. หรือปริญญาตรี (ทุกชั้นปี/คณะ)</li>
                <li>• วุฒิการศึกษาหรือเทียบเท่าที่หน่วยงานรัฐไทยรับรอง</li>
              </ul>
            </div>
          </div>

          {/* Criteria 2 */}
          <div className="flex gap-2.5 items-start p-2.5 sm:p-3 rounded-xl bg-hh-bg/60 border border-hh-border/40">
            <div className="shrink-0 w-7 h-7 rounded-full bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan">
              <span className="material-symbols-outlined text-sm">groups</span>
            </div>
            <div>
              <h3 className="font-sora text-xs font-bold text-white mb-0.5">
                2. รูปแบบการสมัครเป็นทีม
              </h3>
              <ul className="space-y-0.5 text-hh-text-muted text-[11px] sm:text-xs font-hanken leading-tight">
                <li>• สมัครเป็นทีม ทีมละ 3 – 5 คน</li>
                <li>• สามารถรวมทีมข้ามคณะ ข้ามสถาบัน หรือข้ามระดับชั้นได้</li>
                <li>• สมัครฟรี ไม่มีค่าใช้จ่ายในการเข้าร่วมใดๆ ทั้งสิ้น</li>
              </ul>
            </div>
          </div>

          {/* Criteria 3 */}
          <div className="flex gap-2.5 items-start p-2.5 sm:p-3 rounded-xl bg-hh-bg/60 border border-hh-border/40">
            <div className="shrink-0 w-7 h-7 rounded-full bg-hh-cyan/15 border border-hh-cyan/30 flex items-center justify-center text-hh-cyan">
              <span className="material-symbols-outlined text-sm">location_on</span>
            </div>
            <div>
              <h3 className="font-sora text-xs font-bold text-white mb-0.5">
                3. ภูมิลำเนาและระยะเวลาสมัคร
              </h3>
              <p className="text-hh-text-muted text-[11px] sm:text-xs font-hanken leading-relaxed">
                มีภูมิลำเนาหรือกำลังศึกษาอยู่ในประเทศไทย เปิดรับสมัครตั้งแต่วันที่{" "}
                <span className="text-white font-bold">15 สิงหาคม – 20 กันยายน 2569</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Action - ONLY shown when opened via Register button */}
        {showNextButton && (
          <div className="p-3 sm:px-4 sm:py-3 border-t border-hh-border/40 shrink-0 bg-hh-surface/95 flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (onNext) {
                  onNext();
                } else {
                  onClose();
                }
              }}
              className="w-full sm:w-auto px-6 bg-hh-action text-black font-sora text-xs py-2.5 rounded-xl hover:bg-orange-400 transition-colors font-extrabold text-center flex items-center justify-center gap-1.5 cursor-pointer uppercase"
            >
              <span>ถัดไป</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
