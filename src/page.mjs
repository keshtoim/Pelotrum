import { site } from './content.mjs';

// Ссылки абсолютные от BASE: GitHub Pages отдаёт 404.html на любой глубине вложенности,
// относительные пути там бы сломались.
const BASE = new URL(site.url).pathname;
const LANGS = { ru: '', en: 'en/' };

// Уже готовые сущности (&nbsp;, &lt;) из контента не экранируем повторно.
const esc = (s) => String(s).replace(/&(?![a-z#0-9]+;)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');

const icons = {
  sun: '<svg class="i-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg class="i-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>',
  send: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M3 20.5v-6l8-2.5-8-2.5v-6L22 12z"/></svg>',
  tg: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M21.9 4.3 18.7 19.4c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.3 13 1.5 11.5c-1-.3-1.1-1 .2-1.5L20.6 2.8c.9-.3 1.6.2 1.3 1.5z"/></svg>'
};

// Тема выставляется синхронно до первой отрисовки, иначе страница мигнёт тёмной палитрой.
const themeScript = `<script>(function(){var t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t})()</script>`;

const verification = () => {
  const v = site.verification || {};
  return [
    v.google && `<meta name="google-site-verification" content="${esc(v.google)}">`,
    v.yandex && `<meta name="yandex-verification" content="${esc(v.yandex)}">`
  ].filter(Boolean).map((s) => s + '\n').join('');
};

const metrika = () => site.metrika ? `<script>(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(${Number(site.metrika)},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true});</script>
<noscript><div><img src="https://mc.yandex.ru/watch/${Number(site.metrika)}" style="position:absolute;left:-9999px" alt=""></div></noscript>` : '';

function head({ lang, t, assets, page = '', title, description, noindex }) {
  const url = site.url + LANGS[lang] + page;
  // Предзагружаем только шрифты первого экрана; остальные подтянутся по unicode-range.
  const fonts = lang === 'ru'
    ? ['unbounded-700-cyrillic', 'inter-cyrillic']
    : ['unbounded-700-latin', 'inter-latin'];

  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">
${Object.entries(LANGS).map(([l, p]) => `<link rel="alternate" hreflang="${l}" href="${site.url + p + page}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${site.url + page}">`}
<meta name="theme-color" content="#f3f1ec" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#141517" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:locale" content="${t.locale}">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${site.url}og-${lang}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${BASE}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${BASE}apple-touch-icon.png">
${verification()}${themeScript}
${metrika()}
${fonts.map((f) => `<link rel="preload" href="${BASE}${assets.fonts[f]}" as="font" type="font/woff2" crossorigin>`).join('\n')}
<link rel="stylesheet" href="${BASE}${assets.css}">
<script defer src="${BASE}${assets.js}"></script>
</head>`;
}

// path — страница относительно корня языка: переключатель языка ведёт на неё же, а не на главную.
function header(lang, t, path = '') {
  const other = lang === 'ru' ? 'en' : 'ru';
  const home = BASE + LANGS[lang];
  return `<header class="header">
  <div class="container header__inner">
    <a href="${home}" class="logo" aria-label="${site.name}">
      <span class="logo__mark" aria-hidden="true">p</span>
      <span class="logo__word">${site.name}</span>
    </a>
    <nav class="nav" id="nav" aria-label="${esc(t.a11y.menu)}">
      ${['work', 'services', 'benefits', 'blog', 'about', 'contact'].map((k) => `<a href="${home}#${k}">${t.nav[k]}</a>`).join('\n      ')}
    </nav>
    <div class="header__tools">
      <a class="tool lang-toggle" href="${BASE + LANGS[other] + path}" hreflang="${other}" lang="${other}" aria-label="${esc(t.a11y.lang)}">
        <span data-lang="ru">RU</span><span data-lang="en">EN</span>
      </a>
      <button class="tool theme-toggle" id="themeToggle" type="button" aria-label="${esc(t.a11y.theme)}">${icons.sun}${icons.moon}</button>
      <a href="${home}#contact" class="btn btn--acc btn--sm header__cta">${t.nav.cta}</a>
      <button class="tool burger" id="burger" type="button" aria-label="${esc(t.a11y.menu)}" aria-controls="nav" aria-expanded="false"><span></span><span></span></button>
    </div>
  </div>
</header>`;
}

function footer(lang, t) {
  return `<footer class="footer">
  <div class="container footer__inner">
    <a href="${BASE + LANGS[lang]}" class="logo logo--sm"><span class="logo__mark" aria-hidden="true">p</span><span class="logo__word">${site.name}</span></a>
    <span class="footer__copy">© ${new Date().getFullYear()} ${site.name} · ${t.footer.made}</span>
    <nav class="footer__legal">${['privacy', 'terms'].map((k) => `<a href="${BASE + LANGS[lang]}${k}/">${t.footer[k]}</a>`).join('')}</nav>
    <a href="#top" class="link-arrow">${t.footer.top}</a>
  </div>
</footer>`;
}

const kicker = (n, label) => `<p class="kicker">${n} / ${label}</p>`;

// '<' в JSON внутри <script> экранируется, чтобы строка с </script> не закрыла тег раньше времени.
const jsonScript = (type, id, data) => `<script type="${type}"${id ? ` id="${id}"` : ''}>${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const msgHtml = (m) => `<div class="msg msg--${m.from}"><div class="msg__bubble">${m.text}</div>${
  m.buttons ? `<div class="msg__kb">${m.buttons.map((b) => `<span>${b}</span>`).join('')}</div>` : ''}</div>`;

// Демо-чат с ботом отключён, пока акцент сайта на вайбкодинге. Чтобы вернуть, вызвать chatDemo(t)
// в hero, убрать класс hero__inner--solo и раскомментировать блок чата в src/scripts/main.js.
function chatDemo(t) {
  return `<div class="hero__demo">
        <span class="hand hand--demo" aria-hidden="true">${t.hero.note}</span>
        <div class="chat" role="img" aria-label="${esc(t.a11y.chat)}">
          <div class="chat__head">
            <span class="chat__ava" aria-hidden="true">p</span>
            <div><b>${site.name} bot</b><small>${t.chat.status}</small></div>
          </div>
          <div class="chat__body" id="chatBody">${t.chat.messages.map(msgHtml).join('')}</div>
          <div class="chat__input"><span>${t.chat.placeholder}</span>${icons.send}</div>
        </div>
        ${jsonScript('application/json', 'chatData', t.chat.messages)}
      </div>`;
}

function jsonLd(lang, t) {
  const url = site.url + LANGS[lang];
  const id = (s) => site.url + '#' + s;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite', '@id': id('website'),
        url, name: site.name, inLanguage: lang,
        description: strip(t.meta.description),
        publisher: { '@id': id('business') }
      },
      {
        '@type': 'ProfessionalService', '@id': id('business'),
        name: site.name, url,
        description: strip(t.meta.description),
        image: site.url + `og-${lang}.png`,
        logo: site.url + 'apple-touch-icon.png',
        email: site.email,
        sameAs: [`https://t.me/${site.telegram}`, site.github],
        areaServed: 'Worldwide',
        availableLanguage: ['ru', 'en'],
        knowsAbout: t.ticker,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: strip(t.services.title),
          itemListElement: t.services.items.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.name, description: strip(s.desc) },
            ...(s.min && { priceSpecification: { '@type': 'PriceSpecification', minPrice: s.min, priceCurrency: s.currency } })
          }))
        }
      }
    ]
  };
}

