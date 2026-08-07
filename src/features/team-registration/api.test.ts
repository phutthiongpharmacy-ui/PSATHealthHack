import assert from "node:assert/strict";
import test from "node:test";
import { createTeamRegistrationApi, TeamApiError } from "./api.ts";

test("uses the configured event path for OTP requests", async () => {
  let calledUrl = "";
  let calledBody = "";
  const client = createTeamRegistrationApi({
    baseUrl: "https://api.example.com",
    eventCode: "health-hack-2026",
    fetchImpl: async (input, init) => {
      calledUrl = String(input);
      calledBody = String(init?.body);
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            challengeId: "id",
            referenceCode: "ABCDE",
            expiresAt: "2026-08-20T00:00:00Z",
          },
        }),
        { status: 201, headers: { "content-type": "application/json" } },
      );
    },
  });
  await client.requestOtp("person@example.com");
  assert.equal(
    calledUrl,
    "https://api.example.com/api/v1/team-registrations/events/health-hack-2026/otp-challenges",
  );
  assert.equal(calledBody, JSON.stringify({ email: "person@example.com" }));
});

test("sends access and idempotency headers when creating payment", async () => {
  let headers = new Headers();
  const client = createTeamRegistrationApi({
    baseUrl: "https://api.example.com",
    eventCode: "health-hack-2026",
    fetchImpl: async (_input, init) => {
      headers = new Headers(init?.headers);
      return new Response(JSON.stringify({ success: true, data: {} }), {
        status: 201,
        headers: { "content-type": "application/json" },
      });
    },
  });
  await client.createPaymentAttempt("reg-id", "access-token", "idem-key");
  assert.equal(headers.get("authorization"), "Bearer access-token");
  assert.equal(headers.get("idempotency-key"), "idem-key");
});

test("skips the ngrok browser warning for ngrok API URLs", async () => {
  let headers = new Headers();
  const client = createTeamRegistrationApi({
    baseUrl: "https://api-healthhack.ngrok-free.dev",
    eventCode: "health-hack-2026",
    fetchImpl: async (_input, init) => {
      headers = new Headers(init?.headers);
      return new Response(JSON.stringify({ success: true, data: {} }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
  });
  await client.getConfig();
  assert.equal(headers.get("ngrok-skip-browser-warning"), "true");
});

test("uses the configured fallback config when config API is unavailable", async () => {
  const client = createTeamRegistrationApi({
    baseUrl: "https://api.example.com",
    eventCode: "health-hack-2026",
    fetchImpl: async () =>
      new Response(
        JSON.stringify({
          success: false,
          error: { code: "REGISTRATION_CLOSED", message: "ปิดรับสมัครแล้ว" },
        }),
        { status: 409, headers: { "content-type": "application/json" } },
      ),
  });
  const config = await client.getConfig();
  assert.equal(config.event.code, "health-hack-2026");
});
