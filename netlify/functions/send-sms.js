exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.SMS_TO_NUMBER || '+33767076761';

  if (!sid || !token || !from) {
    return { statusCode: 200, body: JSON.stringify({ skipped: true, reason: 'Missing Twilio env vars' }) };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const message = [
      `Nouveau devis ${data.contexte || 'n/a'}`,
      `${data.cp || ''} ${data.ville || 'n/a'}`.trim(),
      `Surface ${data.surface || 'n/a'}m²`,
      `Année ${data.year || 'n/a'}`,
      `Tel ${data.telephone || 'n/a'}`,
      `Mail ${data.email || 'n/a'}`,
    ].join(' | ').slice(0, 450);

    const auth = Buffer.from(`${sid}:${token}`).toString('base64');
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ From: from, To: to, Body: message }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return { statusCode: 500, body: JSON.stringify({ error: 'Twilio error', details: errorBody }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
