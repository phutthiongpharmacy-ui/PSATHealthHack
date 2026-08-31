import assert from "node:assert/strict";
import test from "node:test";
import * as formUtilities from "./form.ts";
import { buildRegistrationPayload, createEmptyMember, registrationRecordToForm, validateRegistrationForm } from "./form.ts";
import type { RegistrationForm, TeamRegistrationRecord } from "./types.ts";

test("distributes pasted OTP digits across all six inputs", () => {
  const applyOtpInput = Reflect.get(formUtilities, "applyOtpInput");
  assert.equal(typeof applyOtpInput, "function");
  assert.deepEqual(applyOtpInput("", 0, "123456"), { otp: "123456", focusIndex: 5 });
  assert.deepEqual(applyOtpInput("", 4, "123-456"), { otp: "123456", focusIndex: 5 });
  assert.deepEqual(applyOtpInput("12", 2, "3456"), { otp: "123456", focusIndex: 5 });
  assert.deepEqual(applyOtpInput("12", 2, "3"), { otp: "123", focusIndex: 3 });
  assert.deepEqual(applyOtpInput("123456", 2, ""), { otp: "12456", focusIndex: 2 });
});

test("reports required-field completion for member tabs", () => {
  const getMemberCompletion = Reflect.get(formUtilities, "getMemberCompletion");
  assert.equal(typeof getMemberCompletion, "function");
  const member = validForm().members[0];
  assert.deepEqual(getMemberCompletion(member, "higher_education"), { completed: 12, total: 12 });
  assert.deepEqual(getMemberCompletion({ ...member, faculty: "", lineId: "" }, "higher_education"), { completed: 10, total: 12 });
  assert.deepEqual(getMemberCompletion({ ...member, university: "", faculty: "", school: "School", schoolGrade: "m5" }, "upper_secondary"), { completed: 12, total: 12 });
});

test("only allows members added beyond the required minimum to be removed", () => {
  const canRemoveMember = Reflect.get(formUtilities, "canRemoveMember");
  assert.equal(typeof canRemoveMember, "function");
  assert.equal(canRemoveMember(0, 4, 3), false);
  assert.equal(canRemoveMember(1, 4, 3), false);
  assert.equal(canRemoveMember(2, 4, 3), false);
  assert.equal(canRemoveMember(3, 4, 3), true);
  assert.equal(canRemoveMember(4, 5, 3), true);
});

test("maps registration steps to completed, active, and upcoming states", () => {
  const getRegistrationStepState = Reflect.get(formUtilities, "getRegistrationStepState");
  assert.equal(typeof getRegistrationStepState, "function");
  assert.deepEqual(
    [1, 2, 3, 4, 5].map((number) => getRegistrationStepState(number, 3)),
    ["completed", "completed", "active", "upcoming", "upcoming"],
  );
});

test("provides the current step summary for the compact mobile progress view", () => {
  const getRegistrationStepSummary = Reflect.get(formUtilities, "getRegistrationStepSummary");
  assert.equal(typeof getRegistrationStepSummary, "function");
  assert.deepEqual(
    getRegistrationStepSummary(["ยืนยันอีเมล", "กรอก OTP", "ข้อมูลทีม", "ตรวจสอบและจ่าย", "ผลการชำระ"], 3),
    { number: 3, total: 5, label: "ข้อมูลทีม" },
  );
});

function validForm(): RegistrationForm {
  return {
    teamName: "Future Rx",
    categoryId: 10,
    members: [0, 1, 2].map((index) => ({
      ...createEmptyMember(index, index === 0 ? "leader@example.com" : ""),
      title: index === 1 ? "miss" : "mr",
      firstName: `First${index}`,
      lastName: `Last${index}`,
      nickname: `Nick${index}`,
      foodDrugAllergies: "ไม่มี",
      age: "20",
      university: "มหาวิทยาลัยตัวอย่าง",
      faculty: "คณะวิทยาศาสตร์",
      isPharmacyStudent: index === 0,
      email: index === 0 ? "leader@example.com" : `member${index}@example.com`,
      phoneNumber: "0812345678",
      lineId: `line${index}`,
      emergencyContactName: "Emergency Person",
      emergencyContactPhone: "0899999999",
    })),
  };
}

