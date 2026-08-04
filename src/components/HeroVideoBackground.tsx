"use client";

import React from "react";

interface HeroVideoBackgroundProps {
  videoSrc?: string;
}

export default function HeroVideoBackground({
  videoSrc = "/videos/hero-bg.mp4",
}: HeroVideoBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* HTML5 Loop Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover object-center opacity-45 mix-blend-luminosity scale-105"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Scrim Radial Overlay for Readability */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,26,29,0.7)_0%,rgba(4,26,29,0.98)_90%)]" />

      {/* Grid Floor Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,210,229,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,210,229,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-25 animate-grid-move" />

      {/* Ambient Glowing Blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-hh-cyan/20 rounded-full blur-[130px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-hh-action/20 rounded-full blur-[150px] animate-pulse-glow"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
