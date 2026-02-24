import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createWebFetchTool, createWebSearchTool } from "./web-tools.js";

describe("web tools defaults", () => {
  it("enables web_fetch by default (non-sandbox)", () => {
    const tool = createWebFetchTool({ config: {}, sandboxed: false });
    expect(tool?.name).toBe("web_fetch");
  });

  it("disables web_fetch when explicitly disabled", () => {
    const tool = createWebFetchTool({
      config: { tools: { web: { fetch: { enabled: false } } } },
      sandboxed: false,
    });
    expect(tool).toBeNull();
  });

  it("enables web_search by default", () => {
    const tool = createWebSearchTool({ config: {}, sandboxed: false });
    expect(tool?.name).toBe("web_search");
  });
});

describe("web_search country and language parameters", () => {
  const priorFetch = global.fetch;

  beforeEach(() => {
    vi.stubEnv("BRAVE_API_KEY", "test-key");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    // @ts-expect-error global fetch cleanup
    global.fetch = priorFetch;
  });

  it("should pass country parameter to Brave API", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ web: { results: [] } }),
      } as Response),
    );
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({ config: undefined, sandboxed: true });
    expect(tool).not.toBeNull();

    await tool?.execute?.(1, { query: "test", country: "DE" });

    expect(mockFetch).toHaveBeenCalled();
    const url = new URL(mockFetch.mock.calls[0][0] as string);
    expect(url.searchParams.get("country")).toBe("DE");
  });

  it("should pass search_lang parameter to Brave API", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ web: { results: [] } }),
      } as Response),
    );
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({ config: undefined, sandboxed: true });
    await tool?.execute?.(1, { query: "test", search_lang: "de" });

    const url = new URL(mockFetch.mock.calls[0][0] as string);
    expect(url.searchParams.get("search_lang")).toBe("de");
  });

  it("should pass ui_lang parameter to Brave API", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ web: { results: [] } }),
      } as Response),
    );
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({ config: undefined, sandboxed: true });
    await tool?.execute?.(1, { query: "test", ui_lang: "de" });

    const url = new URL(mockFetch.mock.calls[0][0] as string);
    expect(url.searchParams.get("ui_lang")).toBe("de");
  });

  it("should pass freshness parameter to Brave API", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ web: { results: [] } }),
      } as Response),
    );
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({ config: undefined, sandboxed: true });
    await tool?.execute?.(1, { query: "test", freshness: "pw" });

    const url = new URL(mockFetch.mock.calls[0][0] as string);
    expect(url.searchParams.get("freshness")).toBe("pw");
  });

  it("rejects invalid freshness values", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ web: { results: [] } }),
      } as Response),
    );
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({ config: undefined, sandboxed: true });
    const result = await tool?.execute?.(1, { query: "test", freshness: "yesterday" });

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result?.details).toMatchObject({ error: "invalid_freshness" });
  });
});

describe("web_search perplexity baseUrl defaults", () => {
  const priorFetch = global.fetch;

  afterEach(() => {
    vi.unstubAllEnvs();
    // @ts-expect-error global fetch cleanup
    global.fetch = priorFetch;
  });

  it("defaults to Perplexity direct when PERPLEXITY_API_KEY is set", async () => {
    vi.stubEnv("PERPLEXITY_API_KEY", "pplx-test");
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ choices: [{ message: { content: "ok" } }], citations: [] }),
      } as Response),
    );
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({
      config: { tools: { web: { search: { provider: "perplexity" } } } },
      sandboxed: true,
    });
    await tool?.execute?.(1, { query: "test-openrouter" });

    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch.mock.calls[0]?.[0]).toBe("https://api.perplexity.ai/chat/completions");
  });

  it("rejects freshness for Perplexity provider", async () => {
    vi.stubEnv("PERPLEXITY_API_KEY", "pplx-test");
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ choices: [{ message: { content: "ok" } }], citations: [] }),
      } as Response),
    );
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({
      config: { tools: { web: { search: { provider: "perplexity" } } } },
      sandboxed: true,
    });
    const result = await tool?.execute?.(1, { query: "test", freshness: "pw" });

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result?.details).toMatchObject({ error: "unsupported_freshness" });
  });

  it("defaults to OpenRouter when OPENROUTER_API_KEY is set", async () => {
    vi.stubEnv("PERPLEXITY_API_KEY", "");
    vi.stubEnv("OPENROUTER_API_KEY", "sk-or-test");
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ choices: [{ message: { content: "ok" } }], citations: [] }),
      } as Response),
    );
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({
      config: { tools: { web: { search: { provider: "perplexity" } } } },
      sandboxed: true,
    });
    await tool?.execute?.(1, { query: "test-openrouter-env" });

    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch.mock.calls[0]?.[0]).toBe("https://openrouter.ai/api/v1/chat/completions");
  });

  it("prefers PERPLEXITY_API_KEY when both env keys are set", async () => {
    vi.stubEnv("PERPLEXITY_API_KEY", "pplx-test");
    vi.stubEnv("OPENROUTER_API_KEY", "sk-or-test");
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ choices: [{ message: { content: "ok" } }], citations: [] }),
      } as Response),
    );
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({
      config: { tools: { web: { search: { provider: "perplexity" } } } },
      sandboxed: true,
    });
    await tool?.execute?.(1, { query: "test-both-env" });

    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch.mock.calls[0]?.[0]).toBe("https://api.perplexity.ai/chat/completions");
  });

  it("uses configured baseUrl even when PERPLEXITY_API_KEY is set", async () => {
    vi.stubEnv("PERPLEXITY_API_KEY", "pplx-test");
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ choices: [{ message: { content: "ok" } }], citations: [] }),
      } as Response),
    );
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({
      config: {
        tools: {
          web: {
            search: {
              provider: "perplexity",
              perplexity: { baseUrl: "https://example.com/pplx" },
            },
          },
        },
      },
      sandboxed: true,
    });
    await tool?.execute?.(1, { query: "test-config-baseurl" });

    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch.mock.calls[0]?.[0]).toBe("https://example.com/pplx/chat/completions");
  });

  it("defaults to Perplexity direct when apiKey looks like Perplexity", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ choices: [{ message: { content: "ok" } }], citations: [] }),
      } as Response),
    );
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({
      config: {
        tools: {
          web: {
            search: {
              provider: "perplexity",
              perplexity: { apiKey: "pplx-config" },
            },
          },
        },
      },
      sandboxed: true,
    });
    await tool?.execute?.(1, { query: "test-config-apikey" });

    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch.mock.calls[0]?.[0]).toBe("https://api.perplexity.ai/chat/completions");
  });

  it("defaults to OpenRouter when apiKey looks like OpenRouter", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ choices: [{ message: { content: "ok" } }], citations: [] }),
      } as Response),
    );
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({
      config: {
        tools: {
          web: {
            search: {
              provider: "perplexity",
              perplexity: { apiKey: "sk-or-v1-test" },
            },
          },
        },
      },
      sandboxed: true,
    });
    await tool?.execute?.(1, { query: "test-openrouter-config" });

    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch.mock.calls[0]?.[0]).toBe("https://openrouter.ai/api/v1/chat/completions");
  });
});

