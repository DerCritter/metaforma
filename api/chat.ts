import { GoogleGenAI } from "@google/genai";

// Basic in-memory rate limiting (Note: in serverless, this only scopes to the current warm instance, but it's better than nothing)
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Abuse Protection: Rate Limiting
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const rateLimitWindow = 60000; // 1 minute
  const maxRequests = 10; // 10 requests per minute

  if (ip !== 'unknown') {
    const userLimit = rateLimitMap.get(ip);
    if (!userLimit || now > userLimit.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + rateLimitWindow });
    } else {
      if (userLimit.count >= maxRequests) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
      }
      userLimit.count++;
    }
  }

  // 2. Abuse Protection: Payload Size Limits
  const { prompt, history } = req.body || {};

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid prompt' });
  }
  if (prompt.length > 500) {
    return res.status(400).json({ error: 'Prompt too long (max 500 characters)' });
  }

  if (history && !Array.isArray(history)) {
    return res.status(400).json({ error: 'Invalid history format' });
  }
  if (history && history.length > 20) {
    return res.status(400).json({ error: 'History too long (max 20 messages)' });
  }

  // 3. Gemini API Call
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // Using the current advanced free-tier model
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...(history || []),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are the AI Architectural Consultant for "Metaforma", a studio specialized in the Digital Synthesis of Heritage Buildings (Denkmalschutz). 
        Your goal is to provide photorealistic visions of how historical monuments can be preserved and adapted for modern high-performance living.
        Focus on architectural integrity, materiality (glass, steel, stone), and the precision of AI rendering.
        The firm does NOT work in metaverses anymore; it only produces architectural visualizations.
        Keep responses professional and visionary. Use Spanish if the user greets you in Spanish.`,
        temperature: 0.7,
      }
    });

    return res.status(200).json({ text: response.text });
  } catch (error) {
    console.error("Serverless Gemini API Error:", error);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
}
