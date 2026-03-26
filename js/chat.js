// Vercel Serverless Function — /api/chat
// OPENROUTER_API_KEY — Vercel dashboard mein environment variable set karo
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { model, messages } = req.body || {};
  if (!model || !messages) return res.status(400).json({ error: 'model aur messages required hain' });

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OPENROUTER_API_KEY set nahi hai' });

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://fluxwith.ai',
        'X-Title': 'Fluxwith'
      },
      body: JSON.stringify({ model, messages, max_tokens: 2048 })
    });

    const data = await response.json();
    if (data.error) return res.status(400).json({ error: data.error.message || 'API error' });

    const content = data.choices?.[0]?.message?.content || 'No response.';
    return res.status(200).json({ content });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
