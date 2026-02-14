import { createHash } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(`token-validate:${ip}`, 20, 10 * 60 * 1000)) {
    console.warn('rate_limit_token', { ip });
    return NextResponse.json({ ok: false, message: 'Trop de tentatives.' }, { status: 429 });
  }

  const { token } = await req.json();
  if (!token || token.length < 32) {
    return NextResponse.json({ ok: false, message: 'Token invalide.' }, { status: 400 });
  }

  createHash('sha256').update(token).digest('hex');
  return NextResponse.json({ ok: true, message: 'Token vérifié (MVP, brancher DB Supabase).' });
}
