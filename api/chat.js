const https = require('https');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const OR_KEY = process.env.OPENROUTER_API_KEY;
  const SB_URL = process.env.SUPABASE_URL || 'https://dpxuopdoumomasmahnyo.supabase.co';
  const SB_SVC = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRweHVvcGRvdW1vbWFzbWFobnlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjMxMTk2NSwiZXhwIjoyMDg3ODg3OTY1fQ.bBvtoL80Q_NTXT3jikgquIICDxQjYtwComOngEjIxFw';

  if (!OR_KEY) {
    return res.status(500).json({ error: 'OPENROUTER_API_KEY not set in Vercel environment variables' });
  }

  let body = '';
  try {
    // Parse body
    if (typeof req.body === 'object') {
      body = req.body;
    } else {
      body = JSON.parse(req.body || '{}');
    }
  } catch(e) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const { model, messages, user_id, mode } = body;
  if (!model || !messages) {
    return res.status(400).json({ error: 'model aur messages required hain' });
  }

  // Credit cost
  const COST = { text: 5, image: 80, video: 150, enhance: 5, agent: 10 };
  const cost = COST[mode] || 5;

  // Deduct credits via Supabase RPC
  if (user_id && SB_URL && SB_SVC) {
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
        return res.status(402).json({ error: 'Insufficient credits', remaining: credData.remaining || 0 });
      }
    } catch(e) {
      console.error('Credit deduct:', e.message);
    }
  }

  // Call OpenRouter
  try {
    const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OR_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://seller-trackr-jmey.vercel.app',
        'X-Title': 'fluxwith'
      },
      body: JSON.stringify({ model, messages, max_tokens: 2048 })
    });

    const text = await orRes.text();
    let data;
    try { data = JSON.parse(text); }
    catch(e) { return res.status(500).json({ error: 'OpenRouter invalid response: ' + text.slice(0, 100) }); }

    if (data.error) return res.status(400).json({ error: data.error.message || 'API error' });

    return res.status(200).json({
      content: data.choices?.[0]?.message?.content || 'No response.',
      credits_used: cost
    });

  } catch(err) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
};
