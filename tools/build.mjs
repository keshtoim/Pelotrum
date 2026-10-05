// =====================================================================
// Сборка сайта в папку _site (её публикует GitHub Pages).
//
//   node tools/build.mjs
//
// Шаги:
//   1. шрифты  → assets/fonts/*.<hash>.woff2
//   2. CSS     → склейка fonts + theme + base, минификация → assets/site.<hash>.css
//   3. JS      → assets/main.<hash>.js
//   4. HTML    → / (RU), /en/ (EN), /404.html из шаблонов src/page.mjs
//   5. статика → иконки и превью из src/static
//   6. служебные файлы → sitemap.xml, robots.txt, llms.txt, .nojekyll, CNAME
//
// Хэш содержимого в имени файла = «вечный» кэш без риска получить старую версию:
// изменился файл — изменилось имя — браузер скачает заново.
// Зависимостей нет, нужен только Node.js 18+.
// =====================================================================

import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, copyFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, resolve, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, content } from '../src/content.mjs';
import { renderHome, render404 } from '../src/page.mjs';

// ---------------------------------------------------------------------
// Пути и помощники
// ---------------------------------------------------------------------
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');   // корень проекта
const src = (...p) => join(root, 'src', ...p);
const OUT = join(root, '_site');

// Короткий sha256-хэш содержимого (10 символов достаточно, чтобы не было коллизий)
const hash = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 10);
// 'site.css' + содержимое → 'site.1a2b3c4d5e.css'
const hashed = (name, buf) => `${basename(name, extname(name))}.${hash(buf)}${extname(name)}`;

// Запись файла в _site с созданием недостающих папок
const write = (rel, data) => {
  const file = join(OUT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, data);
};

// Каждая сборка с чистого листа — в _site не остаются файлы со старыми хэшами
rmSync(OUT, { recursive: true, force: true });

// ---------------------------------------------------------------------
// 1. Шрифты. Карта fonts: 'inter-latin' → 'assets/fonts/inter-latin.<hash>.woff2'
//    нужна шаблонам (preload) и CSS (url в @font-face).
// ---------------------------------------------------------------------
const fonts = {};
for (const f of readdirSync(src('fonts')).filter((f) => f.endsWith('.woff2'))) {
  const buf = readFileSync(src('fonts', f));
  const name = `assets/fonts/${hashed(f, buf)}`;
  write(name, buf);
  fonts[basename(f, '.woff2')] = name;
}

// ---------------------------------------------------------------------
// 2. CSS
// ---------------------------------------------------------------------

// Простая минификация без зависимостей: убираем комментарии и лишние пробелы.
// Пробелы внутри calc() вокруг + и - не трогаем — там они обязательны.
const minifyCss = (css) => css
  .replace(/\/\*[\s\S]*?\*\//g, '')       // комментарии
  .replace(/\s+/g, ' ')                   // любые пробельные последовательности → один пробел
  .replace(/\s*([{};,])\s*/g, '$1')       // пробелы вокруг { } ; ,
  .replace(/:\s+/g, ':')                  // пробел после двоеточия
  .replace(/;}/g, '}')                    // последняя ; в блоке не нужна
  .trim();

// Порядок важен: @font-face → переменные темы → компоненты
let css = ['fonts.css', 'theme.css', 'base.css'].map((f) => readFileSync(src('styles', f), 'utf8')).join('\n');

// В исходниках пути к шрифтам вида '../fonts/x.woff2' (удобно для редактора),
// в сборке CSS лежит в assets/, поэтому подставляем 'fonts/x.<hash>.woff2'
css = css.replace(/url\('\.\.\/fonts\/([^']+)\.woff2'\)/g, (_, n) => {
  if (!fonts[n]) throw new Error(`Шрифт не найден: ${n}.woff2`);
  return `url('${fonts[n].replace('assets/', '')}')`;
});
css = minifyCss(css);
const cssName = `assets/${hashed('site.css', css)}`;
write(cssName, css);

// ---------------------------------------------------------------------
// 3. JS — без полноценной минификации, только вырезаем комментарии
//    (в исходнике их много, плюс закомментированный демо-чат).
//    Безопасно для main.js: в его строках нет последовательностей // и /*.
// ---------------------------------------------------------------------
const js = readFileSync(src('scripts', 'main.js'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '')       // блочные комментарии /* … */
  .replace(/^\s*\/\/.*$/gm, '')           // строки, целиком состоящие из // комментария
  .replace(/\n\s*\n/g, '\n');             // образовавшиеся пустые строки
const jsName = `assets/${hashed('main.js', js)}`;
write(jsName, js);

// ---------------------------------------------------------------------
// 4. HTML-страницы
// ---------------------------------------------------------------------
const assets = { css: cssName, js: jsName, fonts, content };

// Убираем пустые строки и отступы из шаблонов — HTML становится компактнее.
// Пробелы внутри строк не трогаем, чтобы не склеить слова.
const tidy = (html) => html.replace(/\n\s*\n/g, '\n').replace(/\n\s+/g, '\n');

write('index.html', tidy(renderHome('ru', assets)));
write('en/index.html', tidy(renderHome('en', assets)));
write('404.html', tidy(render404(assets)));

// ---------------------------------------------------------------------
// 5. Статика: favicon, иконка iOS, OG-превью — в корень сайта как есть
// ---------------------------------------------------------------------
for (const f of readdirSync(src('static'))) copyFileSync(src('static', f), join(OUT, f));

// ---------------------------------------------------------------------
// 6. Служебные файлы
// ---------------------------------------------------------------------

// sitemap.xml: обе языковые версии, у каждой — ссылки на альтернативы (hreflang)
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

// robots.txt: индексация открыта всем; ИИ-боты перечислены явно,
// чтобы было видно, что доступ им разрешён намеренно.
// Важно: боты читают robots.txt только из корня домена (заработает со своим доменом).
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended'];
write('robots.txt', [
  'User-agent: *', 'Allow: /', '',
  '# ИИ-ассистенты и поисковики: доступ разрешён',
  ...aiBots.map((b) => `User-agent: ${b}`), 'Allow: /', '',
  `Sitemap: ${site.url}sitemap.xml`, ''
].join('\n'));

// llms.txt: краткая справка о сайте для ИИ-ассистентов (формат llmstxt.org).
// Собирается из того же контента, что и страницы, — данные не расходятся.
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
- Email: ${site.email}
- GitHub: ${site.github}
`);

// .nojekyll — GitHub Pages не прогоняет сайт через Jekyll (он игнорирует файлы с «_»)
write('.nojekyll', '');

// CNAME — только если задан свой домен (site.domain в src/content.mjs)
if (site.domain) write('CNAME', site.domain + '\n');

// ---------------------------------------------------------------------
// Отчёт о размерах — чтобы сразу заметить, если что-то разрослось
// ---------------------------------------------------------------------
const size = (rel) => (readFileSync(join(OUT, rel)).length / 1024).toFixed(1) + ' KB';
console.log(`Собрано в ${OUT}`);
console.log(`  index.html     ${size('index.html')}`);
console.log(`  en/index.html  ${size('en/index.html')}`);
console.log(`  ${cssName}  ${size(cssName)}`);
console.log(`  ${jsName}  ${size(jsName)}`);
console.log(`  шрифтов: ${Object.keys(fonts).length}`);
