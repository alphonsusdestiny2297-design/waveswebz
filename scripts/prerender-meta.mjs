/**
 * Build-time per-route HTML generation.
 *
 * The site is a client-rendered SPA, so every URL used to serve the same HTML
 * with the home page's title and social tags. Link crawlers (WhatsApp, Facebook,
 * X, LinkedIn, Slack) do not run JavaScript, so shared links to /services or
 * /contact previewed as the home page.
 *
 * This script copies the built dist/index.html once per route, replacing the
 * title, description, canonical and Open Graph/Twitter tags. Vercel (and most
 * static hosts) serve an existing file before the SPA rewrite, so /about now
 * returns about.html — a real preview card plus instant first paint — while the
 * SPA still boots and renders the same page.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(projectRoot, 'dist');

const seo = JSON.parse(await readFile(path.join(projectRoot, 'seo.json'), 'utf8'));
const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const replaceRequired = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) {
    throw new Error(
      `prerender-meta: could not find ${label} in dist/index.html. ` +
        'The head template changed — update scripts/prerender-meta.mjs to match.'
    );
  }
  return html.replace(pattern, replacement);
};

const buildRouteHtml = (route) => {
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const ogTitle = escapeHtml(route.ogTitle ?? route.title);
  const ogDescription = escapeHtml(route.ogDescription ?? route.description);
  const url = `${seo.siteUrl}${route.path === '/' ? '/' : route.path}`;

  let html = template;

  html = replaceRequired(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, '<title>');
  html = replaceRequired(
    html,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}" />`,
    'meta description'
  );
  html = replaceRequired(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`,
    'canonical link'
  );
  html = replaceRequired(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`,
    'og:url'
  );
  html = replaceRequired(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${ogTitle}" />`,
    'og:title'
  );
  html = replaceRequired(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${ogDescription}" />`,
    'og:description'
  );
  html = replaceRequired(
    html,
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${ogTitle}" />`,
    'twitter:title'
  );
  html = replaceRequired(
    html,
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${ogDescription}" />`,
    'twitter:description'
  );

  return html;
};

const written = [];
for (const route of seo.routes) {
  const fileName = route.path === '/' ? 'index.html' : `${route.id}.html`;
  await writeFile(path.join(distDir, fileName), buildRouteHtml(route), 'utf8');
  written.push(fileName);
}

console.log(`prerender-meta: wrote per-route metadata for ${written.length} routes`);
console.log(`  ${written.join(', ')}`);
