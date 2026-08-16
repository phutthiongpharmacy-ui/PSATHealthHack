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

interface RawBackendResponse<T> {
  success?: boolean;
  data?: T;
  code?: string;
  error?: string | TeamApiErrorShape;
  message?: string;
  fields?: TeamApiErrorShape["fields"];
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

export function createTeamRegistrationApi(options: ClientOptions) {
  const fetchImpl = options.fetchImpl ?? fetch;
  const root = `${options.baseUrl.replace(/\/$/, "")}/api/v1/team-registrations/events/${encodeURIComponent(options.eventCode)}`;
  const ngrokHeaders = isNgrokUrl(options.baseUrl)
    ? { "ngrok-skip-browser-warning": "true" }
    : {};

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
    // 25-second timeout for cloud backend latency, mail delivery, and DB transactions
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    try {
      const response = await fetchImpl(`${root}${path}`, {
        ...init,
        headers: requestHeaders,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const payload = (await response
        .json()
        .catch(() => null)) as RawBackendResponse<T> | null;

      if (!response.ok || payload?.success === false) {
        let errorCode = "API_ERROR";
        let errorMessage = "เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง";
        let errorFields: TeamApiErrorShape["fields"] = [];

        if (payload) {
          errorCode = payload.code || (typeof payload.error === "object" ? payload.error?.code : "") || `HTTP_${response.status}`;
          
          if (typeof payload.error === "string" && payload.error.trim()) {
            errorMessage = payload.error;
          } else if (typeof payload.error === "object" && payload.error?.message) {
            errorMessage = payload.error.message;
            errorFields = payload.error.fields || [];
          } else if (payload.message) {
            errorMessage = payload.message;
          }

          if (payload.fields) {
            errorFields = payload.fields;
          }
        } else if (response.status >= 500) {
          errorMessage = "เซิร์ฟเวอร์ขัดข้องชั่วคราว (500) กรุณาลองใหม่อีกครั้ง";
        } else if (response.status === 404) {
          errorMessage = "ไม่พบข้อมูลที่ต้องการในระบบ";
        }

        throw new TeamApiError(
          errorCode,
          errorMessage,
          response.status,
          errorFields,
        );
      }

      if (payload && "data" in payload && payload.data !== undefined) {
        return payload.data as T;
      }

      return (payload as unknown) as T;
    } catch (err) {
      clearTimeout(timeoutId);

      if (err instanceof TeamApiError) {
        throw err;
      }

      if (err instanceof Error && err.name === "AbortError") {
        throw new TeamApiError(
          "TIMEOUT_ERROR",
          "การเชื่อมต่อใช้เวลานานเกินไป กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่อีกครั้ง",
          408,
        );
      }

      throw new TeamApiError(
        "NETWORK_ERROR",
        "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ระบบลงทะเบียนได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต",
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
    requestOtp: (email: string) =>
      request<{
        challengeId: string;
        referenceCode: string;
        expiresAt: string;
        resendAvailableAt: string;
      }>("/otp-challenges", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    verifyOtp: (challengeId: string, otp: string, referenceCode: string) =>
      request<{
        accessToken: string;
        expiresAt: string;
        leaderEmail: string;
      }>(`/otp-challenges/${encodeURIComponent(challengeId)}/verify`, {
        method: "POST",
        body: JSON.stringify({ otp, referenceCode }),
      }),
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
