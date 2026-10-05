// Сборка сайта в папку _site (её и публикует GitHub Pages).
//
//   node tools/build.mjs
//
// Что делает:
//   - рендерит статические страницы: / (RU), /en/ (EN), /404.html
//   - склеивает и минифицирует CSS, кладёт CSS/JS/шрифты с хэшем в имени
//     (после обновления браузер гарантированно возьмёт свежие файлы)
//   - копирует src/static (иконки, превью) и создаёт robots.txt и sitemap.xml
// Зависимостей нет, нужен только Node.js 18+.

import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, copyFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, resolve, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, content } from '../src/content.mjs';
import { renderHome, render404 } from '../src/page.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = (...p) => join(root, 'src', ...p);
const OUT = join(root, '_site');

const hash = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 10);
const write = (rel, data) => {
  const file = join(OUT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, data);
};
const hashed = (name, buf) => `${basename(name, extname(name))}.${hash(buf)}${extname(name)}`;

rmSync(OUT, { recursive: true, force: true });

// --- шрифты ---
const fonts = {};
for (const f of readdirSync(src('fonts')).filter((f) => f.endsWith('.woff2'))) {
  const buf = readFileSync(src('fonts', f));
  const name = `assets/fonts/${hashed(f, buf)}`;
  write(name, buf);
  fonts[basename(f, '.woff2')] = name;
}

// --- CSS: шрифты + тема + база, пути к шрифтам — относительно assets/ ---
const minifyCss = (css) => css
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{};,])\s*/g, '$1')
  .replace(/:\s+/g, ':')
  .replace(/;}/g, '}')
  .trim();

let css = ['fonts.css', 'theme.css', 'base.css'].map((f) => readFileSync(src('styles', f), 'utf8')).join('\n');
css = css.replace(/url\('\.\.\/fonts\/([^']+)\.woff2'\)/g, (_, n) => {
  if (!fonts[n]) throw new Error(`Шрифт не найден: ${n}.woff2`);
  return `url('${fonts[n].replace('assets/', '')}')`;
});
css = minifyCss(css);
const cssName = `assets/${hashed('site.css', css)}`;
write(cssName, css);

// --- JS ---
const js = readFileSync(src('scripts', 'main.js'), 'utf8');
const jsName = `assets/${hashed('main.js', js)}`;
write(jsName, js);

// --- страницы ---
const assets = { css: cssName, js: jsName, fonts, content };
const tidy = (html) => html.replace(/\n\s*\n/g, '\n').replace(/\n\s+/g, '\n');
write('index.html', tidy(renderHome('ru', assets)));
write('en/index.html', tidy(renderHome('en', assets)));
write('404.html', tidy(render404(assets)));

// --- статика ---
for (const f of readdirSync(src('static'))) copyFileSync(src('static', f), join(OUT, f));

const pages = [['ru', ''], ['en', 'en/']];
const today = new Date().toISOString().slice(0, 10);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(([, p]) => `  <url>
    <loc>${site.url + p}</loc>
    <lastmod>${today}</lastmod>
${pages.map(([l, q]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${site.url + q}"/>`).join('\n')}
  </url>`).join('\n')}
</urlset>
`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.url}sitemap.xml\n`);
write('.nojekyll', '');

// --- отчёт ---
const size = (rel) => (readFileSync(join(OUT, rel)).length / 1024).toFixed(1) + ' KB';
console.log(`Собрано в ${OUT}`);
console.log(`  index.html     ${size('index.html')}`);
console.log(`  en/index.html  ${size('en/index.html')}`);
console.log(`  ${cssName}  ${size(cssName)}`);
console.log(`  ${jsName}  ${size(jsName)}`);
console.log(`  шрифтов: ${Object.keys(fonts).length}`);
