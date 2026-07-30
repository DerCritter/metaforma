import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

async function main() {
  let apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    try {
      const envContent = await fs.readFile(path.join(ROOT, '.env.local'), 'utf8');
      const match = envContent.match(/GEMINI_API_KEY=([^\n]+)/);
      if (match) apiKey = match[1].trim().replace(/^["']|["']$/g, '');
    } catch (e) { /* ignore */ }
  }
  const ai = new GoogleGenAI({ apiKey });
  
  const systemPrompt = await fs.readFile(path.join(ROOT, 'agents', '01-strategist.md'), 'utf8');
  const keywordMap = await fs.readFile(path.join(ROOT, 'content', '_state', 'keyword-map.json'), 'utf8');
  const publishedIndex = await fs.readFile(path.join(ROOT, 'content', '_state', 'published-index.json'), 'utf8');
  const date = new Date().toISOString().split('T')[0];

  const userPrompt = `
    keyword-map.json:
    ${keywordMap}

    published-index.json:
    ${publishedIndex}

    Current date: ${date}

    Please generate 1 brief.
  `;

  const briefs = [];
  
  console.log('Generating 5 briefs using gemini-3.1-flash-lite...');
  
  for (let i = 0; i < 5; i++) {
    console.log(`Generating brief ${i + 1}/5...`);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          temperature: 0.8
        }
      });
      briefs.push(JSON.parse(response.text));
    } catch (err) {
      console.error(`Error generating brief ${i + 1}:`, err.message);
    }
  }

  await fs.writeFile(path.join(ROOT, 'content', '_state', 'strategist-proposals.json'), JSON.stringify(briefs, null, 2));
  console.log('Briefs saved to content/_state/strategist-proposals.json');
}

main().catch(console.error);
