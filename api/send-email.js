export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { to, subject, html } = req.body;
  if (!to || !subject || !html) { res.status(400).json({ error: 'Missing fields' }); return; }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer re_f4oCuD6M_5gWBBocPRC4zsZeyJLLtG2gM',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'BrokerSign <onboarding@resend.dev>',
        to: [to],
        subject,
        html
      })
    });
    const data = await response.json();
    if (!response.ok) { res.status(400).json({ error: data }); return; }
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
