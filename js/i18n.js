// Весь текст сайта. Простые строки — по ключу data-i18n, списки — рендерятся в main.js.
// Всё, что ниже, — заглушки: цены, кейсы, статьи, контакты заменить на реальные.

window.I18N = {
  ru: {
    'nav.work': 'Портфолио',
    'nav.services': 'Услуги',
    'nav.benefits': 'Преимущества',
    'nav.blog': 'Блог',
    'nav.about': 'Обо мне',
    'nav.contact': 'Контакты',
    'nav.cta': 'Написать',

    'hero.kicker': 'Telegram-боты · vibecode под задачу',
    'hero.title': 'Делаю ботов, которые <span class="mark">работают</span> за&nbsp;вас',
    'hero.sub': 'Разработка Telegram-ботов под ключ — от простой воронки до магазина с оплатой и админкой. А если нужен не бот — соберу сайт, скрипт или сервис под вашу идею.',
    'hero.cta1': 'Обсудить проект',
    'hero.cta2': 'Смотреть работы',
    'hero.f1v': 'от 3 дней', 'hero.f1': 'до первой версии',
    'hero.f2v': '24/7', 'hero.f2': 'бот не спит',
    'hero.f3v': 'под ключ', 'hero.f3': 'от идеи до сервера',
    'hero.note': 'живой пример ↓',

    'chat.status': 'бот',
    'chat.placeholder': 'Сообщение',
    'chat': [
      { from: 'user', text: '/start' },
      { from: 'bot', text: 'Привет! Я бот pelotrum 👋<br>Чем могу помочь?', buttons: ['Заказать бота', 'Цены'] },
      { from: 'user', text: 'Заказать бота' },
      { from: 'bot', text: 'Отлично! Опишите задачу в двух словах — вернусь со сроком и ценой.' },
      { from: 'user', text: 'Магазин с оплатой прямо в Telegram' },
      { from: 'bot', text: 'Принято ✅<br>Оценка придёт в течение часа.' }
    ],

    'ticker': ['Telegram Bot API', 'aiogram', 'Mini Apps', 'Telegram Stars', 'ЮKassa', 'AI-ассистенты', 'Webhooks', 'PostgreSQL', 'Docker', 'vibecode'],

    'work.title': 'Что уже сделано',
    'work.f.all': 'Все',
    'work.f.bot': 'Боты',
    'work.f.miniapp': 'Mini Apps',
    'work.f.web': 'Сайты',
    'work.f.auto': 'Автоматизация',
    'work.more': 'Подробнее',
    'work': [
      { cat: 'bot', tag: 'Бот', glyph: '/menu', title: 'Бот-магазин для кофейни', desc: 'Каталог, корзина и оплата прямо в чате. Заказы падают бариста в рабочий чат.', time: '14 дней' },
      { cat: 'bot', tag: 'Бот', glyph: '/book', title: 'Запись в барбершоп', desc: 'Свободные слоты, напоминания клиентам, синхронизация с Google Calendar.', time: '7 дней' },
      { cat: 'miniapp', tag: 'Mini App', glyph: '◐ app', title: 'Mini App для фитнес-клуба', desc: 'Абонементы, расписание и бронирование тренировок без отдельного приложения.', time: '3 недели' },
      { cat: 'auto', tag: 'Автоматизация', glyph: '$ watch', title: 'Мониторинг цен конкурентов', desc: 'Парсер раз в час проверяет цены и присылает алерты в Telegram.', time: '5 дней' },
      { cat: 'bot', tag: 'Бот', glyph: 'AI', title: 'AI-ассистент поддержки', desc: 'Отвечает по базе знаний компании и зовёт человека, когда не уверен.', time: '10 дней' },
      { cat: 'web', tag: 'Сайт', glyph: '&lt;/&gt;', title: 'Лендинг под запуск курса', desc: 'Vibecode за выходные: страница, форма заявки, заявки летят в бота.', time: '3 дня' }
    ],

    'services.title': 'Услуги и цены',
    'services.note': '* Цены ориентировочные. Точную стоимость назову после короткого созвона или переписки — бесплатно.',
    'prices': [
      { name: 'Бот-старт', price: 'от 15 000 ₽', term: 'от 3 дней', desc: 'Для заявок, визиток и простых воронок.', features: ['Меню, кнопки, сценарии', 'Заявки в чат или Google Sheets', 'Рассылки по базе', 'Деплой на сервер', '2 недели поддержки'], cta: 'Обсудить' },
      { name: 'Бот-бизнес', price: 'от 40 000 ₽', term: 'от 2 недель', desc: 'Полноценный продукт внутри Telegram.', features: ['Каталог, запись или воронка', 'Оплата: ЮKassa, Telegram Stars', 'Админ-панель', 'База данных и аналитика', 'AI-функции по желанию'], cta: 'Обсудить', hot: 'популярно' },
      { name: 'Vibecode', price: 'индивидуально', term: 'по задаче', desc: '«Хочу штуку, которая…» — соберу.', features: ['Сайты и лендинги', 'Telegram Mini Apps', 'Парсеры и автоматизации', 'Интеграции с API', 'Прототип за пару дней'], cta: 'Рассказать идею' }
    ],

    'benefits.title': 'Почему со мной удобно',
    'benefits': [
      { t: 'Быстро', d: 'Первая рабочая версия — за дни, а не месяцы. Показываю прогресс по ходу, а не в конце.' },
      { t: 'Под ключ', d: 'Код, сервер, домен, вебхуки, оплата. Вы получаете готового бота, а не архив с файлами.' },
      { t: 'Понятно', d: 'Без технического жаргона. Фиксирую задачу, срок и цену до старта работ.' },
      { t: 'Не пропадаю', d: 'Поддержка после запуска, правки и развитие проекта — на связи в Telegram.' }
    ],

    'blog.title': 'Пишу о ботах и не только',
    'blog.all': 'Все статьи',
    'blog.read': 'мин',
    'blog': [
      { date: '12 сен 2026', min: 6, tag: 'Цены', title: 'Сколько стоит Telegram-бот в 2026 году', desc: 'Из чего складывается цена и где можно сэкономить без потери качества.' },
      { date: '28 авг 2026', min: 4, tag: 'Оплата', title: 'Stars или ЮKassa: чем принимать оплату в боте', desc: 'Сравниваю комиссии, удобство для клиента и подводные камни.' },
      { date: '10 авг 2026', min: 5, tag: 'Vibecode', title: 'Что такое vibecode и когда он подходит', desc: 'Быстрые прототипы с AI: где это работает, а где лучше не рисковать.' }
    ],

    'about.title': 'Привет! Я — тот, кто за pelotrum',
    'about.p1': 'Разработчик. Делаю Telegram-ботов и небольшие сервисы, которые экономят людям часы рутины. Люблю, когда идея за пару дней превращается в штуку, которой реально пользуются.',
    'about.p2': 'Работаю напрямую, без посредников и менеджеров — вы общаетесь с тем, кто пишет код.',
    'about.photo': 'тут будет фото',

    'contact.sticker': 'ответ в течение дня',
    'contact.title': 'Есть идея? Напишите.',
    'contact.sub': 'Расскажите, что нужно автоматизировать или сделать — предложу решение, срок и цену.',

    'footer.made': 'боты и vibecode',
    'footer.top': 'Наверх'
  },

  en: {
    'nav.work': 'Work',
    'nav.services': 'Services',
    'nav.benefits': 'Benefits',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.cta': 'Get in touch',

    'hero.kicker': 'Telegram bots · vibecode on demand',
    'hero.title': 'I build bots that <span class="mark">do the work</span> for&nbsp;you',
    'hero.sub': 'Turnkey Telegram bot development — from a simple funnel to a full shop with payments and an admin panel. Need something other than a bot? I’ll build a site, script or service around your idea.',
    'hero.cta1': 'Discuss a project',
    'hero.cta2': 'See the work',
    'hero.f1v': '3+ days', 'hero.f1': 'to the first version',
    'hero.f2v': '24/7', 'hero.f2': 'bots never sleep',
    'hero.f3v': 'turnkey', 'hero.f3': 'idea to server',
    'hero.note': 'live demo ↓',

    'chat.status': 'bot',
    'chat.placeholder': 'Message',
    'chat': [
      { from: 'user', text: '/start' },
      { from: 'bot', text: 'Hi! I’m the pelotrum bot 👋<br>How can I help?', buttons: ['Order a bot', 'Prices'] },
      { from: 'user', text: 'Order a bot' },
      { from: 'bot', text: 'Great! Describe the task in a few words — I’ll get back with a timeline and price.' },
      { from: 'user', text: 'A shop with payments right inside Telegram' },
      { from: 'bot', text: 'Got it ✅<br>You’ll get an estimate within an hour.' }
    ],

    'ticker': ['Telegram Bot API', 'aiogram', 'Mini Apps', 'Telegram Stars', 'Stripe', 'AI assistants', 'Webhooks', 'PostgreSQL', 'Docker', 'vibecode'],

    'work.title': 'Selected work',
    'work.f.all': 'All',
    'work.f.bot': 'Bots',
    'work.f.miniapp': 'Mini Apps',
    'work.f.web': 'Websites',
    'work.f.auto': 'Automation',
    'work.more': 'Details',
    'work': [
      { cat: 'bot', tag: 'Bot', glyph: '/menu', title: 'Coffee shop ordering bot', desc: 'Catalog, cart and in-chat payments. Orders go straight to the baristas’ work chat.', time: '14 days' },
      { cat: 'bot', tag: 'Bot', glyph: '/book', title: 'Barbershop booking', desc: 'Free slots, client reminders and Google Calendar sync.', time: '7 days' },
      { cat: 'miniapp', tag: 'Mini App', glyph: '◐ app', title: 'Fitness club Mini App', desc: 'Memberships, schedule and class booking — no separate app needed.', time: '3 weeks' },
      { cat: 'auto', tag: 'Automation', glyph: '$ watch', title: 'Competitor price monitor', desc: 'An hourly scraper checks prices and sends alerts to Telegram.', time: '5 days' },
      { cat: 'bot', tag: 'Bot', glyph: 'AI', title: 'AI support assistant', desc: 'Answers from the company knowledge base and hands off to a human when unsure.', time: '10 days' },
      { cat: 'web', tag: 'Website', glyph: '&lt;/&gt;', title: 'Course launch landing', desc: 'Vibecoded over a weekend: page, signup form, leads go to a bot.', time: '3 days' }
    ],

    'services.title': 'Services & pricing',
    'services.note': '* Prices are approximate. I’ll give an exact quote after a short call or chat — free of charge.',
    'prices': [
      { name: 'Bot Start', price: 'from $200', term: '3+ days', desc: 'For leads, business cards and simple funnels.', features: ['Menus, buttons, flows', 'Leads to a chat or Google Sheets', 'Broadcasts to your audience', 'Server deployment', '2 weeks of support'], cta: 'Discuss' },
      { name: 'Bot Business', price: 'from $500', term: '2+ weeks', desc: 'A full product inside Telegram.', features: ['Catalog, booking or funnel', 'Payments: Stripe, Telegram Stars', 'Admin panel', 'Database & analytics', 'Optional AI features'], cta: 'Discuss', hot: 'popular' },
      { name: 'Vibecode', price: 'custom', term: 'per task', desc: '“I want a thing that…” — I’ll build it.', features: ['Websites & landings', 'Telegram Mini Apps', 'Scrapers & automations', 'API integrations', 'Prototype in a couple of days'], cta: 'Pitch your idea' }
    ],

    'benefits.title': 'Why it’s easy to work with me',
    'benefits': [
      { t: 'Fast', d: 'A working first version in days, not months. You see progress along the way, not just at the end.' },
      { t: 'Turnkey', d: 'Code, server, domain, webhooks, payments. You get a running bot, not a zip of files.' },
      { t: 'Clear', d: 'No tech jargon. Scope, timeline and price are fixed before work starts.' },
      { t: 'Reliable', d: 'Support after launch, tweaks and further development — always reachable on Telegram.' }
    ],

    'blog.title': 'Notes on bots and beyond',
    'blog.all': 'All posts',
    'blog.read': 'min',
    'blog': [
      { date: 'Sep 12, 2026', min: 6, tag: 'Pricing', title: 'How much does a Telegram bot cost in 2026', desc: 'What drives the price and where you can save without losing quality.' },
      { date: 'Aug 28, 2026', min: 4, tag: 'Payments', title: 'Stars vs Stripe: taking payments in a bot', desc: 'Comparing fees, client convenience and the hidden pitfalls.' },
      { date: 'Aug 10, 2026', min: 5, tag: 'Vibecode', title: 'What vibecode is and when it fits', desc: 'Fast AI-assisted prototypes: where they shine and where to stay careful.' }
    ],

    'about.title': 'Hi! I’m the one behind pelotrum',
    'about.p1': 'Developer. I build Telegram bots and small services that save people hours of routine. I love it when an idea turns into something people actually use within a couple of days.',
    'about.p2': 'I work directly, no middlemen or managers — you talk to the person who writes the code.',
    'about.photo': 'photo goes here',

    'contact.sticker': 'reply within a day',
    'contact.title': 'Got an idea? Drop me a line.',
    'contact.sub': 'Tell me what you want to automate or build — I’ll suggest a solution, timeline and price.',

    'footer.made': 'bots & vibecode',
    'footer.top': 'Back to top'
  }
};