test("maps higher-education members to the API payload", () => {
  const payload = buildRegistrationPayload(validForm(), "higher_education");
  assert.equal(payload.members[0].memberRole, "leader");
  assert.equal(payload.members[1].position, 2);
  assert.equal(payload.members[0].university, "มหาวิทยาลัยตัวอย่าง");
  assert.equal(payload.members[0].school, null);
  assert.equal(payload.members[0].schoolGrade, null);
  assert.equal(payload.members[0].age, 20);
});

test("maps upper-secondary members and removes higher-education fields", () => {
  const form = validForm();
  form.members = form.members.map((member) => ({ ...member, university: "", faculty: "", school: "โรงเรียนตัวอย่าง", schoolGrade: "m5", isPharmacyStudent: false }));
  const payload = buildRegistrationPayload(form, "upper_secondary");
  assert.equal(payload.members[0].school, "โรงเรียนตัวอย่าง");
  assert.equal(payload.members[0].schoolGrade, "m5");
  assert.equal(payload.members[0].university, null);
  assert.equal(payload.members[0].faculty, null);
});

test("detects duplicate normalized emails and the missing pharmacy member", () => {
  const form = validForm();
  form.members[1].email = " LEADER@example.com ";
  form.members.forEach((member) => { member.isPharmacyStudent = false; });
  const errors = validateRegistrationForm(form, {
    minMembers: 3, maxMembers: 5, minAge: 15, maxAge: 30,
    educationLevel: "higher_education", pharmacyRule: "required",
  });
  assert.equal(errors.members[1]?.email, "อีเมลนี้ซ้ำกับสมาชิกคนอื่นในทีม");
  assert.equal(errors.form, "ทีมประเภทนี้ต้องมีนิสิตหรือนักศึกษาเภสัชศาสตร์อย่างน้อย 1 คน");
});

test("reports required member fields and education-specific fields", () => {
  const form: RegistrationForm = {
    teamName: "",
    categoryId: null,
    members: [createEmptyMember(0, "leader@example.com"), createEmptyMember(1), createEmptyMember(2)],
  };
  const errors = validateRegistrationForm(form, {
    minMembers: 3, maxMembers: 5, minAge: 15, maxAge: 30,
    educationLevel: "upper_secondary", pharmacyRule: "forbidden",
  });
  assert.equal(errors.teamName, "กรุณากรอกชื่อทีม");
  assert.equal(errors.categoryId, "กรุณาเลือกประเภททีม");
  assert.equal(errors.members[0]?.firstName, "กรุณากรอกชื่อ");
  assert.equal(errors.members[0]?.school, "กรุณากรอกชื่อโรงเรียน");
  assert.equal(errors.members[0]?.schoolGrade, "กรุณาเลือกระดับชั้น");
  assert.equal(errors.members[0]?.emergencyContactName, "กรุณากรอกชื่อผู้ติดต่อฉุกเฉิน");
});

test("enforces member count and configured age range and phone format", () => {
  const form = validForm();
  form.members = form.members.slice(0, 2);
  form.members[0].age = "31";
  form.members[0].phoneNumber = "081234567"; // 9 digits
  const errors = validateRegistrationForm(form, {
    minMembers: 3, maxMembers: 5, minAge: 15, maxAge: 30,
    educationLevel: "higher_education", pharmacyRule: "required",
  });
  assert.match(errors.form ?? "", /3–5 คน/);
  assert.equal(errors.members[0]?.age, "อายุต้องอยู่ระหว่าง 15–30 ปี");
  assert.equal(errors.members[0]?.phoneNumber, "กรุณากรอกเบอร์โทรศัพท์ 10 หลัก");
});

test("hydrates an API registration for OTP resume", () => {
  const record = {
    id: "reg", registrationCode: "TR-2026-X", categoryId: 7, teamName: "Resume Team",
    leaderEmail: "leader@example.com", status: "draft", paidAt: null,
    members: [{
      id: "member", position: 1, memberRole: "leader", title: "miss", firstName: "Jane", lastName: "Doe",
      nickname: null, age: 19, university: null, faculty: null, school: "Example School", schoolGrade: "m6",
      isPharmacyStudent: false, foodDrugAllergies: null, email: "leader@example.com", phoneNumber: "0812345678",
      lineId: "jane", emergencyContactName: "Parent", emergencyContactPhone: "0899999999",
    }],
  } as TeamRegistrationRecord;
  const form = registrationRecordToForm(record);
  assert.equal(form.teamName, "Resume Team");
  assert.equal(form.categoryId, 7);
  assert.equal(form.members[0].schoolGrade, "m6");
  assert.equal(form.members[0].foodDrugAllergies, "");
});
