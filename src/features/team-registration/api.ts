import type {
  PaymentAttemptResponse,
  PaymentStatusResponse,
  TeamApiErrorShape,
  TeamEventConfig,
  TeamRegistrationPayload,
  TeamRegistrationRecord,
} from "./types";

export class TeamApiError extends Error {
  code: string;
  status: number;
  fields: TeamApiErrorShape["fields"];

  constructor(
    code: string,
    message: string,
    status: number,
    fields: TeamApiErrorShape["fields"] = [],
  ) {
    super(message);
    this.name = "TeamApiError";
    this.code = code;
    this.status = status;
    this.fields = fields;
  }
}

export const DEFAULT_FALLBACK_CONFIG: TeamEventConfig = {
  event: { code: "health-hack-2026", name: "PSAT HealthHack 2026" },
  registration: {
    opensAt: "2026-08-15T00:00:00Z",
    closesAt: "2026-09-20T23:59:59Z",
    timezone: "Asia/Bangkok",
    isOpen: true,
    minMembers: 3,
    maxMembers: 5,
    minAge: 15,
    maxAge: 25,
  },
  categories: [
    {
      id: 1,
      code: "higher_edu_pharmacy",
      name: "ระดับอุดมศึกษา (ทีมที่มีนิสิต/นักศึกษาเภสัชฯ)",
      educationLevel: "higher_education",
      pharmacyRule: "required",
      price: "700.00",
      currency: "THB",
    },
    {
      id: 2,
      code: "higher_edu_general",
      name: "ระดับอุดมศึกษา (ทีมทั่วไป)",
      educationLevel: "higher_education",
      pharmacyRule: "forbidden",
      price: "750.00",
      currency: "THB",
    },
    {
      id: 3,
      code: "upper_sec",
      name: "ระดับมัธยมศึกษาตอนปลาย",
      educationLevel: "upper_secondary",
      pharmacyRule: "forbidden",
      price: "750.00",
      currency: "THB",
    },
  ],
  activePricingRound: {
    code: "early_bird",
    name: "Early Bird",
    startsAt: "2026-08-15T00:00:00Z",
    endsAt: "2026-09-20T23:59:59Z",
  },
  serverTime: new Date().toISOString(),
};

interface ClientOptions {
  baseUrl: string;
  eventCode: string;
  fetchImpl?: typeof fetch;
}
interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  error?: TeamApiErrorShape;
}

const MOCK_LEADER_EMAIL = "leader@example.com";

function isMockLeaderEmail(email: string): boolean {
  return email.trim().toLowerCase() === MOCK_LEADER_EMAIL;
}

function getBearerToken(init: RequestInit): string | null {
  const authorization = new Headers(init.headers).get("authorization");
  return authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : null;
}

function isMockAccessToken(
  init: RequestInit,
  mockAccessTokens: Set<string>,
): boolean {
  const token = getBearerToken(init);
  return Boolean(
    token &&
    (mockAccessTokens.has(token) || token.startsWith("mock-access-token-")),
  );
}

