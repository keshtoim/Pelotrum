import { site } from './content.mjs';

const { name, inn } = site.legal;
const updated = { ru: 'Редакция от 6 октября 2026 г.', en: 'Last updated: October 6, 2026' };
const base = new URL(site.url).pathname;
const privacyLink = { ru: `<a href="${base}privacy/">Политикой конфиденциальности</a>`, en: `<a href="${base}en/privacy/">Privacy Policy</a>` };

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
      title: 'Условия оказания услуг',
      updated: updated.ru,
      sections: [
        { h: '1. Общие положения', blocks: [
          'Условия определяют порядок оказания услуг по разработке программного обеспечения: сайтов, Telegram-ботов, мобильных приложений, браузерных расширений и автоматизаций (далее — Услуги).',
          `Исполнитель — ${name}, плательщик налога на профессиональный доход (самозанятый), ИНН ${inn}, e-mail: ${site.email}. Заказчик — физическое или юридическое лицо, обратившееся за Услугами.`,
          'Информация на сайте, включая цены, носит справочный характер и не является публичной офертой (ст. 437 ГК РФ). Условия конкретного заказа согласуются индивидуально.'
        ] },
        { h: '2. Порядок заказа', blocks: [
          [
            'Заказчик описывает задачу в Telegram или по e-mail;',
            'Исполнитель оценивает задачу и направляет предложение: перечень работ (техническое задание), этапы, сроки и стоимость;',
            'договор считается заключённым, когда Заказчик подтверждает предложение в переписке и вносит предоплату, если она предусмотрена.'
          ]
        ] },
        { h: '3. Стоимость и оплата', blocks: [
          'Цены на сайте указаны как минимальные и уточняются после оценки задачи. Если не согласовано иное, оплата вносится в два этапа: 50% предоплаты и 50% после приёмки результата. Небольшие задачи могут оплачиваться полностью после выполнения.',
          'На каждую оплату Исполнитель формирует чек в приложении «Мой налог» и передаёт его Заказчику. НДС не облагается.',
          'Работы сверх согласованного объёма выполняются и оплачиваются только после отдельного согласования.'
        ] },
        { h: '4. Сроки и выполнение', blocks: [
          'Сроки отсчитываются с момента предоплаты и получения от Заказчика материалов и доступов, необходимых для работы. Если Заказчик задерживает материалы, ответы или доступы, срок сдвигается на время задержки.',
          'Исполнитель вправе использовать при разработке инструменты искусственного интеллекта. Ответственность за результат несёт Исполнитель.'
        ] },
        { h: '5. Сдача и приёмка', blocks: [
          'Исполнитель передаёт результат в согласованном виде: ссылка на развёрнутый проект, исходный код, сборка приложения.',
          'Заказчик проверяет результат в течение 5 рабочих дней и сообщает о несоответствиях техническому заданию. Если замечаний в этот срок нет, работа считается принятой.',
          'Несоответствия техническому заданию исправляются бесплатно. Правки после приёмки выполняются бесплатно в пределах технического задания и срока, указанного в тарифе. Новые пожелания оцениваются отдельно.'
        ] },
        { h: '6. Права на результат', blocks: [
          'Исключительные права на созданный код и материалы переходят к Заказчику после полной оплаты.',
          'Сторонние библиотеки и сервисы используются на условиях их лицензий, права на них Заказчику не передаются.',
          'Исполнитель вправе упоминать проект в портфолио без раскрытия конфиденциальной информации, если стороны не договорились иначе.'
        ] },
        { h: '7. Ответственность', blocks: [
          'Исполнитель не отвечает за сбои и изменения правил сторонних сервисов: хостинга, Telegram, платёжных систем, API искусственного интеллекта.',
          'В пределах, допускаемых законом, ответственность Исполнителя ограничена суммой, уплаченной по соответствующему заказу.',
          'Заказчик отвечает за законность предоставленных материалов и целей использования результата.'
        ] },
        { h: '8. Отказ от заказа', blocks: [
          'Заказчик вправе отказаться от заказа в любой момент, оплатив фактически выполненную работу; остаток предоплаты возвращается (ст. 782 ГК РФ).',
          'Исполнитель вправе отказаться от исполнения при условии возврата оплаты за невыполненную часть работ и возмещения Заказчику убытков.'
        ] },
        { h: '9. Конфиденциальность', blocks: [
          `Стороны не раскрывают третьим лицам непубличную информацию, полученную друг от друга. Персональные данные обрабатываются в соответствии с ${privacyLink.ru}.`
        ] },
        { h: '10. Споры и изменение условий', blocks: [
          'Споры решаются переговорами, а при недостижении согласия — в суде в соответствии с законодательством Российской Федерации.',
          'Исполнитель вправе изменять Условия. К уже согласованным заказам применяется редакция, действовавшая на момент согласования.'
        ] }
      ]
    },
    en: {
      title: 'Terms of Service',
      updated: updated.en,
      sections: [
        { h: '1. General provisions', blocks: [
          'These Terms govern software development services: websites, Telegram bots, mobile apps, browser extensions and automations (the “Services”).',
          `The Contractor is ${name}, a self-employed professional income tax payer, Taxpayer ID (INN) ${inn}, e-mail: ${site.email}. The Client is the individual or legal entity requesting the Services.`,
          'Information on the website, including prices, is for reference only and is not a public offer under Article 437 of the Civil Code of the Russian Federation. Terms of each order are agreed individually.'
        ] },
        { h: '2. Ordering', blocks: [
          [
            'the Client describes the task via Telegram or e-mail;',
            'the Contractor estimates the task and sends a proposal: scope of work (specification), milestones, timeline and price;',
            'the agreement is concluded when the Client confirms the proposal in writing in the conversation and makes the prepayment, if any.'
          ]
        ] },
        { h: '3. Price and payment', blocks: [
          'Prices on the website are starting prices and are refined after the task is estimated. Unless agreed otherwise, payment is made in two parts: 50% upfront and 50% after acceptance. Small tasks may be paid in full on completion.',
          'For each payment the Contractor issues a receipt via the “My Tax” app and sends it to the Client. VAT is not applicable.',
          'Work beyond the agreed scope is performed and paid only after separate agreement.'
        ] },
        { h: '4. Timeline and delivery', blocks: [
          'The timeline starts after the prepayment and once the Client has provided the materials and access needed for the work. Delays in materials, answers or access from the Client extend the timeline accordingly.',
          'The Contractor may use artificial intelligence tools in development. The Contractor remains responsible for the result.'
        ] },
        { h: '5. Handover and acceptance', blocks: [
          'The Contractor delivers the result in the agreed form: a link to the deployed project, source code, an app build.',
          'The Client reviews the result within 5 business days and reports any deviations from the specification. If no issues are reported within this period, the work is deemed accepted.',
          'Deviations from the specification are fixed free of charge. Tweaks after acceptance are free within the specification and the period stated in the plan. New requests are estimated separately.'
        ] },
        { h: '6. Intellectual property', blocks: [
          'Exclusive rights to the code and materials created pass to the Client upon full payment.',
          'Third-party libraries and services are used under their own licenses; rights to them are not transferred.',
          'The Contractor may mention the project in the portfolio without disclosing confidential information, unless agreed otherwise.'
        ] },
        { h: '7. Liability', blocks: [
          'The Contractor is not liable for outages or policy changes of third-party services: hosting, Telegram, payment systems, AI APIs.',
          'To the extent permitted by law, the Contractor’s liability is limited to the amount paid for the relevant order.',
          'The Client is responsible for the lawfulness of the materials provided and the intended use of the result.'
        ] },
        { h: '8. Cancellation', blocks: [
          'The Client may cancel an order at any time by paying for the work actually performed; the rest of the prepayment is refunded (Article 782 of the Civil Code of the Russian Federation).',
          'The Contractor may withdraw provided that payment for the unperformed part is refunded and the Client’s losses are compensated.'
        ] },
        { h: '9. Confidentiality', blocks: [
          `The parties do not disclose non-public information received from each other to third parties. Personal data is processed in accordance with the ${privacyLink.en}.`
        ] },
        { h: '10. Disputes and changes', blocks: [
          'Disputes are resolved through negotiation and, failing agreement, in court under the laws of the Russian Federation.',
          'The Contractor may amend these Terms. Orders already agreed are governed by the version in effect at the time of agreement.'
        ] }
      ]
    }
  }
};
