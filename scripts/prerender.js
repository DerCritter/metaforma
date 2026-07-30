import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, '..', p);

async function build() {
  const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
  const { render, getRoutes } = await import(toAbsolute('dist-server/entry-server.js'));

  const routesToPrerender = getRoutes();

  for (const url of routesToPrerender) {
    const context = {};
    const appHtml = render(url, context);
    
    const { helmet } = context;

    let html = template.replace(
      `<div id="root"></div>`,
      `<div id="root">${appHtml}</div>`
    );

    if (helmet) {
      const headTags = `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${helmet.script.toString()}
      `;
      html = html.replace('</head>', `${headTags}\n</head>`);
    }

    const filePath = toAbsolute(`dist${url}.html`);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, html);

    console.log(`Pre-rendered ${url} -> ${filePath}`);
  }

  console.log('Prerendering completed.');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
