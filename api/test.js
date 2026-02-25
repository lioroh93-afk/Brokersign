export default async function handler(req, res) {
  const result = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'BrokerSign <onboarding@resend.dev>',
      to: ['lioroh93@gmail.com'],
      subject: 'טסט BrokerSign',
      html: '<p>זה עובד!</p>'
    })
  });
  const data = await result.json();
  res.status(200).json({ status: result.status, data });
}
