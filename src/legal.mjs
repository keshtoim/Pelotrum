import { site } from './content.mjs';

const { name, inn } = site.legal;
const updated = { ru: 'Редакция от 6 октября 2026 г.', en: 'Last updated: October 6, 2026' };
const base = new URL(site.url).pathname;
const privacyLink = { ru: `<a href="${base}privacy/">Политикой в отношении обработки персональных данных</a>`, en: `<a href="${base}en/privacy/">Privacy Policy</a>` };

// Блок раздела: строка — абзац, массив строк — маркированный список.
export const legal = {
  privacy: {
    ru: {
      title: 'Политика в отношении обработки персональных данных',
      updated: updated.ru,
      sections: [
        { h: '1. Общие положения', blocks: [
          `1.1. Политика определяет, как я обрабатываю и защищаю персональные данные посетителей сайта ${site.url} и людей, которые обращаются ко мне за услугами. Она разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и опубликована во исполнение ч. 2 ст. 18.1 этого закона.`,
          `1.2. Оператор персональных данных — ${name}, плательщик налога на профессиональный доход (самозанятый), ИНН ${inn}, e-mail: ${site.email}.`,
          '1.3. Политика применяется ко всем персональным данным, которые я получаю через сайт и в переписке об оказании услуг.'
        ] },
        { h: '2. Какие данные я обрабатываю', blocks: [
          '2.1. Только то, что нужно для общения и оказания услуг:',
          [
            'контактные данные, которые вы сами сообщаете при обращении: имя, e-mail, аккаунты в мессенджерах, а также сведения о задаче;',
            'реквизиты, необходимые для заключения договора и формирования чека: для организаций и индивидуальных предпринимателей — наименование и ИНН;',
            ...(site.metrika ? ['обезличенные данные о посещении сайта: cookies, IP-адрес, сведения о браузере и устройстве, клики, прокрутка, время на странице — через сервис Яндекс Метрика.'] : [])
          ],
          '2.2. Я не обрабатываю специальные категории персональных данных (ст. 10 152-ФЗ) и биометрические персональные данные (ст. 11 152-ФЗ).'
        ] },
        { h: '3. Цели и правовые основания', blocks: [
          '3.1. Данные обрабатываются для следующих целей и на следующих основаниях:',
          [
            'ответ на обращение, обсуждение задачи, подготовка предложения и заключение договора по вашей инициативе — п. 5 ч. 1 ст. 6 152-ФЗ, согласие для этого не требуется;',
            'исполнение заключённого договора — п. 5 ч. 1 ст. 6 152-ФЗ;',
            'исполнение обязанностей самозанятого, в том числе формирование чеков по Федеральному закону от 27.11.2018 № 422-ФЗ, — п. 2 ч. 1 ст. 6 152-ФЗ;',
            ...(site.metrika ? ['анализ посещаемости и улучшение сайта — на основании вашего согласия, которое запрашивается отдельно (п. 1 ч. 1 ст. 6, ч. 1 ст. 9 152-ФЗ).'] : [])
          ],
          '3.2. С данными совершаются сбор, запись, систематизация, накопление, хранение, уточнение, извлечение, использование, удаление и уничтожение — с использованием средств автоматизации и без них. Решения, порождающие для вас юридические последствия, на основании исключительно автоматизированной обработки не принимаются.'
        ] },
        { h: '4. Хранение и передача данных', blocks: [
          '4.1. Запись, систематизация, накопление, хранение, уточнение и извлечение персональных данных граждан Российской Федерации осуществляются с использованием баз данных, находящихся на территории Российской Федерации (ч. 5 ст. 18 152-ФЗ).',
          '4.2. Я не продаю и не передаю ваши данные третьим лицам, кроме случаев, предусмотренных законом. При оплате услуг сведения о расчёте передаются в ФНС России через приложение «Мой налог».',
          `4.3. Сайт размещён на хостинге GitHub Pages (GitHub, Inc., США). Хостинг-провайдер фиксирует технические данные запросов (IP-адрес, сведения о браузере) в журналах своих серверов по собственным правилам; я эти данные не получаю и не обрабатываю.${site.metrika ? ' Данные Яндекс Метрики обрабатывает ООО «Яндекс».' : ''}`
        ] },
        { h: '5. Сроки обработки и защита', blocks: [
          '5.1. Данные обрабатываются не дольше, чем этого требуют цели обработки. Если договор не заключён, данные уничтожаются в течение 30 дней после завершения переговоров. Данные по договору хранятся в течение срока, согласованного в договоре, или срока, установленного законом. При отзыве согласия обработка, основанная на нём, прекращается, а данные уничтожаются в течение 30 дней (ч. 4, 5 ст. 21 152-ФЗ).',
          '5.2. Я принимаю правовые, организационные и технические меры для защиты данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, предоставления и распространения (ст. 18.1, 19 152-ФЗ).'
        ] },
        { h: '6. Ваши права и заключительные положения', blocks: [
          '6.1. Вы вправе:',
          [
            'получить сведения об обработке ваших персональных данных (ст. 14 152-ФЗ);',
            'потребовать уточнения, блокирования или уничтожения данных, если они неполные, устаревшие, неточные, незаконно получены или не нужны для заявленной цели;',
            'отозвать согласие на обработку, если обработка основана на согласии;',
            'обжаловать мои действия в Роскомнадзоре или в суде (ст. 17 152-ФЗ).'
          ],
          `6.2. Запросы направляйте на ${site.email}. Я отвечаю в течение 10 рабочих дней с даты получения запроса; срок может быть продлён не более чем на 5 рабочих дней с направлением вам мотивированного уведомления (ст. 20 152-ФЗ).`,
          '6.3. Политика может обновляться. Актуальная редакция всегда опубликована на этой странице, дата редакции указана в начале документа.'
        ] }
      ]
    },
    en: {
      title: 'Privacy Policy',
      updated: updated.en,
      sections: [
        { h: '1. General provisions', blocks: [
          `1.1. This Policy sets out how I process and protect the personal data of visitors to ${site.url} and of people who contact me about services. It is drawn up under Russian Federal Law No. 152-FZ “On Personal Data” of 27.07.2006 and published as required by Article 18.1(2) of that law.`,
          `1.2. The data controller is ${name}, a self-employed professional income tax payer, Taxpayer ID (INN) ${inn}, e-mail: ${site.email}.`,
          '1.3. This Policy applies to all personal data I receive through the site and in correspondence about services.'
        ] },
        { h: '2. Data I process', blocks: [
          '2.1. Only what is needed for communication and providing services:',
          [
            'contact details you provide when reaching out: name, e-mail, messenger accounts, and information about your task;',
            'details needed to conclude an agreement and issue a receipt: for companies and sole proprietors — name and Taxpayer ID;',
            ...(site.metrika ? ['anonymized visit data: cookies, IP address, browser and device details, clicks, scrolling, time on page — via Yandex Metrica.'] : [])
          ],
          '2.2. I do not process special categories of personal data (Article 10 of 152-FZ) or biometric personal data (Article 11 of 152-FZ).'
        ] },
        { h: '3. Purposes and legal grounds', blocks: [
          '3.1. Data is processed for the following purposes and on the following grounds:',
          [
            'replying to your request, discussing the task, preparing a proposal and concluding an agreement at your initiative — Article 6(1)(5) of 152-FZ; no consent is required for this;',
            'performing the agreement — Article 6(1)(5) of 152-FZ;',
            'meeting the obligations of a self-employed person, including issuing receipts under Federal Law No. 422-FZ of 27.11.2018 — Article 6(1)(2) of 152-FZ;',
            ...(site.metrika ? ['traffic analysis and site improvement — based on your consent, requested separately (Article 6(1)(1) and Article 9(1) of 152-FZ).'] : [])
          ],
          '3.2. Data is collected, recorded, organized, accumulated, stored, updated, retrieved, used, deleted and destroyed, with and without automation. No decisions producing legal effects for you are made based solely on automated processing.'
        ] },
        { h: '4. Storage and sharing', blocks: [
          '4.1. Personal data of Russian citizens is recorded, organized, accumulated, stored, updated and retrieved using databases located in the Russian Federation (Article 18(5) of 152-FZ).',
          '4.2. I do not sell or share your data with third parties, except where required by law. When you pay for services, payment details are reported to the Russian Federal Tax Service via the “My Tax” app.',
          `4.3. The site is hosted on GitHub Pages (GitHub, Inc., USA). The hosting provider logs technical request data (IP address, browser details) on its servers under its own policies; I do not receive or process this data.${site.metrika ? ' Yandex Metrica data is processed by Yandex LLC.' : ''}`
        ] },
        { h: '5. Retention and security', blocks: [
          '5.1. Data is processed no longer than the purposes require. If no agreement is concluded, data is destroyed within 30 days after negotiations end. Data related to an agreement is kept for the period set in the agreement or required by law. If you withdraw consent, processing based on it stops and the data is destroyed within 30 days (Article 21(4), (5) of 152-FZ).',
          '5.2. I take legal, organizational and technical measures to protect data against unlawful or accidental access, destruction, alteration, blocking, copying, disclosure and distribution (Articles 18.1 and 19 of 152-FZ).'
        ] },
        { h: '6. Your rights and final provisions', blocks: [
          '6.1. You have the right to:',
          [
            'obtain information about the processing of your personal data (Article 14 of 152-FZ);',
            'request correction, blocking or destruction of data that is incomplete, outdated, inaccurate, unlawfully obtained or not needed for the stated purpose;',
            'withdraw consent where processing is based on consent;',
            'appeal my actions to Roskomnadzor or a court (Article 17 of 152-FZ).'
          ],
          `6.2. Send requests to ${site.email}. I reply within 10 business days of receipt; this may be extended by no more than 5 business days with a reasoned notice to you (Article 20 of 152-FZ).`,
          '6.3. This Policy may be updated. The current version is always published on this page, with its date shown at the top.'
        ] }
      ]
    }
  },

  terms: {
    ru: {
      title: 'Публичная оферта на оказание услуг',
      updated: updated.ru,
      sections: [
        { h: '1. Предмет и порядок работы', blocks: [
          `1.1. Исполнитель — ${name}, плательщик налога на профессиональный доход (самозанятый), ИНН ${inn}, e-mail: ${site.email} — оказывает услуги по разработке сайтов, Telegram-ботов, мобильных приложений, браузерных расширений и автоматизаций, а Заказчик принимает и оплачивает их на условиях этой Оферты.`,
          '1.2. Работа ведётся по согласованному техническому заданию или брифу. Существенные изменения требований фиксируются письменно, в переписке.',
          '1.3. Акцептом Оферты считается внесение Заказчиком предоплаты. С этого момента начинается работа.'
        ] },
        { h: '2. Оплата и передача прав', blocks: [
          '2.1. Работа начинается после предоплаты в согласованном размере, по умолчанию 50% или 100%. На каждую оплату Исполнитель формирует чек в приложении «Мой налог».',
          '2.2. Исключительные права на результат (исходный код, сборки, графику) переходят к Заказчику в полном объёме только после 100% оплаты.',
          '2.3. Если Заказчик расторгает договор, Исполнитель удерживает оплату за объём работ, фактически выполненный на момент уведомления, остаток предоплаты возвращается.'
        ] },
        { h: '3. Правки и приёмка', blocks: [
          '3.1. В стоимость входит до 2 итераций правок в рамках технического задания, если в тарифе не указано иное.',
          '3.2. Дополнительные правки и смена концепции оплачиваются отдельно — по договорённости или по почасовой ставке Исполнителя.',
          '3.3. Заказчик принимает работу или присылает мотивированный письменный отказ в течение 3 рабочих дней после сдачи этапа. Если отказа нет, работа считается принятой в полном объёме и надлежащего качества.'
        ] },
        { h: '4. Ответственность сторон', blocks: [
          '4.1. Исполнитель гарантирует соответствие результата техническому заданию, но не отвечает за рыночные факторы и коммерческие показатели Заказчика, а также за сбои сторонних сервисов: хостинга, Telegram, платёжных систем, API искусственного интеллекта.',
          '4.2. За законность, достоверность и авторские права на материалы, переданные Заказчиком (тексты, логотипы, медиа), отвечает Заказчик.',
          '4.3. Поддержка и сопровождение проекта после сдачи оказываются по отдельному соглашению, если они не входят в тариф.'
        ] },
        { h: '5. Сроки и коммуникация', blocks: [
          '5.1. Сроки соразмерно продлеваются, если Заказчик задерживает материалы, доступы или обратную связь.',
          '5.2. Рабочее общение ведётся в согласованных каналах (e-mail, Telegram) в рабочие дни.',
          `5.3. Персональные данные Заказчика обрабатываются в соответствии с ${privacyLink.ru}.`
        ] }
      ]
    },
    en: {
      title: 'Terms of Service',
      updated: updated.en,
      sections: [
        { h: '1. Scope and workflow', blocks: [
          `1.1. The Service Provider — ${name}, a self-employed professional income tax payer, Taxpayer ID (INN) ${inn}, e-mail: ${site.email} — develops websites, Telegram bots, mobile apps, browser extensions and automations, and the Client accepts and pays for them under these Terms.`,
          '1.2. Work follows an agreed specification or project brief. Any significant change in requirements is confirmed in writing in the conversation.',
          '1.3. These Terms are accepted when the Client makes the advance payment. Work starts at that moment.'
        ] },
        { h: '2. Payment and intellectual property', blocks: [
          '2.1. Work starts after an advance payment of the agreed amount, by default 50% or 100%. For each payment the Service Provider issues a receipt via the “My Tax” app.',
          '2.2. Exclusive rights to the result (source code, builds, graphics) pass to the Client in full only after 100% payment.',
          '2.3. If the Client terminates the agreement, the Service Provider retains payment for the work actually completed by the time of notice; the rest of the advance is refunded.'
        ] },
        { h: '3. Revisions and acceptance', blocks: [
          '3.1. The price includes up to 2 rounds of revisions within the specification, unless the plan states otherwise.',
          '3.2. Additional revisions or a change of concept are paid separately — as agreed or at the Service Provider’s hourly rate.',
          '3.3. The Client accepts the work or sends a reasoned written rejection within 3 business days after a milestone is delivered. If no rejection is received, the work is deemed accepted in full and of proper quality.'
        ] },
        { h: '4. Liability', blocks: [
          '4.1. The Service Provider guarantees that the result matches the specification but is not responsible for market factors or the Client’s business performance, nor for outages of third-party services: hosting, Telegram, payment systems, AI APIs.',
          '4.2. The Client is responsible for the legality, accuracy and copyright of materials provided (texts, logos, media).',
          '4.3. Support and maintenance after delivery are provided under a separate agreement, unless included in the plan.'
        ] },
        { h: '5. Timeline and communication', blocks: [
          '5.1. Deadlines are extended accordingly if the Client delays materials, access or feedback.',
          '5.2. Work communication takes place in the agreed channels (e-mail, Telegram) on business days.',
          `5.3. The Client’s personal data is processed in accordance with the ${privacyLink.en}.`
        ] }
      ]
    }
  }
};
