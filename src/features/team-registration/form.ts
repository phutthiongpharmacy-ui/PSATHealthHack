import type { EducationLevel, FieldErrors, MemberForm, RegistrationForm, RegistrationRules, TeamRegistrationPayload, TeamRegistrationRecord } from "./types.ts";

export function canRemoveMember(index: number, memberCount: number, minMembers: number): boolean {
  return memberCount > minMembers && index >= minMembers;
}

export function getRegistrationStepState(stepNumber: number, currentStep: number): "completed" | "active" | "upcoming" {
  if (stepNumber < currentStep) return "completed";
  if (stepNumber === currentStep) return "active";
  return "upcoming";
}

export function getRegistrationStepSummary(labels: string[], currentStep: number): { number: number; total: number; label: string } {
  const number = Math.min(Math.max(currentStep, 1), labels.length);
  return { number, total: labels.length, label: labels[number - 1] ?? "" };
}

export function getMemberCompletion(member: MemberForm, educationLevel: EducationLevel): { completed: number; total: number } {
  const requiredFields: Array<keyof MemberForm> = [
    "title", "firstName", "lastName", "nickname", "age",
    ...(educationLevel === "higher_education" ? ["university", "faculty"] as const : ["school", "schoolGrade"] as const),
    "email", "phoneNumber", "lineId", "emergencyContactName", "emergencyContactPhone",
  ];
  return {
    completed: requiredFields.filter((field) => Boolean(String(member[field]).trim())).length,
    total: requiredFields.length,
  };
}

export function applyOtpInput(currentOtp: string, inputIndex: number, rawValue: string): { otp: string; focusIndex: number } {
  const incoming = rawValue.replace(/\D/g, "").slice(0, 6);
  if (!incoming) {
    return {
      otp: `${currentOtp.slice(0, inputIndex)}${currentOtp.slice(inputIndex + 1)}`,
      focusIndex: inputIndex,
    };
  }
  const currentDigits = Array.from({ length: 6 }, (_, index) => currentOtp[index] ?? "");
  const startIndex = incoming.length === 6 ? 0 : inputIndex;
  incoming.split("").forEach((digit, offset) => {
    const targetIndex = startIndex + offset;
    if (targetIndex < 6) currentDigits[targetIndex] = digit;
  });
  return {
    otp: currentDigits.join("").slice(0, 6),
    focusIndex: Math.min(startIndex + Math.max(incoming.length, 1), 5),
  };
}

export function registrationRecordToForm(_record: TeamRegistrationRecord): RegistrationForm {
  return {
    teamName: _record.teamName,
    categoryId: _record.categoryId,
    members: _record.members.toSorted((left, right) => left.position - right.position).map((member) => ({
      title: member.title,
      firstName: member.firstName,
      lastName: member.lastName,
      nickname: member.nickname ?? "",
      age: String(member.age),
      university: member.university ?? "",
      faculty: member.faculty ?? "",
      school: member.school ?? "",
      schoolGrade: member.schoolGrade ?? "",
      isPharmacyStudent: member.isPharmacyStudent,
      foodDrugAllergies: member.foodDrugAllergies ?? "",
      email: member.email,
      phoneNumber: member.phoneNumber,
      lineId: member.lineId,
      emergencyContactName: member.emergencyContactName,
      emergencyContactPhone: member.emergencyContactPhone,
    })),
  };
}

export function createEmptyMember(_index: number, _leaderEmail = ""): MemberForm {
  return {
    title: "", firstName: "", lastName: "", nickname: "", age: "",
    university: "", faculty: "", school: "", schoolGrade: "",
    isPharmacyStudent: false, foodDrugAllergies: "", email: _leaderEmail,
    phoneNumber: "", lineId: "", emergencyContactName: "", emergencyContactPhone: "",
  };
}

