/**
 * Blog Pipeline Orchestrator (Phase 3 implementation)
 * This script will run the 6 agents in sequence to generate, review, and approve a new blog post.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

async function main() {
  const mode = process.env.MODE || 'generate';
  console.log(`Starting pipeline in ${mode} mode...`);

  if (mode === 'publish') {
    await publishNext();
  } else {
    await generateDraft();
  }
}

async function publishNext() {
  const draftsDir = path.join(ROOT, 'content', '_drafts');
  const files = await fs.readdir(draftsDir);
  const draftFiles = files.filter(f => f.endsWith('.ts') || f.endsWith('.json'));

  if (draftFiles.length === 0) {
    console.log('No drafts available to publish.');
    return;
  }

  const draftFile = draftFiles[0];
  console.log(`Publishing draft: ${draftFile}`);

  const draftPath = path.join(draftsDir, draftFile);
  const draftContent = await fs.readFile(draftPath, 'utf8');
  
  const articlesPath = path.join(ROOT, 'content', 'articles.ts');
  let articlesContent = await fs.readFile(articlesPath, 'utf8');
  
  // Very basic string injection into the array
  articlesContent = articlesContent.replace(
    'export const articles: Article[] = [',
    `export const articles: Article[] = [\n${draftContent},`
  );
  
  await fs.writeFile(articlesPath, articlesContent, 'utf8');
  await fs.unlink(draftPath);
  
  console.log('Draft published and removed from _drafts.');
}

async function generateDraft() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in the environment.');
  }
  console.log('Orchestrator: Starting generation pipeline...');
  console.log('Pipeline generation complete (stub).');
}

main().catch(console.error);
