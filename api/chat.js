// api/chat.js — Vercel Serverless Function
// Deploy karo: /api/chat.js
// Env variable set karo: OPENROUTER_API_KEY

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const OR_KEY = process.env.OPENROUTER_API_KEY;
  const SB_URL = process.env.SUPABASE_URL || 'https://dpxuopdoumomasmahnyo.supabase.co';
  const SB_SVC = process.env.SUPABASE_SERVICE_KEY;

  if (!OR_KEY) {
    return res.status(500).json({ error: 'OPENROUTER_API_KEY Vercel environment variables mein set nahi hai' });
  }

  // Parse body
  let body;
  try {
    body = typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const { model, messages, user_id, mode } = body;

  if (!model || !messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'model aur messages required hain' });
  }

  // Credit cost per mode
  const COST = { text: 5, image: 80, video: 150, website: 200, enhance: 5 };
  const cost = COST[mode] || 5;

  // Deduct credits via Supabase RPC (only if user_id and service key available)
  if (user_id && SB_SVC) {
    try {
      const credRes = await fetch(`${SB_URL}/rest/v1/rpc/deduct_credits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SB_SVC,
          'Authorization': `Bearer ${SB_SVC}`
        },
        body: JSON.stringify({
          p_user_id: user_id,
          p_amount: cost,
          p_type: mode || 'text',
          p_desc: `${model} - ${mode || 'text'}`
        })
      });

      const credData = await credRes.json();
      if (credData && credData.ok === false) {
        return res.status(402).json({
          error: 'Insufficient credits',
          remaining: credData.remaining || 0
        });
      }
    } catch (e) {
      // Credit deduction failed — log but don't block the request
      console.error('Credit deduct error:', e.message);
    }
  }

  // Call OpenRouter API
  try {
    const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OR_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://fluxwith.io',
        'X-Title': 'fluxwith'
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 4096
      })
    });

    const text = await orRes.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({ error: 'OpenRouter invalid response: ' + text.slice(0, 200) });
    }

    if (!orRes.ok) {
      return res.status(orRes.status).json({ error: data?.error?.message || 'OpenRouter API error: ' + orRes.status });
    }

    if (data.error) {
      return res.status(400).json({ error: data.error.message || 'API error' });
    }

    const content = data.choices?.[0]?.message?.content || '';
    return res.status(200).json({ content, credits_used: cost });

  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + (err.message || 'Unknown') });
  }
}