const workCard = (t) => (w, i) => `<article class="card work" data-cat="${w.cat}">
          <div class="work__cover work__cover--${i % 6}" aria-hidden="true"><span class="work__glyph">${w.glyph}</span></div>
          <div class="work__body">
            <div class="work__meta"><span class="tag">${w.tag}</span></div>
            <h3 class="work__title">${w.title}</h3>
            <p class="work__desc">${w.desc}</p>
            <p class="work__stack">${w.stack}</p>
            ${w.url ? `<a href="${w.url}" class="link-arrow" target="_blank" rel="noopener" aria-label="${esc(w.title)}: ${esc(t.a11y.repo)}">${t.work.more}</a>` : ''}
          </div>
        </article>`;

const priceCard = (p) => `<article class="card price${p.hot ? ' price--hot' : ''}">
          ${p.hot ? `<span class="sticker sticker--hot">${p.hot}</span>` : ''}
          <h3 class="price__name">${p.name}</h3>
          <p class="price__desc">${p.desc}</p>
          <div class="price__value">${p.price}</div>
          <div class="price__term">⏱ ${p.term}</div>
          <ul class="price__list">${p.features.map((f) => `<li>${f}</li>`).join('')}</ul>
          <a href="#contact" class="btn ${p.hot ? 'btn--acc' : 'btn--ghost'} btn--block">${p.cta}</a>
        </article>`;

