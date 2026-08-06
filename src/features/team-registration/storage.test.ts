import assert from "node:assert/strict";
import test from "node:test";
import * as storage from "./storage.ts";
import { parseStoredSession, serializeSession } from "./storage.ts";

test("calculates an OTP resend countdown in whole remaining seconds", () => {
  const getRemaining = Reflect.get(storage, "getRemainingSeconds");
  assert.equal(typeof getRemaining, "function");
  assert.equal(getRemaining("2026-08-15T00:01:00.000Z", Date.parse("2026-08-15T00:00:00.001Z")), 60);
  assert.equal(getRemaining("2026-08-15T00:01:00.000Z", Date.parse("2026-08-15T00:00:59.001Z")), 1);
  assert.equal(getRemaining("2026-08-15T00:01:00.000Z", Date.parse("2026-08-15T00:01:00.000Z")), 0);
});

test("round-trips the minimal access session", () => {
  const session = {
    accessToken: "opaque-token", leaderEmail: "leader@example.com",
    expiresAt: "2026-08-20T02:00:00.000Z", registrationId: "registration-id",
  };
  assert.deepEqual(parseStoredSession(serializeSession(session), new Date("2026-08-20T01:00:00.000Z")), session);
});

test("rejects expired or malformed stored sessions", () => {
  const expired = serializeSession({ accessToken: "token", leaderEmail: "a@example.com", expiresAt: "2026-08-20T00:00:00.000Z", registrationId: null });
  assert.equal(parseStoredSession(expired, new Date("2026-08-20T01:00:00.000Z")), null);
  assert.equal(parseStoredSession("not-json"), null);
  assert.equal(parseStoredSession(JSON.stringify({ version: 2, accessToken: "token" })), null);
});
