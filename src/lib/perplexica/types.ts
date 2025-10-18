export type PerplexicaFocusMode =
  | "webSearch"
  | "academicSearch"
  | "writingAssistant"
  | "wolframAlphaSearch"
  | "youtubeSearch"
  | "redditSearch";

export type PerplexicaMessage = {
  role: "user" | "assistant";
  content: string;
};

export type OptimizationMode = "speed" | "balanced";

export type ModelProvider = "ollama";

export type ModelName =
  | "gemma2:2b"
  | "gemma3:1b"
  | "qwen2:1.5b"
  | "fixt/home-3b-v3:latest";

export type ModelConfig = {
  provider: ModelProvider;
  name: ModelName;
};

export type PerplexicaSearchRequest = {
  query: string;
  focusMode: PerplexicaFocusMode;
  chatModel?: ModelConfig;
  embeddingModel?: ModelConfig;
  optimizationMode?: OptimizationMode;
  history?: PerplexicaMessage[];
  systemInstructions?: string;
  stream?: boolean;
};

export type PerplexicaSimpleSearchRequest = Pick<
  PerplexicaSearchRequest,
  "query"
> &
  Partial<Pick<PerplexicaSearchRequest, "focusMode" | "history">>;

export type PerplexicaSearchResponse = {
  type: "response" | "error";
  data?: string;
  message?: string;
  sources?: Array<{
    title: string;
    url: string;
    img_src?: string;
  }>;
};
