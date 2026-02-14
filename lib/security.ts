const bucket = new Map<string, number[]>();

export function checkRateLimit(key: string, max = 10, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const hits = bucket.get(key)?.filter((x) => now - x < windowMs) ?? [];
  hits.push(now);
  bucket.set(key, hits);
  return hits.length <= max;
}

export async function verifyTurnstile(token?: string) {
  if (!process.env.TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token
    })
  });
  const data = await response.json();
  return Boolean(data.success);
}