describe("web_search brave core behavior", () => {
  const priorFetch = global.fetch;

  afterEach(() => {
    vi.unstubAllEnvs();
    // @ts-expect-error global fetch cleanup
    global.fetch = priorFetch;
  });

  it("returns missing_brave_api_key error when no API key is configured", async () => {
    vi.stubEnv("BRAVE_API_KEY", "");
    const mockFetch = vi.fn();
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({ config: {}, sandboxed: true });
    const result = await tool?.execute?.(1, { query: "test" });

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result?.details).toMatchObject({ error: "missing_brave_api_key" });
  });

  it("uses API key from config instead of env", async () => {
    vi.stubEnv("BRAVE_API_KEY", "env-key");
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ web: { results: [] } }),
      } as Response),
    );
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({
      config: { tools: { web: { search: { apiKey: "config-key" } } } },
      sandboxed: true,
    });
    await tool?.execute?.(1, { query: "test" });

    expect(mockFetch).toHaveBeenCalled();
    const options = mockFetch.mock.calls[0]?.[1] as RequestInit;
    expect((options.headers as Record<string, string>)?.["X-Subscription-Token"]).toBe(
      "config-key",
    );
  });

  it("maps Brave result fields to the expected shape", async () => {
    vi.stubEnv("BRAVE_API_KEY", "test-key");
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            web: {
              results: [
                {
                  title: "Hello World",
                  url: "https://example.com/hello",
                  description: "A greeting page",
                  age: "2024-01-15",
                },
              ],
            },
          }),
      } as Response),
    );
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({ config: undefined, sandboxed: true });
    const result = await tool?.execute?.(1, { query: "hello world" });

    expect(result?.details).toMatchObject({
      query: "hello world",
      provider: "brave",
      count: 1,
      results: [
        {
          title: "Hello World",
          url: "https://example.com/hello",
          description: "A greeting page",
          published: "2024-01-15",
          siteName: "example.com",
        },
      ],
    });
  });

  it("passes count parameter to the Brave API", async () => {
    vi.stubEnv("BRAVE_API_KEY", "test-key");
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ web: { results: [] } }),
      } as Response),
    );
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({ config: undefined, sandboxed: true });
    await tool?.execute?.(1, { query: "test", count: 7 });

    const url = new URL(mockFetch.mock.calls[0][0] as string);
    expect(url.searchParams.get("count")).toBe("7");
  });

  it("surfaces Brave API errors", async () => {
    vi.stubEnv("BRAVE_API_KEY", "test-key");
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
        statusText: "Unauthorized",
        text: () => Promise.resolve("invalid key"),
      } as Response),
    );
    // @ts-expect-error mock fetch
    global.fetch = mockFetch;

    const tool = createWebSearchTool({ config: undefined, sandboxed: true });
    await expect(tool?.execute?.(1, { query: "brave-error-unique-query" })).rejects.toThrow(
      "Brave Search API error (401)",
    );
  });
});
