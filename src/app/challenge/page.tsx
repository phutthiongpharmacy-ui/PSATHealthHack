"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ChallengeRevealSection from "@/components/ChallengeRevealSection";
import Footer from "@/components/Footer";
import EligibilityModal from "@/components/EligibilityModal";

export default function ChallengePage() {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);

  return (
    <main className="min-h-screen bg-hh-bg text-hh-text overflow-x-hidden pt-24">
      <Navbar onOpenEligibility={() => setIsEligibilityOpen(true)} />

      {/* Page Header */}
      <div className="relative py-12 px-margin-mobile md:px-margin-desktop text-left border-b border-hh-border/40">
        <div className="max-w-container-max mx-auto space-y-4">
          <span className="font-mono text-xs text-hh-cyan uppercase tracking-widest inline-block font-semibold">
            PSAT HEALTHHACK 2026 • CHALLENGES
          </span>
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            โจทย์การแข่งขัน
          </h1>
          <p className="font-hanken text-hh-text-muted text-base md:text-lg max-w-2xl leading-relaxed">
            โจทย์การแข่งขันลับ 72 ชั่วโมง จะได้รับการเปิดเผยพร้อมกันทั่วประเทศในระบบ
          </p>
        </div>
      </div>

      {/* Challenge Reveal Section */}
      <div className="py-8">
        <ChallengeRevealSection />
      </div>

      <Footer />

      <EligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
      />
    </main>
  );
}
