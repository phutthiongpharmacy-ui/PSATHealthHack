"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SponsorsSection from "@/components/SponsorsSection";
import SpeakersSection from "@/components/SpeakersSection";
import PastAtmosphereSection from "@/components/PastAtmosphereSection";
import Footer from "@/components/Footer";
import EligibilityModal from "@/components/EligibilityModal";
import PdpaModal from "@/components/PdpaModal";

export default function Home() {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [isPdpaOpen, setIsPdpaOpen] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const handleOpenEligibility = (showNext: boolean = false) => {
    setShowNextButton(showNext);
    setIsEligibilityOpen(true);
  };

  return (
    <main className="min-h-screen bg-hh-bg text-hh-text overflow-x-hidden">
      <Navbar onOpenEligibility={handleOpenEligibility} />
      <HeroSection onOpenEligibility={handleOpenEligibility} />
      <AboutSection />
      {/* <SponsorsSection /> */}
      <SpeakersSection />
      <PastAtmosphereSection />
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
