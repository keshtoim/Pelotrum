import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, copyFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, resolve, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, content } from '../src/content.mjs';
import { renderHome, renderLegal, render404 } from '../src/page.mjs';
import { legal } from '../src/legal.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = (...p) => join(root, 'src', ...p);
const OUT = join(root, '_site');

// Хэш содержимого в имени файла: изменился файл — изменилось имя, и браузер не возьмёт старую версию из кэша.
const hash = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 10);
const hashed = (name, buf) => `${basename(name, extname(name))}.${hash(buf)}${extname(name)}`;

const write = (rel, data) => {
  const file = join(OUT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, data);
};

// Чистая сборка, чтобы в _site не копились файлы со старыми хэшами.
rmSync(OUT, { recursive: true, force: true });

const fonts = {};
for (const f of readdirSync(src('fonts')).filter((f) => f.endsWith('.woff2'))) {
  const buf = readFileSync(src('fonts', f));
  const name = `assets/fonts/${hashed(f, buf)}`;
  write(name, buf);
  fonts[basename(f, '.woff2')] = name;
}

// Пробелы вокруг + и - не трогаем: внутри calc() они обязательны.
const minifyCss = (css) => css
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{};,])\s*/g, '$1')
  .replace(/:\s+/g, ':')
  .replace(/;}/g, '}')
  .trim();

let css = ['fonts.css', 'theme.css', 'base.css'].map((f) => readFileSync(src('styles', f), 'utf8')).join('\n');
// В исходниках путь '../fonts/x.woff2', а собранный CSS лежит в assets/ рядом с папкой fonts.
css = css.replace(/url\('\.\.\/fonts\/([^']+)\.woff2'\)/g, (_, n) => {
  if (!fonts[n]) throw new Error(`Шрифт не найден: ${n}.woff2`);
  return `url('${fonts[n].replace('assets/', '')}')`;
});
css = minifyCss(css);
const cssName = `assets/${hashed('site.css', css)}`;
write(cssName, css);

// Вырезаем только комментарии (включая закомментированный демо-чат). Безопасно, пока в строках main.js нет // и /*.
const js = readFileSync(src('scripts', 'main.js'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/^\s*\/\/.*$/gm, '')
  .replace(/\n\s*\n/g, '\n');
const jsName = `assets/${hashed('main.js', js)}`;
write(jsName, js);

const assets = { css: cssName, js: jsName, fonts, content, legal };
// Убираем отступы шаблонов, но не пробелы внутри строк, чтобы не склеить слова.
const tidy = (html) => html.replace(/\n\s*\n/g, '\n').replace(/\n\s+/g, '\n');

write('index.html', tidy(renderHome('ru', assets)));
write('en/index.html', tidy(renderHome('en', assets)));
for (const slug of Object.keys(legal)) {
  write(`${slug}/index.html`, tidy(renderLegal('ru', slug, assets)));
  write(`en/${slug}/index.html`, tidy(renderLegal('en', slug, assets)));
}
write('404.html', tidy(render404(assets)));

for (const f of readdirSync(src('static'))) copyFileSync(src('static', f), join(OUT, f));

const langs = [['ru', ''], ['en', 'en/']];
const pages = ['', ...Object.keys(legal).map((slug) => slug + '/')];
const today = new Date().toISOString().slice(0, 10);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.flatMap((page) => langs.map(([, p]) => `  <url>
    <loc>${site.url + p + page}</loc>
    <lastmod>${today}</lastmod>
${langs.map(([l, q]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${site.url + q + page}"/>`).join('\n')}
  </url>`)).join('\n')}
</urlset>
`);

// ИИ-боты перечислены явно, чтобы разрешение выглядело намеренным.
// Боты читают robots.txt только из корня домена, так что файл заработает со своим доменом.
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended'];
write('robots.txt', [
  'User-agent: *', 'Allow: /', '',
  '# ИИ-ассистенты и поисковики: доступ разрешён',
  ...aiBots.map((b) => `User-agent: ${b}`), 'Allow: /', '',
  `Sitemap: ${site.url}sitemap.xml`, ''
].join('\n'));

const plain = (s) => s.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const ru = content.ru;
write('llms.txt', `# ${site.name}

> ${plain(ru.meta.description)}

Сайт-визитка разработчика. Основное направление — вайбкодинг: быстрая разработка сайтов, Telegram-ботов, Android-приложений, браузерных расширений и автоматизаций с помощью AI под задачу заказчика. Работа напрямую, без посредников.

## Страницы

- [Главная (RU)](${site.url}): услуги, цены, портфолио, контакты
- [English version](${site.url}en/): то же на английском

## Портфолио

${ru.work.items.map((w) => `- ${w.url ? `[${plain(w.title)}](${w.url})` : plain(w.title)} (${w.stack}): ${plain(w.desc)}`).join('\n')}

## Услуги

${ru.services.items.map((s) => `- ${s.name} — ${plain(s.price)}, ${s.term}: ${plain(s.desc)}`).join('\n')}

## Контакты

- Telegram: https://t.me/${site.telegram}
- GitHub: ${site.github}
`);

// Без .nojekyll GitHub Pages прогоняет сайт через Jekyll, а тот пропускает файлы с «_» в начале.
write('.nojekyll', '');
if (site.domain) write('CNAME', site.domain + '\n');

const size = (rel) => (readFileSync(join(OUT, rel)).length / 1024).toFixed(1) + ' KB';
console.log(`Собрано в ${OUT}`);
console.log(`  index.html     ${size('index.html')}`);
console.log(`  en/index.html  ${size('en/index.html')}`);
console.log(`  ${cssName}  ${size(cssName)}`);
console.log(`  ${jsName}  ${size(jsName)}`);
console.log(`  шрифтов: ${Object.keys(fonts).length}`);
