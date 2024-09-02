import { VercelRequest, VercelResponse } from '@vercel/node';
import dns from 'dns';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const domain = req.query.domain as string;

  if (!domain) {
    return res.status(400).json({ error: 'Domain query parameter is required' });
  }

  dns.lookup(domain, (err, address) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to resolve domain' });
    }

    res.json({ ip: address });
  });
}
