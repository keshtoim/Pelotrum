# pelotrum

Сайт-визитка: разработка Telegram-ботов и vibecode под задачу.
Статический сайт на чистом HTML/CSS/JS, два языка (RU / EN), светлая и тёмная тема.

**Сайт:** https://keshtoim.github.io/Pelotrum/

## Как поменять текст

Все тексты, цены, кейсы, статьи и контакты — в [`src/content.mjs`](src/content.mjs).
Сейчас там заглушки: замените их на реальные данные, включая Telegram-username и почту в начале файла.

После `git push` в ветку `main` сайт пересоберётся и обновится сам за 1–2 минуты.

## Локальный предпросмотр

Нужен только [Node.js](https://nodejs.org) 18+, зависимостей нет.

```sh
node tools/build.mjs     # собрать сайт в _site/
node tools/serve.mjs     # открыть http://localhost:4173/Pelotrum/
```

## Структура

```
src/
  content.mjs        тексты на двух языках, контакты, адрес сайта
  page.mjs           HTML-шаблоны страниц
  styles/            fonts.css, theme.css (цвета и шрифты), base.css (раскладка)
  scripts/main.js    тема, меню, фильтр работ, анимация чата
  fonts/             шрифты (SIL Open Font License) + тексты лицензий
  static/            favicon, иконка iOS, картинки-превью для соцсетей
tools/
  build.mjs          сборка в _site/
  serve.mjs          локальный сервер
  make-images.mjs    перегенерировать превью og-*.png и apple-touch-icon.png
.github/workflows/pages.yml   автодеплой на GitHub Pages
```

Сборка создаёт статические страницы `/` (RU), `/en/` (EN) и `404.html`, минифицирует CSS,
добавляет хэш к именам CSS/JS/шрифтов, генерирует `sitemap.xml` и `robots.txt`.

## Превью для соцсетей

Картинки `src/static/og-ru.png` и `og-en.png` содержат заголовок с главного экрана.
Если поменяли заголовок — перегенерируйте их (нужен установленный Edge или Chrome):

```sh
node tools/make-images.mjs
```

## Шрифты

Unbounded, Inter, JetBrains Mono, Caveat — все под SIL Open Font License, бесплатны для любого использования.
Хранятся в проекте (без запросов к Google), только латиница и кириллица.

Рукописный Caveat обрезан до символов двух пометок («живой пример ↓», «тут будет фото» и их английских версий),
чтобы весить 15 КБ вместо 96 КБ. Если поменяете эти тексты, новые буквы могут отрисоваться запасным шрифтом —
тогда пересоберите подмножество, например через пакет [`subset-font`](https://www.npmjs.com/package/subset-font)
из исходных файлов [Caveat на Google Fonts](https://fonts.google.com/specimen/Caveat).

## Свой домен

1. Settings → Pages → Custom domain.
2. Поменяйте `site.url` в `src/content.mjs` на новый адрес (например `https://pelotrum.ru/`).
