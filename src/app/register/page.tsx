"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  // Wizard state: 1: Email, 2: OTP, 3: Form Details, 4: Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Email
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Step 2: OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(90);

  // Step 3: Team & Member Details (Minimum 3 members, Maximum 5 members)
  const [teamName, setTeamName] = useState("");
  const [educationLevel, setEducationLevel] = useState<"university" | "highschool">("university");
  const [teamType, setTeamType] = useState<"pharmacy" | "non-pharmacy">("pharmacy");

  interface Member {
    title: string;
    fullName: string;
    nickname: string;
    age: string;
    institution: string;
    gradeLevel: string;
    allergies: string;
    email: string;
    lineId: string;
    phone: string;
    emergencyName: string;
    emergencyPhone: string;
  }

  const createEmptyMember = (): Member => ({
    title: "",
    fullName: "",
    nickname: "",
    age: "",
    institution: "",
    gradeLevel: "",
    allergies: "",
    email: "",
    lineId: "",
    phone: "",
    emergencyName: "",
    emergencyPhone: "",
  });

  // Default initialize with 3 members (Minimum 3 required per team)
  const [members, setMembers] = useState<Member[]>([
    createEmptyMember(),
    createEmptyMember(),
    createEmptyMember(),
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
      alert("สามารถเพิ่มสมาชิกได้สูงสุด 5 คนต่อทีมเท่านั้น");
      return;
    }
    const leaderInst = members[0]?.institution || "";
    setMembers((prev) => [
      ...prev,
      {
        ...createEmptyMember(),
        institution: leaderInst,
      },
    ]);
    setActiveMemberTab(members.length);
  };

  const removeMember = (index: number) => {
    if (members.length <= 3) {
      alert("ทีมต้องมีสมาชิกอย่างน้อย 3 คนขึ้นไป (จำกัด 3 - 5 คนต่อทีม)");
      return;
    }
    setMembers((prev) => prev.filter((_, i) => i !== index));
    setActiveMemberTab(Math.max(0, index - 1));
  };

  const copyInstitutionFromLeader = (index: number) => {
    if (members[0]?.institution) {
      updateMember(index, "institution", members[0].institution);
    }
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) {
      alert("กรุณากรอกชื่อทีม");
      return;
    }
    if (members.length < 3) {
      alert("ทีมต้องมีสมาชิกอย่างน้อย 3 คนขึ้นไป (3 - 5 คน)");
      return;
    }
    const emptyMemberIndex = members.findIndex(
      (m) => !m.fullName.trim() || !m.title || !m.institution.trim() || !m.phone.trim() || !m.email.trim()
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
    <main className="min-h-screen bg-hh-bg text-hh-text flex flex-col items-center justify-start relative overflow-hidden py-8 px-4 sm:px-8 md:px-12 font-hanken">
      {/* Background Cyber Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Top Navigation Bar */}
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

      {/* Stepper Progress Bar */}
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
            <span className={`text-[11px] sm:text-xs mt-1.5 ${step === 1 ? "text-hh-action font-bold" : "text-hh-text-muted"}`}>
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
            <span className={`text-[11px] sm:text-xs mt-1.5 ${step === 2 ? "text-hh-action font-bold" : "text-hh-text-muted"}`}>
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
            <span className={`text-[11px] sm:text-xs mt-1.5 ${step === 3 ? "text-hh-action font-bold" : "text-hh-text-muted"}`}>
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
            <span className={`text-[11px] sm:text-xs mt-1.5 ${step === 4 ? "text-hh-emerald font-bold" : "text-hh-text-muted"}`}>
              เสร็จสิ้น
            </span>
          </div>
        </div>
      </div>

      {/* STEP 1: EMAIL ENTRY */}
      {step === 1 && (
        <div className="z-10 w-full max-w-md sm:max-w-lg my-auto">
          <div className="bg-hh-surface/95 backdrop-blur-2xl border border-hh-border/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-13 h-13 rounded-2xl bg-hh-cyan/15 border border-hh-cyan/30 text-hh-cyan mx-auto">
                <span className="material-symbols-outlined text-2xl">mail</span>
              </div>
              <h1 className="font-sora text-xl sm:text-2xl font-extrabold text-white">
                ยืนยันตัวตนด้วยอีเมล
              </h1>
              <p className="font-hanken text-xs sm:text-sm text-hh-text-muted max-w-xs mx-auto leading-relaxed">
                กรอกอีเมลของคุณเพื่อรับรหัส OTP สำหรับเข้าสู่ระบบสมัครแข่งขัน
              </p>
            </div>

            <form onSubmit={handleRequestOtp} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-hh-cyan tracking-wider flex items-center gap-1.5 font-mono">
                  <span className="material-symbols-outlined text-sm">alternate_email</span>
                  อีเมลของคุณ (EMAIL) *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  autoFocus
                  className="w-full py-3.5 px-4 bg-hh-bg border border-hh-border/80 text-white font-hanken text-base rounded-xl focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/30 focus:outline-none transition-all leading-normal shadow-inner"
                />
                {emailError && (
                  <p className="text-xs text-red-400 font-mono mt-1">{emailError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-hh-action text-black font-sora text-sm sm:text-base font-extrabold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(255,106,0,0.5)] active:scale-98 cursor-pointer"
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
        <div className="z-10 w-full max-w-md sm:max-w-lg my-auto">
          <div className="bg-hh-surface/95 backdrop-blur-2xl border border-hh-border/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-13 h-13 rounded-none bg-hh-cyan/15 border border-hh-cyan/40 text-hh-cyan mx-auto shadow-[0_0_12px_rgba(99,210,229,0.3)]">
                <span className="material-symbols-outlined text-2xl">pin</span>
              </div>
              <h1 className="font-sora text-xl sm:text-2xl font-extrabold text-white">
                กรอกรหัส OTP 6 หลัก
              </h1>
              <p className="font-hanken text-xs sm:text-sm text-hh-text-muted leading-relaxed">
                รหัสยืนยัน OTP ถูกส่งไปที่ <br className="sm:hidden" />
                <span className="text-hh-cyan font-mono font-bold text-sm bg-hh-bg px-2.5 py-0.5 rounded-none border border-hh-cyan/30 inline-block mt-1">{email}</span>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-center gap-1.5 sm:gap-2.5">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-9 sm:w-11 h-11 sm:h-13 bg-hh-bg border border-hh-cyan/60 text-center font-sora text-xl sm:text-2xl text-hh-cyan font-extrabold rounded-none focus:border-hh-cyan focus:ring-2 focus:ring-hh-cyan/40 focus:outline-none transition-all leading-none shadow-inner"
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-center text-xs text-red-400 font-mono">{otpError}</p>
              )}

              <div className="text-center space-y-1.5">
                <p className="font-mono text-xs text-hh-text-muted flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">timer</span>
                  ขอรหัสใหม่ได้ในอีก <span className="text-white font-bold text-xs sm:text-sm">{formatTimer(timerSeconds)}</span>
                </p>
                {timerSeconds === 0 && (
                  <button
                    type="button"
                    onClick={() => setTimerSeconds(90)}
                    className="text-xs text-hh-cyan hover:underline font-mono cursor-pointer font-bold"
                  >
                    ส่งรหัส OTP อีกครั้ง
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 border border-hh-border/80 text-white font-sora text-xs sm:text-sm rounded-xl hover:bg-white/10 transition-colors font-bold cursor-pointer"
                >
                  แก้ไขอีเมล
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3.5 bg-hh-action text-black font-sora text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(255,106,0,0.5)] active:scale-98 cursor-pointer"
                >
                  ยืนยัน OTP
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STEP 3: HIGH-EASE STREAMLINED FORM UI (MIN 3 MEMBERS, MAX 5 MEMBERS) */}
      {step === 3 && (
        <div className="z-10 w-full max-w-3xl my-4">
          <form onSubmit={handleSubmitRegistration} className="bg-hh-surface/90 backdrop-blur-2xl border border-hh-border/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
            
            {/* Header Title */}
            <div className="border-b border-hh-border/40 pb-4 space-y-1 text-center sm:text-left">
              <span className="font-mono text-xs text-hh-cyan uppercase tracking-wider font-bold bg-hh-cyan/10 px-3 py-1 rounded-full border border-hh-cyan/30 inline-block">
                STEP 03 • REGISTRATION FORM
              </span>
              <h1 className="font-sora text-2xl sm:text-3xl font-extrabold text-white">
                ข้อมูลการสมัครสมาชิกและทีม
              </h1>
              <p className="text-xs sm:text-sm text-hh-text-muted">
                สมาชิกขั้นต่ำต้องมีอย่างน้อย 3 คน แต่ไม่เกิน 5 คนต่อทีม
              </p>
            </div>

            {/* SECTION 1: TEAM GENERAL INFO */}
            <div className="p-5 sm:p-6 rounded-2xl bg-hh-bg/60 border border-hh-border/60 space-y-5">
              <div className="flex items-center gap-2 border-b border-hh-border/30 pb-3">
                <span className="material-symbols-outlined text-hh-cyan text-xl">groups</span>
                <h2 className="font-sora text-lg font-bold text-white">ส่วนที่ 1: ข้อมูลทั่วไปของทีม</h2>
              </div>

              <div className="space-y-4">
                {/* Team Name */}
                <div className="space-y-1.5">
                  <label className="text-xs text-white font-bold flex items-center justify-between">
                    <span>ชื่อทีม (Team Name) <span className="text-hh-action">*</span></span>
                    <span className="text-[11px] text-hh-text-muted font-normal font-mono">จำเป็น</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="ตั้งชื่อทีมของคุณ เช่น PharmaInnovators 2026"
                    className="w-full bg-hh-bg border border-hh-border rounded-xl p-3.5 text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan focus:outline-none transition-all"
                  />
                </div>

                {/* Education Level Selection */}
                <div className="space-y-2">
                  <label className="text-xs text-white font-bold flex items-center justify-between">
                    <span>ระดับการศึกษา <span className="text-hh-action">*</span></span>
                    <span className="text-[11px] text-hh-text-muted font-normal font-mono">จำเป็น</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setEducationLevel("university")}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                        educationLevel === "university"
                          ? "bg-hh-cyan/15 border-hh-cyan text-white shadow-[0_0_15px_rgba(99,210,229,0.2)]"
                          : "bg-hh-bg/40 border-hh-border/60 text-hh-text-muted hover:bg-white/5"
                      }`}
                    >
                      <input
                        type="radio"
                        name="educationLevelRadio"
                        checked={educationLevel === "university"}
                        onChange={() => setEducationLevel("university")}
                        className="accent-hh-cyan w-4 h-4"
                      />
                      <div>
                        <div className="font-sora text-xs sm:text-sm font-bold text-white">ระดับอุดมศึกษา</div>
                        <div className="text-[11px] text-hh-text-muted">นิสิต / นักศึกษาระดับมหาวิทยาลัย</div>
                      </div>
                    </div>

                    <div
                      onClick={() => setEducationLevel("highschool")}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                        educationLevel === "highschool"
                          ? "bg-hh-cyan/15 border-hh-cyan text-white shadow-[0_0_15px_rgba(99,210,229,0.2)]"
                          : "bg-hh-bg/40 border-hh-border/60 text-hh-text-muted hover:bg-white/5"
                      }`}
                    >
                      <input
                        type="radio"
                        name="educationLevelRadio"
                        checked={educationLevel === "highschool"}
                        onChange={() => setEducationLevel("highschool")}
                        className="accent-hh-cyan w-4 h-4"
                      />
                      <div>
                        <div className="font-sora text-xs sm:text-sm font-bold text-white">ระดับมัธยมศึกษาตอนปลาย</div>
                        <div className="text-[11px] text-hh-text-muted">นักเรียน ม.4 - ม.6</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Type Sub-Option (University Only) */}
                {educationLevel === "university" && (
                  <div className="space-y-2">
                    <label className="text-xs text-white font-bold flex items-center justify-between">
                      <span>ประเภททีม (Team Type) <span className="text-hh-action">*</span></span>
                      <span className="text-[11px] text-hh-text-muted font-normal font-mono">จำเป็น</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        onClick={() => setTeamType("pharmacy")}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                          teamType === "pharmacy"
                            ? "bg-hh-cyan/15 border-hh-cyan text-white shadow-[0_0_15px_rgba(99,210,229,0.2)]"
                            : "bg-hh-bg/40 border-hh-border/60 text-hh-text-muted hover:bg-white/5"
                        }`}
                      >
                        <input
                          type="radio"
                          name="teamTypeRadio"
                          checked={teamType === "pharmacy"}
                          onChange={() => setTeamType("pharmacy")}
                          className="accent-hh-cyan w-4 h-4"
                        />
                        <div>
                          <div className="font-sora text-xs sm:text-sm font-bold text-white">ทีมที่มีนิสิต/นักศึกษาเภสัชศาสตร์</div>
                          <div className="text-[11px] text-hh-text-muted">มีสมาชิกอย่างน้อย 1 คนเรียนคณะเภสัชฯ</div>
                        </div>
                      </div>

                      <div
                        onClick={() => setTeamType("non-pharmacy")}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                          teamType === "non-pharmacy"
                            ? "bg-hh-cyan/15 border-hh-cyan text-white shadow-[0_0_15px_rgba(99,210,229,0.2)]"
                            : "bg-hh-bg/40 border-hh-border/60 text-hh-text-muted hover:bg-white/5"
                        }`}
                      >
                        <input
                          type="radio"
                          name="teamTypeRadio"
                          checked={teamType === "non-pharmacy"}
                          onChange={() => setTeamType("non-pharmacy")}
                          className="accent-hh-cyan w-4 h-4"
                        />
                        <div>
                          <div className="font-sora text-xs sm:text-sm font-bold text-white">ทีมทั่วไป (ไม่มีนิสิตเภสัชศาสตร์)</div>
                          <div className="text-[11px] text-hh-text-muted">ไม่มีนิสิตเภสัชศาสตร์ในทีม</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SECTION 2: TEAM MEMBERS INFO (MIN 3 MEMBERS, MAX 5 MEMBERS) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-hh-bg/60 border border-hh-border/60 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-hh-border/30 pb-3 gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-hh-cyan text-xl">badge</span>
                  <h2 className="font-sora text-lg font-bold text-white">
                    ส่วนที่ 2: ข้อมูลสมาชิกในทีม ({members.length}/5 คน • ขั้นต่ำ 3 คน)
                  </h2>
                </div>

                {members.length < 5 && (
                  <button
                    type="button"
                    onClick={addMember}
                    className="px-3.5 py-1.5 bg-hh-cyan/15 text-hh-cyan border border-hh-cyan/40 rounded-xl font-sora text-xs font-bold hover:bg-hh-cyan/25 transition-all flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                  >
                    <span className="material-symbols-outlined text-base">add</span>
                    + เพิ่มสมาชิก
                  </button>
                )}
              </div>

              {/* Member Selection Tabs */}
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
                          : "bg-hh-surface border border-hh-border text-hh-text-muted hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">
                          {idx === 0 ? "stars" : "person"}
                        </span>
                        <span>{idx === 0 ? "หัวหน้าทีม" : `สมาชิกคนที่ ${idx + 1}`}</span>
                      </span>
                      {complete && <span className="font-extrabold text-xs">✓</span>}
                      {members.length > 3 && idx >= 3 && (
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

              {/* Active Member Form — Natural Flow with Section Dividers */}
              {members[activeMemberTab] && (
                <div className="space-y-5 pt-2">

                  {/* ─── SECTION A: ข้อมูลส่วนตัว ─── */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[11px] text-hh-cyan/70 font-mono uppercase tracking-widest">
                      <span className="material-symbols-outlined text-xs">person</span>
                      ข้อมูลส่วนตัว
                      <span className="flex-1 border-b border-hh-border/30" />
                    </div>

                    {/* คำนำหน้า */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-white font-bold block">
                        คำนำหน้า <span className="text-hh-action">*</span>
                      </label>
                      <div className="flex gap-2 h-11 items-center max-w-sm">
                        {["นาย", "นางสาว", "นาง"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => updateMember(activeMemberTab, "title", t)}
                            className={`flex-1 h-full rounded-xl text-xs font-sora font-bold transition-all cursor-pointer ${
                              members[activeMemberTab].title === t
                                ? "bg-hh-cyan text-black shadow-[0_0_10px_rgba(99,210,229,0.4)]"
                                : "bg-hh-bg border border-hh-border text-hh-text-muted hover:text-white"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ชื่อจริง + ชื่อเล่น */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-white font-bold block">
                          ชื่อจริง - นามสกุล <span className="text-hh-action">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={members[activeMemberTab].fullName}
                          onChange={(e) => updateMember(activeMemberTab, "fullName", e.target.value)}
                          placeholder="เช่น สมชาย ใจดี"
                          className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-hh-text-muted font-bold block">
                          ชื่อเล่น (ถ้ามี)
                        </label>
                        <input
                          type="text"
                          value={members[activeMemberTab].nickname}
                          onChange={(e) => updateMember(activeMemberTab, "nickname", e.target.value)}
                          placeholder="เช่น กอล์ฟ"
                          className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* อายุ + สถาบัน/โรงเรียน (conditional on educationLevel) */}
                    {educationLevel === "university" ? (
                      /* ── อุดมศึกษา: อายุ + คณะ/สถาบัน ── */
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs text-white font-bold block">
                            อายุ (15 - 30 ปี) <span className="text-hh-action">*</span>
                          </label>
                          <input
                            type="number"
                            min="15"
                            max="30"
                            required
                            value={members[activeMemberTab].age}
                            onChange={(e) => updateMember(activeMemberTab, "age", e.target.value)}
                            placeholder="20"
                            className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-white font-bold flex items-center justify-between">
                            <span>คณะ / สถาบัน <span className="text-hh-action">*</span></span>
                            {activeMemberTab > 0 && members[0]?.institution && (
                              <button
                                type="button"
                                onClick={() => copyInstitutionFromLeader(activeMemberTab)}
                                className="text-[11px] text-hh-cyan hover:underline font-mono flex items-center gap-1 cursor-pointer font-normal"
                              >
                                <span className="material-symbols-outlined text-xs">content_copy</span>
                                คัดลอกจากหัวหน้าทีม
                              </button>
                            )}
                          </label>
                          <input
                            type="text"
                            required
                            value={members[activeMemberTab].institution}
                            onChange={(e) => updateMember(activeMemberTab, "institution", e.target.value)}
                            placeholder="เช่น คณะเภสัชศาสตร์ มหาวิทยาลัยศิลปากร"
                            className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    ) : (
                      /* ── มัธยมปลาย: อายุ + ชื่อโรงเรียน + ระดับชั้น ── */
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs text-white font-bold block">
                            อายุ (15 - 30 ปี) <span className="text-hh-action">*</span>
                          </label>
                          <input
                            type="number"
                            min="15"
                            max="30"
                            required
                            value={members[activeMemberTab].age}
                            onChange={(e) => updateMember(activeMemberTab, "age", e.target.value)}
                            placeholder="17"
                            className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-white font-bold flex items-center justify-between">
                            <span>ชื่อโรงเรียน <span className="text-hh-action">*</span></span>
                            {activeMemberTab > 0 && members[0]?.institution && (
                              <button
                                type="button"
                                onClick={() => copyInstitutionFromLeader(activeMemberTab)}
                                className="text-[11px] text-hh-cyan hover:underline font-mono flex items-center gap-1 cursor-pointer font-normal"
                              >
                                <span className="material-symbols-outlined text-xs">content_copy</span>
                                คัดลอกจากหัวหน้าทีม
                              </button>
                            )}
                          </label>
                          <input
                            type="text"
                            required
                            value={members[activeMemberTab].institution}
                            onChange={(e) => updateMember(activeMemberTab, "institution", e.target.value)}
                            placeholder="เช่น โรงเรียนเตรียมอุดมศึกษา"
                            className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-white font-bold block">
                            ระดับชั้น <span className="text-hh-action">*</span>
                          </label>
                          <div className="flex gap-2 h-11 items-center">
                            {["ม.4", "ม.5", "ม.6"].map((g) => (
                              <button
                                key={g}
                                type="button"
                                onClick={() => updateMember(activeMemberTab, "gradeLevel", g)}
                                className={`flex-1 h-full rounded-xl text-xs font-sora font-bold transition-all cursor-pointer ${
                                  members[activeMemberTab].gradeLevel === g
                                    ? "bg-hh-cyan text-black shadow-[0_0_10px_rgba(99,210,229,0.4)]"
                                    : "bg-hh-bg border border-hh-border text-hh-text-muted hover:text-white"
                                }`}
                              >
                                {g}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ─── SECTION B: ข้อมูลการติดต่อ ─── */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[11px] text-hh-cyan/70 font-mono uppercase tracking-widest">
                      <span className="material-symbols-outlined text-xs">contact_mail</span>
                      ข้อมูลการติดต่อ
                      <span className="flex-1 border-b border-hh-border/30" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      {/* อีเมล + เบอร์โทร */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-white font-bold block">
                          อีเมล (EMAIL) <span className="text-hh-action">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={members[activeMemberTab].email}
                          onChange={(e) => updateMember(activeMemberTab, "email", e.target.value)}
                          placeholder="example@domain.com"
                          className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-white font-bold block">
                          เบอร์โทรศัพท์ <span className="text-hh-action">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={members[activeMemberTab].phone}
                          onChange={(e) => updateMember(activeMemberTab, "phone", e.target.value)}
                          placeholder="08X-XXX-XXXX"
                          className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-all"
                        />
                      </div>

                      {/* LINE ID + แพ้อาหาร */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-white font-bold block">
                          LINE ID <span className="text-hh-action">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={members[activeMemberTab].lineId}
                          onChange={(e) => updateMember(activeMemberTab, "lineId", e.target.value)}
                          placeholder="line_id_123"
                          className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-hh-text-muted font-bold block">
                          แพ้อาหาร / ยา (ถ้ามี)
                        </label>
                        <input
                          type="text"
                          value={members[activeMemberTab].allergies}
                          onChange={(e) => updateMember(activeMemberTab, "allergies", e.target.value)}
                          placeholder="ระบุสิ่งที่แพ้ (หรือ 'ไม่มี')"
                          className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ─── SECTION C: ผู้ติดต่อฉุกเฉิน ─── */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[11px] text-hh-cyan/70 font-mono uppercase tracking-widest">
                      <span className="material-symbols-outlined text-xs">emergency</span>
                      ผู้ติดต่อฉุกเฉิน
                      <span className="flex-1 border-b border-hh-border/30" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-hh-text-muted font-bold block">
                          ชื่อผู้ติดต่อฉุกเฉิน (ถ้ามี)
                        </label>
                        <input
                          type="text"
                          value={members[activeMemberTab].emergencyName}
                          onChange={(e) => updateMember(activeMemberTab, "emergencyName", e.target.value)}
                          placeholder="ชื่อ-นามสกุล ผู้ติดต่อฉุกเฉิน"
                          className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-hh-text-muted font-bold block">
                          เบอร์ผู้ติดต่อฉุกเฉิน (ถ้ามี)
                        </label>
                        <input
                          type="tel"
                          value={members[activeMemberTab].emergencyPhone}
                          onChange={(e) => updateMember(activeMemberTab, "emergencyPhone", e.target.value)}
                          placeholder="08X-XXX-XXXX"
                          className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* ACTION SUBMIT BUTTON BAR */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-hh-border/40">
              {members.length < 5 ? (
                <button
                  type="button"
                  onClick={addMember}
                  className="w-full sm:w-auto px-5 py-3 border border-hh-border rounded-xl font-sora text-xs font-bold text-white hover:bg-white/10 transition-colors uppercase cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">person_add</span>
                  + เพิ่มสมาชิกคนที่ {members.length + 1} (สูงสุด 5 คน)
                </button>
              ) : (
                <div className="text-xs text-hh-emerald font-mono font-bold">✓ สมาชิกครบตามโควตาสูงสุดแล้ว (5/5 คน)</div>
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

            <p className="text-hh-text-muted text-sm leading-relaxed">
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
