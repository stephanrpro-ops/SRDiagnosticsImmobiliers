import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit } from '@/lib/security';
import type { WizardInput } from '@/lib/packs';

type QuotePayload = {
  data?: WizardInput;
  result?: {
    diagnostics?: string[];
    packs?: Array<{ id?: string; name?: string }>;
    reasons?: string[];
    pricing?: string;
  };
  consent_json?: {
    accepted_rgpd?: boolean;
    slot?: string;
    timestamp?: string;
  };
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
  };
};

const QUOTE_RECIPIENT = 'stephanr.pro@gmail.com';

export const runtime = 'nodejs';

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(`quote:${ip}`)) {
    console.warn('rate_limit_quote', { ip });
    return NextResponse.json({ ok: false, message: 'Trop de requêtes, réessayez plus tard.' }, { status: 429 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    console.error('quote_config_missing', {
      hasResendApiKey: Boolean(process.env.RESEND_API_KEY),
      hasResendFromEmail: Boolean(process.env.RESEND_FROM_EMAIL)
    });
    return NextResponse.json({ ok: false, message: 'Configuration email manquante sur le serveur.' }, { status: 500 });
  }

  let body: QuotePayload;
  try {
    body = (await req.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ ok: false, message: 'Payload invalide.' }, { status: 400 });
  }

  const contact = body.contact ?? {};
  const consent = body.consent_json ?? {};

  if (!consent.accepted_rgpd) {
    return NextResponse.json({ ok: false, message: 'Le consentement RGPD est requis.' }, { status: 400 });
  }

  if (!contact.email) {
    return NextResponse.json({ ok: false, message: 'Email requis.' }, { status: 400 });
  }

  const data = body.data;
  const result = body.result;

  const text = [
    'Nouvelle demande de devis SR Diagnostics Immobiliers',
    '',
    `Nom: ${contact.name ?? 'Non renseigné'}`,
    `Email: ${contact.email}`,
    `Téléphone: ${contact.phone ?? 'Non renseigné'}`,
    `Créneau souhaité: ${consent.slot ?? 'Non renseigné'}`,
    '',
    'Bien concerné',
    `Adresse: ${data?.address_label ?? 'Non renseignée'}`,
    `Code postal: ${data?.postcode ?? 'Non renseigné'}`,
    `Ville: ${data?.city ?? 'Non renseignée'}`,
    `Transaction: ${data?.transaction ?? 'Non renseignée'}`,
    `Type de bien: ${data?.property_type ?? 'Non renseigné'}`,
    `Copropriété: ${data?.is_copro ? 'Oui' : 'Non'}`,
    `Surface: ${data?.surface ? `${data.surface} m²` : 'Non renseignée'}`,
    `Année de construction: ${data?.year_built ?? 'Non renseignée'}`,
    `Gaz: ${data?.has_gas ? 'Oui' : 'Non'}`,
    `Électricité: ${data?.has_electricity ? 'Oui' : 'Non'}`,
    `Chauffage: ${data?.heating ?? 'Non renseigné'}`,
    `Zone termites: ${data?.termites_known ?? 'Non renseignée'}`,
    '',
    `Diagnostics recommandés: ${(result?.diagnostics ?? []).join(', ') || 'Aucun'}`,
    `Packs suggérés: ${(result?.packs ?? []).map((pack) => pack.name ?? pack.id ?? 'Pack').join(', ') || 'Aucun'}`,
    `Raisons: ${(result?.reasons ?? []).join(' | ') || 'Aucune'}`,
    `Tarification: ${result?.pricing ?? 'sur devis'}`,
    '',
    `Consentement RGPD confirmé le: ${consent.timestamp ?? new Date().toISOString()}`
  ].join('\n');

  const html = `
    <h2>Nouvelle demande de devis</h2>
    <p><strong>Nom:</strong> ${escapeHtml(contact.name ?? 'Non renseigné')}</p>
    <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
    <p><strong>Téléphone:</strong> ${escapeHtml(contact.phone ?? 'Non renseigné')}</p>
    <p><strong>Créneau souhaité:</strong> ${escapeHtml(consent.slot ?? 'Non renseigné')}</p>
    <hr />
    <p><strong>Adresse:</strong> ${escapeHtml(data?.address_label ?? 'Non renseignée')}</p>
    <p><strong>Code postal:</strong> ${escapeHtml(data?.postcode ?? 'Non renseigné')} — <strong>Ville:</strong> ${escapeHtml(data?.city ?? 'Non renseignée')}</p>
    <p><strong>Transaction:</strong> ${escapeHtml(data?.transaction ?? 'Non renseignée')}</p>
    <p><strong>Type de bien:</strong> ${escapeHtml(data?.property_type ?? 'Non renseigné')}</p>
    <p><strong>Copropriété:</strong> ${data?.is_copro ? 'Oui' : 'Non'}</p>
    <p><strong>Surface:</strong> ${data?.surface ? `${data.surface} m²` : 'Non renseignée'}</p>
    <p><strong>Année de construction:</strong> ${escapeHtml(String(data?.year_built ?? 'Non renseignée'))}</p>
    <p><strong>Gaz:</strong> ${data?.has_gas ? 'Oui' : 'Non'} — <strong>Électricité:</strong> ${data?.has_electricity ? 'Oui' : 'Non'}</p>
    <p><strong>Chauffage:</strong> ${escapeHtml(data?.heating ?? 'Non renseigné')}</p>
    <p><strong>Zone termites:</strong> ${escapeHtml(data?.termites_known ?? 'Non renseignée')}</p>
    <hr />
    <p><strong>Diagnostics recommandés:</strong> ${escapeHtml((result?.diagnostics ?? []).join(', ') || 'Aucun')}</p>
    <p><strong>Packs suggérés:</strong> ${escapeHtml(
      (result?.packs ?? []).map((pack) => pack.name ?? pack.id ?? 'Pack').join(', ') || 'Aucun'
    )}</p>
    <p><strong>Raisons:</strong> ${escapeHtml((result?.reasons ?? []).join(' | ') || 'Aucune')}</p>
    <p><strong>Tarification:</strong> ${escapeHtml(result?.pricing ?? 'sur devis')}</p>
    <p><strong>Consentement RGPD confirmé le:</strong> ${escapeHtml(
      consent.timestamp ?? new Date().toISOString()
    )}</p>
  `;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [QUOTE_RECIPIENT],
      subject: `Nouveau devis - ${contact.name || contact.email}`,
      replyTo: contact.email,
      text,
      html
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('quote_send_error', error);
    return NextResponse.json({ ok: false, message: 'Impossible d’envoyer le devis pour le moment.' }, { status: 500 });
  }
}
