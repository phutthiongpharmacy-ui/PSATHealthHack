import type {
  PaymentAttemptResponse, PaymentStatusResponse, TeamApiErrorShape, TeamEventConfig,
  TeamRegistrationPayload, TeamRegistrationRecord,
} from "./types.ts";

export class TeamApiError extends Error {
  code: string;
  status: number;
  fields: TeamApiErrorShape["fields"];

  constructor(code: string, message: string, status: number, fields: TeamApiErrorShape["fields"] = []) {
    super(message);
    this.name = "TeamApiError";
    this.code = code;
    this.status = status;
    this.fields = fields;
  }
}

interface ClientOptions { baseUrl: string; eventCode: string; fetchImpl?: typeof fetch }
interface ApiEnvelope<T> { success: boolean; data: T; error?: TeamApiErrorShape }

function isNgrokUrl(baseUrl: string): boolean {
  try {
    const hostname = new URL(baseUrl).hostname.toLowerCase();
    return hostname.endsWith(".ngrok-free.dev") || hostname.endsWith(".ngrok.app") || hostname.endsWith(".ngrok.io");
  } catch {
    return false;
  }
}

export function createTeamRegistrationApi(options: ClientOptions) {
  const fetchImpl = options.fetchImpl ?? fetch;
  const root = `${options.baseUrl.replace(/\/$/, "")}/api/v1/team-registrations/events/${encodeURIComponent(options.eventCode)}`;
  const ngrokHeaders = isNgrokUrl(options.baseUrl) ? { "ngrok-skip-browser-warning": "true" } : {};

  async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const requestHeaders = new Headers();
    Object.entries(ngrokHeaders).forEach(([name, value]) => requestHeaders.set(name, value));
    if (init.body) requestHeaders.set("content-type", "application/json");
    new Headers(init.headers).forEach((value, name) => requestHeaders.set(name, value));
    const response = await fetchImpl(`${root}${path}`, {
      ...init,
      headers: requestHeaders,
    });
    const payload = await response.json().catch(() => null) as ApiEnvelope<T> | null;
    if (!response.ok || !payload?.success) {
      const error = payload?.error;
      throw new TeamApiError(error?.code ?? "NETWORK_ERROR", error?.message ?? "ไม่สามารถเชื่อมต่อระบบลงทะเบียนได้", response.status, error?.fields);
    }
    return payload.data;
  }

  const withAccess = (accessToken: string, headers: Record<string, string> = {}) => ({ authorization: `Bearer ${accessToken}`, ...headers });

  return {
    getConfig: () => request<TeamEventConfig>("/config"),
    requestOtp: (email: string) => request<{ challengeId: string; referenceCode: string; expiresAt: string; resendAvailableAt: string }>("/otp-challenges", { method: "POST", body: JSON.stringify({ email }) }),
    verifyOtp: (challengeId: string, otp: string, referenceCode: string) => request<{ accessToken: string; expiresAt: string; leaderEmail: string }>(`/otp-challenges/${encodeURIComponent(challengeId)}/verify`, { method: "POST", body: JSON.stringify({ otp, referenceCode }) }),
    getCurrentRegistration: (accessToken: string) => request<{ registration: TeamRegistrationRecord | null }>("/registrations/current", { headers: withAccess(accessToken) }),
    getRegistration: (registrationId: string, accessToken: string) => request<{ registration: TeamRegistrationRecord }>(`/registrations/${encodeURIComponent(registrationId)}`, { headers: withAccess(accessToken) }),
    createRegistration: (data: TeamRegistrationPayload, accessToken: string) => request<{ registration: TeamRegistrationRecord }>("/registrations", { method: "POST", headers: withAccess(accessToken), body: JSON.stringify(data) }),
    updateRegistration: (registrationId: string, data: TeamRegistrationPayload, accessToken: string) => request<{ registration: TeamRegistrationRecord }>(`/registrations/${encodeURIComponent(registrationId)}`, { method: "PUT", headers: withAccess(accessToken), body: JSON.stringify(data) }),
    validateRegistration: (registrationId: string, accessToken: string) => request<{ valid: true; status: TeamRegistrationRecord["status"] }>(`/registrations/${encodeURIComponent(registrationId)}/validate`, { method: "POST", headers: withAccess(accessToken) }),
    createPaymentAttempt: (registrationId: string, accessToken: string, idempotencyKey: string) => request<PaymentAttemptResponse>(`/registrations/${encodeURIComponent(registrationId)}/payment-attempts`, { method: "POST", headers: withAccess(accessToken, { "idempotency-key": idempotencyKey }) }),
    getPaymentStatus: (registrationId: string, accessToken: string) => request<PaymentStatusResponse>(`/registrations/${encodeURIComponent(registrationId)}/payment-status`, { headers: withAccess(accessToken) }),
  };
}

export const teamRegistrationApi = createTeamRegistrationApi({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002",
  eventCode: process.env.NEXT_PUBLIC_TEAM_REGISTRATION_EVENT_CODE ?? "health-hack-2026",
});
