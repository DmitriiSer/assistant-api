import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// Enable CORS for external apps
app.use("/*", cors());

// Health check endpoint
app.get("/health", (c) =>
  c.json({ status: "OK", timestamp: new Date().toISOString() })
);

app.get("/", (c) => c.text("Assistant API Server"));

const port = process.env.PORT || 3001;
console.log(`Assistant API Server is running on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