const benefitCard = (b, i) => `<article class="card benefit">
          <span class="benefit__num" aria-hidden="true">0${i + 1}</span>
          <h3 class="benefit__title">${b.t}</h3>
          <p class="benefit__desc">${b.d}</p>
        </article>`;

// Пока у статьи нет url, карточка — <article> без ссылки; дата и время чтения выводятся, только когда заданы.
const postCard = (t) => (p, i) => {
  const date = p.iso ? `<time datetime="${p.iso}">${p.date}</time>` : p.date;
  const tag = p.url ? 'a' : 'article';
  return `<${tag}${p.url ? ` href="${p.url}"` : ''} class="card post${p.url ? '' : ' post--stub'}">
          <div class="post__cover post__cover--${i}" aria-hidden="true"></div>
          <div class="post__body">
            <div class="post__meta"><span class="tag">${p.tag}</span><span>${date}${p.min ? ` · ${p.min} ${t.blog.min}` : ''}</span></div>
            <h3 class="post__title">${p.title}</h3>
            <p class="post__desc">${p.desc}</p>
          </div>
        </${tag}>`;
};

export function renderHome(lang, assets) {
  const t = assets.content[lang];
  const telegram = `https://t.me/${site.telegram}`;
  // Лента дублируется: анимация сдвигает её ровно на половину, и шов цикла не виден.
  const ticker = t.ticker.map((x) => `<span>${x}</span><i>✦</i>`).join('');

  return `<!doctype html>
<html lang="${lang}">
${head({ lang, t, assets, title: t.meta.title, description: t.meta.description })}
<body id="top">
<a class="skip" href="#main">${t.a11y.skip}</a>
${header(lang, t)}

<main id="main">
  <section class="hero">
    <div class="container hero__inner hero__inner--solo">
      <div class="hero__text">
        <p class="kicker">${t.hero.kicker}</p>
        <h1 class="hero__title">${t.hero.title}</h1>
        <p class="hero__sub">${t.hero.sub}</p>
        <div class="hero__ctas">
          <a href="#contact" class="btn btn--acc">${t.hero.cta1}</a>
          <a href="#work" class="btn btn--ghost">${t.hero.cta2}</a>
        </div>
        <ul class="facts">
          ${t.hero.facts.map(([v, l]) => `<li><b>${v}</b><span>${l}</span></li>`).join('\n          ')}
        </ul>
      </div>
    </div>
  </section>

  <div class="ticker" aria-hidden="true"><div class="ticker__track">${ticker}${ticker}</div></div>

  <section class="section" id="work" aria-labelledby="work-title">
    <div class="container">
      <div class="section__head">
        ${kicker('01', t.nav.work)}
        <h2 class="section__title" id="work-title">${t.work.title}</h2>
      </div>
      <div class="filters" id="filters" role="group" aria-label="${esc(t.a11y.filters)}">
        ${Object.entries(t.work.filters).map(([k, v], i) => `<button class="chip${i ? '' : ' is-active'}" type="button" data-filter="${k}" aria-pressed="${!i}">${v}</button>`).join('\n        ')}
      </div>
      <div class="grid grid--work" id="workGrid">
        ${t.work.items.map(workCard(t)).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section section--alt" id="services" aria-labelledby="services-title">
    <div class="container">
      <div class="section__head">
        ${kicker('02', t.nav.services)}
        <h2 class="section__title" id="services-title">${t.services.title}</h2>
      </div>
      <div class="grid grid--price">
        ${t.services.items.map(priceCard).join('\n        ')}
      </div>
      <p class="note">${t.services.note}</p>
    </div>
  </section>

  <section class="section" id="benefits" aria-labelledby="benefits-title">
    <div class="container">
      <div class="section__head">
        ${kicker('03', t.nav.benefits)}
        <h2 class="section__title" id="benefits-title">${t.benefits.title}</h2>
      </div>
      <div class="grid grid--benefits">
        ${t.benefits.items.map(benefitCard).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section section--alt" id="blog" aria-labelledby="blog-title">
    <div class="container">
      <div class="section__head section__head--row">
        <div>
          ${kicker('04', t.nav.blog)}
          <h2 class="section__title" id="blog-title">${t.blog.title}</h2>
        </div>
        <a href="#" class="link-arrow">${t.blog.all}</a>
      </div>
      <div class="grid grid--blog">
        ${t.blog.items.map(postCard(t)).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section" id="about" aria-labelledby="about-title">
    <div class="container about">
      <div class="about__photo">
        <div class="photo-ph" aria-hidden="true"><span>p</span></div>
        <span class="hand hand--photo" aria-hidden="true">${t.about.photo}</span>
      </div>
      <div class="about__text">
        ${kicker('05', t.nav.about)}
        <h2 class="section__title" id="about-title">${t.about.title}</h2>
        ${t.about.p.map((p) => `<p>${p}</p>`).join('\n        ')}
        <ul class="stack">${t.about.stack.map((s) => `<li>${s}</li>`).join('')}</ul>
      </div>
    </div>
  </section>

  <section class="section" id="contact" aria-labelledby="contact-title">
    <div class="container">
      <div class="cta-box">
        <span class="sticker sticker--cta">${t.contact.sticker}</span>
        ${kicker('06', t.nav.contact)}
        <h2 class="cta-box__title" id="contact-title">${t.contact.title}</h2>
        <p class="cta-box__sub">${t.contact.sub}</p>
        <div class="cta-box__links">
          <a href="${telegram}" class="btn btn--acc btn--lg" target="_blank" rel="noopener">${icons.tg} Telegram · @${site.telegram}</a>
          <a href="mailto:${site.email}" class="btn btn--ghost btn--lg">${site.email}</a>
        </div>
      </div>
    </div>
  </section>
</main>

${footer(lang, t)}
${jsonScript('application/ld+json', '', jsonLd(lang, t))}
</body>
</html>
`;
}

