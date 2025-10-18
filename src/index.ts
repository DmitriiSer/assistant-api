import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";
import { createPerplexicaClient } from "./lib/perplexica/client";
import type { ModelResponse, ModelErrorResponse } from "./types/api";

const PERPLEXICA_URL = process.env.PERPLEXICA_URL || "http://localhost:3000";
const SYSTEM_INSTRUCTIONS = process.env.SYSTEM_INSTRUCTIONS || "";

const app = new Hono();
const perplexicaClient = createPerplexicaClient(PERPLEXICA_URL);

// Enable CORS for external apps
app.use("/*", cors());

// Serve static files from public directory
app.use("/*", serveStatic({ root: "./public" }));

// Health check endpoint
app.get("/health", (c) =>
  c.json({ status: "OK", timestamp: new Date().toISOString() })
);

app.post("/api/chat", async (c) => {
  const body = await c.req.json();

  const { message } = body;

  if (!message) {
    return c.json({ error: "Message is required" }, 400);
  }

  try {
    // Call Perplexica API using client with fast qwen2:1.5b model
    const perplexicaResponse = await perplexicaClient.searchWithOptions({
      query: message,
      focusMode: "webSearch",
      optimizationMode: "speed",
      chatModel: { provider: "ollama", name: "gemma3:1b" },
      stream: false,
      systemInstructions: SYSTEM_INSTRUCTIONS,
    });

    console.log(
      `Perplexica API response: ${JSON.stringify(perplexicaResponse)}`
    );

    return c.json<ModelResponse>({
      message: perplexicaResponse.message || "No response",
      timestamp: new Date().toISOString(),
    });
  } catch (error: Error | unknown) {
    return c.json<ModelErrorResponse>(
      {
        error: `Failed to call Perplexica API: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      500
    );
  }
});

const port = process.env.PORT || 3000;
console.log(`Assistant API Server is running on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
