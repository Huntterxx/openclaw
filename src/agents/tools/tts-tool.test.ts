import { describe, expect, it, vi } from "vitest";

vi.mock("../../auto-reply/tokens.js", () => ({
  SILENT_REPLY_TOKEN: "QUIET_TOKEN",
}));

const { createTtsTool } = await import("./tts-tool.js");

describe("createTtsTool", () => {
  it("uses SILENT_REPLY_TOKEN in guidance text", () => {
    const tool = createTtsTool();
    expect(tool.description).toContain("QUIET_TOKEN");
    expect(tool.description).not.toContain("NO_REPLY");
  });

  it("returns error when no delivery channel is available", async () => {
    const tool = createTtsTool();
    const result = await tool.execute("test-call", { text: "hello world" });
    expect(result.content[0].text).toContain("requires a bound channel");
    expect(result.details.error).toBe("no_channel");
  });
});
