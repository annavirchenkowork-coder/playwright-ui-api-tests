import { test, expect } from "@playwright/test";

/**
 * Scope: Suite organization patterns
 * Proves: tags, grouped setup, and serial execution for stateful flows
 * Tags: @advanced @pattern
 */
test.describe.serial("@advanced Suite grouping (serial demo)", () => {
  let sharedCounter = 0;

  test.beforeAll(async () => {
    // shared bootstrapping for the block
    sharedCounter = 1;
  });

  test("@pattern step A increments shared state", async () => {
    sharedCounter += 1;
    expect(sharedCounter).toBe(2);
  });

  test("@pattern step B validates state carried across tests", async () => {
    // because describe.serial, order and shared state are deterministic
    expect(sharedCounter).toBe(2);
  });
});
