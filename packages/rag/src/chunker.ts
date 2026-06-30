/**
 * Recursive character text splitter, tuned for Italian business documents
 * (contracts, price lists, procedures) as specified in the NUCLEO plan:
 * chunk_size=512, overlap=50.
 *
 * It tries increasingly fine separators (paragraph -> line -> sentence ->
 * word -> char) so that semantic boundaries are preserved when possible,
 * then merges the resulting pieces into overlapping windows.
 */

export interface ChunkOptions {
  /** Target chunk length in characters. */
  chunkSize?: number;
  /** Characters of trailing context carried into the next chunk. */
  chunkOverlap?: number;
  /** Separators tried in order, coarsest first. */
  separators?: string[];
}

const DEFAULT_SEPARATORS = ["\n\n", "\n", ". ", " ", ""];

export const DEFAULT_CHUNK_OPTIONS: Required<ChunkOptions> = {
  chunkSize: 512,
  chunkOverlap: 50,
  separators: DEFAULT_SEPARATORS,
};

const splitBySeparator = (text: string, separator: string): string[] => {
  if (separator === "") return text.split("");
  return text.split(separator).map((part, i, arr) =>
    // keep the separator on every piece except the last to avoid losing it
    i < arr.length - 1 ? part + separator : part,
  );
};

const recursiveSplit = (
  text: string,
  separators: string[],
  chunkSize: number,
): string[] => {
  if (text.length <= chunkSize) return text.length > 0 ? [text] : [];

  if (separators.length === 0) {
    // No separators left: hard-cut by chunkSize.
    const pieces: string[] = [];
    for (let i = 0; i < text.length; i += chunkSize)
      pieces.push(text.slice(i, i + chunkSize));
    return pieces;
  }

  const separator = separators[0];
  const rest = separators.slice(1);
  const parts = splitBySeparator(text, separator);
  const result: string[] = [];
  for (const part of parts) {
    if (part.length === 0) continue;
    if (part.length <= chunkSize) result.push(part);
    else result.push(...recursiveSplit(part, rest, chunkSize));
  }
  return result;
};

const mergeWithOverlap = (
  pieces: string[],
  chunkSize: number,
  overlap: number,
): string[] => {
  const chunks: string[] = [];
  let current = "";
  for (const piece of pieces) {
    if (current.length > 0 && current.length + piece.length > chunkSize) {
      chunks.push(current);
      const tail = overlap > 0 ? current.slice(-overlap) : "";
      current = tail + piece;
    } else {
      current += piece;
    }
  }
  if (current.trim().length > 0) chunks.push(current);
  return chunks.map((c) => c.trim()).filter((c) => c.length > 0);
};

/**
 * Split `text` into overlapping chunks ready for embedding.
 * Returns an empty array for empty/whitespace-only input.
 */
export const splitText = (
  text: string,
  options: ChunkOptions = {},
): string[] => {
  const opts = { ...DEFAULT_CHUNK_OPTIONS, ...options };
  if (text.trim().length === 0) return [];
  const pieces = recursiveSplit(text, opts.separators, opts.chunkSize);
  return mergeWithOverlap(pieces, opts.chunkSize, opts.chunkOverlap);
};
