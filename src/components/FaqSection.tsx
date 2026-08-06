"use client";

import React, { useState } from "react";
import Link from "next/link";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqSectionProps {
  onOpenEligibility?: () => void;
}

const faqData: FaqItem[] = [
  {
    id: "faq-1",
    question: "ใครบ้างที่มีสิทธิ์สมัครเข้าร่วมการแข่งขัน PSAT HealthHack 2026?",
    answer:
      "นักเรียนระดับมัธยมศึกษาตอนปลาย ม.4–ม.6 และนิสิตนักศึกษาระดับอุดมศึกษาที่มีอายุระหว่าง 15–30 ปี สามารถสมัครได้ โดยเลือกประเภททีมให้ตรงกับระดับการศึกษา",
  },
  {
    id: "faq-2",
    question: "สมาชิกในทีมต้องอยู่คณะหรือสถาบันเดียวกันหรือไม่?",
    answer:
      "ไม่จำเป็น สมาชิกในทีม 3–5 คนสามารถรวมทีมข้ามคณะหรือข้ามสถาบันได้ แต่สมาชิกทั้งหมดต้องอยู่ในระดับการศึกษาเดียวกับประเภททีมที่เลือก ทีมอุดมศึกษาประเภทเภสัชศาสตร์ต้องมีสมาชิกอย่างน้อย 1 คนเป็นนิสิตหรือนักศึกษาเภสัชศาสตร์",
  },
  {
    id: "faq-3",
    question: "มีค่าใช้จ่ายในการสมัครหรือเข้าร่วมโครงการหรือไม่?",
    answer:
      "คิดค่าลงทะเบียนเป็นรายทีม Early Bird 700 บาทสำหรับทีมที่มีนักศึกษาเภสัชศาสตร์ และ 750 บาทสำหรับทีมทั่วไปหรือทีมมัธยมศึกษา ส่วน Regular ราคา 800 และ 850 บาทตามลำดับ ชำระผ่าน QR PromptPay บน PaySolutions โดยไม่มีค่าธรรมเนียมเพิ่มเติม",
  },
  {
    id: "faq-4",
    question: "การแข่งขันแบ่งออกเป็นกี่รอบ และจัดรูปแบบอย่างไร?",
    answer:
      "แบ่งออกเป็น 2 รอบหลัก คือ 1) รอบคัดเลือก (Online) ผู้เข้าแข่งขันยื่นเสนอเค้าโครงนวัตกรรมภายใน 72 ชั่วโมงหลังปล่อยโจทย์ และ 2) รอบตัดสิน (On-site Pitching & Mentorship) ทีมที่ผ่านเข้ารอบจะได้รับการอบรมเข้มข้นและนำเสนอผลงานต่อหน้ากรรมการ",
  },
  {
    id: "faq-5",
    question: "หากไม่มีพื้นฐานการเขียนโปรแกรม สามารถสมัครได้หรือไม่?",
    answer:
      "สมัครได้ครับ! โครงการเน้นการสร้างสรรค์นวัตกรรมและการแก้ปัญหา (Problem Solving & Product Concept) ทีมสามารถผสมผสานผู้มีทักษะด้านสุขภาพ ด้านธุรกิจ การออกแบบ UI/UX และเทคโนโลยีเข้าด้วยกันได้",
  },
];

export default function FaqSection({ onOpenEligibility }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="px-margin-mobile md:px-margin-desktop py-24 relative">
      <div className="max-w-container-max mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="font-mono text-xs text-hh-cyan uppercase tracking-widest bg-hh-cyan/10 px-4 py-1.5 rounded-full border border-hh-cyan/30">
            Frequently Asked Questions
          </span>
          <h2 className="font-sora text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
            คำถามที่พบบ่อย (FAQ)
          </h2>
          <p className="font-hanken text-hh-text-muted text-base max-w-xl mx-auto">
            รวบรวมคำถามสำคัญเกี่ยวกับการสมัคร คุณสมบัติ และกติกาการแข่งขัน
          </p>
        </div>

        {/* Accessible Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-hh-surface border-hh-cyan/50 shadow-[0_0_20px_rgba(99,210,229,0.1)]"
                    : "bg-hh-surface/50 border-hh-border/40 hover:border-hh-border"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`button-${item.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${item.id}`}
                    onClick={() => toggleFaq(item.id)}
                    className="w-full p-6 text-left font-sora text-base md:text-lg font-bold text-white flex justify-between items-center gap-4 focus:outline-none focus:ring-2 focus:ring-hh-cyan focus:ring-offset-2 focus:ring-offset-hh-bg"
                  >
                    <span>{item.question}</span>
                    <span
                      className={`material-symbols-outlined text-hh-cyan text-2xl shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={`panel-${item.id}`}
                    role="region"
                    aria-labelledby={`button-${item.id}`}
                    className="px-6 pb-6 pt-0 font-hanken text-sm md:text-base text-hh-text-muted leading-relaxed border-t border-white/5 mt-2 pt-4"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Final Conversion CTA Box */}
        <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-hh-surface-raised/80 border border-hh-cyan/30 text-center space-y-6 shadow-2xl">
          <h3 className="font-sora text-xl md:text-2xl font-bold text-white">
            พร้อมที่จะสร้างสรรค์นวัตกรรมสุขภาพแล้วหรือยัง?
          </h3>
          <p className="font-hanken text-hh-text-muted text-sm max-w-lg mx-auto">
            เปิดรับสมัครตั้งแต่วันที่ 15 สิงหาคม – 20 กันยายน 2569 สมัครเป็นทีม 3–5 คน ค่าลงทะเบียน 700–850 บาทต่อทีมตามประเภทและรอบสมัคร
          </p>
          <div className="pt-2">
            {onOpenEligibility ? (
              <button
                type="button"
                onClick={onOpenEligibility}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-hh-action text-black font-sora text-base font-bold uppercase tracking-wider hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(255,106,0,0.5)] active:scale-95"
              >
                สมัครแข่งขันตอนนี้
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            ) : (
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-hh-action text-black font-sora text-base font-bold uppercase tracking-wider hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(255,106,0,0.5)] active:scale-95"
              >
                สมัครแข่งขันตอนนี้
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
