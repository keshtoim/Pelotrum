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
          `1.1. Политика описывает, как я обрабатываю и защищаю персональные данные посетителей сайта ${site.url} и людей, которые обращаются ко мне за услугами.`,
          `1.2. Оператор персональных данных — ${name}, плательщик налога на профессиональный доход (самозанятый), ИНН ${inn}, e-mail: ${site.email}.`,
          '1.3. Данные нужны для обратной связи, консультаций, обсуждения и выполнения проектов.',
          '1.4. Когда вы пишете мне в Telegram или на e-mail, вы соглашаетесь с этой Политикой. Если вы с ней не согласны, не передавайте мне свои данные и прекратите пользоваться сайтом.'
        ] },
        { h: '2. Какие данные я собираю', blocks: [
          '2.1. Только то, что нужно для общения и работы сайта:',
          [
            'контактные данные, которые вы сами указали при обращении: имя, e-mail, аккаунты в мессенджерах;',
            'технические данные: IP-адрес, сведения о браузере и устройстве, которые хостинг GitHub Pages фиксирует в журналах сервера;',
            ...(site.metrika ? ['обезличенные данные о поведении на сайте: cookies, клики, прокрутка, время на странице — через Яндекс Метрику.'] : [])
          ]
        ] },
        { h: '3. Зачем я обрабатываю данные', blocks: [
          '3.1. Данные используются только для:',
          [
            'связи с вами: обсуждения проекта, подготовки предложения и договорённостей;',
            ...(site.metrika ? ['анализа посещаемости, чтобы улучшать интерфейс и скорость сайта.'] : [])
          ],
          '3.2. Обработка ведётся в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».'
        ] },
        { h: '4. Передача третьим лицам', blocks: [
          '4.1. Я не продаю и не передаю ваши данные третьим лицам, кроме случаев, прямо предусмотренных законодательством РФ.',
          `4.2. Сайт размещён на GitHub Pages, а переписка идёт через Telegram и почтовые сервисы — они обрабатывают данные по своим правилам.${site.metrika ? ' Для обезличенной статистики используется Яндекс Метрика.' : ''}`
        ] },
        { h: '5. Защита данных', blocks: [
          '5.1. Я принимаю технические и организационные меры, чтобы защитить данные от несанкционированного доступа, изменения, раскрытия и уничтожения.',
          '5.2. Данные хранятся до достижения целей обработки или до отзыва вашего согласия.'
        ] },
        { h: '6. Ваши права и заключительные положения', blocks: [
          `6.1. В любой момент вы можете отозвать согласие на обработку или попросить удалить данные — напишите на ${site.email}.`,
          '6.2. Политика может обновляться. Актуальная версия всегда на этой странице.'
        ] }
      ]
    },
    en: {
      title: 'Privacy Policy',
      updated: updated.en,
      sections: [
        { h: '1. General provisions', blocks: [
          `1.1. This Policy explains how I process and protect the personal data of visitors to ${site.url} and of people who contact me about services.`,
          `1.2. The data controller is ${name}, a self-employed professional income tax payer, Taxpayer ID (INN) ${inn}, e-mail: ${site.email}.`,
          '1.3. Data is used for communication, consultations, and discussing and delivering projects.',
          '1.4. By writing to me via Telegram or e-mail, you agree to this Policy. If you do not agree, please do not share your data and stop using the site.'
        ] },
        { h: '2. Data I collect', blocks: [
          '2.1. Only what is needed for communication and running the site:',
          [
            'contact details you provide when reaching out: name, e-mail, messenger accounts;',
            'technical data: IP address, browser and device details logged by the GitHub Pages hosting in its server logs;',
            ...(site.metrika ? ['anonymized behavior data: cookies, clicks, scrolling, time on page — via Yandex Metrica.'] : [])
          ]
        ] },
        { h: '3. Why I process data', blocks: [
          '3.1. Data is used only for:',
          [
            'communicating with you: discussing the project, preparing a proposal and agreeing on terms;',
            ...(site.metrika ? ['traffic analytics to improve the site’s interface and speed.'] : [])
          ],
          '3.2. Processing complies with Russian Federal Law No. 152-FZ “On Personal Data”.'
        ] },
        { h: '4. Sharing with third parties', blocks: [
          '4.1. I do not sell or share your data with third parties, except where directly required by Russian law.',
          `4.2. The site is hosted on GitHub Pages, and correspondence goes through Telegram and e-mail providers, which process data under their own policies.${site.metrika ? ' Yandex Metrica is used for anonymized statistics.' : ''}`
        ] },
        { h: '5. Data protection', blocks: [
          '5.1. I take technical and organizational measures to protect data against unauthorized access, alteration, disclosure and destruction.',
          '5.2. Data is kept until the processing purposes are achieved or until you withdraw consent.'
        ] },
        { h: '6. Your rights and final provisions', blocks: [
          `6.1. You may withdraw your consent or request deletion of your data at any time by writing to ${site.email}.`,
          '6.2. This Policy may be updated. The current version is always available on this page.'
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
