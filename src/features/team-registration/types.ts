export type EducationLevel = "higher_education" | "upper_secondary";
export type PharmacyRule = "required" | "forbidden";
export type MemberTitle = "mr" | "miss" | "";
export type SchoolGrade = "m4" | "m5" | "m6" | "";

export interface MemberForm {
  title: MemberTitle;
  firstName: string;
  lastName: string;
  nickname: string;
  age: string;
  university: string;
  faculty: string;
  school: string;
  schoolGrade: SchoolGrade;
  isPharmacyStudent: boolean;
  foodDrugAllergies: string;
  email: string;
  phoneNumber: string;
  lineId: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export interface RegistrationForm {
  teamName: string;
  categoryId: number | null;
  members: MemberForm[];
}

export interface RegistrationRules {
  minMembers: number;
  maxMembers: number;
  minAge: number;
  maxAge: number;
  educationLevel: EducationLevel;
  pharmacyRule: PharmacyRule;
}

export interface FieldErrors {
  form?: string;
  teamName?: string;
  categoryId?: string;
  members: Array<Partial<Record<keyof MemberForm, string>>>;
}

export interface TeamMemberPayload {
  position: number;
  memberRole: "leader" | "member";
  title: Exclude<MemberTitle, "">;
  firstName: string;
  lastName: string;
  nickname: string | null;
  age: number;
  university: string | null;
  faculty: string | null;
  school: string | null;
  schoolGrade: Exclude<SchoolGrade, ""> | null;
  isPharmacyStudent: boolean;
  foodDrugAllergies: string | null;
  email: string;
  phoneNumber: string;
  lineId: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export interface TeamRegistrationPayload {
  teamName: string;
  categoryId: number;
  members: TeamMemberPayload[];
}

export interface TeamCategory {
  id: number; code: string; name: string; educationLevel: EducationLevel;
  pharmacyRule: PharmacyRule; price: string | null; currency: string | null;
}

export interface TeamEventConfig {
  event: { code: string; name: string };
  registration: { opensAt: string; closesAt: string; timezone: string; isOpen: boolean; minMembers: number; maxMembers: number; minAge: number; maxAge: number };
  categories: TeamCategory[];
  activePricingRound: { code: string; name: string; startsAt: string; endsAt: string } | null;
  serverTime: string;
}

export interface ApiMember extends Omit<TeamMemberPayload, "title"> { id: string; title: "mr" | "miss" }
export interface TeamRegistrationRecord {
  id: string; registrationCode: string; categoryId: number; teamName: string;
  leaderEmail: string; status: "draft" | "ready_for_payment" | "payment_pending" | "paid" | "expired";
  paidAt: string | null; amountSnapshot?: string | null; currencySnapshot?: string | null;
  pricingRoundNameSnapshot?: string | null; members: ApiMember[];
}

export interface PaymentAttemptResponse {
  paymentAttemptId: string; referenceNo: string; amount: string; currency: "THB"; expiresAt: string;
  redirectForm: { actionUrl: string; method: "POST"; fields: Record<string, string> };
}

export interface PaymentStatusResponse {
  registrationId: string; registrationStatus: TeamRegistrationRecord["status"];
  paymentStatus: "pending" | "paid" | "failed" | "expired" | "verification_required" | null;
  referenceNo: string | null; amount: string | null; currency: "THB" | null; paidAt: string | null;
}

export interface TeamApiErrorShape { code: string; message: string; fields?: Array<{ path: string; code: string }>; requestId?: string }
