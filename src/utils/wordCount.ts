export function countWords(value: string): number {
  const trimmed = value.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export function exceedsWordLimit(value: string, limit: number): boolean {
  return countWords(value) > limit;
}
