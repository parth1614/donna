export function extractTwitterId(url: string): string | null {
  const regex = /(?:status\/|spaces\/)([a-zA-Z0-9]+)/;

  const match = url.match(regex);

  if (match?.[1]) {
    return match[1];
  }

  return null;
}
