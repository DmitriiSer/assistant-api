# Assistant API - Perplexica Wrapper Service

A lightweight API service that wraps the Perplexica search API, providing a simple chat interface for AI-powered web search. Built with Bun and Hono for fast, efficient performance.

## Features

- **Simple chat API**: Send messages and receive AI-powered responses from Perplexica
- **Web search integration**: Leverages Perplexica's advanced search capabilities
- **Fast and lightweight**: Built with Bun runtime for optimal performance
- **Docker ready**: Easy deployment with Docker and Docker Compose
- **Health monitoring**: Built-in health check endpoint
- **Debug UI**: Simple Vue.js chat interface for testing

## Getting Started

### Prerequisites

- Bun (latest version recommended)

### Installation & Running

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DmitriiSer/assistant-api
   cd assistant-api
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Run the server:**

   ```bash
   bun run src/index.ts
   ```

   The server starts on `http://localhost:3000` (or the port specified by `PORT` environment variable).

   **Configuration options:**

   ```bash
   # Using environment variables
   PORT=3111 PERPLEXICA_URL=https://perplexica.example.com bun run src/index.ts

   # With custom system instructions
   PORT=3000 \
     PERPLEXICA_URL=http://localhost:3000 \
     SYSTEM_INSTRUCTIONS="You are a helpful assistant." \
     bun run src/index.ts
   ```

   Optional (dev auto-reload):

   ```bash
   bun run --watch src/index.ts
   ```

## Docker Deployment

### Prerequisites

- Docker and Docker Compose installed

### Using Docker Compose (Recommended)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DmitriiSer/assistant-api
   cd assistant-api
   ```

2. **Start the service:**

   ```bash
   docker compose up -d
   ```

   The service will be available at `http://localhost:3000` (or your configured port).

3. **View logs:**

   ```bash
   docker compose logs -f
   ```

4. **Stop the service:**
   ```bash
   docker compose down
   ```

**Configuration via environment variables:**

You can customize the deployment using environment variables or a `.env` file:

```bash
# Using environment variables
PORT=3111 \
  PERPLEXICA_URL=https://perplexica.example.com \
  SYSTEM_INSTRUCTIONS="You are a helpful assistant." \
  docker compose up -d

# Or create a .env file
cat > .env << EOF
PORT=3000
PERPLEXICA_URL=http://localhost:3000
SYSTEM_INSTRUCTIONS=You are a helpful assistant.
EOF
docker compose up -d
```

**Available environment variables:**

| Variable              | Description                              | Default                 |
| --------------------- | ---------------------------------------- | ----------------------- |
| `PORT`                | Port on the host machine                 | `3000`                  |
| `PERPLEXICA_URL`      | URL of the Perplexica API endpoint       | `http://localhost:3000` |
| `SYSTEM_INSTRUCTIONS` | System instructions for the AI assistant | `` (empty)              |

Note: The application inside the container always runs on port 3000. The `PORT` variable only controls which port on your host machine maps to the container's port 3000.

### Using Docker directly

1. **Build the image:**

   ```bash
   docker build -t assistant-api .
   ```

2. **Run the container:**

   ```bash
   docker run -d \
     --name assistant-api \
     -p 3000:3000 \
     -e PERPLEXICA_URL=http://localhost:3000 \
     -e SYSTEM_INSTRUCTIONS="You are a helpful assistant." \
     --restart unless-stopped \
     assistant-api
   ```

## Configuration

Assistant API supports configuration via environment variables.

### Environment Variables

| Variable              | Description                              | Default                 |
| --------------------- | ---------------------------------------- | ----------------------- |
| `PORT`                | Server port                              | `3000`                  |
| `PERPLEXICA_URL`      | URL of the Perplexica API endpoint       | `http://localhost:3000` |
| `SYSTEM_INSTRUCTIONS` | System instructions for the AI assistant | `` (empty)              |

### Examples

```bash
# Production deployment
PORT=3111 \
  PERPLEXICA_URL=https://perplexica.example.com \
  SYSTEM_INSTRUCTIONS="You are a helpful assistant." \
  bun run src/index.ts

# Docker deployment
docker run -d \
  -p 3111:3000 \
  -e PERPLEXICA_URL=https://perplexica.example.com \
  -e SYSTEM_INSTRUCTIONS="You are a helpful assistant." \
  assistant-api
```

## API Endpoints

### Chat Endpoint

- `POST /api/chat` → Send a message and receive an AI response

  ```bash
  curl -X POST http://localhost:3000/api/chat \
    -H 'Content-Type: application/json' \
    -d '{"message":"What is the weather in New York?"}'
  ```

  Response:

  ```json
  {
    "message": "The weather in New York is...",
    "timestamp": "2026-01-02T23:58:39.000Z"
  }
  ```

### Health Check

- `GET /health` → Check service health

  ```bash
  curl http://localhost:3000/health
  ```

  Response:

  ```json
  {
    "status": "OK",
    "timestamp": "2026-01-02T23:58:39.000Z"
  }
  ```

### Debug UI

- `GET /` → Simple Vue.js chat interface for testing the API

## Project Status

This project is under active development.

### Completed

- [x] Core API service with Hono
- [x] Perplexica API integration
- [x] Chat endpoint with error handling
- [x] Health check endpoint
- [x] Debug UI with Vue.js
- [x] Docker support
- [x] Docker Compose configuration
- [x] Non-root user in Docker
- [x] Health check monitoring

## License

Distributed under the MIT License. See `LICENSE` for more information.
