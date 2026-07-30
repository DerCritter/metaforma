import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { articles } from './content/articles';

export function render(url: string, context: any) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <HelmetProvider context={context}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  );
}

export function getRoutes() {
  const routes = ['/blog', '/de/blog'];
  for (const article of articles) {
    routes.push(`/blog/${article.slug}`);
    routes.push(`/de/blog/${article.slug}`);
  }
  return routes;
}
