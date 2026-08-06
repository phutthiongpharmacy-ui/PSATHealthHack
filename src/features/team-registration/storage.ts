export interface RegistrationSession {
  accessToken: string;
  leaderEmail: string;
  expiresAt: string;
  registrationId: string | null;
}

const STORAGE_VERSION = 1;
export const REGISTRATION_SESSION_KEY = "psat-health-hack:team-registration:v1";

export function getRemainingSeconds(availableAt: string, nowMs = Date.now()): number {
  return Math.max(0, Math.ceil((Date.parse(availableAt) - nowMs) / 1000));
}

export function serializeSession(_session: RegistrationSession): string {
  return JSON.stringify({ version: STORAGE_VERSION, ..._session });
}

export function parseStoredSession(_raw: string | null, _now = new Date()): RegistrationSession | null {
  if (!_raw) return null;
  try {
    const value = JSON.parse(_raw) as Record<string, unknown>;
    if (value.version !== STORAGE_VERSION || typeof value.accessToken !== "string" || typeof value.leaderEmail !== "string" || typeof value.expiresAt !== "string") return null;
    if (new Date(value.expiresAt).getTime() <= _now.getTime()) return null;
    if (value.registrationId !== null && typeof value.registrationId !== "string") return null;
    return {
      accessToken: value.accessToken,
      leaderEmail: value.leaderEmail,
      expiresAt: value.expiresAt,
      registrationId: value.registrationId as string | null,
    };
  } catch {
    return null;
  }
}

export function loadRegistrationSession(): RegistrationSession | null {
  if (typeof window === "undefined") return null;
  const session = parseStoredSession(window.sessionStorage.getItem(REGISTRATION_SESSION_KEY));
  if (!session) window.sessionStorage.removeItem(REGISTRATION_SESSION_KEY);
  return session;
}

export function saveRegistrationSession(session: RegistrationSession): void {
  window.sessionStorage.setItem(REGISTRATION_SESSION_KEY, serializeSession(session));
}

export function clearRegistrationSession(): void {
  if (typeof window !== "undefined") window.sessionStorage.removeItem(REGISTRATION_SESSION_KEY);
}
