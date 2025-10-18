import type {
  PerplexicaSearchRequest,
  PerplexicaSearchResponse,
  PerplexicaSimpleSearchRequest,
} from "./types";

export type PerplexicaClient = {
  search: (
    request: PerplexicaSimpleSearchRequest
  ) => Promise<PerplexicaSearchResponse>;
  searchWithOptions: (
    request: PerplexicaSearchRequest
  ) => Promise<PerplexicaSearchResponse>;
};

/**
 * Creates a Perplexica API client
 */
export const createPerplexicaClient = (baseUrl: string): PerplexicaClient => {
  /**
   * Search with custom request options
   */
  const searchWithOptions = async (
    request: PerplexicaSearchRequest
  ): Promise<PerplexicaSearchResponse> => {
    const response = await fetch(`${baseUrl}/api/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(
        `Perplexica API error: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as PerplexicaSearchResponse;
    if (data.type === "error") {
      throw new Error(data.message || "Unknown error");
    }

    return data;
  };

  /**
   * Search using Perplexica API with sensible defaults
   */
  const search = async ({
    query,
    focusMode = "webSearch",
    history = [],
  }: PerplexicaSimpleSearchRequest): Promise<PerplexicaSearchResponse> => {
    return searchWithOptions({
      query,
      focusMode,
      history,
    });
  };

  return {
    search,
    searchWithOptions,
  };
};