export function renderLegal(lang, slug, assets) {
  const t = assets.content[lang];
  const doc = assets.legal[slug][lang];
  const page = slug + '/';
  // Пункты списков заканчиваются на «;», последний — на точку; состав пунктов зависит от настроек (например, Метрики).
  const block = (b) => Array.isArray(b)
    ? `<ul>${b.map((li, i) => `<li>${i === b.length - 1 ? li.replace(/;$/, '.') : li}</li>`).join('')}</ul>`
    : `<p>${b}</p>`;
  return `<!doctype html>
<html lang="${lang}">
${head({ lang, t, assets, page, title: `${doc.title} — ${site.name}`, description: doc.title })}
<body id="top">
<a class="skip" href="#main">${t.a11y.skip}</a>
${header(lang, t, page)}
<main id="main" class="legal">
  <div class="container legal__inner">
    <h1 class="section__title">${doc.title}</h1>
    <p class="legal__updated">${doc.updated}</p>
    ${doc.sections.map((s) => `<section>
      <h2>${s.h}</h2>
      ${s.blocks.map(block).join('\n      ')}
    </section>`).join('\n    ')}
  </div>
</main>
${footer(lang, t)}
</body>
</html>
`;
}

export function render404(assets) {
  const t = assets.content.ru;
  const e = assets.content.en;
  return `<!doctype html>
<html lang="ru">
${head({ lang: 'ru', t, assets, page: '404.html', title: t.notFound.title, description: t.notFound.text, noindex: true })}
<body id="top">
${header('ru', t)}
<main id="main" class="nf">
  <div class="container">
    <p class="nf__code">404</p>
    <p class="kicker">$ open page — ${t.notFound.code}</p>
    <h1 class="section__title">${t.notFound.text}</h1>
    <p class="nf__en" lang="en">${e.notFound.text}</p>
    <div class="hero__ctas">
      <a href="${BASE}" class="btn btn--acc">${t.notFound.home}</a>
      <a href="${BASE}en/" class="btn btn--ghost" lang="en">${e.notFound.home}</a>
    </div>
  </div>
</main>
${footer('ru', t)}
</body>
</html>
`;
}