export function buildRegistrationPayload(_form: RegistrationForm, _educationLevel: EducationLevel): TeamRegistrationPayload {
  return {
    teamName: _form.teamName.trim(),
    categoryId: _form.categoryId as number,
    members: _form.members.map((member, index) => ({
      position: index + 1,
      memberRole: index === 0 ? "leader" : "member",
      title: member.title as "mr" | "miss",
      firstName: member.firstName.trim(), lastName: member.lastName.trim(), nickname: member.nickname.trim() || null,
      age: Number(member.age),
      university: _educationLevel === "higher_education" ? member.university.trim() || null : null,
      faculty: _educationLevel === "higher_education" ? member.faculty.trim() || null : null,
      school: _educationLevel === "upper_secondary" ? member.school.trim() || null : null,
      schoolGrade: _educationLevel === "upper_secondary" ? member.schoolGrade || null : null,
      isPharmacyStudent: member.isPharmacyStudent,
      foodDrugAllergies: member.foodDrugAllergies.trim() || null,
      email: member.email.trim(), phoneNumber: member.phoneNumber.trim(), lineId: member.lineId.trim(),
      emergencyContactName: member.emergencyContactName.trim(), emergencyContactPhone: member.emergencyContactPhone.trim(),
    })),
  };
}

export function validateRegistrationForm(_form: RegistrationForm, _rules: RegistrationRules): FieldErrors {
  const errors: FieldErrors = { members: _form.members.map(() => ({})) };
  if (!_form.teamName.trim()) errors.teamName = "กรุณากรอกชื่อทีม";
  if (!_form.categoryId) errors.categoryId = "กรุณาเลือกประเภททีม";
  if (_form.members.length < _rules.minMembers || _form.members.length > _rules.maxMembers) {
    errors.form = `ทีมต้องมีสมาชิก ${_rules.minMembers}–${_rules.maxMembers} คน`;
  }
  const seen = new Map<string, number>();
  _form.members.forEach((member, index) => {
    const memberErrors = errors.members[index];
    if (!member.title) memberErrors.title = "กรุณาเลือกคำนำหน้า";
    if (!member.firstName.trim()) memberErrors.firstName = "กรุณากรอกชื่อ";
    if (!member.lastName.trim()) memberErrors.lastName = "กรุณากรอกนามสกุล";
    if (!member.nickname.trim()) memberErrors.nickname = "กรุณากรอกชื่อเล่น";
    const age = Number(member.age);
    if (!Number.isInteger(age) || age < _rules.minAge || age > _rules.maxAge) memberErrors.age = `อายุต้องอยู่ระหว่าง ${_rules.minAge}–${_rules.maxAge} ปี`;
    if (_rules.educationLevel === "higher_education") {
      if (!member.university.trim()) memberErrors.university = "กรุณากรอกมหาวิทยาลัย";
      if (!member.faculty.trim()) memberErrors.faculty = "กรุณากรอกคณะ";
    } else {
      if (!member.school.trim()) memberErrors.school = "กรุณากรอกชื่อโรงเรียน";
      if (!member.schoolGrade) memberErrors.schoolGrade = "กรุณาเลือกระดับชั้น";
    }
    const normalized = member.email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalized)) memberErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
    else if (seen.has(normalized)) memberErrors.email = "อีเมลนี้ซ้ำกับสมาชิกคนอื่นในทีม";
    else if (normalized) seen.set(normalized, index);
    if (member.phoneNumber.trim().length < 8) memberErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์";
    if (!member.lineId.trim()) memberErrors.lineId = "กรุณากรอก Line ID";
    if (!member.emergencyContactName.trim()) memberErrors.emergencyContactName = "กรุณากรอกชื่อผู้ติดต่อฉุกเฉิน";
    if (member.emergencyContactPhone.trim().length < 8) memberErrors.emergencyContactPhone = "กรุณากรอกเบอร์ผู้ติดต่อฉุกเฉิน";
  });
  const pharmacyCount = _form.members.filter((member) => member.isPharmacyStudent).length;
  if (!errors.form && _rules.pharmacyRule === "required" && pharmacyCount === 0) errors.form = "ทีมประเภทนี้ต้องมีนิสิตหรือนักศึกษาเภสัชศาสตร์อย่างน้อย 1 คน";
  if (!errors.form && _rules.pharmacyRule === "forbidden" && pharmacyCount > 0) errors.form = "ทีมประเภทนี้ไม่สามารถระบุสมาชิกเป็นนักศึกษาเภสัชศาสตร์ได้";
  return errors;
}
