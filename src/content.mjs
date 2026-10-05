// Весь контент сайта: тексты на двух языках, контакты и адрес сайта.
// Чтобы поменять текст — правьте здесь и пересоберите (node tools/build.mjs).
//
// ВНИМАНИЕ: кейсы, цены, статьи и контакты пока заглушки — заменить на реальные.
// В строках можно использовать HTML (<br>, &nbsp;, <span class="mark">).

export const site = {
  // Адрес сайта. От него строятся все ссылки, canonical, sitemap, robots.txt, llms.txt.
  url: 'https://keshtoim.github.io/Pelotrum/',

  name: 'pelotrum',
  telegram: 'username',          // без @
  email: 'hello@pelotrum.com',

  // ---------- на будущее: раскомментировать, когда понадобится ----------

  // Свой домен.
  //   1) купить домен и у регистратора добавить DNS-записи для GitHub Pages:
  //        A     @    185.199.108.153
  //        A     @    185.199.109.153
  //        A     @    185.199.110.153
  //        A     @    185.199.111.153
  //        CNAME www  keshtoim.github.io
  //   2) раскомментировать domain и поменять url выше на 'https://pelotrum.com/'
  //   3) GitHub → Settings → Pages → Custom domain: pelotrum.com, затем включить Enforce HTTPS
  // В корне домена robots.txt и llms.txt начнут работать для ботов.
  // domain: 'pelotrum.com',

  // Подтверждение прав в поисковиках: значение content из выданного мета-тега.
  //   Google Search Console → «HTML-тег», Яндекс Вебмастер → «Мета-тег».
  // verification: {
  //   google: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  //   yandex: 'xxxxxxxxxxxxxxxx'
  // },

  // Яндекс Метрика: номер счётчика (metrika.yandex.ru → «Добавить счётчик»).
  // metrika: 12345678,
};

