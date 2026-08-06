"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface PdpaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

export default function PdpaModal({
  isOpen,
  onClose,
}: PdpaModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset states when modal reopens
  useEffect(() => {
    if (isOpen) {
      setIsChecked(false);
      setHasScrolledToBottom(false);

      // Auto-unlock if content is short enough to fit without scrolling
      const timer = setTimeout(() => {
        if (scrollRef.current) {
          const { scrollHeight, clientHeight } = scrollRef.current;
          if (scrollHeight <= clientHeight + 10) {
            setHasScrolledToBottom(true);
          }
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight <= 20) {
      setHasScrolledToBottom(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdpa-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-hh-bg/85 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Compact & Structured Modal Container */}
      <div className="relative w-full max-w-lg flex flex-col overflow-hidden rounded-2xl border border-hh-border bg-hh-surface/95 shadow-2xl backdrop-blur-2xl">
        {/* Header */}
        <div className="px-4 py-3 sm:py-3.5 flex items-center justify-between border-b border-hh-border/40 shrink-0">
          <h2
            id="pdpa-title"
            className="font-sora text-xs sm:text-sm font-bold text-white flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-hh-cyan text-lg">
              gavel
            </span>
            นโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA)
          </h2>
          <button
            type="button"
            aria-label="ปิดหน้าต่างนโยบาย PDPA"
            className="text-hh-text-muted hover:text-white p-1 transition-colors rounded-lg hover:bg-white/10 focus:outline-none"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Scrollable Content Body - Clean & Readable Segmented Cards */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="p-3.5 sm:p-4 overflow-y-auto space-y-2.5 custom-scrollbar max-h-[58vh] text-xs font-hanken leading-relaxed"
        >
          {/* Intro Box */}
          <div className="p-3 rounded-xl bg-hh-cyan/10 border border-hh-cyan/30 text-white text-[11px] sm:text-xs font-hanken leading-relaxed">
            เพื่อประโยชน์ในการดำเนินงานของ <strong className="text-hh-cyan font-bold">โครงการการแข่งขันการพัฒนานวัตกรรมสุขภาพสู่นวัตกรรมเชิงพาณิชย์และพัฒนาศักยภาพนวัตกรด้านสุขภาพรุ่นใหม่ ประจำปี 2026 (PSAT HealthHacks 2026)</strong> ซึ่งดำเนินการโดย สหพันธ์นิสิตนักศึกษาเภสัชศาสตร์แห่งประเทศไทย (สนภท.) ผู้สมัครโปรดอ่านรายละเอียดการเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคล ดังต่อไปนี้
          </div>

          {/* Section 1: Collection & Objectives */}
          <div className="p-3 rounded-xl bg-hh-bg/70 border border-hh-border/50 space-y-1.5">
            <div className="flex items-center gap-2 text-hh-cyan font-sora text-xs font-bold">
              <span className="material-symbols-outlined text-sm">folder_shared</span>
              <span>1. การเก็บรวบรวมและวัตถุประสงค์</span>
            </div>
            <p className="text-[11px] sm:text-xs text-hh-text-muted leading-relaxed">
              โครงการมีความจำเป็นต้องเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของผู้สมัครและสมาชิกในทีม เช่น <strong className="text-white/90 font-bold">ชื่อ–นามสกุล สถาบันการศึกษา คณะ สาขาวิชา หมายเลขโทรศัพท์ อีเมล ภาพถ่าย วิดีโอ ผลงานที่ส่งเข้าประกวด</strong> และข้อมูลอื่นที่ผู้สมัครให้ไว้ผ่านระบบรับสมัคร เพื่อวัตถุประสงค์ในการรับสมัคร การตรวจสอบคุณสมบัติ การคัดเลือก การติดต่อประสานงาน การดำเนินการแข่งขัน การประกาศผล การมอบรางวัล การออกประกาศนียบัตร การประชาสัมพันธ์โครงการ การจัดทำรายงานผลการดำเนินงาน ตลอดจนการปฏิบัติตามกฎหมายและข้อกำหนดที่เกี่ยวข้อง
            </p>
          </div>

          {/* Section 2: Disclosure */}
          <div className="p-3 rounded-xl bg-hh-bg/70 border border-hh-border/50 space-y-1.5">
            <div className="flex items-center gap-2 text-hh-cyan font-sora text-xs font-bold">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span>2. การเปิดเผยข้อมูลส่วนบุคคล</span>
            </div>
            <p className="text-[11px] sm:text-xs text-hh-text-muted leading-relaxed">
              ข้อมูลส่วนบุคคลของผู้สมัครอาจถูกเปิดเผยเฉพาะเท่าที่จำเป็นแก่คณะกรรมการ ผู้ทรงคุณวุฒิ วิทยากร ผู้สนับสนุนโครงการ และหน่วยงานที่เกี่ยวข้องกับการดำเนินงานของโครงการ หรือหน่วยงานของรัฐที่มีอำนาจตามกฎหมาย โดยการเปิดเผยดังกล่าวจะอยู่ภายใต้ขอบเขตของวัตถุประสงค์ที่กำหนด และมีมาตรการรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคลตาม <strong className="text-white/90 font-bold">พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562</strong> และกฎหมายที่เกี่ยวข้อง
            </p>
          </div>

          {/* Section 3: Data Retention */}
          <div className="p-3 rounded-xl bg-hh-bg/70 border border-hh-border/50 space-y-1.5">
            <div className="flex items-center gap-2 text-hh-cyan font-sora text-xs font-bold">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>3. ระยะเวลาการจัดเก็บรักษาข้อมูล</span>
            </div>
            <p className="text-[11px] sm:text-xs text-hh-text-muted leading-relaxed">
              โครงการจะเก็บรักษาข้อมูลส่วนบุคคลไว้เท่าที่จำเป็นตามวัตถุประสงค์ของการดำเนินงาน หรือเป็นไปตามระยะเวลาที่กฎหมายกำหนด เมื่อพ้นระยะเวลาดังกล่าว ข้อมูลจะถูกลบ ทำลาย หรือทำให้ไม่สามารถระบุตัวตนของเจ้าของข้อมูลได้ตามมาตรฐานที่เหมาะสม
            </p>
          </div>

          {/* Section 4: Data Rights */}
          <div className="p-3 rounded-xl bg-hh-bg/70 border border-hh-border/50 space-y-1.5">
            <div className="flex items-center gap-2 text-hh-cyan font-sora text-xs font-bold">
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              <span>4. สิทธิของเจ้าของข้อมูลส่วนบุคคล</span>
            </div>
            <p className="text-[11px] sm:text-xs text-hh-text-muted leading-relaxed">
              ผู้สมัครมีสิทธิในฐานะเจ้าของข้อมูลส่วนบุคคลตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ได้แก่ <strong className="text-white/90 font-bold">สิทธิในการเข้าถึง ขอรับสำเนา ขอแก้ไข ขอให้ลบหรือทำลาย ขอจำกัดการประมวลผล คัดค้านการประมวลผล ถอนความยินยอม</strong> และใช้สิทธิอื่นตามที่กฎหมายกำหนด ทั้งนี้ การถอนความยินยอมอาจส่งผลให้โครงการไม่สามารถดำเนินการเกี่ยวกับการสมัครหรือการเข้าร่วมการแข่งขันของผู้สมัครได้ในบางกรณี
            </p>
          </div>

          {/* Section 5: Consent Notice */}
          <div className="p-3 rounded-xl bg-hh-bg/70 border border-hh-border/50 space-y-1.5">
            <div className="flex items-center gap-2 text-hh-cyan font-sora text-xs font-bold">
              <span className="material-symbols-outlined text-sm">fact_check</span>
              <span>5. การยินยอมและการยื่นใบสมัคร</span>
            </div>
            <p className="text-[11px] sm:text-xs text-hh-text-muted leading-relaxed">
              เมื่อผู้สมัครเลือกเครื่องหมาย ✓ “ข้าพเจ้าได้อ่านและยอมรับเงื่อนไข” และกดปุ่ม “ส่งใบสมัคร” ถือว่าผู้สมัครได้อ่าน ทำความเข้าใจ และให้ความยินยอมแก่โครงการในการเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลตามวัตถุประสงค์และเงื่อนไขที่ระบุไว้ข้างต้น รวมทั้งรับทราบว่าการดำเนินการดังกล่าวเป็นไปตาม <strong className="text-white/90 font-bold">พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562</strong> และกฎหมายที่เกี่ยวข้อง
            </p>
          </div>

        </div>

        {/* Checkbox & Footer Action */}
        <div className="p-3.5 sm:p-4 border-t border-hh-border/40 shrink-0 bg-hh-surface/95 space-y-3">

          <label className={`flex items-start gap-2.5 transition-opacity ${hasScrolledToBottom ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-50"}`}>
            <input
              type="checkbox"
              disabled={!hasScrolledToBottom}
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-hh-border text-hh-cyan focus:ring-hh-cyan/40 bg-hh-bg shrink-0 accent-hh-cyan disabled:cursor-not-allowed cursor-pointer"
            />
            <span className="text-[11px] sm:text-xs font-hanken text-white/90 leading-tight">
              ข้าพเจ้าได้อ่านและเข้าใจนโยบายการเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคล (PDPA) และยินยอมให้โครงการ PSATHealthHacks 2026 ดำเนินการตามรายละเอียดที่กำหนดข้างต้น
            </span>
          </label>

          <div className="flex justify-end">
            {isChecked && hasScrolledToBottom ? (
              <Link
                href="/register"
                onClick={onClose}
                className="w-full sm:w-auto px-8 bg-hh-action text-black font-sora text-xs py-2.5 rounded-xl hover:bg-orange-400 transition-all font-extrabold text-center flex items-center justify-center gap-1.5 cursor-pointer uppercase shadow-[0_0_15px_rgba(255,106,0,0.4)]"
              >
                <span>ส่งใบสมัคร</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="w-full sm:w-auto px-8 bg-hh-border/40 text-hh-text-muted/50 font-sora text-xs py-2.5 rounded-xl font-extrabold text-center flex items-center justify-center gap-1.5 cursor-not-allowed uppercase border border-hh-border/20"
              >
                <span>ส่งใบสมัคร</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
