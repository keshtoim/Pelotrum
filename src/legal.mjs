import { site } from './content.mjs';

const { name, inn } = site.legal;
const updated = { ru: 'Редакция от 6 октября 2026 г.', en: 'Last updated: October 6, 2026' };
const base = new URL(site.url).pathname;
const privacyLink = { ru: `<a href="${base}privacy/">Политикой конфиденциальности</a>`, en: `<a href="${base}en/privacy/">Privacy Policy</a>` };

// Блок раздела: строка — абзац, массив строк — маркированный список.
export const legal = {
  privacy: {
    ru: {
      title: 'Политика конфиденциальности',
      updated: updated.ru,
      sections: [
        { h: '1. Общие положения', blocks: [
          `Политика определяет порядок обработки персональных данных посетителей сайта ${site.url} (далее — Сайт) и лиц, обращающихся за услугами, в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».`,
          `Оператор персональных данных — ${name}, плательщик налога на профессиональный доход (самозанятый), ИНН ${inn}, e-mail: ${site.email} (далее — Оператор).`,
          'Пользуясь Сайтом или обращаясь к Оператору, вы подтверждаете, что ознакомились с Политикой.'
        ] },
        { h: '2. Какие данные обрабатываются', blocks: [
          'Сайт не содержит форм, не требует регистрации и не использует cookie для отслеживания. Обрабатываются:',
          [
            'данные, которые вы передаёте сами, когда пишете в Telegram или на e-mail: имя или никнейм, контакт для связи, описание задачи и другие сведения, которые вы решите сообщить;',
            'технические данные запроса (IP-адрес, тип браузера, время обращения), которые хостинг-провайдер GitHub Pages фиксирует в журналах сервера; Оператор к этим журналам доступа не имеет;',
            'выбранная тема оформления, которая хранится только в вашем браузере (localStorage) и Оператору не передаётся.',
            ...(site.metrika ? ['обезличенные данные о посещениях, собираемые сервисом Яндекс Метрика с помощью cookie: IP-адрес, сведения об устройстве и браузере, просмотренные страницы.'] : [])
          ]
        ] },
        { h: '3. Цели и правовые основания', blocks: [
          [
            'ответ на обращение, обсуждение и оценка задачи — на основании вашего согласия, выраженного отправкой сообщения (п. 1 ч. 1 ст. 6 152-ФЗ);',
            'заключение и исполнение договора оказания услуг, формирование чека в приложении «Мой налог» — на основании договора, стороной которого вы являетесь (п. 5 ч. 1 ст. 6 152-ФЗ);',
            ...(site.metrika ? ['анализ посещаемости и улучшение Сайта — на основании вашего согласия.'] : [])
          ],
          'Оператор не принимает решений, порождающих для вас юридические последствия, на основании исключительно автоматизированной обработки.'
        ] },
        { h: '4. Передача третьим лицам', blocks: [
          'Оператор не продаёт и не передаёт ваши данные третьим лицам, за исключением случаев, предусмотренных законом. Данные проходят через сервисы, которые вы выбираете для связи, и инфраструктуру Сайта; эти сервисы обрабатывают данные по собственным правилам:',
          [
            'Telegram — мессенджер для переписки;',
            'почтовый сервис, через который вы отправляете письмо;',
            'GitHub (GitHub, Inc., США) — хостинг Сайта;',
            ...(site.metrika ? ['ООО «Яндекс» — сервис Яндекс Метрика.'] : [])
          ],
          'При оплате услуг сведения о расчёте передаются в ФНС России через приложение «Мой налог» в объёме, установленном законодательством.'
        ] },
        { h: '5. Хранение и защита', blocks: [
          'Переписка, не завершившаяся договором, хранится не более 1 года с даты последнего сообщения. Данные, связанные с договором, хранятся в течение срока исковой давности после его исполнения (3 года) или дольше, если этого требует закон.',
          'Оператор принимает правовые, организационные и технические меры для защиты данных от неправомерного доступа, изменения, распространения и уничтожения.'
        ] },
        { h: '6. Ваши права', blocks: [
          [
            'получить сведения об обработке ваших данных;',
            'потребовать уточнения, блокирования или уничтожения данных, если они неполные, устаревшие или обрабатываются незаконно;',
            'отозвать согласие на обработку;',
            'обжаловать действия Оператора в Роскомнадзоре или в суде.'
          ],
          `Запросы направляйте на ${site.email}. Оператор отвечает в течение 10 рабочих дней.`
        ] },
        { h: '7. Заключительные положения', blocks: [
          'Оператор вправе изменять Политику. Новая редакция действует с момента публикации на этой странице.'
        ] }
      ]
    },
    en: {
      title: 'Privacy Policy',
      updated: updated.en,
      sections: [
        { h: '1. General provisions', blocks: [
          `This Policy describes how personal data of visitors to ${site.url} (the “Site”) and of people requesting services is processed, in accordance with Russian Federal Law No. 152-FZ “On Personal Data” of 27.07.2006.`,
          `The data controller is ${name}, a self-employed professional income tax payer, Taxpayer ID (INN) ${inn}, e-mail: ${site.email} (the “Controller”).`,
          'By using the Site or contacting the Controller you confirm that you have read this Policy.'
        ] },
        { h: '2. Data we process', blocks: [
          'The Site has no forms, requires no registration and uses no tracking cookies. We process:',
          [
            'data you provide yourself when writing via Telegram or e-mail: your name or nickname, contact details, a description of your task and anything else you choose to share;',
            'technical request data (IP address, browser type, time of access) logged by the hosting provider GitHub Pages; the Controller has no access to these logs;',
            'your chosen color theme, stored only in your browser (localStorage) and never sent to the Controller.',
            ...(site.metrika ? ['anonymized visit data collected by Yandex Metrica using cookies: IP address, device and browser details, pages viewed.'] : [])
          ]
        ] },
        { h: '3. Purposes and legal grounds', blocks: [
          [
            'replying to your request, discussing and estimating the task — based on your consent given by sending a message;',
            'concluding and performing a service agreement and issuing a receipt via the “My Tax” app — based on an agreement to which you are a party;',
            ...(site.metrika ? ['analyzing traffic and improving the Site — based on your consent.'] : [])
          ],
          'The Controller makes no decisions producing legal effects for you based solely on automated processing.'
        ] },
        { h: '4. Sharing with third parties', blocks: [
          'The Controller does not sell or share your data with third parties, except where required by law. Data passes through the services you choose for communication and the Site’s infrastructure; these services process data under their own policies:',
          [
            'Telegram — messaging;',
            'the e-mail provider you use to send a message;',
            'GitHub (GitHub, Inc., USA) — Site hosting;',
            ...(site.metrika ? ['Yandex LLC — Yandex Metrica.'] : [])
          ],
          'When you pay for services, payment details are reported to the Russian Federal Tax Service via the “My Tax” app to the extent required by law.'
        ] },
        { h: '5. Retention and security', blocks: [
          'Correspondence that does not lead to an agreement is kept for no longer than 1 year after the last message. Data related to an agreement is kept for the limitation period after its performance (3 years) or longer if required by law.',
          'The Controller takes legal, organizational and technical measures to protect data against unauthorized access, alteration, disclosure and destruction.'
        ] },
        { h: '6. Your rights', blocks: [
          [
            'obtain information about the processing of your data;',
            'request correction, blocking or deletion of data that is incomplete, outdated or unlawfully processed;',
            'withdraw your consent;',
            'lodge a complaint with Roskomnadzor or a court.'
          ],
          `Send requests to ${site.email}. The Controller replies within 10 business days.`
        ] },
        { h: '7. Final provisions', blocks: [
          'The Controller may amend this Policy. The new version takes effect when published on this page.'
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