function getVerifyChallengeId(path: string): string | null {
  const match = path.match(/^\/otp-challenges\/([^/]+)\/verify$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function isNgrokUrl(baseUrl: string): boolean {
  try {
    const hostname = new URL(baseUrl).hostname.toLowerCase();
    return (
      hostname.endsWith(".ngrok-free.dev") ||
      hostname.endsWith(".ngrok.app") ||
      hostname.endsWith(".ngrok.io")
    );
  } catch {
    return false;
  }
}

function handleOfflineFallback<T>(
  path: string,
  init: RequestInit = {},
  mockChallengeIds: Set<string> = new Set(),
  mockAccessTokens: Set<string> = new Set(),
): T | undefined {
  if (path === "/config") {
    return DEFAULT_FALLBACK_CONFIG as unknown as T;
  }
  if (path === "/otp-challenges") {
    let email = "";
    try {
      const parsed = JSON.parse(String(init.body ?? "{}")) as {
        email?: string;
      };
      email = parsed.email ?? "";
    } catch {}
    if (!isMockLeaderEmail(email)) return undefined;
    const challengeId = "challenge-local-" + Date.now();
    mockChallengeIds.add(challengeId);
    return {
      challengeId,
      referenceCode: "HH2026",
      expiresAt: new Date(Date.now() + 600000).toISOString(),
      resendAvailableAt: new Date(Date.now() + 90000).toISOString(),
    } as unknown as T;
  }
  if (path.includes("/verify")) {
    const challengeId = getVerifyChallengeId(path);
    if (!challengeId || !mockChallengeIds.has(challengeId)) return undefined;
    const accessToken = "mock-access-token-" + Date.now();
    mockAccessTokens.add(accessToken);
    return {
      accessToken,
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
      leaderEmail: MOCK_LEADER_EMAIL,
    } as unknown as T;
  }
  if (path === "/registrations/current") {
    if (!isMockAccessToken(init, mockAccessTokens)) return undefined;
    return { registration: null } as unknown as T;
  }
  if (path.includes("/payment-attempts")) {
    if (!isMockAccessToken(init, mockAccessTokens)) return undefined;
    return {
      paymentAttemptId: "pay-attempt-123",
      referenceNo: "HH26-REF-999",
      amount: "500.00",
      currency: "THB",
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
      redirectForm: {
        actionUrl: "/register/payment-result",
        method: "POST",
        fields: {},
      },
    } as unknown as T;
  }
  if (path.includes("/payment-status")) {
    if (!isMockAccessToken(init, mockAccessTokens)) return undefined;
    return {
      registrationId: "reg-123",
      registrationStatus: "ready_for_payment",
      paymentStatus: "pending",
      referenceNo: "HH26-REF-999",
      amount: "500.00",
      currency: "THB",
      paidAt: null,
    } as unknown as T;
  }
  if (path === "/registrations" || path.includes("/registrations/")) {
    if (!isMockAccessToken(init, mockAccessTokens)) return undefined;
    let payload: Partial<TeamRegistrationPayload> = {};
    try {
      if (init.body) payload = JSON.parse(String(init.body));
    } catch {}
    const mockRecord: TeamRegistrationRecord = {
      id: "reg-local-" + Date.now(),
      registrationCode: "HH2026-REG-001",
      categoryId: payload.categoryId ?? 1,
      teamName: payload.teamName ?? "ทีมตัวอย่าง",
      leaderEmail: payload.members?.[0]?.email ?? "leader@example.com",
      status: "draft",
      paidAt: null,
      amountSnapshot: "500.00",
      currencySnapshot: "THB",
      pricingRoundNameSnapshot: "Early Bird",
      members: (payload.members ?? []).map((m, idx) => ({
        id: "mem-" + idx,
        position: m.position ?? idx,
        memberRole: idx === 0 ? "leader" : "member",
        title: m.title || "mr",
        firstName: m.firstName || "สมาชิก",
        lastName: m.lastName || String(idx + 1),
        nickname: m.nickname ?? null,
        age: m.age ?? 20,
        university: m.university ?? null,
        faculty: m.faculty ?? null,
        school: m.school ?? null,
        schoolGrade: m.schoolGrade ?? null,
        isPharmacyStudent: m.isPharmacyStudent ?? false,
        foodDrugAllergies: m.foodDrugAllergies ?? null,
        email: m.email || "member@example.com",
        phoneNumber: m.phoneNumber || "0800000000",
        lineId: m.lineId || "line_id",
        emergencyContactName: m.emergencyContactName || "ผู้ติดต่อฉุกเฉิน",
        emergencyContactPhone: m.emergencyContactPhone || "0800000000",
      })),
    };
    return { registration: mockRecord } as unknown as T;
  }
  return undefined;
}

export function createTeamRegistrationApi(options: ClientOptions) {
  const fetchImpl = options.fetchImpl ?? fetch;
  const root = `${options.baseUrl.replace(/\/$/, "")}/api/v1/team-registrations/events/${encodeURIComponent(options.eventCode)}`;
  const ngrokHeaders = isNgrokUrl(options.baseUrl)
    ? { "ngrok-skip-browser-warning": "true" }
    : {};
  const mockChallengeIds = new Set<string>();
  const mockAccessTokens = new Set<string>();

  async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const requestHeaders = new Headers();
    Object.entries(ngrokHeaders).forEach(([name, value]) =>
      requestHeaders.set(name, value),
    );
    if (init.body) requestHeaders.set("content-type", "application/json");
    new Headers(init.headers).forEach((value, name) =>
      requestHeaders.set(name, value),
    );

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    try {
      const response = await fetchImpl(`${root}${path}`, {
        ...init,
        headers: requestHeaders,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const payload = (await response
        .json()
        .catch(() => null)) as ApiEnvelope<T> | null;
      if (!response.ok || !payload?.success) {
        const error = payload?.error;
        throw new TeamApiError(
          error?.code ?? "NETWORK_ERROR",
          error?.message ?? "ไม่สามารถเชื่อมต่อระบบลงทะเบียนได้",
          response.status,
          error?.fields,
        );
      }
      return payload.data;
    } catch (err) {
      clearTimeout(timeoutId);
      const fallback = handleOfflineFallback<T>(
        path,
        init,
        mockChallengeIds,
        mockAccessTokens,
      );
      if (fallback !== undefined) return fallback;
      if (err instanceof TeamApiError) throw err;
      throw new TeamApiError(
        "NETWORK_ERROR",
        "ไม่สามารถเชื่อมต่อระบบลงทะเบียนได้",
        500,
      );
    }
  }

  const withAccess = (
    accessToken: string,
    headers: Record<string, string> = {},
  ) => ({ authorization: `Bearer ${accessToken}`, ...headers });

  return {
    getConfig: () => request<TeamEventConfig>("/config"),
    requestOtp: (email: string) => {
      if (isMockLeaderEmail(email)) {
        const challengeId = "challenge-local-" + Date.now();
        mockChallengeIds.add(challengeId);
        return Promise.resolve({
          challengeId,
          referenceCode: "HH2026",
          expiresAt: new Date(Date.now() + 600000).toISOString(),
          resendAvailableAt: new Date(Date.now() + 90000).toISOString(),
        });
      }
      return request<{
        challengeId: string;
        referenceCode: string;
        expiresAt: string;
        resendAvailableAt: string;
      }>("/otp-challenges", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
    },
    verifyOtp: (challengeId: string, otp: string, referenceCode: string) => {
      if (mockChallengeIds.has(challengeId)) {
        const accessToken = "mock-access-token-" + Date.now();
        mockAccessTokens.add(accessToken);
        return Promise.resolve({
          accessToken,
          expiresAt: new Date(Date.now() + 86400000).toISOString(),
          leaderEmail: MOCK_LEADER_EMAIL,
        });
      }
      return request<{
        accessToken: string;
        expiresAt: string;
        leaderEmail: string;
      }>(`/otp-challenges/${encodeURIComponent(challengeId)}/verify`, {
        method: "POST",
        body: JSON.stringify({ otp, referenceCode }),
      });
    },
    getCurrentRegistration: (accessToken: string) =>
      request<{ registration: TeamRegistrationRecord | null }>(
        "/registrations/current",
        { headers: withAccess(accessToken) },
      ),
    getRegistration: (registrationId: string, accessToken: string) =>
      request<{ registration: TeamRegistrationRecord }>(
        `/registrations/${encodeURIComponent(registrationId)}`,
        { headers: withAccess(accessToken) },
      ),
    createRegistration: (data: TeamRegistrationPayload, accessToken: string) =>
      request<{ registration: TeamRegistrationRecord }>("/registrations", {
        method: "POST",
        headers: withAccess(accessToken),
        body: JSON.stringify(data),
      }),
    updateRegistration: (
      registrationId: string,
      data: TeamRegistrationPayload,
      accessToken: string,
    ) =>
      request<{ registration: TeamRegistrationRecord }>(
        `/registrations/${encodeURIComponent(registrationId)}`,
        {
          method: "PUT",
          headers: withAccess(accessToken),
          body: JSON.stringify(data),
        },
      ),
    validateRegistration: (registrationId: string, accessToken: string) =>
      request<{ valid: true; status: TeamRegistrationRecord["status"] }>(
        `/registrations/${encodeURIComponent(registrationId)}/validate`,
        { method: "POST", headers: withAccess(accessToken) },
      ),
    createPaymentAttempt: (
      registrationId: string,
      accessToken: string,
      idempotencyKey: string,
    ) =>
      request<PaymentAttemptResponse>(
        `/registrations/${encodeURIComponent(registrationId)}/payment-attempts`,
        {
          method: "POST",
          headers: withAccess(accessToken, {
            "idempotency-key": idempotencyKey,
          }),
        },
      ),
    getPaymentStatus: (registrationId: string, accessToken: string) =>
      request<PaymentStatusResponse>(
        `/registrations/${encodeURIComponent(registrationId)}/payment-status`,
        { headers: withAccess(accessToken) },
      ),
  };
}

export const teamRegistrationApi = createTeamRegistrationApi({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002",
  eventCode:
    process.env.NEXT_PUBLIC_TEAM_REGISTRATION_EVENT_CODE ?? "health-hack-2026",
});
