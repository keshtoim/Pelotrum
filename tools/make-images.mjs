// Генерирует PNG-картинки сайта через headless-браузер (Edge или Chrome):
//   src/static/og-ru.png, og-en.png — превью ссылки в соцсетях/мессенджерах (1200×630)
//   src/static/apple-touch-icon.png — иконка для iOS (180×180)
//
// Запускать вручную после смены заголовка, цветов или шрифтов:
//   node tools/make-images.mjs
// Готовые PNG коммитятся в репозиторий, на GitHub браузер для сборки не нужен.

import { writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { content } from '../src/content.mjs';

// Пути: корень проекта, куда кладём PNG, и временная папка для HTML-шаблонов картинок
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'src', 'static');
const tmp = join(tmpdir(), 'pelotrum-images');
mkdirSync(tmp, { recursive: true });

// Ищем установленный Chromium-браузер: переменная BROWSER → Edge → Chrome (Windows/Linux/macOS)
const browser = [
  process.env.BROWSER,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome', '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
].find((p) => p && existsSync(p));
if (!browser) throw new Error('Не найден Edge/Chrome. Укажите путь в переменной BROWSER.');

// Шрифты подключаем прямо из src/fonts по file:// — картинка рисуется тем же Unbounded/JetBrains Mono, что и сайт
const fontsUrl = pathToFileURL(join(root, 'src', 'fonts')).href;
const fontFaces = `
@font-face{font-family:U;font-weight:700;src:url('${fontsUrl}/unbounded-700-cyrillic.woff2')}
@font-face{font-family:U;font-weight:700;src:url('${fontsUrl}/unbounded-700-latin.woff2');unicode-range:U+0000-00FF}
@font-face{font-family:M;font-weight:400 700;src:url('${fontsUrl}/jetbrains-mono-cyrillic.woff2')}
@font-face{font-family:M;font-weight:400 700;src:url('${fontsUrl}/jetbrains-mono-latin.woff2');unicode-range:U+0000-00FF}`;

// Рендер HTML в PNG заданного размера через headless-браузер (--screenshot)
function shot(name, html, w, h) {
  const file = join(tmp, name + '.html');
  writeFileSync(file, html);
  const png = join(out, name + '.png');
  rmSync(png, { force: true });
  execFileSync(browser, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
    `--window-size=${w},${h}`, '--virtual-time-budget=3000',
    `--user-data-dir=${join(tmp, 'profile-' + name)}`,
    `--screenshot=${png}`, pathToFileURL(file).href
  ], { stdio: 'ignore', timeout: 60000 });
  console.log('ok:', png);
}

// OG-превью 1200×630 для каждого языка: логотип, заголовок первого экрана, подпись
for (const lang of ['ru', 'en']) {
  const t = content[lang];
  shot(`og-${lang}`, `<!doctype html><meta charset="utf-8"><style>${fontFaces}
    *{box-sizing:border-box;margin:0}
    body{width:1200px;height:630px;background:#141517;color:#e8e6e0;font-family:M,monospace;padding:72px 80px;
      background-image:linear-gradient(rgba(232,230,224,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(232,230,224,.05) 1px,transparent 1px);background-size:48px 48px;
      display:flex;flex-direction:column;justify-content:space-between}
    .top{display:flex;align-items:center;gap:16px;font:700 34px U}
    .mk{width:56px;height:56px;display:grid;place-items:center;background:#c2d48c;color:#17180f;border:3px solid #c2d48c;border-radius:12px;transform:rotate(-6deg)}
    .top small{font:400 28px M;color:#9a9b97}
    h1{font:700 76px/1.08 U;letter-spacing:-.035em;max-width:16ch}
    .mark{display:inline-block;background:#c2d48c;color:#17180f;padding:0 .14em .06em;border-radius:10px;transform:rotate(-1.5deg)}
    .k{color:#c2d48c;font-size:26px}</style>
    <div class="top"><span class="mk">p</span><span><small>~/</small>pelotrum</span></div>
    <h1>${t.hero.title}</h1>
    <div class="k">// ${t.hero.kicker}</div>`, 1200, 630);
}

// Иконка для iOS 180×180: буква «p» на акцентном фоне (без скруглений — iOS скругляет сам)
shot('apple-touch-icon', `<!doctype html><meta charset="utf-8"><style>${fontFaces}
  *{margin:0}body{width:180px;height:180px;background:#c2d48c;display:grid;place-items:center;font:700 120px/1 U;color:#17180f}</style>
  <span style="margin-top:-14px">p</span>`, 180, 180);
