"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SpeakersSection from "@/components/SpeakersSection";
import PastAtmosphereSection from "@/components/PastAtmosphereSection";
import Footer from "@/components/Footer";
import EligibilityModal from "@/components/EligibilityModal";

export default function Home() {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);

  return (
    <main className="min-h-screen bg-hh-bg text-hh-text overflow-x-hidden">
      <Navbar onOpenEligibility={() => setIsEligibilityOpen(true)} />
      <HeroSection onOpenEligibility={() => setIsEligibilityOpen(true)} />
      <AboutSection />
      <SpeakersSection />
      <PastAtmosphereSection />
      <Footer />
      <EligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
      />
    </main>
  );
}
