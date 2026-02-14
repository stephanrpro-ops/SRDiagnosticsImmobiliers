import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, verifyTurnstile } from '@/lib/security';
import { getSupabaseServiceClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(`quote:${ip}`)) {
    return NextResponse.json({ ok: false, message: 'Trop de requêtes.' }, { status: 429 });
  }

  const body = await req.json();
  if (body.hp) return NextResponse.json({ ok: true });

  const turnstileOk = await verifyTurnstile(body.turnstileToken);
  if (!turnstileOk) {
    return NextResponse.json({ ok: false, message: 'Vérification anti-spam échouée.' }, { status: 400 });
  }

  const supabase = getSupabaseServiceClient();

  if (supabase) {
    const { error } = await supabase.from('quotes_requests').insert({
      data_json: body.data ?? {},
      status: 'new'
    });

    if (error) {
      return NextResponse.json({ ok: false, message: 'Erreur DB.' }, { status: 500 });
    }
  }

  console.info('quote_request_received', {
    ip,
    hasDb: Boolean(supabase),
    data: body.data,
    result: body.result,
    consent_json: body.consent_json,
    contact: body.contact
  });

  return NextResponse.json({ ok: true });
}
