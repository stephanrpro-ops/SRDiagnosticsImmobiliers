import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, verifyTurnstile } from '@/lib/security';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(`contact:${ip}`)) {
    console.warn('rate_limit_contact', { ip });
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const body = await req.json();
  if (body.hp) return NextResponse.json({ ok: true });
  const turnstileOk = await verifyTurnstile(body.turnstileToken);
  if (!turnstileOk) return NextResponse.json({ ok: false }, { status: 400 });

  return NextResponse.json({ ok: true });
}
