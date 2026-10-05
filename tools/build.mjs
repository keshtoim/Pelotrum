// Собирает один вариант дизайна в самодостаточный HTML-файл (стили и скрипты внутри,
// без панели переключения вариантов).
//
//   node tools/build.mjs        -> вариант f
//   node tools/build.mjs a      -> вариант a
//
// На выходе: dist/pelotrum-<v>.html — один файл, можно открыть в браузере или переслать.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

const SKINS = {
  a: 'a-main', b: 'b-bento', c: 'c-terminal', d: 'd-editorial', e: 'e-soft', f: 'f-main-terminal'
};
const v = (process.argv[2] || 'f').toLowerCase();
if (!SKINS[v]) throw new Error(`Неизвестный вариант "${v}". Есть: ${Object.keys(SKINS).join(', ')}`);

// CSS скина с подставленными @import (f импортирует a-main)
function skinCss(name) {
  return read(`css/skins/${name}.css`).replace(/@import url\('([^']+)\.css'\);/g, (_, dep) => skinCss(dep));
}

const css = [
  read('css/base.css'),
  skinCss(SKINS[v])
].join('\n\n');

let html = read('index.html');
const replaceOnce = (from, to) => {
  const found = from instanceof RegExp ? from.test(html) : html.includes(from);
  if (!found) throw new Error(`Не найдено в index.html: ${from}`);
  html = html.replace(from, () => to);
};

// стили и выбор скина -> один <style>
replaceOnce(/<link rel="stylesheet" href="css\/base\.css">[\s\S]*?<\/script>/, `<style>\n${css}\n</style>`);
// панель вариантов
replaceOnce(/<!-- =+ ПАНЕЛЬ ПРОТОТИПОВ[\s\S]*?<\/div>\s*/, '');
// скрипты -> инлайн
replaceOnce('<script src="js/i18n.js"></script>', `<script>\n${read('js/i18n.js')}\n</script>`);
replaceOnce('<script src="js/main.js"></script>', `<script>\n${read('js/main.js')}\n</script>`);
// стили панели прототипов в сборке не нужны
html = html.replace(/\/\* -+ панель прототипов -+ \*\/[\s\S]*?(?=\/\* -+ адаптив)/, '');

mkdirSync(join(root, 'dist'), { recursive: true });
const out = join(root, 'dist', `pelotrum-${v}.html`);
writeFileSync(out, html);
console.log(`ok: ${out} (${(html.length / 1024).toFixed(0)} KB)`);
