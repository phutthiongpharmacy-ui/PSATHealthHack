"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  // Wizard state
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

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

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) {
      alert("กรุณากรอกชื่อทีม");
      return;
    }
    if (members.some((m) => !m.fullName.trim())) {
      alert("กรุณากรอกชื่อจริงของสมาชิกทุกคน");
      return;
    }
    setStep(4);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <main className="min-h-screen bg-background text-on-surface flex flex-col items-center justify-center relative overflow-hidden py-12 px-margin-mobile md:px-margin-desktop bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]">
      {/* Top Header Link */}
      <div className="absolute top-6 left-6 md:top-8 md:left-12 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors group font-mono text-xs uppercase"
        >
          <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          กลับหน้าหลัก
        </Link>
      </div>

      {/* STEP 1: EMAIL ENTRY */}
      {step === 1 && (
        <div className="z-10 w-full max-w-lg">
          <div className="bg-surface-container-low/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl space-y-8">
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-white/20 via-transparent to-transparent" />

            {/* Step Progress */}
            <div className="flex items-center gap-4">
              <div className="h-[2px] flex-1 bg-white/20 relative">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-primary-container" />
              </div>
              <span className="font-mono text-xs font-bold text-white tracking-widest">
                STEP 01/03
              </span>
              <div className="h-[2px] flex-1 bg-white/20" />
            </div>

            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-variant border border-white/20">
                <span className="material-symbols-outlined text-white text-3xl">
                  person
                </span>
              </div>
              <h1 className="font-sora text-2xl md:text-3xl font-bold text-white">
                ยืนยันตัวตนเพื่อเริ่มการสมัคร
              </h1>
              <p className="font-hanken text-sm text-on-surface-variant max-w-xs mx-auto">
                กรุณากรอกอีเมลของคุณเพื่อรับรหัส OTP สำหรับเข้าสู่ระบบการสมัคร
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleRequestOtp} className="space-y-6">
              <div className="space-y-2">
                <label className="font-mono text-xs text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">
                    mail
                  </span>
                  อีเมล (EMAIL)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  autoFocus
                  className="w-full h-14 bg-surface-container border border-white/20 px-4 font-hanken text-white rounded-xl focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none transition-all"
                />
                {emailError && (
                  <p className="text-xs text-error font-mono">{emailError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white text-black font-sora text-base font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors active:scale-[0.98] shadow-lg"
              >
                รับรหัส OTP
                <span className="material-symbols-outlined text-xl">
                  arrow_forward
                </span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* STEP 2: OTP VERIFICATION */}
      {step === 2 && (
        <div className="z-10 w-full max-w-lg">
          <div className="bg-surface-container-low/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl space-y-8">
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-white/20 via-transparent to-transparent" />

            {/* Step Progress */}
            <div className="flex items-center gap-4">
              <div className="h-[2px] flex-1 bg-white/20 relative">
                <div className="absolute top-0 left-0 h-full w-2/3 bg-primary-container" />
              </div>
              <span className="font-mono text-xs font-bold text-white tracking-widest">
                STEP 02/03
              </span>
              <div className="h-[2px] flex-1 bg-white/20" />
            </div>

            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-variant border border-white/20">
                <span className="material-symbols-outlined text-white text-3xl">
                  lock
                </span>
              </div>
              <h1 className="font-sora text-2xl md:text-3xl font-bold text-white">
                กรอกรหัส OTP
              </h1>
              <p className="font-hanken text-sm text-on-surface-variant">
                รหัส OTP 6 หลัก ถูกส่งไปยัง <br />
                <span className="text-white font-mono font-bold">{email}</span>
              </p>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-between gap-2 md:gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-12 h-14 md:w-14 md:h-16 bg-surface-container border border-white/20 text-center font-sora text-2xl text-white rounded-xl focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:outline-none transition-all"
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-center text-xs text-error font-mono">
                  {otpError}
                </p>
              )}

              {/* Timer */}
              <div className="text-center">
                <p className="font-mono text-xs text-on-surface-variant flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-base">
                    timer
                  </span>
                  ขอรหัสใหม่ได้ในอีก{" "}
                  <span className="text-white font-bold">
                    {formatTimer(timerSeconds)}
                  </span>
                </p>
                {timerSeconds === 0 && (
                  <button
                    type="button"
                    onClick={() => setTimerSeconds(90)}
                    className="mt-2 text-xs text-primary-container hover:underline font-mono"
                  >
                    ส่งรหัส OTP อีกครั้ง
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-4 border border-white/20 text-white font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-white/10 transition-colors"
                >
                  ย้อนกลับ
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-4 bg-white text-black font-sora text-base font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors active:scale-[0.98] shadow-lg"
                >
                  ยืนยัน OTP
                  <span className="material-symbols-outlined text-xl">
                    arrow_forward
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STEP 3: TEAM & MEMBER DETAILS */}
      {step === 3 && (
        <div className="z-10 w-full max-w-3xl my-8">
          <div className="bg-surface-container-low/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 md:p-12 shadow-2xl space-y-8">
            {/* Header & Step Bar */}
            <div className="text-center space-y-4 border-b border-white/10 pb-6">
              <span className="font-mono text-xs text-primary-container tracking-widest uppercase bg-primary-container/10 px-4 py-1.5 rounded-full border border-primary-container/30">
                Registration Form
              </span>
              <h1 className="font-sora text-3xl md:text-4xl font-extrabold text-white">
                ข้อมูลการสมัครสมาชิกและทีม
              </h1>

              <div className="flex items-center justify-center gap-4 max-w-md mx-auto pt-2">
                <div className="h-1 flex-1 bg-primary-container rounded" />
                <div className="h-1 flex-1 bg-primary-container rounded" />
                <div className="h-1 flex-1 bg-primary-container rounded shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
              </div>
            </div>

            <form onSubmit={handleSubmitRegistration} className="space-y-10">
              {/* SECTION 1: TEAM INFO */}
              <fieldset className="space-y-6">
                <legend className="font-sora text-xl text-white font-bold border-b border-white/10 pb-3 w-full uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container">
                    groups
                  </span>
                  ส่วนที่ 1: ข้อมูลทั่วไปของทีม
                </legend>

                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs text-on-surface-variant uppercase">
                      Team Name (ชื่อทีม) *
                    </label>
                    <input
                      type="text"
                      required
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="ตั้งชื่อทีมของคุณ"
                      className="w-full bg-surface-container border border-white/20 rounded-xl p-3.5 font-hanken text-white focus:outline-none focus:border-primary-container transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs text-on-surface-variant uppercase">
                      Team Type (ประเภททีม) *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label
                        className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${teamType === "pharmacy"
                            ? "bg-primary-container/10 border-primary-container text-white"
                            : "border-white/20 text-on-surface-variant hover:bg-white/5"
                          }`}
                      >
                        <input
                          type="radio"
                          name="teamType"
                          checked={teamType === "pharmacy"}
                          onChange={() => setTeamType("pharmacy")}
                          className="accent-primary-container"
                        />
                        <span className="font-hanken text-sm font-semibold">
                          ทีมที่มีนิสิต/นักศึกษาเภสัชศาสตร์
                        </span>
                      </label>

                      <label
                        className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${teamType === "non-pharmacy"
                            ? "bg-primary-container/10 border-primary-container text-white"
                            : "border-white/20 text-on-surface-variant hover:bg-white/5"
                          }`}
                      >
                        <input
                          type="radio"
                          name="teamType"
                          checked={teamType === "non-pharmacy"}
                          onChange={() => setTeamType("non-pharmacy")}
                          className="accent-primary-container"
                        />
                        <span className="font-hanken text-sm font-semibold">
                          ทีมที่ไม่มีนิสิตเภสัชศาสตร์ (ทั่วไป)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* SECTION 2: MEMBERS */}
              <fieldset className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <legend className="font-sora text-xl text-white font-bold uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container">
                      badge
                    </span>
                    ส่วนที่ 2: ข้อมูลสมาชิกในทีม ({members.length}/5 คน)
                  </legend>
                </div>

                {/* Member Tabs */}
                <div className="flex flex-wrap gap-2">
                  {members.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveMemberTab(idx)}
                      className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-2 ${activeMemberTab === idx
                          ? "bg-primary-container text-on-primary shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                          : "bg-white/5 text-on-surface-variant hover:bg-white/10"
                        }`}
                    >
                      {idx === 0 ? "หัวหน้าทีม" : `สมาชิกคนที่ ${idx + 1}`}
                      {members.length > 1 && idx > 0 && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            removeMember(idx);
                          }}
                          className="hover:text-error ml-1"
                        >
                          &times;
                        </span>
                      )}
                    </button>
                  ))}

                  {members.length < 5 && (
                    <button
                      type="button"
                      onClick={addMember}
                      className="px-4 py-2 rounded-lg border border-dashed border-primary-container/60 text-primary-container font-mono text-xs hover:bg-primary-container/10 transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-base">
                        add
                      </span>
                      เพิ่มสมาชิก
                    </button>
                  )}
                </div>

                {/* Member Form Fields */}
                {members[activeMemberTab] && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs text-on-surface-variant uppercase">
                        Title (คำนำหน้า) *
                      </label>
                      <select
                        required
                        value={members[activeMemberTab].title}
                        onChange={(e) =>
                          updateMember(activeMemberTab, "title", e.target.value)
                        }
                        className="bg-surface-container border border-white/20 rounded-xl p-3 font-hanken text-white focus:outline-none focus:border-primary-container"
                      >
                        <option value="" disabled>
                          -- เลือกคำนำหน้า --
                        </option>
                        <option value="mr">นาย</option>
                        <option value="ms">นางสาว</option>
                        <option value="mrs">นาง</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs text-on-surface-variant uppercase">
                        Full Name (ชื่อจริง - นามสกุล) *
                      </label>
                      <input
                        type="text"
                        required
                        value={members[activeMemberTab].fullName}
                        onChange={(e) =>
                          updateMember(
                            activeMemberTab,
                            "fullName",
                            e.target.value
                          )
                        }
                        placeholder="นายสมชาย ใจดี"
                        className="bg-surface-container border border-white/20 rounded-xl p-3 font-hanken text-white focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs text-on-surface-variant uppercase">
                        Nickname (ชื่อเล่น)
                      </label>
                      <input
                        type="text"
                        value={members[activeMemberTab].nickname}
                        onChange={(e) =>
                          updateMember(
                            activeMemberTab,
                            "nickname",
                            e.target.value
                          )
                        }
                        placeholder="ชื่อเล่น"
                        className="bg-surface-container border border-white/20 rounded-xl p-3 font-hanken text-white focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs text-on-surface-variant uppercase">
                        Age (อายุ) *
                      </label>
                      <input
                        type="number"
                        min="15"
                        max="30"
                        required
                        value={members[activeMemberTab].age}
                        onChange={(e) =>
                          updateMember(activeMemberTab, "age", e.target.value)
                        }
                        placeholder="15 - 30"
                        className="bg-surface-container border border-white/20 rounded-xl p-3 font-hanken text-white focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="font-mono text-xs text-on-surface-variant uppercase">
                        Faculty / Institute / School (คณะ/สถาบัน/โรงเรียน) *
                      </label>
                      <input
                        type="text"
                        required
                        value={members[activeMemberTab].institution}
                        onChange={(e) =>
                          updateMember(
                            activeMemberTab,
                            "institution",
                            e.target.value
                          )
                        }
                        placeholder="คณะเภสัชศาสตร์ มหาวิทยาลัย..."
                        className="bg-surface-container border border-white/20 rounded-xl p-3 font-hanken text-white focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="font-mono text-xs text-on-surface-variant uppercase">
                        Food / Drug Allergies (แพ้อาหาร/ยา)
                      </label>
                      <input
                        type="text"
                        value={members[activeMemberTab].allergies}
                        onChange={(e) =>
                          updateMember(
                            activeMemberTab,
                            "allergies",
                            e.target.value
                          )
                        }
                        placeholder="ระบุสิ่งที่แพ้ (หากไม่มีให้กรอก 'ไม่มี')"
                        className="bg-surface-container border border-white/20 rounded-xl p-3 font-hanken text-white focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs text-on-surface-variant uppercase">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={members[activeMemberTab].email}
                        onChange={(e) =>
                          updateMember(activeMemberTab, "email", e.target.value)
                        }
                        placeholder="example@domain.com"
                        className="bg-surface-container border border-white/20 rounded-xl p-3 font-hanken text-white focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs text-on-surface-variant uppercase">
                        Line ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={members[activeMemberTab].lineId}
                        onChange={(e) =>
                          updateMember(
                            activeMemberTab,
                            "lineId",
                            e.target.value
                          )
                        }
                        placeholder="line_id_123"
                        className="bg-surface-container border border-white/20 rounded-xl p-3 font-hanken text-white focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="font-mono text-xs text-on-surface-variant uppercase">
                        Phone Number (เบอร์โทรศัพท์) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={members[activeMemberTab].phone}
                        onChange={(e) =>
                          updateMember(activeMemberTab, "phone", e.target.value)
                        }
                        placeholder="08X-XXX-XXXX"
                        className="bg-surface-container border border-white/20 rounded-xl p-3 font-hanken text-white focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs text-on-surface-variant uppercase">
                        Emergency Contact Name (ผู้ติดต่อฉุกเฉิน)
                      </label>
                      <input
                        type="text"
                        value={members[activeMemberTab].emergencyName}
                        onChange={(e) =>
                          updateMember(
                            activeMemberTab,
                            "emergencyName",
                            e.target.value
                          )
                        }
                        placeholder="ชื่อผู้ติดต่อฉุกเฉิน"
                        className="bg-surface-container border border-white/20 rounded-xl p-3 font-hanken text-white focus:outline-none focus:border-primary-container"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs text-on-surface-variant uppercase">
                        Emergency Phone (เบอร์ผู้ติดต่อฉุกเฉิน)
                      </label>
                      <input
                        type="tel"
                        value={members[activeMemberTab].emergencyPhone}
                        onChange={(e) =>
                          updateMember(
                            activeMemberTab,
                            "emergencyPhone",
                            e.target.value
                          )
                        }
                        placeholder="08X-XXX-XXXX"
                        className="bg-surface-container border border-white/20 rounded-xl p-3 font-hanken text-white focus:outline-none focus:border-primary-container"
                      />
                    </div>
                  </div>
                )}
              </fieldset>

              {/* Form Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={addMember}
                  disabled={members.length >= 5}
                  className="w-full sm:w-auto px-6 py-3 border border-white/20 rounded-xl font-mono text-xs text-white hover:bg-white/10 transition-colors uppercase disabled:opacity-40"
                >
                  + เพิ่มสมาชิกอีกคน
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-primary-container text-on-primary font-sora text-sm font-bold uppercase rounded-xl hover:bg-primary-fixed transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-95 flex items-center justify-center gap-2"
                >
                  ยืนยันการลงทะเบียน
                  <span className="material-symbols-outlined text-lg">
                    check_circle
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STEP 4: SUCCESS CONFIRMATION */}
      {step === 4 && (
        <div className="z-10 w-full max-w-lg text-center">
          <div className="bg-surface-container-low/90 backdrop-blur-2xl border border-primary-container/40 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,240,255,0.2)] space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary-container/20 border-2 border-primary-container flex items-center justify-center mx-auto text-primary-container shadow-[0_0_20px_rgba(0,240,255,0.6)]">
              <span className="material-symbols-outlined text-4xl">
                task_alt
              </span>
            </div>

            <span className="font-mono text-xs text-primary-container tracking-widest uppercase bg-primary-container/10 px-4 py-1.5 rounded-full border border-primary-container/30 inline-block">
              Registration Complete
            </span>

            <h1 className="font-sora text-3xl font-extrabold text-white">
              ลงทะเบียนสำเร็จแล้ว!
            </h1>

            <p className="font-hanken text-on-surface-variant text-sm leading-relaxed">
              ขอแสดงความยินดี ทีม{" "}
              <span className="text-primary-container font-bold font-sora">
                &quot;{teamName}&quot;
              </span>{" "}
              ได้ลงทะเบียนเข้าร่วมการแข่งขัน HealthHack 2026 เรียบร้อยแล้ว
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-left space-y-2">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-on-surface-variant">REGISTRATION ID:</span>
                <span className="text-primary-container font-bold">
                  HH2026-REG-{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-on-surface-variant">สมาชิกในทีม:</span>
                <span className="text-white">{members.length} คน</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">อีเมลยืนยัน:</span>
                <span className="text-white">{email}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/schedule"
                className="w-full py-3.5 bg-primary-container text-on-primary font-sora text-sm font-bold rounded-xl hover:bg-primary-fixed transition-all shadow-lg"
              >
                ดูรายละเอียดกำหนดการ
              </Link>
              <Link
                href="/"
                className="w-full py-3 border border-white/20 text-white font-mono text-xs uppercase rounded-xl hover:bg-white/10 transition-colors"
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
