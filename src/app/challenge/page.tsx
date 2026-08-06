"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ChallengeRevealSection from "@/components/ChallengeRevealSection";
import Footer from "@/components/Footer";
import EligibilityModal from "@/components/EligibilityModal";
import PdpaModal from "@/components/PdpaModal";

export default function ChallengePage() {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [isPdpaOpen, setIsPdpaOpen] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const handleOpenEligibility = (showNext: boolean = false) => {
    setShowNextButton(showNext);
    setIsEligibilityOpen(true);
  };

  return (
    <main className="min-h-screen bg-hh-bg text-hh-text overflow-x-hidden pt-24">
      <Navbar onOpenEligibility={handleOpenEligibility} />

      {/* Header */}
      <div className="relative py-16 px-margin-mobile md:px-margin-desktop text-left border-b border-hh-border/30">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="font-mono text-xs text-hh-cyan uppercase tracking-widest inline-block font-semibold">
            PSAT HEALTHHACK 2026 • CHALLENGES
          </span>
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            โจทย์การแข่งขัน <span className="text-hh-cyan [text-shadow:0_0_20px_rgba(99,210,229,0.5)]">PSAT HealthHack 2026</span>
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
        onNext={() => {
          setIsEligibilityOpen(false);
          setIsPdpaOpen(true);
        }}
        showNextButton={showNextButton}
      />
      <PdpaModal
        isOpen={isPdpaOpen}
        onClose={() => setIsPdpaOpen(false)}
      />
    </main>
  );
}
