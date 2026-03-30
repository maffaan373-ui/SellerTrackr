// api/chat.js — Vercel Serverless Function
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const OR_KEY = process.env.OPENROUTER_API_KEY;
  if (!OR_KEY) return res.status(500).json({ error: 'OPENROUTER_API_KEY set nahi hai' });

  let body;
  try {
    body = typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const { model, messages } = body;
  if (!model || !messages) return res.status(400).json({ error: 'model aur messages required' });

  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + OR_KEY,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://fluxwith.io',
        'X-Title': 'fluxwith'
      },
      body: JSON.stringify({ model, messages, max_tokens: 4096 })
    });

    const data = await r.json();
    if (data.error) return res.status(400).json({ error: data.error.message || 'OpenRouter error' });
    return res.status(200).json({ content: data.choices?.[0]?.message?.content || '' });

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
};
