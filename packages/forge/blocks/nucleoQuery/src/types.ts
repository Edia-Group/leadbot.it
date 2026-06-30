export interface NucleoQuerySource {
  title: string;
  score: number;
}

export interface NucleoQueryResponse {
  /** Concatenated retrieved context, ready to feed into an LLM block. */
  context: string;
  sources: NucleoQuerySource[];
}
