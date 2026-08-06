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
  const [isTeamTypeOpen, setIsTeamTypeOpen] = useState(false);
  const [isMemberCountOpen, setIsMemberCountOpen] = useState(false);
  const [isGradeLevelOpen, setIsGradeLevelOpen] = useState(false);
  const [isAllergyOpen, setIsAllergyOpen] = useState(false);

  interface Member {
    title: string;
    firstName: string;
    lastName: string;
    fullName: string;
    nickname: string;
    age: string;
    institution: string;
    faculty: string;
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
    firstName: "",
    lastName: "",
    fullName: "",
    nickname: "",
    age: "",
    institution: "",
    faculty: "",
    gradeLevel: "",
    allergies: "ไม่มี",
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

  const isValidEmail = (emailStr: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailStr.trim());
  };

  // Step 1 handler
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      setEmailError("กรุณากรอกรูปแบบอีเมลให้ถูกต้อง (เช่น name@example.com)");
      return;
    }
    setEmail(cleanEmail);
    setEmailError("");
    setTimerSeconds(90);
    setStep(2);
  };

  // OTP input handlers (Numbers ONLY: 0-9)
  const handleOtpChange = (index: number, rawValue: string) => {
    // Filter out non-numeric characters
    const digitsOnly = rawValue.replace(/\D/g, "");
    if (!digitsOnly && rawValue !== "") return;

    let nextChar = digitsOnly;
    if (nextChar.length > 1) {
      nextChar = nextChar[nextChar.length - 1];
    }

    const newOtp = [...otp];
    newOtp[index] = nextChar;
    setOtp(newOtp);

    // Auto-focus next input
    if (nextChar && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData.length > 0) {
      const newOtp = ["", "", "", "", "", ""];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      const targetIdx = Math.min(pastedData.length, 5);
      const nextInput = document.getElementById(`otp-${targetIdx}`);
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

  const setMemberCount = (targetCount: number) => {
    if (targetCount < 3 || targetCount > 5) return;
    setMembers((prev) => {
      if (prev.length === targetCount) return prev;
      if (prev.length < targetCount) {
        const leaderInst = prev[0]?.institution || "";
        const addedCount = targetCount - prev.length;
        const newItems = Array.from({ length: addedCount }, () => ({
          ...createEmptyMember(),
          institution: leaderInst,
        }));
        return [...prev, ...newItems];
      } else {
        return prev.slice(0, targetCount);
      }
    });
    if (activeMemberTab >= targetCount) {
      setActiveMemberTab(targetCount - 1);
    }
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
    if (members[0]?.institution || members[0]?.faculty) {
      setMembers((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          institution: prev[0].institution || updated[index].institution,
          faculty: prev[0].faculty || updated[index].faculty,
        };
        return updated;
      });
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
    const noTitleIndex = members.findIndex((m) => !m.title);
    if (noTitleIndex !== -1) {
      setActiveMemberTab(noTitleIndex);
      alert(`กรุณาเลือกคำนำหน้าชื่อของ ${noTitleIndex === 0 ? "หัวหน้าทีม" : `สมาชิกคนที่ ${noTitleIndex + 1}`}`);
      return;
    }

    const noAgeIndex = members.findIndex((m) => !m.age || !m.age.trim());
    if (noAgeIndex !== -1) {
      setActiveMemberTab(noAgeIndex);
      alert(`กรุณากรอกอายุของ ${noAgeIndex === 0 ? "หัวหน้าทีม" : `สมาชิกคนที่ ${noAgeIndex + 1}`} (ระหว่าง 15 - 30 ปี)`);
      return;
    }

    const invalidAgeIndex = members.findIndex((m) => {
      const ageNum = parseInt(m.age, 10);
      return isNaN(ageNum) || ageNum < 15 || ageNum > 30;
    });
    if (invalidAgeIndex !== -1) {
      setActiveMemberTab(invalidAgeIndex);
      alert(`อายุของ ${invalidAgeIndex === 0 ? "หัวหน้าทีม" : `สมาชิกคนที่ ${invalidAgeIndex + 1}`} ต้องอยู่ระหว่าง 15 - 30 ปี`);
      return;
    }

    const emptyMemberIndex = members.findIndex(
      (m) =>
        (!m.firstName.trim() && !m.fullName.trim()) ||
        !m.title ||
        !m.institution.trim() ||
        !m.phone.trim() ||
        !m.email.trim() ||
        !m.age.trim()
    );
    if (emptyMemberIndex !== -1) {
      setActiveMemberTab(emptyMemberIndex);
      alert(`กรุณากรอกข้อมูลจำเป็นของ ${emptyMemberIndex === 0 ? "หัวหน้าทีม" : `สมาชิกคนที่ ${emptyMemberIndex + 1}`} ให้ครบถ้วน`);
      return;
    }

    const invalidPhoneIndex = members.findIndex((m) => m.phone.length !== 10);
    if (invalidPhoneIndex !== -1) {
      setActiveMemberTab(invalidPhoneIndex);
      alert(`กรุณากรอกเบอร์โทรศัพท์ของ ${invalidPhoneIndex === 0 ? "หัวหน้าทีม" : `สมาชิกคนที่ ${invalidPhoneIndex + 1}`} ให้ครบ 10 หลัก (เช่น 08XXXXXXXX)`);
      return;
    }

    const invalidEmailIndex = members.findIndex((m) => !isValidEmail(m.email));
    if (invalidEmailIndex !== -1) {
      setActiveMemberTab(invalidEmailIndex);
      alert(`กรุณากรอกอีเมลของ ${invalidEmailIndex === 0 ? "หัวหน้าทีม" : `สมาชิกคนที่ ${invalidEmailIndex + 1}`} ให้ถูกต้องตามรูปแบบ (เช่น name@example.com)`);
      return;
    }

    const invalidEmergencyPhoneIndex = members.findIndex((m) => m.emergencyPhone && m.emergencyPhone.length !== 10);
    if (invalidEmergencyPhoneIndex !== -1) {
      setActiveMemberTab(invalidEmergencyPhoneIndex);
      alert(`กรุณากรอกเบอร์ผู้ติดต่อฉุกเฉินของ ${invalidEmergencyPhoneIndex === 0 ? "หัวหน้าทีม" : `สมาชิกคนที่ ${invalidEmergencyPhoneIndex + 1}`} ให้ครบ 10 หลัก`);
      return;
    }

    setStep(4);
  };

  const isMemberComplete = (m: Member) => {
    const ageNum = parseInt(m.age, 10);
    const isAgeValid = !isNaN(ageNum) && ageNum >= 15 && ageNum <= 30;
    return Boolean(
      (m.firstName.trim() || m.fullName.trim()) &&
      m.title &&
      m.institution.trim() &&
      m.phone.trim().length === 10 &&
      isValidEmail(m.email) &&
      isAgeValid
    );
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
      <div className="w-full max-w-7xl flex items-center justify-between z-20 pb-4 pt-2 border-b border-hh-border/30">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-hh-text-muted hover:text-white transition-colors font-sora text-xs sm:text-sm font-bold group"
        >
          <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform text-hh-cyan">
            arrow_back
          </span>
          กลับหน้าหลัก
        </Link>
        <span className="font-sora text-xs sm:text-sm font-bold text-hh-cyan">
          PSAT HealthHack 2026 Registration
        </span>
      </div>

      {/* Stepper Progress Bar with Precise Green Connecting Lines */}
      <div className="z-10 w-full max-w-3xl sm:max-w-4xl my-6 px-4">
        <div className="flex items-start justify-between">
          {[
            { num: 1, label: "ยืนยันอีเมล" },
            { num: 2, label: "กรอก OTP" },
            { num: 3, label: "ข้อมูลทีม & สมาชิก" },
            { num: 4, label: "เสร็จสิ้น" },
          ].map((item, index, array) => {
            const isActive = step === item.num;
            const isCompleted = step > item.num;

            return (
              <React.Fragment key={item.num}>
                {/* Step Circle & Label Container */}
                <div className="flex flex-col items-center shrink-0 z-10">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-sora font-extrabold text-xs sm:text-sm transition-all duration-300 ${
                      isActive
                        ? "bg-hh-action text-black ring-4 ring-hh-action/30 shadow-[0_0_20px_rgba(255,106,0,0.6)] scale-110"
                        : isCompleted
                        ? "bg-hh-emerald text-black ring-2 ring-hh-emerald/40"
                        : "bg-hh-surface border-2 border-hh-border text-hh-text-muted"
                    }`}
                  >
                    {isCompleted ? (
                      <span className="material-symbols-outlined text-base sm:text-lg font-bold">check</span>
                    ) : (
                      item.num
                    )}
                  </div>
                  <span
                    className={`text-[11px] sm:text-xs font-sora mt-2 text-center transition-colors whitespace-nowrap ${
                      isActive
                        ? "text-hh-action font-bold [text-shadow:0_0_10px_rgba(255,106,0,0.4)]"
                        : isCompleted
                        ? "text-hh-emerald font-bold"
                        : "text-hh-text-muted"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Green Connecting Line Segment between adjacent steps */}
                {index < array.length - 1 && (
                  <div className="flex-1 mx-2 sm:mx-4 h-0.5 mt-4 sm:mt-5 z-0">
                    <div
                      className={`h-full w-full transition-all duration-500 rounded-full ${
                        step > item.num
                          ? "bg-hh-emerald shadow-[0_0_10px_rgba(42,194,152,0.8)]"
                          : "bg-hh-border/40"
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* STEP 1: EMAIL ENTRY */}
      {step === 1 && (
        <div className="z-10 w-full max-w-md sm:max-w-lg mt-6 sm:mt-10 mb-auto">
          <div className="bg-hh-surface/95 backdrop-blur-2xl border border-hh-border/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center mx-auto">
                <div className="w-16 h-16 bg-hh-surface border border-hh-border/80 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-hh-cyan">forward_to_inbox</span>
                </div>
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
                  อีเมลของคุณ (EMAIL)
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
        <div className="z-10 w-full max-w-md sm:max-w-lg mt-6 sm:mt-10 mb-auto">
          <div className="bg-hh-surface/95 backdrop-blur-2xl border border-hh-border/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-4">
              {/* OTP Icon Badge */}
              <div className="inline-flex items-center justify-center mx-auto">
                <div className="w-16 h-16 bg-hh-surface border border-hh-border/80 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-hh-cyan">enhanced_encryption</span>
                </div>
              </div>

              <h1 className="font-sora text-xl sm:text-2xl font-extrabold text-white">
                กรอกรหัส OTP 6 หลัก
              </h1>
              <p className="font-hanken text-xs sm:text-sm text-hh-text-muted leading-relaxed">
                รหัสยืนยัน OTP ถูกส่งไปที่ <br className="sm:hidden" />
                <span className="text-hh-cyan font-mono font-bold text-sm bg-hh-bg px-2.5 py-0.5 rounded-lg border border-hh-cyan/30 inline-block mt-1">{email}</span>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-center gap-2.5 sm:gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onPaste={handleOtpPaste}
                    className="w-10 sm:w-12 h-12 sm:h-14 bg-hh-bg border-2 border-hh-cyan/50 text-center font-sora text-xl sm:text-2xl text-hh-cyan font-extrabold rounded-xl focus:border-hh-cyan focus:ring-2 focus:ring-hh-cyan/40 focus:bg-hh-cyan/5 focus:outline-none transition-all"
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
                  className="w-2/3 py-3.5 bg-hh-action text-black font-sora text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-orange-400 transition-all active:scale-98 cursor-pointer"
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
                  <label className="text-xs text-white font-bold block">
                    <span>ชื่อทีม (Team Name)</span>
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
                  <label className="text-xs text-white font-bold block">
                    <span>ระดับการศึกษา</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setEducationLevel("university")}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${educationLevel === "university"
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
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${educationLevel === "highschool"
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

                {/* Team Type Sub-Option (University Only) - Custom Cyber Dropdown */}
                {educationLevel === "university" && (
                  <div className="space-y-1.5 pt-1 relative">
                    <label className="text-xs text-white font-bold block">
                      ประเภททีม (Team Type)
                    </label>
                    <div className="relative">
                      {/* Trigger button */}
                      <button
                        type="button"
                        onClick={() => setIsTeamTypeOpen(!isTeamTypeOpen)}
                        className={`bg-hh-bg border border-hh-border rounded-xl px-3.5 py-3 text-white text-xs sm:text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan focus:outline-none transition-all flex items-center justify-between cursor-pointer hover:border-hh-cyan/50 gap-3 ${teamType === "non-pharmacy" ? "w-full max-w-[340px]" : "w-full"
                          }`}
                      >
                        <span className="truncate text-left">
                          {teamType === "pharmacy"
                            ? "ทีมที่มีนิสิต/นักศึกษาเภสัชศาสตร์ (มีสมาชิกอย่างน้อย 1 คนเรียนคณะเภสัชศาสตร์)"
                            : "ทีมทั่วไป (ไม่มีนิสิตเภสัชศาสตร์ในทีม)"}
                        </span>
                        <span className={`material-symbols-outlined text-xl text-hh-cyan transition-transform duration-200 shrink-0 ${isTeamTypeOpen ? "rotate-180" : ""}`}>
                          expand_more
                        </span>
                      </button>

                      {/* Custom Dropdown Popup Menu */}
                      {isTeamTypeOpen && (
                        <>
                          {/* Backdrop to close when clicking outside */}
                          <div
                            className="fixed inset-0 z-20"
                            onClick={() => setIsTeamTypeOpen(false)}
                          />
                          <div className="absolute left-0 top-full mt-1.5 z-30 min-w-full w-max max-w-[90vw] md:max-w-[650px] bg-[#041a1d] border border-hh-cyan/50 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.9)] overflow-hidden backdrop-blur-2xl divide-y divide-hh-border/40">
                            <button
                              type="button"
                              onClick={() => {
                                setTeamType("pharmacy");
                                setIsTeamTypeOpen(false);
                              }}
                              className={`w-full text-left px-4 py-3 text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${teamType === "pharmacy"
                                ? "bg-hh-cyan/20 text-hh-cyan font-bold"
                                : "text-white hover:bg-hh-cyan/10 hover:text-hh-cyan"
                                }`}
                            >
                              <span>ทีมที่มีนิสิต/นักศึกษาเภสัชศาสตร์ (มีสมาชิกอย่างน้อย 1 คนเรียนคณะเภสัชศาสตร์)</span>
                              {teamType === "pharmacy" && (
                                <span className="material-symbols-outlined text-base text-hh-cyan ml-2 shrink-0">check</span>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setTeamType("non-pharmacy");
                                setIsTeamTypeOpen(false);
                              }}
                              className={`w-full text-left px-4 py-3 text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${teamType === "non-pharmacy"
                                ? "bg-hh-cyan/20 text-hh-cyan font-bold"
                                : "text-white hover:bg-hh-cyan/10 hover:text-hh-cyan"
                                }`}
                            >
                              <span>ทีมทั่วไป (ไม่มีนิสิตเภสัชศาสตร์ในทีม)</span>
                              {teamType === "non-pharmacy" && (
                                <span className="material-symbols-outlined text-base text-hh-cyan ml-2 shrink-0">check</span>
                              )}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SECTION 2: TEAM MEMBERS INFO (MIN 3 MEMBERS, MAX 5 MEMBERS) */}
            <div id="member-section-2" className="p-5 sm:p-6 rounded-2xl bg-hh-bg/60 border border-hh-border/60 space-y-5 scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-hh-border/30 pb-3 gap-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-hh-cyan text-xl">badge</span>
                  <h2 className="font-sora text-lg font-bold text-white">
                    ส่วนที่ 2: ข้อมูลสมาชิกในทีม
                  </h2>
                </div>

                {/* Member Count Dropdown Selection (3-5 คน) */}
                <div className="relative self-start sm:self-auto min-w-[210px]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-hh-text-muted font-sora font-semibold whitespace-nowrap">
                      จำนวนสมาชิก:
                    </span>
                    <div className="relative flex-1">
                      <button
                        type="button"
                        onClick={() => setIsMemberCountOpen(!isMemberCountOpen)}
                        className="w-full bg-hh-bg border border-hh-cyan/50 rounded-xl px-3.5 py-2 text-white text-xs font-sora font-bold flex items-center justify-between gap-2 cursor-pointer hover:border-hh-cyan transition-all shadow-[0_0_10px_rgba(99,210,229,0.15)]"
                      >
                        <span className="flex items-center gap-1.5 text-hh-cyan">
                          <span className="material-symbols-outlined text-base">groups</span>
                          <span>{members.length} คน</span>
                        </span>
                        <span className={`material-symbols-outlined text-lg text-hh-cyan transition-transform duration-200 ${isMemberCountOpen ? "rotate-180" : ""}`}>
                          expand_more
                        </span>
                      </button>

                      {isMemberCountOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-20"
                            onClick={() => setIsMemberCountOpen(false)}
                          />
                          <div className="absolute right-0 top-full mt-1.5 z-30 w-36 bg-[#041a1d] border border-hh-cyan/50 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.9)] overflow-hidden backdrop-blur-2xl divide-y divide-hh-border/40">
                            {[3, 4, 5].map((count) => (
                              <button
                                key={count}
                                type="button"
                                onClick={() => {
                                  setMemberCount(count);
                                  setIsMemberCountOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-xs font-sora font-bold transition-all flex items-center justify-between cursor-pointer ${members.length === count
                                  ? "bg-hh-cyan/20 text-hh-cyan"
                                  : "text-white hover:bg-hh-cyan/10 hover:text-hh-cyan"
                                  }`}
                              >
                                <span>{count} คน</span>
                                {members.length === count && (
                                  <span className="material-symbols-outlined text-sm text-hh-cyan ml-2 shrink-0">check</span>
                                )}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Member Selection Tabs - Compact when inactive */}
              <div className="flex flex-wrap items-center gap-2">
                {members.map((m, idx) => {
                  const complete = isMemberComplete(m);
                  const isActive = activeMemberTab === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveMemberTab(idx)}
                      className={`rounded-full font-sora text-xs font-bold transition-colors duration-150 flex items-center gap-1.5 cursor-pointer ${isActive
                          ? "bg-hh-cyan text-black px-4 py-2"
                          : complete
                            ? "bg-hh-emerald/20 border border-hh-emerald/40 text-hh-emerald hover:bg-hh-emerald/30 px-3 py-1.5"
                            : "bg-hh-surface border border-hh-border text-hh-text-muted hover:text-white px-3 py-1.5"
                        }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {idx === 0 ? "stars" : "person"}
                      </span>
                      <span>
                        {isActive
                          ? idx === 0
                            ? "หัวหน้าทีม"
                            : `สมาชิกคนที่ ${idx + 1}`
                          : `${idx + 1}`}
                      </span>
                      {complete && <span className="font-extrabold text-xs">✓</span>}
                      {members.length > 3 && idx >= 3 && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            removeMember(idx);
                          }}
                          className="hover:text-red-400 ml-0.5 text-xs font-extrabold"
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

                    {/* 1. คำนำหน้า */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-white font-bold block flex items-center gap-1">
                        คำนำหน้า <span className="text-hh-action">*</span>
                      </label>
                      <div className="flex gap-2 h-9 items-center max-w-[180px]">
                        {["นาย", "นางสาว"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => updateMember(activeMemberTab, "title", t)}
                            className={`flex-1 h-full rounded-lg text-xs font-sora font-bold transition-colors duration-150 cursor-pointer ${members[activeMemberTab].title === t
                              ? "bg-hh-cyan text-black"
                              : "bg-hh-bg border border-hh-border text-hh-text-muted hover:text-white"
                              }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2. ชื่อจริง + นามสกุล (บรรทัดเดียวกัน) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-white font-bold block">
                          ชื่อจริง
                        </label>
                        <input
                          type="text"
                          required
                          value={members[activeMemberTab].firstName || members[activeMemberTab].fullName}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[0-9]/g, "");
                            updateMember(activeMemberTab, "firstName", val);
                            updateMember(activeMemberTab, "fullName", val);
                          }}
                          placeholder="เช่น สมชาย"
                          className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-colors duration-150"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-white font-bold block">
                          นามสกุล
                        </label>
                        <input
                          type="text"
                          required
                          value={members[activeMemberTab].lastName}
                          onChange={(e) => updateMember(activeMemberTab, "lastName", e.target.value.replace(/[0-9]/g, ""))}
                          placeholder="เช่น ใจดี"
                          className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-colors duration-150"
                        />
                      </div>
                    </div>

                    {/* 3. ชื่อเล่น + อายุ (บรรทัดเดียวกัน) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-hh-text-muted font-bold block">
                          ชื่อเล่น
                        </label>
                        <input
                          type="text"
                          value={members[activeMemberTab].nickname}
                          onChange={(e) => updateMember(activeMemberTab, "nickname", e.target.value.replace(/[0-9]/g, ""))}
                          placeholder="เช่น กอล์ฟ"
                          className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-colors duration-150"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-white font-bold block flex items-center gap-1">
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
                          className="w-full max-w-[75px] h-10 px-2.5 text-center bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-colors duration-150"
                        />
                      </div>
                    </div>

                    {/* 4. สถาบัน / คณะ (บรรทัดเดียวกัน) */}
                    {educationLevel === "university" ? (
                      /* ── อุดมศึกษา: ชื่อมหาวิทยาลัย + คณะ ── */
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs text-white font-bold block">
                            ชื่อมหาวิทยาลัย / สถาบัน
                          </label>
                          <input
                            type="text"
                            required
                            value={members[activeMemberTab].institution}
                            onChange={(e) => updateMember(activeMemberTab, "institution", e.target.value.replace(/[0-9]/g, ""))}
                            placeholder="เช่น มหาวิทยาลัยศิลปากร"
                            className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-colors duration-150"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs text-white font-bold block">
                            คณะ / สาขาวิชา
                          </label>
                          <input
                            type="text"
                            value={members[activeMemberTab].faculty}
                            onChange={(e) => updateMember(activeMemberTab, "faculty", e.target.value.replace(/[0-9]/g, ""))}
                            placeholder="เช่น คณะเภสัชศาสตร์"
                            className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-colors duration-150"
                          />
                        </div>
                      </div>
                    ) : (
                      /* ── มัธยมปลาย: โรงเรียน + ระดับชั้น ── */
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs text-white font-bold block">
                            ชื่อโรงเรียน
                          </label>
                          <input
                            type="text"
                            required
                            value={members[activeMemberTab].institution}
                            onChange={(e) => updateMember(activeMemberTab, "institution", e.target.value.replace(/[0-9]/g, ""))}
                            placeholder="เช่น โรงเรียนเตรียมอุดมศึกษา"
                            className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-colors duration-150"
                          />
                        </div>

                        <div className="space-y-1.5 relative">
                          <label className="text-xs text-white font-bold block">
                            ระดับชั้น
                          </label>
                          <div className="relative max-w-[75px]">
                            <button
                              type="button"
                              onClick={() => setIsGradeLevelOpen(!isGradeLevelOpen)}
                              className="w-full bg-hh-bg border border-hh-border rounded-xl px-2.5 py-2.5 text-white text-xs sm:text-sm font-sora font-bold flex items-center justify-between cursor-pointer hover:border-hh-cyan/50 focus:border-hh-cyan transition-all"
                            >
                              <span>{members[activeMemberTab].gradeLevel || "ม.4"}</span>
                              <span className={`material-symbols-outlined text-base text-hh-cyan transition-transform duration-200 ${isGradeLevelOpen ? "rotate-180" : ""}`}>
                                expand_more
                              </span>
                            </button>

                            {isGradeLevelOpen && (
                              <>
                                <div
                                  className="fixed inset-0 z-20"
                                  onClick={() => setIsGradeLevelOpen(false)}
                                />
                                <div className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-[#041a1d] border border-hh-cyan/50 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.9)] overflow-hidden backdrop-blur-2xl divide-y divide-hh-border/40">
                                  {["ม.4", "ม.5", "ม.6"].map((g) => (
                                    <button
                                      key={g}
                                      type="button"
                                      onClick={() => {
                                        updateMember(activeMemberTab, "gradeLevel", g);
                                        setIsGradeLevelOpen(false);
                                      }}
                                      className={`w-full text-left px-4 py-2.5 text-xs font-sora font-bold transition-all flex items-center justify-between cursor-pointer ${(members[activeMemberTab].gradeLevel || "ม.4") === g
                                        ? "bg-hh-cyan/20 text-hh-cyan"
                                        : "text-white hover:bg-hh-cyan/10 hover:text-hh-cyan"
                                        }`}
                                    >
                                      <span>{g}</span>
                                      {(members[activeMemberTab].gradeLevel || "ม.4") === g && (
                                        <span className="material-symbols-outlined text-sm text-hh-cyan shrink-0">check</span>
                                      )}
                                    </button>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 5. แพ้อาหาร / ยา (Dropdown + Conditional Text Box) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                      <div className="space-y-1.5 relative">
                        <label className="text-xs text-hh-text-muted font-bold block">
                          แพ้อาหาร / ยา
                        </label>
                        <div className="relative max-w-[140px]">
                          {(() => {
                            const curAllergy = members[activeMemberTab]?.allergies ?? "ไม่มี";
                            const hasAllergy = curAllergy !== "ไม่มี" && curAllergy !== "";
                            return (
                              <>
                                <button
                                  type="button"
                                  onClick={() => setIsAllergyOpen(!isAllergyOpen)}
                                  className="w-full bg-hh-bg border border-hh-border rounded-xl px-3 py-2.5 text-white text-xs sm:text-sm font-sora font-bold flex items-center justify-between cursor-pointer hover:border-hh-cyan/50 focus:border-hh-cyan transition-colors duration-150"
                                >
                                  <span>{hasAllergy ? "มี" : "ไม่มี"}</span>
                                  <span className={`material-symbols-outlined text-base text-hh-cyan transition-transform duration-200 ${isAllergyOpen ? "rotate-180" : ""}`}>
                                    expand_more
                                  </span>
                                </button>

                                {isAllergyOpen && (
                                  <>
                                    <div
                                      className="fixed inset-0 z-20"
                                      onClick={() => setIsAllergyOpen(false)}
                                    />
                                    <div className="absolute left-0 right-0 top-full mt-1.5 z-30 bg-[#041a1d] border border-hh-cyan/50 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.9)] overflow-hidden backdrop-blur-2xl divide-y divide-hh-border/40">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          updateMember(activeMemberTab, "allergies", "ไม่มี");
                                          setIsAllergyOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-xs font-sora font-bold transition-colors duration-150 flex items-center justify-between cursor-pointer ${!hasAllergy
                                          ? "bg-hh-cyan/20 text-hh-cyan"
                                          : "text-white hover:bg-hh-cyan/10 hover:text-hh-cyan"
                                        }`}
                                      >
                                        <span>ไม่มี</span>
                                        {!hasAllergy && (
                                          <span className="material-symbols-outlined text-sm text-hh-cyan shrink-0">check</span>
                                        )}
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (!hasAllergy) {
                                            updateMember(activeMemberTab, "allergies", "มี");
                                          }
                                          setIsAllergyOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-xs font-sora font-bold transition-colors duration-150 flex items-center justify-between cursor-pointer ${hasAllergy
                                          ? "bg-hh-cyan/20 text-hh-cyan"
                                          : "text-white hover:bg-hh-cyan/10 hover:text-hh-cyan"
                                        }`}
                                      >
                                        <span>มี</span>
                                        {hasAllergy && (
                                          <span className="material-symbols-outlined text-sm text-hh-cyan shrink-0">check</span>
                                        )}
                                      </button>
                                    </div>
                                  </>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Show text input ONLY if hasAllergy is TRUE */}
                      {members[activeMemberTab]?.allergies !== "ไม่มี" && members[activeMemberTab]?.allergies !== "" && (
                        <div className="space-y-1.5 animate-fadeIn">
                          <label className="text-xs text-white font-bold block">
                            ระบุอาการ / สิ่งที่แพ้
                          </label>
                          <input
                            type="text"
                            required
                            value={members[activeMemberTab]?.allergies === "มี" ? "" : members[activeMemberTab]?.allergies}
                            onChange={(e) => updateMember(activeMemberTab, "allergies", e.target.value || "มี")}
                            placeholder="ระบุสิ่งที่แพ้ (เช่น กุ้ง, เพนิซิลลิน)"
                            className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-colors duration-150"
                          />
                        </div>
                      )}
                    </div>
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
                          อีเมล (EMAIL)
                        </label>
                        <input
                          type="email"
                          required
                          autoComplete="email"
                          value={members[activeMemberTab].email}
                          onChange={(e) => updateMember(activeMemberTab, "email", e.target.value.toLowerCase().replace(/\s/g, ""))}
                          placeholder="example@domain.com"
                          className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-colors duration-150"
                        />
                        {members[activeMemberTab].email.length > 0 && !isValidEmail(members[activeMemberTab].email) && (
                          <p className="text-[11px] text-amber-400 font-mono mt-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">warning</span>
                            รูปแบบอีเมลไม่ถูกต้อง (เช่น name@example.com)
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-white font-bold block">
                          เบอร์โทรศัพท์
                        </label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          pattern="[0-9]{10}"
                          value={members[activeMemberTab].phone}
                          onChange={(e) => updateMember(activeMemberTab, "phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="08XXXXXXXX"
                          className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm font-mono focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-colors duration-150"
                        />
                      </div>

                      {/* LINE ID */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-white font-bold block">
                          LINE ID
                        </label>
                        <input
                          type="text"
                          required
                          value={members[activeMemberTab].lineId}
                          onChange={(e) => updateMember(activeMemberTab, "lineId", e.target.value)}
                          placeholder="line_id_123"
                          className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-colors duration-150"
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
                          ชื่อผู้ติดต่อฉุกเฉิน
                        </label>
                        <input
                          type="text"
                          value={members[activeMemberTab].emergencyName}
                          onChange={(e) => updateMember(activeMemberTab, "emergencyName", e.target.value.replace(/[0-9]/g, ""))}
                          placeholder="ชื่อ-นามสกุล ผู้ติดต่อฉุกเฉิน"
                          className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-colors duration-150"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-hh-text-muted font-bold block">
                          เบอร์ผู้ติดต่อฉุกเฉิน
                        </label>
                        <input
                          type="tel"
                          maxLength={10}
                          pattern="[0-9]{10}"
                          value={members[activeMemberTab].emergencyPhone}
                          onChange={(e) => updateMember(activeMemberTab, "emergencyPhone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="08XXXXXXXX"
                          className="w-full h-11 px-3.5 bg-hh-bg border border-hh-border rounded-xl text-white text-sm font-mono focus:border-hh-cyan focus:ring-1 focus:ring-hh-cyan/40 focus:outline-none transition-colors duration-150"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* ACTION SUBMIT BUTTON BAR */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-hh-border/40">
              <div className="flex items-center gap-2 text-xs font-sora text-hh-text-muted">
                <span className="material-symbols-outlined text-hh-cyan text-base">groups</span>
                <span>จำนวนสมาชิกในทีม: <strong className="text-hh-cyan font-bold">{members.length} คน</strong> (เลือกได้ 3 - 5 คน)</span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  if (activeMemberTab < members.length - 1) {
                    setActiveMemberTab((prev) => prev + 1);
                    document.getElementById("member-section-2")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  } else {
                    const form = e.currentTarget.closest("form");
                    if (form) form.requestSubmit();
                  }
                }}
                className={`w-full sm:w-auto px-8 py-4 text-black font-sora text-sm font-extrabold uppercase rounded-xl transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer ${activeMemberTab < members.length - 1
                    ? "bg-hh-cyan hover:bg-cyan-300"
                    : "bg-hh-action hover:bg-orange-400"
                  }`}
              >
                <span>
                  {activeMemberTab < members.length - 1 ? "คนถัดไป" : "ยืนยันการลงทะเบียนทั้งหมด"}
                </span>
                <span className="material-symbols-outlined text-lg">
                  {activeMemberTab < members.length - 1 ? "arrow_forward" : "check_circle"}
                </span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 4: REVIEW MEMBER DETAILS & PAYMENT */}
      {step === 4 && (
        <div className="z-10 w-full max-w-3xl my-auto">
          <div className="bg-hh-surface/95 backdrop-blur-2xl border border-hh-cyan/50 rounded-3xl p-6 md:p-8 space-y-6">

            {/* Header Title */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-hh-cyan/20 border-2 border-hh-cyan flex items-center justify-center mx-auto text-hh-cyan">
                <span className="material-symbols-outlined text-3xl">assignment_turned_in</span>
              </div>

              <span className="font-mono text-xs text-hh-cyan tracking-widest uppercase block">
                Summary & Confirmation
              </span>

              <h1 className="font-sora text-2xl sm:text-3xl font-extrabold text-white">
                ตรวจรายละเอียดข้อมูลสมาชิก
              </h1>

              <p className="text-hh-text-muted text-xs sm:text-sm max-w-lg mx-auto">
                กรุณาตรวจสอบข้อมูลทั้งหมดของทีมและสมาชิกทุกคนให้ถูกต้องก่อนดำเนินการชำระเงินค่าสมัคร
              </p>
            </div>

            {/* TEAM OVERVIEW CARD */}
            <div className="p-4 rounded-2xl bg-[#021316] border border-hh-cyan/30 space-y-3 text-left">
              <div className="flex items-center gap-2 text-xs text-hh-cyan font-mono font-bold uppercase tracking-wider border-b border-hh-border/40 pb-2">
                <span className="material-symbols-outlined text-base">groups</span>
                <span>ข้อมูลทีม (Team Summary)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-hh-text-muted block text-[11px]">ชื่อทีม</span>
                  <strong className="text-white font-sora text-sm">{teamName || "ไม่ระบุ"}</strong>
                </div>
                <div>
                  <span className="text-hh-text-muted block text-[11px]">ระดับการศึกษา</span>
                  <strong className="text-white">
                    {educationLevel === "highschool" ? "มัธยมศึกษาตอนปลาย" : "อุดมศึกษา"}
                  </strong>
                </div>
                <div>
                  <span className="text-hh-text-muted block text-[11px]">ประเภททีม</span>
                  <strong className="text-hh-cyan">
                    {educationLevel === "highschool" ? "ทีมมัธยมปลาย" : teamType === "pharmacy" ? "ทีมที่มีนิสิต/นักศึกษาเภสัชฯ" : "ทีมทั่วไป"}
                  </strong>
                </div>
                <div>
                  <span className="text-hh-text-muted block text-[11px]">จำนวนสมาชิก</span>
                  <strong className="text-white font-sora">{members.length} คน</strong>
                </div>
              </div>
            </div>

            {/* MEMBERS DETAILED CARDS LIST */}
            <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
              {members.map((m, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-hh-bg/90 border border-hh-border/60 text-left space-y-3">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-hh-border/40 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-hh-cyan text-sm">
                        {idx === 0 ? "stars" : "person"}
                      </span>
                      <h3 className="font-sora text-xs font-bold text-hh-cyan">
                        {idx === 0 ? "หัวหน้าทีม (Leader)" : `สมาชิกคนที่ ${idx + 1}`}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-white">
                      {m.title} {m.firstName || m.fullName || "ไม่ระบุ"} {m.lastName}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-xs">
                    <div>
                      <span className="text-hh-text-muted text-[11px] block">ชื่อเล่น / อายุ</span>
                      <span className="text-white">{m.nickname || "-"} (อายุ {m.age || "-"} ปี)</span>
                    </div>

                    <div>
                      <span className="text-hh-text-muted text-[11px] block">
                        {educationLevel === "university" ? "มหาวิทยาลัย / คณะ" : "โรงเรียน / ชั้นปี"}
                      </span>
                      <span className="text-white">
                        {m.institution || "-"} {m.faculty ? `- ${m.faculty}` : m.gradeLevel ? `(${m.gradeLevel})` : ""}
                      </span>
                    </div>

                    <div>
                      <span className="text-hh-text-muted text-[11px] block">อีเมล (Email)</span>
                      <span className="text-white font-mono text-[11px] truncate block">{m.email || "-"}</span>
                    </div>

                    <div>
                      <span className="text-hh-text-muted text-[11px] block">เบอร์โทรศัพท์</span>
                      <span className="text-white font-mono text-[11px]">{m.phone || "-"}</span>
                    </div>

                    <div>
                      <span className="text-hh-text-muted text-[11px] block">LINE ID</span>
                      <span className="text-white font-mono text-[11px]">{m.lineId || "-"}</span>
                    </div>

                    <div>
                      <span className="text-hh-text-muted text-[11px] block">แพ้อาหาร / ยา</span>
                      <span className="text-white">{m.allergies || "ไม่มี"}</span>
                    </div>

                    <div className="sm:col-span-2 md:col-span-3 border-t border-hh-border/30 pt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                      <div>
                        <span className="text-hh-text-muted text-[11px] block">ชื่อผู้ติดต่อฉุกเฉิน</span>
                        <span className="text-white font-bold text-xs">{m.emergencyName || "-"}</span>
                      </div>
                      <div>
                        <span className="text-hh-text-muted text-[11px] block">เบอร์ผู้ติดต่อฉุกเฉิน</span>
                        <span className="text-white font-mono text-xs">{m.emergencyPhone || "-"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full sm:w-1/3 py-3.5 border border-hh-cyan/60 text-hh-cyan font-sora text-xs sm:text-sm font-bold uppercase rounded-xl hover:bg-hh-cyan/10 transition-colors duration-150 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">edit</span>
                <span>แก้ไขข้อมูล</span>
              </button>

              <button
                type="button"
                onClick={() => alert("กำลังเข้าสู่ระบบชำระเงินค่าสมัคร...")}
                className="w-full sm:w-2/3 py-3.5 bg-hh-action text-black font-sora text-sm sm:text-base font-extrabold uppercase rounded-xl hover:bg-orange-400 transition-colors duration-150 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>ชำระเงินค่าสมัคร</span>
                <span className="material-symbols-outlined text-lg">payments</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
