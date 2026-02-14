import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(`request-link:${ip}`)) return NextResponse.json({ ok: false }, { status: 429 });
  return NextResponse.json({ ok: true, message: 'Demande enregistrée.' });
}
