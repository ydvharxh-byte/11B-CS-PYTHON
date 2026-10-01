/**
 * Vercel Serverless Function: /api/visitor-count
 * Centralized, privacy-friendly visitor counter proxy
 */

export default async function handler(req, res) {
    try {
        const response = await fetch('https://hits.sh/11science.vercel.app.svg', {
            headers: { 'User-Agent': 'CS11-KV-Rewari-VisitorCounter/1.0' }
        });
        const svg = await response.text();
        const match = svg.match(/hits:\s*([\d,]+)/i);
        const count = match ? parseInt(match[1].replace(/,/g, ''), 10) : null;

        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(200).json({ count: count || 0, status: 'ok' });
    } catch (error) {
        return res.status(200).json({ count: null, status: 'fallback', message: error.message });
    }
}
