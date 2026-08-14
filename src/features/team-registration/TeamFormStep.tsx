"use client";

import { useState, useMemo, useRef, type ReactNode } from "react";
import { Badge, Check, ChevronDown, ChevronRight, LoaderCircle, Trash2, User, UsersRound } from "lucide-react";
import { canRemoveMember, createEmptyMember, getMemberCompletion } from "./form";
import { SystemError } from "./RegistrationFrame";
import { CustomSelect } from "./CustomSelect";
import type { FieldErrors, MemberForm, RegistrationForm, TeamCategory, TeamEventConfig } from "./types";

interface TeamFormStepProps {
  config: TeamEventConfig;
  form: RegistrationForm;
  setForm: (form: RegistrationForm) => void;
  errors: FieldErrors;
  onContinue: () => void;
  loading: boolean;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export function TeamFormStep({ config, form, setForm, errors, onContinue, loading, activeIndex, setActiveIndex }: TeamFormStepProps) {
  const [isMemberCountOpen, setIsMemberCountOpen] = useState(false);
  const memberSectionRef = useRef<HTMLDivElement>(null);
  const category = useMemo(() => config.categories.find((item) => item.id === form.categoryId) ?? null, [config.categories, form.categoryId]);
  const member = form.members[activeIndex] ?? form.members[0];
  const memberErrors = errors.members[activeIndex] ?? {};
  const educationLevel = category?.educationLevel ?? "higher_education";
  const higherCategories = config.categories.filter((item) => item.educationLevel === "higher_education");
  const secondaryCategory = config.categories.find((item) => item.educationLevel === "upper_secondary") ?? null;
  const isLastMember = activeIndex === form.members.length - 1;

  const updateMember = (update: Partial<MemberForm>) => setForm({
    ...form,
    members: form.members.map((item, index) => index === activeIndex ? { ...item, ...update } : item),
  });

  const chooseCategory = (next: TeamCategory) => setForm({
    ...form,
    categoryId: next.id,
    members: form.members.map((item) => ({
      ...item,
      university: next.educationLevel === "higher_education" ? item.university : "",
      faculty: next.educationLevel === "higher_education" ? item.faculty : "",
      school: next.educationLevel === "upper_secondary" ? item.school : "",
      schoolGrade: next.educationLevel === "upper_secondary" ? item.schoolGrade : "",
      isPharmacyStudent: next.pharmacyRule === "required" ? item.isPharmacyStudent : false,
    })),
  });

  const selectEducation = (level: "higher_education" | "upper_secondary") => {
    const next = level === "upper_secondary" ? secondaryCategory : higherCategories[0];
    if (next) chooseCategory(next);
  };

  const setMemberCount = (targetCount: number) => {
    if (targetCount === form.members.length) {
      setIsMemberCountOpen(false);
      return;
    }
    if (targetCount > form.members.length) {
      const diff = targetCount - form.members.length;
      const added = Array.from({ length: diff }, (_, i) => createEmptyMember(form.members.length + i));
      const nextMembers = [...form.members, ...added];
      setForm({ ...form, members: nextMembers });
    } else {
      const nextMembers = form.members.slice(0, targetCount);
      setForm({ ...form, members: nextMembers });
      if (activeIndex >= targetCount) {
        setActiveIndex(targetCount - 1);
      }
    }
    setIsMemberCountOpen(false);
  };

  const removeMember = (index: number) => {
    if (!canRemoveMember(index, form.members.length, config.registration.minMembers)) return;
    setForm({ ...form, members: form.members.filter((_, memberIndex) => memberIndex !== index) });
    setActiveIndex(Math.max(0, Math.min(activeIndex === index ? index - 1 : activeIndex, form.members.length - 2)));
  };

  const isComplete = (item: MemberForm) => {
    const progress = getMemberCompletion(item, educationLevel);
    return progress.completed === progress.total;
  };

  const handleNextMember = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (activeIndex < form.members.length - 1) {
      setActiveIndex(activeIndex + 1);
      setTimeout(() => {
        memberSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  return <div className="mx-auto my-0.5 sm:my-4 w-full max-w-3xl">
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (isLastMember) {
          onContinue();
        } else {
          handleNextMember(event);
        }
      }}
      className="space-y-2.5 sm:space-y-6 rounded-2xl sm:rounded-3xl border border-hh-border/60 bg-hh-surface/90 p-2.5 sm:p-6 lg:p-8"
    >
      <header className="space-y-0.5 border-b border-hh-border/40 pb-1.5 sm:pb-4 text-left">
        <span className="hidden sm:inline-block rounded-full border border-hh-cyan/30 bg-hh-cyan/10 px-2.5 sm:px-3 py-0.5 sm:py-1 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wide text-hh-cyan">
          Step 03 • Registration form
        </span>
        <h1 className="font-sora text-sm sm:text-2xl md:text-3xl font-extrabold text-white">
          ข้อมูลการสมัครสมาชิกและทีม
        </h1>
        <p className="text-[10px] sm:text-sm leading-tight text-hh-text-muted">
          สมาชิกขั้นต่ำ {config.registration.minMembers} คน แต่ไม่เกิน {config.registration.maxMembers} คนต่อทีม
        </p>
      </header>

      {errors.form ? <SystemError message={errors.form} /> : null}

      {/* Section 1: Team General Info */}
      <section className="space-y-2 sm:space-y-5 rounded-xl sm:rounded-2xl border border-hh-border/60 bg-hh-bg/60 p-2.5 sm:p-6">
        <SectionTitle icon={<UsersRound size={16} />} title="ส่วนที่ 1: ข้อมูลทั่วไปของทีม" />
        <Field label="ชื่อทีม (Team Name)" required error={errors.teamName}>
          <input
            maxLength={50}
            value={form.teamName}
            onChange={(event) => setForm({ ...form, teamName: event.target.value })}
            className={inputClass(errors.teamName)}
            placeholder="ตั้งชื่อทีมของคุณ เช่น PharmaInnovators 2026"
          />
        </Field>

        <div className="space-y-2 sm:space-y-4">
          <div className="space-y-0.5">
            <Label required>ข้อมูลประเภททีม</Label>
            <p className="hidden sm:block text-sm leading-relaxed text-hh-text-muted">
              เลือกตามลำดับ ระบบจะใช้ข้อมูลนี้กำหนดแบบฟอร์มสมาชิกและราคาสมัคร
            </p>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <StepNumber completed={Boolean(category)}>1</StepNumber>
              <span className="text-xs sm:text-sm font-bold text-white">เลือกระดับการศึกษา</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 rounded-xl border border-hh-border/60 bg-hh-bg/70 p-1 sm:p-1.5">
              <EducationChoice
                selected={educationLevel === "higher_education"}
                label="ระดับอุดมศึกษา"
                description="มหาวิทยาลัย"
                onClick={() => selectEducation("higher_education")}
              />
              <EducationChoice
                selected={educationLevel === "upper_secondary"}
                label="มัธยมศึกษาตอนปลาย"
                description="ม.4–ม.6"
                onClick={() => selectEducation("upper_secondary")}
              />
            </div>
          </div>

          {educationLevel === "higher_education" ? (
            <div className="space-y-1 sm:space-y-3 sm:border-l sm:border-dashed sm:border-hh-border/70 sm:pl-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <StepNumber completed={higherCategories.some((item) => item.id === form.categoryId)}>2</StepNumber>
                <span className="text-xs sm:text-sm font-bold text-white">เลือกประเภททีมอุดมศึกษา</span>
              </div>

              {/* Mobile View: Segmented 2-column box matching top education box */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 rounded-xl border border-hh-border/60 bg-hh-bg/70 p-1 sm:p-1.5 sm:hidden">
                {higherCategories.map((item) => (
                  <MobileSegmentChoice
                    key={item.id}
                    selected={form.categoryId === item.id}
                    label={item.pharmacyRule === "required" ? "มีนิสิตเภสัชฯ" : "ทีมทั่วไป"}
                    description={item.pharmacyRule === "required" ? "มี นศ.เภสัชฯ ≥ 1 คน" : "ไม่มี นศ.เภสัชฯ"}
                    price={item.price}
                    onClick={() => chooseCategory(item)}
                  />
                ))}
              </div>

              {/* Desktop View (sm+): 100% untouched original full-width cards */}
              <div className="hidden sm:grid grid-cols-1 gap-3">
                {higherCategories.map((item) => (
                  <ChoiceCard
                    key={item.id}
                    selected={form.categoryId === item.id}
                    title={item.pharmacyRule === "required" ? "มีนิสิต/นักศึกษาเภสัชศาสตร์" : "ทีมทั่วไป"}
                    description={getCategoryDescription(item)}
                    price={item.price}
                    onClick={() => chooseCategory(item)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-hh-cyan/30 bg-hh-cyan/10 px-3 py-2 sm:px-4 sm:py-3">
              <p className="text-xs sm:text-sm font-bold text-white">ทีมระดับมัธยมศึกษาตอนปลาย</p>
              <p className="mt-0.5 text-[10px] sm:text-xs leading-relaxed text-hh-text-muted">ระดับนี้ไม่มีประเภททีมย่อย สมาชิกทุกคนต้องกำลังศึกษาอยู่ระดับ ม.4–ม.6</p>
            </div>
          )}

          {category ? (
            <div className="flex items-center justify-between gap-2 rounded-lg sm:rounded-xl border-l-3 sm:border-l-4 border-hh-action bg-hh-bg/80 px-2.5 py-1.5 sm:px-4 sm:py-3">
              <div>
                <p className="text-[9px] sm:text-xs font-bold uppercase tracking-wide text-hh-text-muted">ประเภทที่เลือก</p>
                <p className="mt-0.5 text-[11px] sm:text-sm font-bold leading-tight text-white">{getCategoryTitle(category)}</p>
              </div>
              <span className="font-mono text-xs sm:text-base font-extrabold text-hh-action whitespace-nowrap">{category.price ? `฿${Number(category.price).toLocaleString()} / ทีม` : "—"}</span>
            </div>
          ) : null}
        </div>
        {errors.categoryId ? <p className="text-xs sm:text-sm text-red-300">{errors.categoryId}</p> : null}
      </section>

      {/* Section 2: Member Info */}
      <section ref={memberSectionRef} className="scroll-mt-24 sm:scroll-mt-28 space-y-4 sm:space-y-5 rounded-xl sm:rounded-2xl border border-hh-border/60 bg-hh-bg/50 p-3.5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 border-b border-hh-border/30 pb-3 sm:flex-row sm:items-center">
          <SectionTitle icon={<Badge size={17} />} title={`ส่วนที่ 2: ข้อมูลสมาชิกในทีม (${form.members.length}/${config.registration.maxMembers} คน)`} borderless />

          <div className="relative self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setIsMemberCountOpen(!isMemberCountOpen)}
              className="flex items-center gap-2 rounded-full border border-hh-cyan/50 bg-hh-cyan/15 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-hh-cyan transition hover:bg-hh-cyan/25 cursor-pointer"
            >
              <UsersRound size={15} className="text-hh-cyan shrink-0" />
              <span>{form.members.length} คน</span>
              <ChevronDown size={15} className={`text-hh-cyan transition-transform duration-200 shrink-0 ${isMemberCountOpen ? "rotate-180" : ""}`} />
            </button>

            {isMemberCountOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsMemberCountOpen(false)}
                />
                <div className="absolute right-0 top-full mt-1.5 z-30 w-36 overflow-hidden rounded-xl border border-hh-cyan/50 bg-[#041a1d] shadow-[0_10px_30px_rgba(0,0,0,0.9)] backdrop-blur-2xl divide-y divide-hh-border/40">
                  {[3, 4, 5].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setMemberCount(count)}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-xs font-bold font-sora transition cursor-pointer ${form.members.length === count
                        ? "bg-hh-cyan/20 text-hh-cyan"
                        : "text-white hover:bg-hh-cyan/10 hover:text-hh-cyan"
                        }`}
                    >
                      <span>{count} คน</span>
                      {form.members.length === count && <Check size={14} className="text-hh-cyan" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Member Tabs Switcher */}
        <div className="-mx-1 flex gap-1.5 sm:gap-2 overflow-x-auto px-1 pb-2 scrollbar-none items-center">
          {form.members.map((item, index) => {
            const complete = isComplete(item);
            const isActive = activeIndex === index;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${isActive
                  ? "bg-hh-cyan text-black border border-hh-cyan px-3.5 sm:px-4"
                  : complete
                    ? "border border-hh-emerald/40 bg-hh-emerald/20 text-hh-emerald px-2.5 sm:px-3"
                    : "border border-hh-border/60 bg-hh-surface/80 text-white hover:border-hh-cyan/60 px-2.5 sm:px-3"
                  }`}
              >
                {isActive ? (
                  <span>{index === 0 ? "★ หัวหน้าทีม" : `● สมาชิก ${index + 1}`}</span>
                ) : (
                  <span className="flex items-center gap-1">
                    {index === 0 ? (
                      <span className="text-hh-cyan font-bold">★ 1</span>
                    ) : (
                      <>
                        <User size={13} className="text-hh-cyan shrink-0" />
                        <span>{index + 1}</span>
                      </>
                    )}
                  </span>
                )}
                {complete ? <Check size={13} className={isActive ? "text-black" : "text-hh-emerald"} /> : null}
                {isActive && canRemoveMember(index, form.members.length, config.registration.minMembers) ? (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      event.stopPropagation();
                      removeMember(index);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        event.stopPropagation();
                        removeMember(index);
                      }
                    }}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-red-500/20 hover:text-red-400"
                    aria-label={`ลบสมาชิกคนที่ ${index + 1}`}
                  >
                    <Trash2 size={12} />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {member ? (
          <div className="space-y-3 pt-1">
            <MemberSectionTitle title="ข้อมูลส่วนตัว" />
            <div className="space-y-2 sm:space-y-4">
              <div className="grid grid-cols-[85px_1fr] sm:grid-cols-3 gap-2 sm:gap-4">
                <Field label="คำนำหน้า" required error={memberErrors.title}>
                  <CustomSelect
                    value={member.title}
                    options={[
                      { value: "mr", label: "นาย" },
                      { value: "miss", label: "นางสาว" },
                    ]}
                    placeholder="เลือก..."
                    ariaLabel="คำนำหน้า"
                    error={memberErrors.title}
                    onChange={(title) => updateMember({ title })}
                  />
                </Field>
                <Field label="ชื่อจริง" required error={memberErrors.firstName}>
                  <input
                    maxLength={50}
                    value={member.firstName}
                    onChange={(event) => updateMember({ firstName: event.target.value.replace(/[0-9]/g, "") })}
                    className={inputClass(memberErrors.firstName)}
                    placeholder="ชื่อจริง"
                  />
                </Field>
                <div className="col-span-2 sm:col-span-1">
                  <Field label="นามสกุล" required error={memberErrors.lastName}>
                    <input
                      maxLength={50}
                      value={member.lastName}
                      onChange={(event) => updateMember({ lastName: event.target.value.replace(/[0-9]/g, "") })}
                      className={inputClass(memberErrors.lastName)}
                      placeholder="นามสกุล"
                    />
                  </Field>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <Field label="ชื่อเล่น" required error={memberErrors.nickname}>
                  <input
                    maxLength={50}
                    value={member.nickname}
                    onChange={(event) => updateMember({ nickname: event.target.value.replace(/[0-9]/g, "") })}
                    className={inputClass(memberErrors.nickname)}
                    placeholder="ชื่อเล่น"
                  />
                </Field>
                <Field label={`อายุ (${config.registration.minAge}-30)`} required error={memberErrors.age}>
                  <input
                    type="number"
                    min={config.registration.minAge}
                    max={config.registration.maxAge}
                    value={member.age}
                    onChange={(event) => updateMember({ age: event.target.value })}
                    className={inputClass(memberErrors.age)}
                  />
                </Field>
              </div>

              {educationLevel === "higher_education" ? (
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <Field label="มหาวิทยาลัย" required error={memberErrors.university}>
                    <input
                      maxLength={50}
                      value={member.university}
                      onChange={(event) => updateMember({ university: event.target.value.replace(/[0-9]/g, "") })}
                      className={inputClass(memberErrors.university)}
                      placeholder="ชื่อมหาวิทยาลัย"
                    />
                  </Field>
                  <Field label="คณะ" required error={memberErrors.faculty}>
                    <input
                      maxLength={50}
                      value={member.faculty}
                      onChange={(event) => updateMember({ faculty: event.target.value.replace(/[0-9]/g, "") })}
                      className={inputClass(memberErrors.faculty)}
                      placeholder="ชื่อคณะ"
                    />
                  </Field>
                  {category?.pharmacyRule === "required" ? (
                    <label className="flex cursor-pointer items-start gap-2.5 sm:gap-3 rounded-xl border border-hh-cyan/30 bg-hh-cyan/5 p-2.5 sm:p-4 text-xs sm:text-sm leading-relaxed text-white col-span-2">
                      <input
                        type="checkbox"
                        checked={member.isPharmacyStudent}
                        onChange={(event) => updateMember({ isPharmacyStudent: event.target.checked })}
                        className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 accent-cyan-400"
                      />
                      <span>
                        <strong className="text-white">สมาชิกคนนี้เป็นนิสิต/นักศึกษาเภสัชศาสตร์</strong>
                        <span className="mt-0.5 block text-[10px] sm:text-xs text-hh-text-muted">ทีมประเภทนี้ต้องเลือกอย่างน้อย 1 คน</span>
                      </span>
                    </label>
                  ) : null}
                </div>
              ) : (
                <div className="grid grid-cols-[1fr_85px] sm:grid-cols-3 gap-2 sm:gap-4">
                  <Field label="ชื่อโรงเรียน" required error={memberErrors.school}>
                    <input
                      maxLength={50}
                      value={member.school}
                      onChange={(event) => updateMember({ school: event.target.value.replace(/[0-9]/g, "") })}
                      className={inputClass(memberErrors.school)}
                      placeholder="ชื่อโรงเรียน"
                    />
                  </Field>
                  <Field label="ระดับชั้น" required error={memberErrors.schoolGrade}>
                    <CustomSelect
                      value={member.schoolGrade}
                      options={[
                        { value: "m4", label: "ม.4" },
                        { value: "m5", label: "ม.5" },
                        { value: "m6", label: "ม.6" },
                      ]}
                      placeholder="ชั้น"
                      ariaLabel="ระดับชั้น"
                      error={memberErrors.schoolGrade}
                      onChange={(schoolGrade) => updateMember({ schoolGrade })}
                    />
                  </Field>
                </div>
              )}

              <Field label="แพ้อาหาร / ยา">
                <input
                  maxLength={50}
                  value={member.foodDrugAllergies}
                  onChange={(event) => updateMember({ foodDrugAllergies: event.target.value })}
                  className={inputClass()}
                  placeholder="หากมีโปรดระบุ"
                />
              </Field>
            </div>

            <MemberSectionTitle title="ข้อมูลการติดต่อ" />
            <div className="space-y-2 sm:space-y-4">
              <Field label="Email" required error={memberErrors.email}>
                <input
                  type="email"
                  maxLength={50}
                  readOnly={activeIndex === 0}
                  value={member.email}
                  onChange={(event) => updateMember({ email: event.target.value })}
                  className={`${inputClass(memberErrors.email)} ${activeIndex === 0 ? "cursor-not-allowed opacity-65" : ""}`}
                  placeholder="leader@example.com"
                />
              </Field>
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <Field label="เบอร์โทรศัพท์" required error={memberErrors.phoneNumber}>
                  <input
                    type="tel"
                    maxLength={10}
                    value={member.phoneNumber}
                    onChange={(event) => updateMember({ phoneNumber: event.target.value.replace(/\D/g, "").slice(0, 10) })}
                    className={inputClass(memberErrors.phoneNumber)}
                    placeholder="08X-XXX-XXXX"
                  />
                </Field>
                <Field label="Line ID" required error={memberErrors.lineId}>
                  <input
                    maxLength={50}
                    value={member.lineId}
                    onChange={(event) => updateMember({ lineId: event.target.value })}
                    className={inputClass(memberErrors.lineId)}
                    placeholder="Line ID"
                  />
                </Field>
              </div>
            </div>

            <MemberSectionTitle title="ผู้ติดต่อฉุกเฉิน" />
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <Field label="ชื่อผู้ติดต่อฉุกเฉิน" required error={memberErrors.emergencyContactName}>
                <input
                  maxLength={50}
                  value={member.emergencyContactName}
                  onChange={(event) => updateMember({ emergencyContactName: event.target.value.replace(/[0-9]/g, "") })}
                  className={inputClass(memberErrors.emergencyContactName)}
                  placeholder="ชื่อ-นามสกุล"
                />
              </Field>
              <Field label="เบอร์ผู้ติดต่อฉุกเฉิน" required error={memberErrors.emergencyContactPhone}>
                <input
                  type="tel"
                  maxLength={10}
                  value={member.emergencyContactPhone}
                  onChange={(event) => updateMember({ emergencyContactPhone: event.target.value.replace(/\D/g, "").slice(0, 10) })}
                  className={inputClass(memberErrors.emergencyContactPhone)}
                  placeholder="08X-XXX-XXXX"
                />
              </Field>
            </div>
          </div>
        ) : null}
      </section>

      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-hh-border/40 pt-3.5 sm:pt-4 gap-3">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-hh-text-muted font-sora font-semibold self-start sm:self-auto">
          <UsersRound size={15} className="text-hh-cyan shrink-0" />
          <span>สมาชิกในทีมทั้งหมด: <strong className="text-hh-cyan font-bold">{form.members.length} คน</strong></span>
        </div>

        {isLastMember ? (
          <button
            type="submit"
            disabled={loading || !category || category.price === null}
            className="flex min-h-11 sm:min-h-12 w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-hh-action px-5 py-3 sm:py-4 text-xs sm:text-base font-extrabold text-black transition hover:bg-orange-400 disabled:opacity-50 sm:w-auto sm:px-8 cursor-pointer"
          >
            {loading ? <LoaderCircle className="animate-spin" size={17} /> : <Check size={17} />} ยืนยันข้อมูลและตรวจสอบ
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNextMember}
            className="flex min-h-11 sm:min-h-12 w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-hh-cyan px-5 py-3 sm:py-4 text-xs sm:text-base font-extrabold text-black transition hover:bg-cyan-300 sm:w-auto sm:px-8 cursor-pointer"
          >
            <span>คนถัดไป</span>
            <ChevronRight size={17} />
          </button>
        )}
      </div>
    </form>
  </div>;
}

function getCategoryTitle(category: TeamCategory) {
  if (category.educationLevel === "upper_secondary") return "มัธยมศึกษาตอนปลาย";
  return category.pharmacyRule === "required" ? "อุดมศึกษา · มีนิสิต/นักศึกษาเภสัชศาสตร์" : "อุดมศึกษา · ทีมทั่วไป";
}
function getCategoryDescription(category: TeamCategory) {
  if (category.educationLevel === "upper_secondary") return "สำหรับนักเรียนระดับชั้น ม.4–ม.6";
  return category.pharmacyRule === "required" ? "ต้องมีสมาชิกคณะเภสัชศาสตร์อย่างน้อย 1 คน" : "ไม่มีนิสิตหรือนักศึกษาเภสัชศาสตร์ในทีม";
}
function StepNumber({ completed, children }: { completed: boolean; children: ReactNode }) {
  return <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-extrabold ${completed ? "bg-hh-emerald text-black" : "bg-hh-cyan/15 text-hh-cyan"}`}>{completed ? <Check size={15} /> : children}</span>;
}
function EducationChoice({ selected, label, description, onClick }: { selected: boolean; label: string; description: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`min-h-16 rounded-lg px-4 py-3 text-left transition cursor-pointer sm:text-center ${selected
        ? "bg-hh-cyan/20 text-white shadow-sm"
        : "text-hh-text-muted hover:bg-white/5 hover:text-white"
        }`}
    >
      <span className="block text-sm font-bold leading-snug">{label}</span>
      <span className="mt-1 block text-xs leading-relaxed">{description}</span>
    </button>
  );
}
function MobileSegmentChoice({
  selected,
  label,
  description,
  price,
  onClick,
}: {
  selected: boolean;
  label: string;
  description: string;
  price?: string | null;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`min-h-16 rounded-lg px-2.5 py-3 text-center transition cursor-pointer flex flex-col items-center justify-center ${selected
        ? "bg-hh-cyan/20 text-white shadow-sm"
        : "text-hh-text-muted hover:bg-white/5 hover:text-white"
        }`}
    >
      <span className="block text-xs font-bold leading-tight">{label}</span>
      <span className="mt-0.5 block text-[10px] leading-relaxed text-hh-text-muted">{description}</span>
      {price ? (
        <span className="mt-1 block font-mono text-[11px] font-extrabold text-hh-action">
          ฿{Number(price).toLocaleString()} <span className="text-[9px] text-hh-text-muted font-normal">/ ทีม</span>
        </span>
      ) : null}
    </button>
  );
}
function ChoiceCard({
  selected,
  title,
  description,
  price,
  onClick,
}: {
  selected: boolean;
  title: string;
  description: string;
  price?: string | null;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`grid w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-1 rounded-xl border p-4 text-left transition cursor-pointer sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center ${selected
        ? "border-hh-cyan bg-hh-cyan/15 text-white shadow-[0_0_15px_rgba(99,210,229,.2)]"
        : "border-hh-border/60 bg-hh-bg/40 text-hh-text-muted hover:border-hh-border hover:bg-white/5"
        }`}
    >
      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-hh-cyan" : "border-hh-border"}`}>
        {selected ? <span className="h-2.5 w-2.5 rounded-full bg-hh-cyan" /> : null}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-bold leading-snug text-white">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-hh-text-muted">{description}</span>
      </span>
      <span className="col-start-2 mt-2 whitespace-nowrap font-mono text-sm font-extrabold text-hh-action sm:col-start-3 sm:row-start-1 sm:mt-0 sm:text-right">
        {price ? <>฿{Number(price).toLocaleString()} <span className="text-xs text-hh-text-muted">/ ทีม</span></> : "—"}
      </span>
    </button>
  );
}
function SectionTitle({ icon, title, borderless = false }: { icon: ReactNode; title: string; borderless?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${borderless ? "" : "border-b border-hh-border/30 pb-3"}`}>
      <span className="text-hh-cyan flex items-center justify-center shrink-0 -translate-y-[2px]">{icon}</span>
      <h2 className="font-sora text-base font-bold text-white sm:text-lg leading-tight flex items-center">{title}</h2>
    </div>
  );
}
function MemberSectionTitle({ title }: { title: string }) {
  return <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-hh-cyan/80"><span>{title}</span><span className="h-px flex-1 bg-hh-border/30" /></div>;
}
function Label({ children, required = false }: { children: ReactNode; required?: boolean }) {
  return <span className="text-sm font-bold text-white">{children}{required ? <span className="ml-1 text-hh-action">*</span> : null}</span>;
}
function Field({ label, required = false, error, children }: { label: string; required?: boolean; error?: string; children: ReactNode }) {
  return <label className="block space-y-2"><Label required={required}>{label}</Label>{children}{error ? <span className="block text-sm leading-relaxed text-red-300">{error}</span> : null}</label>;
}
function inputClass(error?: string) {
  return `h-11 sm:h-12 w-full rounded-full border bg-hh-bg px-3.5 sm:px-4 text-xs sm:text-sm text-white outline-none transition placeholder:text-hh-text-muted/45 focus:ring-2 ${error ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/20" : "border-hh-border focus:border-hh-cyan focus:ring-hh-cyan/30"
    }`;
}
