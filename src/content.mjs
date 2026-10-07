export const site = {
  // Из url берётся и базовый путь (/Pelotrum/), поэтому при смене домена ссылки перестроятся сами.
  url: 'https://keshtoim.github.io/Pelotrum/',

  name: 'pelotrum',
  telegram: 'username',          // без @ (заглушка)
  github: 'https://github.com/keshtoim',

  // Блог скрыт, пока нет статей: секция и пункт меню вернутся при true.
  showBlog: false,

  // Оператор персональных данных и исполнитель услуг (самозанятый) — выводится в Политике и Условиях.
  legal: { name: '[ФИО]', inn: '[ИНН]' },

  // Заготовки на будущее: раскомментировать, когда понадобятся.

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
const repo = (name) => `${site.github}/${name}`;

export const content = {
  ru: {
    locale: 'ru_RU',
    meta: {
      title: 'pelotrum',
      description: 'Вайбкодинг под ключ: быстро собираю сайты, Telegram-ботов, Android-приложения, браузерные расширения и автоматизации — от идеи до рабочего продукта.'
    },
    a11y: {
      skip: 'Перейти к содержанию',
      theme: 'Сменить тему',
      menu: 'Меню',
      lang: 'English version',
      chat: 'Пример диалога с Telegram-ботом',
      filters: 'Фильтр работ',
      repo: 'Исходный код на GitHub'
    },
    nav: { work: 'Портфолио', services: 'Услуги', process: 'Как работаем', benefits: 'Преимущества', blog: 'Блог', about: 'Обо мне', faq: 'Вопросы', contact: 'Контакты', cta: 'Написать' },
    hero: {
      kicker: 'vibecode · от идеи до рабочего продукта',
      title: 'Превращаю идею в&nbsp;<span class="mark">рабочий</span> продукт',
      sub: 'Вайбкодинг под ключ: сайты, Telegram-боты, Android-приложения, браузерные расширения и автоматизации. Первая рабочая версия — за дни, дальше доводка до продакшена.',
      cta1: 'Обсудить идею',
      cta2: 'Смотреть работы',
      facts: [['от 3 дней', 'до прототипа'], ['любой стек', 'веб, боты, Android'], ['под ключ', 'от идеи до релиза']],
      note: 'живой пример ↓'
    },

    // Используется отключённым демо-чатом (chatDemo в src/page.mjs).
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
    ticker: ['vibecode', 'Python', 'aiogram', 'Kotlin', 'Jetpack Compose', 'JavaScript', 'Manifest V3', 'Claude API', 'SQLite', 'Docker', 'GitHub Actions'],

    // У карточки без url нет ссылки «Подробнее»: репозиторий бота расписания раскрывает учебное заведение.
    work: {
      title: 'Что уже сделано',
      filters: { all: 'Все', bot: 'Боты', app: 'Приложения', ext: 'Расширения', web: 'Сайты' },
      more: 'Подробнее',
      items: [
        {
          cat: 'bot', tag: 'Бот', glyph: '/today',
          title: 'Расписание занятий в Telegram',
          desc: 'Расписание и замены учебной группы прямо в чате. Данные берутся из официальных файлов, бот сам присылает новые замены и замечает опечатки в них.',
          stack: 'Python · aiogram · openpyxl'
        },
        {
          cat: 'app', tag: 'Android', glyph: '✓ 7/7',
          title: 'Flowbit — трекер привычек',
          desc: 'Офлайн-приложение: гибкие привычки, таймеры, напоминания с кнопкой «Выполнено» в шторке, виджеты на рабочий стол и аналитика с тепловой картой.',
          stack: 'Kotlin · Jetpack Compose · Room',
          url: repo('Flowbit')
        },
        {
          cat: 'bot', tag: 'Бот · AI', glyph: 'SWOT',
          title: 'AI-аналитик для инвесторов',
          desc: 'Собирает новости и котировки MOEX по компании и через Claude делает разбор: SWOT, PESTEL, 5 сил Портера, мультипликаторы, обзор сектора.',
          stack: 'Python · Claude API · SQLite · Docker',
          url: repo('analysis_for_invest_bot')
        },
        {
          cat: 'bot', tag: 'Бот', glyph: '28d',
          title: 'Become Butter — бот саморазвития',
          desc: '28-дневная программа с ежедневными микрозаданиями по расписанию и геймификацией: баллы и статусы от «сливок» до «золота».',
          stack: 'Python · aiogram · APScheduler',
          url: repo('become_butter_bot')
        },
        {
          cat: 'ext', tag: 'Расширение', glyph: '12:34',
          title: 'Site Blocker — расширение для браузера',
          desc: 'Блокирует отвлекающие сайты и ставит дневные лимиты, в том числе общие на группу сайтов. Снять блокировку сгоряча нельзя — только через 5 минут ожидания.',
          stack: 'JavaScript · Manifest V3',
          url: repo('site_blocker_extension')
        },
        {
          cat: 'web', tag: 'Сайт', glyph: '~/pelotrum',
          title: 'Этот сайт',
          desc: 'Двуязычный статический сайт со светлой и тёмной темой: своя сборка без зависимостей, микроразметка и автодеплой на GitHub Pages.',
          stack: 'HTML · CSS · JS · Node.js',
          url: repo('Pelotrum')
        }
      ]
    },
    services: {
      title: 'Услуги и цены',
      note: '* Цены ориентировочные. Точную стоимость назову после короткого созвона или переписки — бесплатно.',
      items: [
        { name: 'Прототип', price: 'от 7 000 ₽', min: 7000, currency: 'RUB', term: 'от 3 дней', desc: 'Быстро проверить идею на рабочей версии.', features: ['Сайт, бот или веб-приложение', 'Рабочий функционал, а не макет', 'Деплой и ссылка, которой можно делиться', 'Исходный код остаётся у вас', '2 недели правок'], cta: 'Обсудить' },
        { name: 'Продукт', price: 'от 25 000 ₽', min: 25000, currency: 'RUB', term: 'от 2 недель', desc: 'Полноценное решение под ваш процесс.', features: ['Сайт, бот, Android-приложение или расширение', 'Оплата, админка, база данных', 'Интеграции с API и AI', 'Тесты и автодеплой', 'Поддержка после запуска'], cta: 'Обсудить', hot: 'популярно' },
        { name: 'Доработка', price: 'от 2 000 ₽', min: 2000, currency: 'RUB', term: 'за задачу', desc: 'Проект уже есть — доведу до ума.', features: ['Новые функции', 'Рефакторинг и оптимизация', 'Docker, сервер, CI/CD', 'Исправление багов', 'Консультация по стеку'], cta: 'Рассказать о проекте' }
      ]
    },
    process: {
      title: 'Как работаем',
      steps: [
        { t: 'Бриф', d: 'Пишете в Telegram: идея, задача, желаемые сроки. Задаю уточняющие вопросы.', time: 'день 0' },
        { t: 'Оценка', d: 'Присылаю техническое задание, этапы, срок и цену. Вносите предоплату — стартуем.', time: '1–2 дня' },
        { t: 'Прототип', d: 'Первая рабочая версия за дни. Показываю прогресс по ходу, а не в конце.', time: 'от 3 дней' },
        { t: 'Запуск', d: 'До двух итераций правок, деплой и передача кода. Поддержка — по договорённости.', time: 'после приёмки' }
      ]
    },

    benefits: {
      title: 'Почему со мной удобно',
      items: [
        { t: 'Быстро', d: 'Вайбкодинг с AI: первая рабочая версия за дни, а не месяцы. Прогресс видно по ходу, а не в конце.' },
        { t: 'Под ключ', d: 'Код, сервер, домен, деплой. Вы получаете работающий продукт, а не архив с файлами.' },
        { t: 'Понятно', d: 'Без технического жаргона. Фиксирую задачу, срок и цену до старта работ.' },
        { t: 'Не пропадаю', d: 'Поддержка после запуска, правки и развитие проекта — на связи в Telegram.' }
      ]
    },

    blog: {
      title: 'Пишу о разработке и не только',
      all: 'Все статьи',
      min: 'мин',
      items: [
        { date: 'Скоро', tag: 'Тема', title: 'Название статьи', desc: 'Краткое описание: о чём статья и чем она будет полезна.' },
        { date: 'Скоро', tag: 'Тема', title: 'Название статьи', desc: 'Краткое описание: о чём статья и чем она будет полезна.' },
        { date: 'Скоро', tag: 'Тема', title: 'Название статьи', desc: 'Краткое описание: о чём статья и чем она будет полезна.' }
      ]
    },
    about: {
      title: 'Привет! Я — тот, кто за pelotrum',
      p: [
        'Разработчик и вайбкодер. Собираю сайты, Telegram-ботов, Android-приложения и браузерные расширения — быстро, с помощью AI, но с нормальным кодом под капотом.',
        'Работаю напрямую, без посредников и менеджеров — вы общаетесь с тем, кто пишет код.'
      ],
      stack: ['Python', 'aiogram', 'Kotlin', 'Jetpack Compose', 'JavaScript', 'Node.js', 'SQLite', 'Docker', 'Claude API'],
      photo: 'тут будет фото'
    },
    faq: {
      title: 'Частые вопросы',
      items: [
        { q: 'Сколько стоит проект?', a: 'Цены на сайте — минимальные. Точную стоимость называю после брифа: она зависит от объёма, интеграций и сроков. Оценка бесплатная.' },
        { q: 'Как быстро будет результат?', a: 'Прототип — от 3 дней, полноценный продукт — от 2 недель. Срок фиксируется в техническом задании до старта работ.' },
        { q: 'Как проходит оплата?', a: 'Предоплата 50% или 100% для небольших задач, остаток — после приёмки. На каждую оплату формирую чек в «Мой налог».' },
        { q: 'Кому принадлежит код?', a: 'Вам: исключительные права на результат переходят после полной оплаты. Передаю исходный код и доступы.' },
        { q: 'Что если результат не устроит?', a: 'В стоимость входят до двух итераций правок в рамках задания, несоответствия заданию исправляю бесплатно. От договора можно отказаться, оплатив фактически понесённые расходы.' },
        { q: 'Вайбкодинг — это надёжно?', a: 'AI ускоряет разработку, но код я проверяю, тестирую и отвечаю за результат сам.' },
        { q: 'Поддерживаете проект после запуска?', a: 'Да, по отдельной договорённости: правки, новые функции, сервер и обновления.' }
      ]
    },

    contact: {
      sticker: 'ответ в течение дня',
      title: 'Есть идея? Напишите.',
      sub: 'Расскажите, что хотите сделать или автоматизировать — предложу решение, срок и цену.'
    },

    footer: { made: 'vibecode', top: 'Наверх', privacy: 'Политика конфиденциальности', terms: 'Публичная оферта' },
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
      title: 'pelotrum',
      description: 'Turnkey vibecoding: websites, Telegram bots, Android apps, browser extensions and automations, built fast — from idea to a working product.'
    },
    a11y: {
      skip: 'Skip to content',
      theme: 'Toggle theme',
      menu: 'Menu',
      lang: 'Русская версия',
      chat: 'Sample conversation with a Telegram bot',
      filters: 'Filter work',
      repo: 'Source code on GitHub'
    },
    nav: { work: 'Work', services: 'Services', process: 'How it works', benefits: 'Benefits', blog: 'Blog', about: 'About', faq: 'FAQ', contact: 'Contact', cta: 'Get in touch' },

    hero: {
      kicker: 'vibecode · from idea to working product',
      title: 'I turn ideas into <span class="mark">working</span> products',
      sub: 'Turnkey vibecoding: websites, Telegram bots, Android apps, browser extensions and automations. A working first version in days, then polished for production.',
      cta1: 'Discuss your idea',
      cta2: 'See the work',
      facts: [['3+ days', 'to a prototype'], ['any stack', 'web, bots, Android'], ['turnkey', 'idea to release']],
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

    ticker: ['vibecode', 'Python', 'aiogram', 'Kotlin', 'Jetpack Compose', 'JavaScript', 'Manifest V3', 'Claude API', 'SQLite', 'Docker', 'GitHub Actions'],

    work: {
      title: 'Selected work',
      filters: { all: 'All', bot: 'Bots', app: 'Apps', ext: 'Extensions', web: 'Websites' },
      more: 'Details',
      items: [
        {
          cat: 'bot', tag: 'Bot', glyph: '/today',
          title: 'Class schedule in Telegram',
          desc: 'A study group’s timetable and substitutions right in the chat. Data comes from the official files; the bot pushes new substitutions and spots typos in them.',
          stack: 'Python · aiogram · openpyxl'
        },
        {
          cat: 'app', tag: 'Android', glyph: '✓ 7/7',
          title: 'Flowbit — habit tracker',
          desc: 'An offline app: flexible habits, timers, reminders with a “Done” button in the notification, home-screen widgets and analytics with a yearly heatmap.',
          stack: 'Kotlin · Jetpack Compose · Room',
          url: repo('Flowbit')
        },
        {
          cat: 'bot', tag: 'Bot · AI', glyph: 'SWOT',
          title: 'AI analyst for investors',
          desc: 'Collects news and MOEX quotes for a company and uses Claude to produce SWOT, PESTEL, Porter’s five forces, multiples or a sector overview.',
          stack: 'Python · Claude API · SQLite · Docker',
          url: repo('analysis_for_invest_bot')
        },
        {
          cat: 'bot', tag: 'Bot', glyph: '28d',
          title: 'Become Butter — self-improvement bot',
          desc: 'A 28-day program with scheduled daily micro-tasks and gamification: points and statuses from “raw cream” to “solid gold”.',
          stack: 'Python · aiogram · APScheduler',
          url: repo('become_butter_bot')
        },
        {
          cat: 'ext', tag: 'Extension', glyph: '12:34',
          title: 'Site Blocker — browser extension',
          desc: 'Blocks distracting sites and sets daily time limits, including shared limits for groups of sites. Unblocking takes a 5-minute wait, so no impulse unlocks.',
          stack: 'JavaScript · Manifest V3',
          url: repo('site_blocker_extension')
        },
        {
          cat: 'web', tag: 'Website', glyph: '~/pelotrum',
          title: 'This website',
          desc: 'A bilingual static site with light and dark themes: a zero-dependency build, structured data and auto-deploy to GitHub Pages.',
          stack: 'HTML · CSS · JS · Node.js',
          url: repo('Pelotrum')
        }
      ]
    },

    services: {
      title: 'Services & pricing',
      note: '* Prices are approximate. I’ll give an exact quote after a short call or chat — free of charge.',
      items: [
        { name: 'Prototype', price: 'from $100', min: 100, currency: 'USD', term: '3+ days', desc: 'Test your idea with a working version.', features: ['Website, bot or web app', 'Real functionality, not a mockup', 'Deployed, with a shareable link', 'You own the source code', '2 weeks of tweaks'], cta: 'Discuss' },
        { name: 'Product', price: 'from $350', min: 350, currency: 'USD', term: '2+ weeks', desc: 'A complete solution for your workflow.', features: ['Website, bot, Android app or extension', 'Payments, admin panel, database', 'API and AI integrations', 'Tests and auto-deploy', 'Support after launch'], cta: 'Discuss', hot: 'popular' },
        { name: 'Upgrade', price: 'from $30', min: 30, currency: 'USD', term: 'per task', desc: 'Already have a project? I’ll polish it.', features: ['New features', 'Refactoring and optimization', 'Docker, server, CI/CD', 'Bug fixes', 'Stack consulting'], cta: 'Tell me about it' }
      ]
    },

    process: {
      title: 'How it works',
      steps: [
        { t: 'Brief', d: 'Message me on Telegram: your idea, the task, the timeline you have in mind. I’ll ask follow-up questions.', time: 'day 0' },
        { t: 'Estimate', d: 'I send a specification, milestones, timeline and price. You make the advance payment and we start.', time: '1–2 days' },
        { t: 'Prototype', d: 'A working first version in days. You see progress along the way, not just at the end.', time: '3+ days' },
        { t: 'Launch', d: 'Up to two rounds of revisions, deployment and code handover. Support as agreed.', time: 'after acceptance' }
      ]
    },

    benefits: {
      title: 'Why it’s easy to work with me',
      items: [
        { t: 'Fast', d: 'AI-assisted vibecoding: a working first version in days, not months. You see progress along the way.' },
        { t: 'Turnkey', d: 'Code, server, domain, deployment. You get a working product, not a zip of files.' },
        { t: 'Clear', d: 'No tech jargon. Scope, timeline and price are fixed before work starts.' },
        { t: 'Reliable', d: 'Support after launch, tweaks and further development — always reachable on Telegram.' }
      ]
    },

    blog: {
      title: 'Notes on development and beyond',
      all: 'All posts',
      min: 'min',
      items: [
        { date: 'Coming soon', tag: 'Topic', title: 'Post title', desc: 'Short summary: what the post is about and why it’s useful.' },
        { date: 'Coming soon', tag: 'Topic', title: 'Post title', desc: 'Short summary: what the post is about and why it’s useful.' },
        { date: 'Coming soon', tag: 'Topic', title: 'Post title', desc: 'Short summary: what the post is about and why it’s useful.' }
      ]
    },

    about: {
      title: 'Hi! I’m the one behind pelotrum',
      p: [
        'Developer and vibecoder. I build websites, Telegram bots, Android apps and browser extensions — fast, with AI, but with solid code under the hood.',
        'I work directly, no middlemen or managers — you talk to the person who writes the code.'
      ],
      stack: ['Python', 'aiogram', 'Kotlin', 'Jetpack Compose', 'JavaScript', 'Node.js', 'SQLite', 'Docker', 'Claude API'],
      photo: 'photo goes here'
    },

    faq: {
      title: 'Frequently asked questions',
      items: [
        { q: 'How much does a project cost?', a: 'Prices on the site are starting prices. I give an exact quote after the brief: it depends on scope, integrations and timeline. The estimate is free.' },
        { q: 'How fast will I get a result?', a: 'A prototype takes 3+ days, a full product 2+ weeks. The timeline is fixed in the specification before work starts.' },
        { q: 'How does payment work?', a: '50% upfront, or 100% for small tasks, and the rest after acceptance. I issue a receipt via the “My Tax” app for every payment.' },
        { q: 'Who owns the code?', a: 'You do: exclusive rights pass to you after full payment. I hand over the source code and access.' },
        { q: 'What if I’m not happy with the result?', a: 'Up to two rounds of revisions within the specification are included, and deviations from it are fixed free of charge. You can terminate the agreement by paying for actually incurred expenses.' },
        { q: 'Is vibecoding reliable?', a: 'AI speeds up development, but I review and test the code and take responsibility for the result myself.' },
        { q: 'Do you support the project after launch?', a: 'Yes, under a separate agreement: tweaks, new features, server and updates.' }
      ]
    },

    contact: {
      sticker: 'reply within a day',
      title: 'Got an idea? Drop me a line.',
      sub: 'Tell me what you want to build or automate — I’ll suggest a solution, timeline and price.'
    },

    footer: { made: 'vibecode', top: 'Back to top', privacy: 'Privacy Policy', terms: 'Terms of Service' },

    notFound: {
      title: 'Page not found — pelotrum',
      code: 'command not found',
      text: 'This page doesn’t exist. The link may be outdated or the address has a typo.',
      home: 'Go home'
    }
  }
};
