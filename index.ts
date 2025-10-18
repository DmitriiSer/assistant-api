import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";

const app = new Hono();

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

  // Mock response for now
  const response = `You asked: \`${message}\`. This is a mock response. Perplexica integration coming soon!`;

  return c.json({
    message: response,
    timestamp: new Date().toISOString(),
  });
});

const port = process.env.PORT || 3000;
console.log(`Assistant API Server is running on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
