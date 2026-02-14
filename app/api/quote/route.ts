import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, verifyTurnstile } from '@/lib/security';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(`quote:${ip}`)) {
    console.warn('rate_limit_quote', { ip });
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const body = await req.json();
  if (body.hp) return NextResponse.json({ ok: true });

  const turnstileOk = await verifyTurnstile(body.turnstileToken);
  if (!turnstileOk) {
    console.warn('turnstile_block_quote', { ip });
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const consentJson = body.consent_json ?? null;
  const quotePayload = {
    data: body.data ?? null,
    result: body.result ?? null,
    consent_json: consentJson,
    ip
  };

  console.info('quote_request_received', quotePayload);
  return NextResponse.json({ ok: true });
}
