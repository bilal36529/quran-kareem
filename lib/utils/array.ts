/**
 * Split array into chunks of specified size
 */
export function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, (index + 1) * size)
  );
}

/**
 * Safely get cached array chunk
 */
export async function getCachedChunk<T>(key: string): Promise<T[] | null> {
  try {
    const cached = localStorage.getItem(key);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
}