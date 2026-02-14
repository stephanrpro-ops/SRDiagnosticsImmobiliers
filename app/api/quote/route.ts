import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit, verifyTurnstile } from '@/lib/security';
import { getSupabaseServiceClient } from '@/lib/supabase-server';

const DESTINATION_EMAIL = 'stephanr.pro@gmail.com';

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

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
      const contact = body.contact ?? {};
      const result = body.result ?? {};
      const payload = body.data ?? {};

      await resend.emails.send({
        from,
        to: [DESTINATION_EMAIL],
        subject: 'Nouvelle demande de devis - SR Diagnostics Immobiliers',
        text:
          `Nouvelle demande de devis\n\n` +
          `Nom: ${contact.name || 'N/A'}\n` +
          `Email: ${contact.email || 'N/A'}\n` +
          `Téléphone: ${contact.phone || 'N/A'}\n` +
          `Adresse: ${payload.address_label || 'N/A'}\n` +
          `Ville: ${payload.city || 'N/A'}\n` +
          `Type de demande: ${payload.transaction || 'N/A'}\n` +
          `Diagnostics recommandés: ${(result.diagnostics || []).join(', ') || 'N/A'}\n` +
          `Motifs: ${(result.reasons || []).join(' | ') || 'N/A'}\n`
      });
    } catch (error) {
      console.error('quote_email_error', error);
    }
  }

  console.info('quote_request_received', {
    ip,
    hasDb: Boolean(supabase),
    hasEmailKey: Boolean(resendKey),
    data: body.data,
    result: body.result,
    consent_json: body.consent_json,
    contact: body.contact
  });

  return NextResponse.json({ ok: true });
}
