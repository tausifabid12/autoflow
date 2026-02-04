export async function POST(req: Request) {
    const { code } = await req.json();
     const body =
      `client_id=3311587875649669` +
      `&client_secret=b5c1c5fd9861b7450790e7286018d1fe` +
      `&grant_type=authorization_code` +
      `&redirect_uri=https://getcreator.online/influencer/connect-instagram` +
      `&code=${encodeURIComponent(code)}`;
  
  
    try {
      const res = await fetch('https://api.instagram.com/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });
  
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch token', details: error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  