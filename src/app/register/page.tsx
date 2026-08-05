"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function RegisterPage() {
  // Wizard state: 1: Email, 2: OTP, 3: Form Details, 4: Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 3 Sub-step state: "team" (Team info) or "members" (Member info)
  const [step3SubTab, setStep3SubTab] = useState<"team" | "members">("team");

  // Step 1: Email
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Step 2: OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(90);

  // Step 3: Team & Member Details
  const [teamName, setTeamName] = useState("");
  const [teamType, setTeamType] = useState<"pharmacy" | "non-pharmacy">("pharmacy");

  interface Member {
    title: string;
    fullName: string;
    nickname: string;
    age: string;
    institution: string;
    allergies: string;
    email: string;
    lineId: string;
    phone: string;
    emergencyName: string;
    emergencyPhone: string;
  }

  const [members, setMembers] = useState<Member[]>([
    {
      title: "",
      fullName: "",
      nickname: "",
      age: "",
      institution: "",
      allergies: "",
      email: "",
      lineId: "",
      phone: "",
      emergencyName: "",
      emergencyPhone: "",
    },
  ]);

  const [activeMemberTab, setActiveMemberTab] = useState(0);

  // Timer for OTP step
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2 && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timerSeconds]);

  // Step 1 handler
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setEmailError("กรุณากรอกอีเมลที่ถูกต้อง");
      return;
    }
    setEmailError("");
    setTimerSeconds(90);
    setStep(2);
  };

  // OTP input handlers
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length < 6) {
      setOtpError("กรุณากรอกรหัส OTP ให้ครบ 6 หลัก");
      return;
    }
    setOtpError("");
    // Autofill leader email in details form if empty
    setMembers((prev) => {
      const copy = [...prev];
      if (!copy[0].email) copy[0].email = email;
      return copy;
    });
    setStep(3);
  };

  // Member management
  const updateMember = (index: number, field: keyof Member, value: string) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addMember = () => {
    if (members.length >= 5) {
      alert("สามารถเพิ่มสมาชิกได้สูงสุด 5 คนต่อทีม");
      return;
    }
    setMembers((prev) => [
      ...prev,
      {
        title: "",
        fullName: "",
        nickname: "",
        age: "",
        institution: "",
        allergies: "",
        email: "",
        lineId: "",
        phone: "",
        emergencyName: "",
        emergencyPhone: "",
      },
    ]);
    setActiveMemberTab(members.length);
  };

  const removeMember = (index: number) => {
    if (members.length <= 1) {
      alert("ต้องมีสมาชิกอย่างน้อย 1 คน");
      return;
    }
    setMembers((prev) => prev.filter((_, i) => i !== index));
    setActiveMemberTab(Math.max(0, index - 1));
  };

  const handleProceedToMembers = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) {
      alert("กรุณากรอกชื่อทีมของคุณก่อนดำเนินการต่อ");
      return;
    }
    setStep3SubTab("members");
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) {
      alert("กรุณากรอกชื่อทีม");
      setStep3SubTab("team");
      return;
    }
    const emptyMemberIndex = members.findIndex(
      (m) => !m.fullName.trim() || !m.title || !m.institution.trim() || !m.phone.trim()
    );
    if (emptyMemberIndex !== -1) {
      setActiveMemberTab(emptyMemberIndex);
      alert(`กรุณากรอกข้อมูลจำเป็นของ ${emptyMemberIndex === 0 ? "หัวหน้าทีม" : `สมาชิกคนที่ ${emptyMemberIndex + 1}`} ให้ครบถ้วน`);
      return;
    }
    setStep(4);
  };

  const isMemberComplete = (m: Member) => {
    return Boolean(m.fullName.trim() && m.title && m.institution.trim() && m.phone.trim() && m.email.trim());
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <main className="min-h-screen bg-hh-bg text-hh-text flex flex-col items-center justify-start relative overflow-hidden py-8 px-margin-mobile md:px-margin-desktop">
      {/* Background Cyber Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Top Header Navigation */}
      <div className="w-full max-w-3xl flex items-center justify-between z-20 pb-4 pt-2 border-b border-hh-border/30">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-hh-text-muted hover:text-white transition-colors font-mono text-xs uppercase group"
        >
          <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          กลับหน้าหลัก
        </Link>
        <span className="font-sora text-xs sm:text-sm font-bold text-hh-cyan">
          PSAT HealthHack 2026 Registration
        </span>
      </div>

      {/* Visual Stepper Header */}
      <div className="z-10 w-full max-w-3xl my-6">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
              step === 1
                ? "bg-hh-action text-black shadow-[0_0_15px_rgba(255,106,0,0.6)]"
                : step > 1
                ? "bg-hh-emerald text-black"
                : "bg-hh-surface border border-hh-border text-hh-text-muted"
            }`}>
              {step > 1 ? <span className="material-symbols-outlined text-lg">check</span> : "1"}
            </div>
            <span className={`text-[11px] sm:text-xs font-semibold mt-1.5 ${step === 1 ? "text-hh-action font-bold" : "text-hh-text-muted"}`}>
              ยืนยันอีเมล
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
              step === 2
                ? "bg-hh-action text-black shadow-[0_0_15px_rgba(255,106,0,0.6)]"
                : step > 2
                ? "bg-hh-emerald text-black"
                : "bg-hh-surface border border-hh-border text-hh-text-muted"
            }`}>
              {step > 2 ? <span className="material-symbols-outlined text-lg">check</span> : "2"}
            </div>
            <span className={`text-[11px] sm:text-xs font-semibold mt-1.5 ${step === 2 ? "text-hh-action font-bold" : "text-hh-text-muted"}`}>
              กรอก OTP
            </span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
              step === 3
                ? "bg-hh-action text-black shadow-[0_0_15px_rgba(255,106,0,0.6)]"
                : step > 3
                ? "bg-hh-emerald text-black"
                : "bg-hh-surface border border-hh-border text-hh-text-muted"
            }`}>
              {step > 3 ? <span className="material-symbols-outlined text-lg">check</span> : "3"}
            </div>
            <span className={`text-[11px] sm:text-xs font-semibold mt-1.5 ${step === 3 ? "text-hh-action font-bold" : "text-hh-text-muted"}`}>
              ข้อมูลทีม & สมาชิก
            </span>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
              step === 4
                ? "bg-hh-emerald text-black shadow-[0_0_15px_rgba(42,194,152,0.6)]"
                : "bg-hh-surface border border-hh-border text-hh-text-muted"
            }`}>
              4
            </div>
            <span className={`text-[11px] sm:text-xs font-semibold mt-1.5 ${step === 4 ? "text-hh-emerald font-bold" : "text-hh-text-muted"}`}>
              เสร็จสิ้น
            </span>
          </div>
        </div>
      </div>

      {/* STEP 1: EMAIL ENTRY */}
      {step === 1 && (
        <div className="z-10 w-full max-w-lg my-auto">
          <div className="bg-hh-surface/90 backdrop-blur-2xl border border-hh-border/60 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-hh-cyan/15 border border-hh-cyan/30 text-hh-cyan mx-auto">
                <span className="material-symbols-outlined text-2xl">mail</span>
              </div>
              <h1 className="font-sora text-2xl font-bold text-white">
                ยืนยันตัวตนด้วยอีเมล
              </h1>
              <p className="font-hanken text-sm text-hh-text-muted">
                กรอกอีเมลของคุณเพื่อรับรหัส OTP ในการเริ่มต้นลงทะเบียนสมัครแข่งขัน
              </p>
            </div>

            <form onSubmit={handleRequestOtp} className="space-y-5">
              <div className="space-y-2">
                <label className="font-mono text-xs text-hh-cyan uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-sm">alternate_email</span>
                  อีเมล (EMAIL) *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  autoFocus
                  className="w-full h-13 bg-hh-bg border border-hh-border/80 px-4 font-hanken text-white rounded-xl focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan focus:outline-none transition-all"
                />
                {emailError && (
                  <p className="text-xs text-red-400 font-mono mt-1">{emailError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-hh-action text-black font-sora text-base font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(255,106,0,0.4)] cursor-pointer"
              >
                ขอรับรหัส OTP
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* STEP 2: OTP VERIFICATION */}
      {step === 2 && (
        <div className="z-10 w-full max-w-lg my-auto">
          <div className="bg-hh-surface/90 backdrop-blur-2xl border border-hh-border/60 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-hh-cyan/15 border border-hh-cyan/30 text-hh-cyan mx-auto">
                <span className="material-symbols-outlined text-2xl">pin</span>
              </div>
              <h1 className="font-sora text-2xl font-bold text-white">
                กรอกรหัส OTP 6 หลัก
              </h1>
              <p className="font-hanken text-sm text-hh-text-muted">
                รหัสถูกส่งไปยังอีเมล <span className="text-white font-mono font-bold">{email}</span>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-11 h-13 sm:w-13 sm:h-15 bg-hh-bg border border-hh-cyan/40 text-center font-sora text-2xl text-white font-bold rounded-xl focus:border-hh-cyan focus:ring-2 focus:ring-hh-cyan/50 focus:outline-none transition-all shadow-inner"
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-center text-xs text-red-400 font-mono">{otpError}</p>
              )}

              <div className="text-center space-y-1">
                <p className="font-mono text-xs text-hh-text-muted flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-base">timer</span>
                  ขอรหัสใหม่ได้ในอีก <span className="text-white font-bold">{formatTimer(timerSeconds)}</span>
                </p>
                {timerSeconds === 0 && (
                  <button
                    type="button"
                    onClick={() => setTimerSeconds(90)}
                    className="text-xs text-hh-cyan hover:underline font-mono cursor-pointer"
                  >
                    ส่งรหัส OTP อีกครั้ง
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 border border-hh-border text-white font-sora text-sm rounded-xl hover:bg-white/10 transition-colors"
                >
                  แก้ไขอีเมล
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3.5 bg-hh-action text-black font-sora text-base font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(255,106,0,0.4)] cursor-pointer"
                >
                  ยืนยัน OTP
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STEP 3: REDESIGNED CLEAN & EASY USER EXPERIENCE */}
      {step === 3 && (
        <div className="z-10 w-full max-w-3xl my-4 space-y-6">
          {/* STEP 3 SUB-TAB NAVIGATION */}
          <div className="flex bg-hh-surface border border-hh-border/60 p-1.5 rounded-2xl shadow-lg">
            <button
              type="button"
              onClick={() => setStep3SubTab("team")}
              className={`flex-1 py-3 px-4 rounded-xl font-sora text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                step3SubTab === "team"
                  ? "bg-hh-cyan text-black shadow-[0_0_15px_rgba(99,210,229,0.4)]"
                  : "text-hh-text-muted hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-base">groups</span>
              1. ตั้งชื่อทีม & เลือกประเภท
              {teamName.trim() && <span className="text-black font-extrabold text-xs">✓</span>}
            </button>
            <button
              type="button"
              onClick={() => {
                if (!teamName.trim()) {
                  alert("กรุณาตั้งชื่อทีมก่อน");
                  return;
                }
                setStep3SubTab("members");
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-sora text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                step3SubTab === "members"
                  ? "bg-hh-cyan text-black shadow-[0_0_15px_rgba(99,210,229,0.4)]"
                  : "text-hh-text-muted hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-base">badge</span>
              2. กรอกข้อมูลสมาชิก ({members.length} คน)
            </button>
          </div>

          {/* SUB-TAB A: TEAM INFO */}
          {step3SubTab === "team" && (
            <form onSubmit={handleProceedToMembers} className="bg-hh-surface/90 backdrop-blur-2xl border border-hh-border/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="border-b border-hh-border/40 pb-4 space-y-1">
                <span className="font-mono text-xs text-hh-cyan uppercase tracking-wider font-bold">SECTION 1/2</span>
                <h2 className="font-sora text-2xl font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-hh-cyan text-2xl">groups</span>
                  ข้อมูลทั่วไปของทีม
                </h2>
                <p className="font-hanken text-xs text-hh-text-muted">
                  ตั้งชื่อทีมและเลือกประเภทการแข่งขันเพื่อเริ่มต้น
                </p>
              </div>

              {/* Team Name */}
              <div className="space-y-2">
                <label className="font-mono text-xs text-hh-cyan uppercase font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">edit_note</span>
                  ชื่อทีม (TEAM NAME) *
                </label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="ตัวอย่างเช่น: PharmaInnovators 2026"
                  autoFocus
                  className="w-full bg-hh-bg border border-hh-border/80 rounded-xl p-4 font-hanken text-white text-base focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan focus:outline-none transition-all"
                />
              </div>

              {/* Team Type Cards */}
              <div className="space-y-3 pt-2">
                <label className="font-mono text-xs text-hh-cyan uppercase font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">category</span>
                  ประเภททีมผู้เข้าร่วม *
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setTeamType("pharmacy")}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-2 relative overflow-hidden ${
                      teamType === "pharmacy"
                        ? "bg-hh-cyan/15 border-hh-cyan shadow-[0_0_20px_rgba(99,210,229,0.25)]"
                        : "bg-hh-bg/60 border-hh-border/60 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-2xl text-hh-cyan">medication</span>
                      {teamType === "pharmacy" && (
                        <span className="w-6 h-6 rounded-full bg-hh-cyan text-black flex items-center justify-center font-bold text-xs">✓</span>
                      )}
                    </div>
                    <h3 className="font-sora text-sm font-bold text-white">ทีมที่มีนิสิต/นักศึกษาเภสัชศาสตร์</h3>
                    <p className="font-hanken text-xs text-hh-text-muted leading-relaxed">
                      มีสมาชิกอย่างน้อย 1 คน กำลังศึกษาอยู่ในคณะเภสัชศาสตร์
                    </p>
                  </div>

                  <div
                    onClick={() => setTeamType("non-pharmacy")}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-2 relative overflow-hidden ${
                      teamType === "non-pharmacy"
                        ? "bg-hh-cyan/15 border-hh-cyan shadow-[0_0_20px_rgba(99,210,229,0.25)]"
                        : "bg-hh-bg/60 border-hh-border/60 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-2xl text-hh-cyan">workspace_premium</span>
                      {teamType === "non-pharmacy" && (
                        <span className="w-6 h-6 rounded-full bg-hh-cyan text-black flex items-center justify-center font-bold text-xs">✓</span>
                      )}
                    </div>
                    <h3 className="font-sora text-sm font-bold text-white">ทีมทั่วไป</h3>
                    <p className="font-hanken text-xs text-hh-text-muted leading-relaxed">
                      ทีมนิสิต/นักศึกษา หรือบุคคลทั่วไปจากสาขาวิชาอื่น
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-hh-border/40 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-hh-action text-black font-sora text-sm font-extrabold uppercase rounded-xl hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(255,106,0,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  ถัดไป: กรอกข้อมูลสมาชิก →
                </button>
              </div>
            </form>
          )}

          {/* SUB-TAB B: MEMBER DETAILS */}
          {step3SubTab === "members" && (
            <form onSubmit={handleSubmitRegistration} className="bg-hh-surface/90 backdrop-blur-2xl border border-hh-border/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="border-b border-hh-border/40 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-xs text-hh-cyan uppercase tracking-wider font-bold">SECTION 2/2</span>
                  <h2 className="font-sora text-2xl font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-hh-cyan text-2xl">badge</span>
                    ข้อมูลสมาชิกในทีม ({members.length}/5 คน)
                  </h2>
                </div>

                {members.length < 5 && (
                  <button
                    type="button"
                    onClick={addMember}
                    className="px-4 py-2 bg-hh-cyan/15 text-hh-cyan border border-hh-cyan/40 rounded-xl font-sora text-xs font-bold hover:bg-hh-cyan/25 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <span className="material-symbols-outlined text-base">person_add</span>
                    + เพิ่มสมาชิกคนที่ {members.length + 1}
                  </button>
                )}
              </div>

              {/* Member Selection Pills */}
              <div className="flex flex-wrap gap-2">
                {members.map((m, idx) => {
                  const complete = isMemberComplete(m);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveMemberTab(idx)}
                      className={`px-4 py-2.5 rounded-xl font-sora text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        activeMemberTab === idx
                          ? "bg-hh-cyan text-black shadow-[0_0_15px_rgba(99,210,229,0.5)] scale-105"
                          : complete
                          ? "bg-hh-emerald/20 border border-hh-emerald/40 text-hh-emerald hover:bg-hh-emerald/30"
                          : "bg-hh-bg border border-hh-border text-hh-text-muted hover:text-white"
                      }`}
                    >
                      <span>{idx === 0 ? "👑 หัวหน้าทีม" : `👤 สมาชิกคนที่ ${idx + 1}`}</span>
                      {complete && <span className="font-extrabold text-xs">✓</span>}
                      {members.length > 1 && idx > 0 && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            removeMember(idx);
                          }}
                          className="hover:text-red-500 ml-1 text-xs font-extrabold"
                          title="ลบสมาชิกคนนี้"
                        >
                          ✕
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Member Form Fields */}
              {members[activeMemberTab] && (
                <div className="space-y-6 pt-2">
                  <div className="p-3.5 rounded-2xl bg-hh-bg/80 border border-hh-cyan/30 flex items-center justify-between font-mono text-xs">
                    <span className="text-hh-cyan flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">assignment_ind</span>
                      กำลังแก้ไข: <strong className="text-white font-sora text-sm">{activeMemberTab === 0 ? "หัวหน้าทีม" : `สมาชิกคนที่ ${activeMemberTab + 1}`}</strong>
                    </span>
                    <span className="text-hh-text-muted">คนแรกจำเป็นต้องเป็นหัวหน้าทีม</span>
                  </div>

                  {/* 1. Personal Info */}
                  <div className="p-5 rounded-2xl bg-hh-bg/40 border border-hh-border/40 space-y-4">
                    <h3 className="font-sora text-xs font-bold text-hh-cyan uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">person</span>
                      1. ข้อมูลส่วนตัว & สถาบัน
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-xs text-hh-text-muted">คำนำหน้า *</label>
                        <select
                          required
                          value={members[activeMemberTab].title}
                          onChange={(e) => updateMember(activeMemberTab, "title", e.target.value)}
                          className="w-full bg-hh-bg border border-hh-border rounded-xl p-3 font-hanken text-white text-sm focus:border-hh-cyan focus:outline-none"
                        >
                          <option value="" disabled>-- เลือก --</option>
                          <option value="mr">นาย</option>
                          <option value="ms">นางสาว</option>
                          <option value="mrs">นาง</option>
                        </select>
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="font-mono text-xs text-hh-text-muted">ชื่อจริง - นามสกุล *</label>
                        <input
                          type="text"
                          required
                          value={members[activeMemberTab].fullName}
                          onChange={(e) => updateMember(activeMemberTab, "fullName", e.target.value)}
                          placeholder="นายสมชาย ใจดี"
                          className="w-full bg-hh-bg border border-hh-border rounded-xl p-3 font-hanken text-white text-sm focus:border-hh-cyan focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-xs text-hh-text-muted">ชื่อเล่น</label>
                        <input
                          type="text"
                          value={members[activeMemberTab].nickname}
                          onChange={(e) => updateMember(activeMemberTab, "nickname", e.target.value)}
                          placeholder="กอล์ฟ"
                          className="w-full bg-hh-bg border border-hh-border rounded-xl p-3 font-hanken text-white text-sm focus:border-hh-cyan focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-xs text-hh-text-muted">อายุ (15-30 ปี) *</label>
                        <input
                          type="number"
                          min="15"
                          max="30"
                          required
                          value={members[activeMemberTab].age}
                          onChange={(e) => updateMember(activeMemberTab, "age", e.target.value)}
                          placeholder="20"
                          className="w-full bg-hh-bg border border-hh-border rounded-xl p-3 font-hanken text-white text-sm focus:border-hh-cyan focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-3">
                        <label className="font-mono text-xs text-hh-text-muted">คณะ / สถาบัน / โรงเรียน *</label>
                        <input
                          type="text"
                          required
                          value={members[activeMemberTab].institution}
                          onChange={(e) => updateMember(activeMemberTab, "institution", e.target.value)}
                          placeholder="คณะเภสัชศาสตร์ มหาวิทยาลัย..."
                          className="w-full bg-hh-bg border border-hh-border rounded-xl p-3 font-hanken text-white text-sm focus:border-hh-cyan focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. Contact Info */}
                  <div className="p-5 rounded-2xl bg-hh-bg/40 border border-hh-border/40 space-y-4">
                    <h3 className="font-sora text-xs font-bold text-hh-cyan uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">contact_phone</span>
                      2. ช่องทางติดต่อ
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-xs text-hh-text-muted">อีเมล *</label>
                        <input
                          type="email"
                          required
                          value={members[activeMemberTab].email}
                          onChange={(e) => updateMember(activeMemberTab, "email", e.target.value)}
                          placeholder="name@email.com"
                          className="w-full bg-hh-bg border border-hh-border rounded-xl p-3 font-hanken text-white text-sm focus:border-hh-cyan focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-xs text-hh-text-muted">Line ID *</label>
                        <input
                          type="text"
                          required
                          value={members[activeMemberTab].lineId}
                          onChange={(e) => updateMember(activeMemberTab, "lineId", e.target.value)}
                          placeholder="line_id_123"
                          className="w-full bg-hh-bg border border-hh-border rounded-xl p-3 font-hanken text-white text-sm focus:border-hh-cyan focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-xs text-hh-text-muted">เบอร์โทรศัพท์ *</label>
                        <input
                          type="tel"
                          required
                          value={members[activeMemberTab].phone}
                          onChange={(e) => updateMember(activeMemberTab, "phone", e.target.value)}
                          placeholder="08X-XXX-XXXX"
                          className="w-full bg-hh-bg border border-hh-border rounded-xl p-3 font-hanken text-white text-sm focus:border-hh-cyan focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. Emergency Info */}
                  <div className="p-5 rounded-2xl bg-hh-bg/40 border border-hh-border/40 space-y-4">
                    <h3 className="font-sora text-xs font-bold text-hh-cyan uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">health_and_safety</span>
                      3. ข้อมูลฉุกเฉิน & ข้อจำกัด
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1 sm:col-span-3">
                        <label className="font-mono text-xs text-hh-text-muted">แพ้อาหาร / ยา (ระบุ 'ไม่มี' หากไม่มี)</label>
                        <input
                          type="text"
                          value={members[activeMemberTab].allergies}
                          onChange={(e) => updateMember(activeMemberTab, "allergies", e.target.value)}
                          placeholder="เช่น แพ้กุ้ง, แพ้ยาเพนนิซิลิน"
                          className="w-full bg-hh-bg border border-hh-border rounded-xl p-3 font-hanken text-white text-sm focus:border-hh-cyan focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-xs text-hh-text-muted">ผู้ติดต่อฉุกเฉิน</label>
                        <input
                          type="text"
                          value={members[activeMemberTab].emergencyName}
                          onChange={(e) => updateMember(activeMemberTab, "emergencyName", e.target.value)}
                          placeholder="ชื่อ-นามสกุล"
                          className="w-full bg-hh-bg border border-hh-border rounded-xl p-3 font-hanken text-white text-sm focus:border-hh-cyan focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <label className="font-mono text-xs text-hh-text-muted">เบอร์ผู้ติดต่อฉุกเฉิน</label>
                        <input
                          type="tel"
                          value={members[activeMemberTab].emergencyPhone}
                          onChange={(e) => updateMember(activeMemberTab, "emergencyPhone", e.target.value)}
                          placeholder="08X-XXX-XXXX"
                          className="w-full bg-hh-bg border border-hh-border rounded-xl p-3 font-hanken text-white text-sm focus:border-hh-cyan focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stepper buttons between members */}
                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => setStep3SubTab("team")}
                      className="px-4 py-2 border border-hh-border rounded-xl text-xs font-sora text-hh-text-muted hover:text-white cursor-pointer"
                    >
                      ← แก้ไขข้อมูลทีม
                    </button>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={activeMemberTab === 0}
                        onClick={() => setActiveMemberTab((prev) => Math.max(0, prev - 1))}
                        className="px-3.5 py-2 bg-hh-bg border border-hh-border rounded-xl text-xs font-sora text-white disabled:opacity-30 cursor-pointer"
                      >
                        คนก่อนหน้า
                      </button>
                      <button
                        type="button"
                        disabled={activeMemberTab >= members.length - 1}
                        onClick={() => setActiveMemberTab((prev) => Math.min(members.length - 1, prev + 1))}
                        className="px-3.5 py-2 bg-hh-cyan/20 border border-hh-cyan/40 text-hh-cyan rounded-xl text-xs font-sora font-bold hover:bg-hh-cyan/30 disabled:opacity-30 cursor-pointer"
                      >
                        คนถัดไป →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ACTION SUBMIT BUTTON */}
              <div className="pt-6 border-t border-hh-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
                {members.length < 5 ? (
                  <button
                    type="button"
                    onClick={addMember}
                    className="w-full sm:w-auto px-5 py-3.5 border border-hh-border rounded-xl font-sora text-xs font-bold text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">person_add</span>
                    + เพิ่มสมาชิกคนที่ {members.length + 1}
                  </button>
                ) : (
                  <div className="text-xs text-hh-emerald font-mono font-bold">✓ สมาชิกครบตามโควตาแล้ว (5/5 คน)</div>
                )}

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-hh-action text-black font-sora text-sm font-extrabold uppercase rounded-xl hover:bg-orange-400 transition-all shadow-[0_0_25px_rgba(255,106,0,0.5)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  ยืนยันการลงทะเบียนทั้งหมด
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* STEP 4: SUCCESS CONFIRMATION */}
      {step === 4 && (
        <div className="z-10 w-full max-w-lg text-center my-auto">
          <div className="bg-hh-surface/95 backdrop-blur-2xl border border-hh-cyan/50 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(99,210,229,0.3)] space-y-6">
            <div className="w-20 h-20 rounded-full bg-hh-cyan/20 border-2 border-hh-cyan flex items-center justify-center mx-auto text-hh-cyan shadow-[0_0_25px_rgba(99,210,229,0.6)]">
              <span className="material-symbols-outlined text-4xl">task_alt</span>
            </div>

            <span className="font-mono text-xs text-hh-cyan tracking-widest uppercase bg-hh-cyan/10 px-4 py-1.5 rounded-full border border-hh-cyan/30 inline-block">
              Registration Complete
            </span>

            <h1 className="font-sora text-3xl font-extrabold text-white">
              ลงทะเบียนสำเร็จแล้ว!
            </h1>

            <p className="font-hanken text-hh-text-muted text-sm leading-relaxed">
              ขอแสดงความยินดี ทีม{" "}
              <span className="text-hh-cyan font-bold font-sora">
                &quot;{teamName}&quot;
              </span>{" "}
              ได้ลงทะเบียนเข้าร่วมการแข่งขัน HealthHack 2026 เรียบร้อยแล้ว
            </p>

            <div className="p-4 rounded-2xl bg-hh-bg/80 border border-hh-border/60 font-mono text-xs text-left space-y-2.5">
              <div className="flex justify-between border-b border-hh-border/40 pb-2">
                <span className="text-hh-text-muted">REGISTRATION ID:</span>
                <span className="text-hh-cyan font-bold">
                  HH2026-REG-{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>
              <div className="flex justify-between border-b border-hh-border/40 pb-2">
                <span className="text-hh-text-muted">จำนวนสมาชิกทีม:</span>
                <span className="text-white font-bold">{members.length} คน</span>
              </div>
              <div className="flex justify-between">
                <span className="text-hh-text-muted">อีเมลยืนยัน:</span>
                <span className="text-white font-bold">{email}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <Link
                href="/schedule"
                className="w-full py-3.5 bg-hh-action text-black font-sora text-sm font-bold rounded-xl hover:bg-orange-400 transition-all shadow-[0_0_15px_rgba(255,106,0,0.4)]"
              >
                ดูรายละเอียดกำหนดการ
              </Link>
              <Link
                href="/"
                className="w-full py-3 border border-hh-border text-white font-sora text-xs uppercase rounded-xl hover:bg-white/10 transition-colors"
              >
                กลับสู่หน้าแรก
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
