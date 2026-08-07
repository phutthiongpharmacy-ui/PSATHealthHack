import assert from "node:assert/strict";
import test from "node:test";
import { createTeamRegistrationApi, TeamApiError } from "./api.ts";

test("propagates invalid OTP errors for a regular email", async () => {
  let callCount = 0;
  const client = createTeamRegistrationApi({
    baseUrl: "https://api.example.com",
    eventCode: "health-hack-2026",
    fetchImpl: async () => {
      callCount += 1;
      if (callCount === 1) {
        return new Response(
          JSON.stringify({
            success: true,
            data: {
              challengeId: "real-challenge",
              referenceCode: "REAL1",
              expiresAt: "2026-08-20T00:00:00Z",
              resendAvailableAt: "2026-08-20T00:01:00Z",
            },
          }),
          { status: 201 },
        );
      }
      return new Response(
        JSON.stringify({
          success: false,
          error: { code: "OTP_INVALID", message: "OTP invalid" },
        }),
        { status: 401 },
      );
    },
  });
  const challenge = await client.requestOtp("person@example.com");
  await assert.rejects(
    () =>
      client.verifyOtp(
        challenge.challengeId,
        "000000",
        challenge.referenceCode,
      ),
    (error: unknown) =>
      error instanceof TeamApiError &&
      error.code === "OTP_INVALID" &&
      error.message === "OTP invalid",
  );
});

test("accepts any OTP for the mock leader email without calling the API", async () => {
  let callCount = 0;
  const client = createTeamRegistrationApi({
    baseUrl: "https://api.example.com",
    eventCode: "health-hack-2026",
    fetchImpl: async () => {
      callCount += 1;
      throw new Error("mock flow should not fetch");
    },
  });
  const challenge = await client.requestOtp(" LEADER@example.com ");
  const verified = await client.verifyOtp(
    challenge.challengeId,
    "000000",
    "anything",
  );
  assert.match(verified.accessToken, /^mock-access-token-/);
  assert.equal(verified.leaderEmail, "leader@example.com");
  assert.equal(callCount, 0);
});

test("does not return a mock current registration for a regular access token", async () => {
  const client = createTeamRegistrationApi({
    baseUrl: "https://api.example.com",
    eventCode: "health-hack-2026",
    fetchImpl: async () =>
      new Response(
        JSON.stringify({
          success: false,
          error: { code: "UNAUTHORIZED", message: "Unauthorized" },
        }),
        { status: 401 },
      ),
  });
  await assert.rejects(
    () => client.getCurrentRegistration("real-access-token"),
    (error: unknown) =>
      error instanceof TeamApiError && error.code === "UNAUTHORIZED",
  );
});