export const content = {
  ru: {
    locale: 'ru_RU',
    meta: {
      title: 'pelotrum — Telegram-боты и vibecode под задачу',
      description: 'Разработка Telegram-ботов под ключ: воронки, магазины с оплатой, запись, AI-ассистенты. А также сайты, Mini Apps и автоматизации под вашу идею.'
    },
    a11y: {
      skip: 'Перейти к содержанию',
      theme: 'Сменить тему',
      menu: 'Меню',
      lang: 'English version',
      chat: 'Пример диалога с Telegram-ботом',
      filters: 'Фильтр работ'
    },
    nav: { work: 'Портфолио', services: 'Услуги', benefits: 'Преимущества', blog: 'Блог', about: 'Обо мне', contact: 'Контакты', cta: 'Написать' },

    hero: {
      kicker: 'Telegram-боты · vibecode под задачу',
      title: 'Делаю ботов, которые <span class="mark">работают</span> за&nbsp;вас',
      sub: 'Разработка Telegram-ботов под ключ — от простой воронки до магазина с оплатой и админкой. А если нужен не бот — соберу сайт, скрипт или сервис под вашу идею.',
      cta1: 'Обсудить проект',
      cta2: 'Смотреть работы',
      facts: [['от 3 дней', 'до первой версии'], ['24/7', 'бот не спит'], ['под ключ', 'от идеи до сервера']],
      note: 'живой пример ↓'
    },

    chat: {
      status: 'бот',
      placeholder: 'Сообщение',
      messages: [
        { from: 'user', text: '/start' },
        { from: 'bot', text: 'Привет! Я бот pelotrum 👋<br>Чем могу помочь?', buttons: ['Заказать бота', 'Цены'] },
        { from: 'user', text: 'Заказать бота' },
        { from: 'bot', text: 'Отлично! Опишите задачу в двух словах — вернусь со сроком и ценой.' },
        { from: 'user', text: 'Магазин с оплатой прямо в Telegram' },
        { from: 'bot', text: 'Принято ✅<br>Оценка придёт в течение часа.' }
      ]
    },

    ticker: ['Telegram Bot API', 'aiogram', 'Mini Apps', 'Telegram Stars', 'ЮKassa', 'AI-ассистенты', 'Webhooks', 'PostgreSQL', 'Docker', 'vibecode'],

    work: {
      title: 'Что уже сделано',
      filters: { all: 'Все', bot: 'Боты', miniapp: 'Mini Apps', web: 'Сайты', auto: 'Автоматизация' },
      more: 'Подробнее',
      items: [
        { cat: 'bot', tag: 'Бот', glyph: '/menu', title: 'Бот-магазин для кофейни', desc: 'Каталог, корзина и оплата прямо в чате. Заказы падают бариста в рабочий чат.', time: '14 дней' },
        { cat: 'bot', tag: 'Бот', glyph: '/book', title: 'Запись в барбершоп', desc: 'Свободные слоты, напоминания клиентам, синхронизация с Google Calendar.', time: '7 дней' },
        { cat: 'miniapp', tag: 'Mini App', glyph: '◐ app', title: 'Mini App для фитнес-клуба', desc: 'Абонементы, расписание и бронирование тренировок без отдельного приложения.', time: '3 недели' },
        { cat: 'auto', tag: 'Автоматизация', glyph: '$ watch', title: 'Мониторинг цен конкурентов', desc: 'Парсер раз в час проверяет цены и присылает алерты в Telegram.', time: '5 дней' },
        { cat: 'bot', tag: 'Бот', glyph: 'AI', title: 'AI-ассистент поддержки', desc: 'Отвечает по базе знаний компании и зовёт человека, когда не уверен.', time: '10 дней' },
        { cat: 'web', tag: 'Сайт', glyph: '&lt;/&gt;', title: 'Лендинг под запуск курса', desc: 'Vibecode за выходные: страница, форма заявки, заявки летят в бота.', time: '3 дня' }
      ]
    },

    services: {
      title: 'Услуги и цены',
      note: '* Цены ориентировочные. Точную стоимость назову после короткого созвона или переписки — бесплатно.',
      items: [
        { name: 'Бот-старт', price: 'от 15 000 ₽', min: 15000, currency: 'RUB', term: 'от 3 дней', desc: 'Для заявок, визиток и простых воронок.', features: ['Меню, кнопки, сценарии', 'Заявки в чат или Google Sheets', 'Рассылки по базе', 'Деплой на сервер', '2 недели поддержки'], cta: 'Обсудить' },
        { name: 'Бот-бизнес', price: 'от 40 000 ₽', min: 40000, currency: 'RUB', term: 'от 2 недель', desc: 'Полноценный продукт внутри Telegram.', features: ['Каталог, запись или воронка', 'Оплата: ЮKassa, Telegram Stars', 'Админ-панель', 'База данных и аналитика', 'AI-функции по желанию'], cta: 'Обсудить', hot: 'популярно' },
        { name: 'Vibecode', price: 'индивидуально', term: 'по задаче', desc: '«Хочу штуку, которая…» — соберу.', features: ['Сайты и лендинги', 'Telegram Mini Apps', 'Парсеры и автоматизации', 'Интеграции с API', 'Прототип за пару дней'], cta: 'Рассказать идею' }
      ]
    },

    benefits: {
      title: 'Почему со мной удобно',
      items: [
        { t: 'Быстро', d: 'Первая рабочая версия — за дни, а не месяцы. Показываю прогресс по ходу, а не в конце.' },
        { t: 'Под ключ', d: 'Код, сервер, домен, вебхуки, оплата. Вы получаете готового бота, а не архив с файлами.' },
        { t: 'Понятно', d: 'Без технического жаргона. Фиксирую задачу, срок и цену до старта работ.' },
        { t: 'Не пропадаю', d: 'Поддержка после запуска, правки и развитие проекта — на связи в Telegram.' }
      ]
    },

    blog: {
      title: 'Пишу о ботах и не только',
      all: 'Все статьи',
      min: 'мин',
      items: [
        { date: '12 сен 2026', iso: '2026-09-12', min: 6, tag: 'Цены', title: 'Сколько стоит Telegram-бот в 2026 году', desc: 'Из чего складывается цена и где можно сэкономить без потери качества.' },
        { date: '28 авг 2026', iso: '2026-08-28', min: 4, tag: 'Оплата', title: 'Stars или ЮKassa: чем принимать оплату в боте', desc: 'Сравниваю комиссии, удобство для клиента и подводные камни.' },
        { date: '10 авг 2026', iso: '2026-08-10', min: 5, tag: 'Vibecode', title: 'Что такое vibecode и когда он подходит', desc: 'Быстрые прототипы с AI: где это работает, а где лучше не рисковать.' }
      ]
    },

    about: {
      title: 'Привет! Я — тот, кто за pelotrum',
      p: [
        'Разработчик. Делаю Telegram-ботов и небольшие сервисы, которые экономят людям часы рутины. Люблю, когда идея за пару дней превращается в штуку, которой реально пользуются.',
        'Работаю напрямую, без посредников и менеджеров — вы общаетесь с тем, кто пишет код.'
      ],
      stack: ['Python', 'aiogram', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Mini Apps', 'LLM API'],
      photo: 'тут будет фото'
    },

    contact: {
      sticker: 'ответ в течение дня',
      title: 'Есть идея? Напишите.',
      sub: 'Расскажите, что нужно автоматизировать или сделать — предложу решение, срок и цену.'
    },

    footer: { made: 'боты и vibecode', top: 'Наверх' },

    notFound: {
      title: 'Страница не найдена — pelotrum',
      code: 'command not found',
      text: 'Такой страницы нет. Возможно, ссылка устарела или в адресе опечатка.',
      home: 'На главную'
    }
  },

  en: {
    locale: 'en_US',
    meta: {
      title: 'pelotrum — Telegram bots and vibecode on demand',
      description: 'Turnkey Telegram bot development: funnels, shops with payments, booking, AI assistants. Plus websites, Mini Apps and automations built around your idea.'
    },
    a11y: {
      skip: 'Skip to content',
      theme: 'Toggle theme',
      menu: 'Menu',
      lang: 'Русская версия',
      chat: 'Sample conversation with a Telegram bot',
      filters: 'Filter work'
    },
    nav: { work: 'Work', services: 'Services', benefits: 'Benefits', blog: 'Blog', about: 'About', contact: 'Contact', cta: 'Get in touch' },

    hero: {
      kicker: 'Telegram bots · vibecode on demand',
      title: 'I build bots that <span class="mark">do the work</span> for&nbsp;you',
      sub: 'Turnkey Telegram bot development — from a simple funnel to a full shop with payments and an admin panel. Need something other than a bot? I’ll build a site, script or service around your idea.',
      cta1: 'Discuss a project',
      cta2: 'See the work',
      facts: [['3+ days', 'to the first version'], ['24/7', 'bots never sleep'], ['turnkey', 'idea to server']],
      note: 'live demo ↓'
    },

    chat: {
      status: 'bot',
      placeholder: 'Message',
      messages: [
        { from: 'user', text: '/start' },
        { from: 'bot', text: 'Hi! I’m the pelotrum bot 👋<br>How can I help?', buttons: ['Order a bot', 'Prices'] },
        { from: 'user', text: 'Order a bot' },
        { from: 'bot', text: 'Great! Describe the task in a few words — I’ll get back with a timeline and price.' },
        { from: 'user', text: 'A shop with payments right inside Telegram' },
        { from: 'bot', text: 'Got it ✅<br>You’ll get an estimate within an hour.' }
      ]
    },

    ticker: ['Telegram Bot API', 'aiogram', 'Mini Apps', 'Telegram Stars', 'Stripe', 'AI assistants', 'Webhooks', 'PostgreSQL', 'Docker', 'vibecode'],

    work: {
      title: 'Selected work',
      filters: { all: 'All', bot: 'Bots', miniapp: 'Mini Apps', web: 'Websites', auto: 'Automation' },
      more: 'Details',
      items: [
        { cat: 'bot', tag: 'Bot', glyph: '/menu', title: 'Coffee shop ordering bot', desc: 'Catalog, cart and in-chat payments. Orders go straight to the baristas’ work chat.', time: '14 days' },
        { cat: 'bot', tag: 'Bot', glyph: '/book', title: 'Barbershop booking', desc: 'Free slots, client reminders and Google Calendar sync.', time: '7 days' },
        { cat: 'miniapp', tag: 'Mini App', glyph: '◐ app', title: 'Fitness club Mini App', desc: 'Memberships, schedule and class booking — no separate app needed.', time: '3 weeks' },
        { cat: 'auto', tag: 'Automation', glyph: '$ watch', title: 'Competitor price monitor', desc: 'An hourly scraper checks prices and sends alerts to Telegram.', time: '5 days' },
        { cat: 'bot', tag: 'Bot', glyph: 'AI', title: 'AI support assistant', desc: 'Answers from the company knowledge base and hands off to a human when unsure.', time: '10 days' },
        { cat: 'web', tag: 'Website', glyph: '&lt;/&gt;', title: 'Course launch landing', desc: 'Vibecoded over a weekend: page, signup form, leads go to a bot.', time: '3 days' }
      ]
    },

    services: {
      title: 'Services & pricing',
      note: '* Prices are approximate. I’ll give an exact quote after a short call or chat — free of charge.',
      items: [
        { name: 'Bot Start', price: 'from $200', min: 200, currency: 'USD', term: '3+ days', desc: 'For leads, business cards and simple funnels.', features: ['Menus, buttons, flows', 'Leads to a chat or Google Sheets', 'Broadcasts to your audience', 'Server deployment', '2 weeks of support'], cta: 'Discuss' },
        { name: 'Bot Business', price: 'from $500', min: 500, currency: 'USD', term: '2+ weeks', desc: 'A full product inside Telegram.', features: ['Catalog, booking or funnel', 'Payments: Stripe, Telegram Stars', 'Admin panel', 'Database & analytics', 'Optional AI features'], cta: 'Discuss', hot: 'popular' },
        { name: 'Vibecode', price: 'custom', term: 'per task', desc: '“I want a thing that…” — I’ll build it.', features: ['Websites & landings', 'Telegram Mini Apps', 'Scrapers & automations', 'API integrations', 'Prototype in a couple of days'], cta: 'Pitch your idea' }
      ]
    },

    benefits: {
      title: 'Why it’s easy to work with me',
      items: [
        { t: 'Fast', d: 'A working first version in days, not months. You see progress along the way, not just at the end.' },
        { t: 'Turnkey', d: 'Code, server, domain, webhooks, payments. You get a running bot, not a zip of files.' },
        { t: 'Clear', d: 'No tech jargon. Scope, timeline and price are fixed before work starts.' },
        { t: 'Reliable', d: 'Support after launch, tweaks and further development — always reachable on Telegram.' }
      ]
    },

    blog: {
      title: 'Notes on bots and beyond',
      all: 'All posts',
      min: 'min',
      items: [
        { date: 'Sep 12, 2026', iso: '2026-09-12', min: 6, tag: 'Pricing', title: 'How much does a Telegram bot cost in 2026', desc: 'What drives the price and where you can save without losing quality.' },
        { date: 'Aug 28, 2026', iso: '2026-08-28', min: 4, tag: 'Payments', title: 'Stars vs Stripe: taking payments in a bot', desc: 'Comparing fees, client convenience and the hidden pitfalls.' },
        { date: 'Aug 10, 2026', iso: '2026-08-10', min: 5, tag: 'Vibecode', title: 'What vibecode is and when it fits', desc: 'Fast AI-assisted prototypes: where they shine and where to stay careful.' }
      ]
    },

    about: {
      title: 'Hi! I’m the one behind pelotrum',
      p: [
        'Developer. I build Telegram bots and small services that save people hours of routine. I love it when an idea turns into something people actually use within a couple of days.',
        'I work directly, no middlemen or managers — you talk to the person who writes the code.'
      ],
      stack: ['Python', 'aiogram', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Mini Apps', 'LLM API'],
      photo: 'photo goes here'
    },

    contact: {
      sticker: 'reply within a day',
      title: 'Got an idea? Drop me a line.',
      sub: 'Tell me what you want to automate or build — I’ll suggest a solution, timeline and price.'
    },

    footer: { made: 'bots & vibecode', top: 'Back to top' },

    notFound: {
      title: 'Page not found — pelotrum',
      code: 'command not found',
      text: 'This page doesn’t exist. The link may be outdated or the address has a typo.',
      home: 'Go home'
    }
  }
};
