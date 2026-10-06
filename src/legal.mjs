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
        { h: '1. Общие положения и предмет', blocks: [
          `1.1. Оферта — предложение ${name}, плательщика налога на профессиональный доход (самозанятого), ИНН ${inn}, e-mail: ${site.email} (далее — Исполнитель), заключить договор возмездного оказания услуг (гл. 39 ГК РФ) на изложенных ниже условиях с любым, кто отзовётся (п. 2 ст. 437 ГК РФ).`,
          '1.2. Исполнитель оказывает услуги по разработке программного обеспечения: сайтов, Telegram-ботов, мобильных приложений, браузерных расширений и автоматизаций.',
          '1.3. Состав работ, результат, срок и стоимость по каждому заказу определяются в Заказе — техническом задании или брифе, согласованном сторонами в переписке (e-mail, Telegram). Заказ является неотъемлемой частью договора. Существенные изменения требований также согласуются в переписке.',
          '1.4. Цены на сайте носят справочный характер. Стоимость конкретной работы фиксируется в Заказе.'
        ] },
        { h: '2. Акцепт и заключение договора', blocks: [
          '2.1. Акцептом Оферты является оплата Заказчиком предоплаты по согласованному Заказу (п. 3 ст. 438 ГК РФ). С этого момента договор считается заключённым в письменной форме (п. 3 ст. 434 ГК РФ).',
          '2.2. Исполнитель приступает к работе после поступления предоплаты.'
        ] },
        { h: '3. Стоимость и оплата', blocks: [
          '3.1. Если Заказом не предусмотрено иное, предоплата составляет 50% или 100% стоимости Заказа, остаток оплачивается после приёмки результата.',
          '3.2. На каждую оплату Исполнитель формирует чек в приложении «Мой налог» и передаёт его Заказчику (ст. 14 Федерального закона от 27.11.2018 № 422-ФЗ). Исполнитель применяет налог на профессиональный доход, НДС не облагается.',
          '3.3. Работы сверх Заказа выполняются и оплачиваются только после отдельного согласования.'
        ] },
        { h: '4. Сроки и коммуникация', blocks: [
          '4.1. Сроки выполнения указываются в Заказе и соразмерно продлеваются, если Заказчик задерживает материалы, доступы или обратную связь.',
          '4.2. Рабочее общение ведётся в согласованных каналах (e-mail, Telegram) в рабочие дни.',
          '4.3. Исполнитель вправе использовать при разработке инструменты искусственного интеллекта и отвечает за результат.'
        ] },
        { h: '5. Правки, сдача и приёмка', blocks: [
          '5.1. В стоимость входит до 2 итераций правок в рамках Заказа, если в тарифе или Заказе не указано иное. Дополнительные правки и смена концепции оплачиваются отдельно.',
          '5.2. Заказчик проверяет результат и в течение 3 рабочих дней после сдачи этапа принимает его или направляет мотивированный отказ в переписке. Если отказ не направлен, этап считается принятым.',
          '5.3. Приёмка не лишает Заказчика-потребителя права предъявить требования в связи с недостатками результата в порядке и сроки, установленные законом.'
        ] },
        { h: '6. Права на результат', blocks: [
          '6.1. Исключительное право на результат, созданный по Заказу (исходный код, сборки, графику), переходит к Заказчику в полном объёме с момента полной оплаты Заказа (ст. 1296 ГК РФ). До этого момента право принадлежит Исполнителю.',
          '6.2. Сторонние библиотеки, сервисы и материалы используются на условиях их лицензий; права на них Заказчику не передаются.',
          '6.3. Исполнитель вправе упоминать проект в портфолио без раскрытия конфиденциальной информации, если стороны не договорились иначе.'
        ] },
        { h: '7. Ответственность сторон', blocks: [
          '7.1. За неисполнение или ненадлежащее исполнение обязательств стороны отвечают в соответствии с законодательством Российской Федерации.',
          '7.2. Исполнитель гарантирует соответствие результата Заказу, но не отвечает за рыночные факторы и коммерческие показатели Заказчика, а также за сбои сторонних сервисов (хостинга, Telegram, платёжных систем, API искусственного интеллекта), не зависящие от Исполнителя.',
          '7.3. За законность, достоверность и права на материалы, переданные Заказчиком (тексты, логотипы, медиа), отвечает Заказчик.',
          '7.4. Поддержка и сопровождение после сдачи оказываются по отдельному соглашению, если они не входят в тариф.'
        ] },
        { h: '8. Отказ от договора', blocks: [
          '8.1. Заказчик вправе отказаться от договора в любое время, оплатив Исполнителю фактически понесённые им расходы (п. 1 ст. 782 ГК РФ, ст. 32 Закона РФ «О защите прав потребителей»). Остаток предоплаты возвращается.',
          '8.2. Исполнитель вправе отказаться от договора лишь при условии полного возмещения Заказчику убытков (п. 2 ст. 782 ГК РФ).'
        ] },
        { h: '9. Персональные данные и конфиденциальность', blocks: [
          `9.1. Персональные данные Заказчика обрабатываются в соответствии с ${privacyLink.ru}. Стороны согласились, что данные, связанные с договором, хранятся в течение 3 лет после его исполнения для защиты прав сторон (ст. 196 ГК РФ), после чего уничтожаются.`,
          '9.2. Стороны не раскрывают третьим лицам непубличную информацию, полученную друг от друга при исполнении договора.'
        ] },
        { h: '10. Заключительные положения', blocks: [
          '10.1. Если Заказчик — потребитель, условия Оферты применяются в части, не противоречащей Закону РФ «О защите прав потребителей»; условия, ущемляющие его права, не применяются (ст. 16 этого закона).',
          '10.2. Споры решаются переговорами, а при недостижении согласия — в суде в соответствии с законодательством Российской Федерации.',
          '10.3. Исполнитель вправе изменять Оферту. К заключённым договорам применяется редакция, действовавшая на момент акцепта.'
        ] }
      ]
    },
    en: {
      title: 'Terms of Service',
      updated: updated.en,
      sections: [
        { h: '1. General provisions and scope', blocks: [
          `1.1. These Terms are a public offer (Article 437(2) of the Civil Code of the Russian Federation) by ${name}, a self-employed professional income tax payer, Taxpayer ID (INN) ${inn}, e-mail: ${site.email} (the “Service Provider”), to conclude a paid services agreement (Chapter 39 of the Civil Code) on the terms below with anyone who accepts it.`,
          '1.2. The Service Provider develops software: websites, Telegram bots, mobile apps, browser extensions and automations.',
          '1.3. The scope, deliverables, timeline and price of each job are set out in an Order — a specification or brief agreed by the parties in correspondence (e-mail, Telegram). The Order forms an integral part of the agreement. Significant changes in requirements are also agreed in correspondence.',
          '1.4. Prices on the website are for reference only. The price of each job is fixed in the Order.'
        ] },
        { h: '2. Acceptance and conclusion', blocks: [
          '2.1. These Terms are accepted when the Client makes the advance payment for an agreed Order (Article 438(3) of the Civil Code). From that moment the agreement is deemed concluded in writing (Article 434(3) of the Civil Code).',
          '2.2. The Service Provider starts work after the advance payment is received.'
        ] },
        { h: '3. Price and payment', blocks: [
          '3.1. Unless the Order states otherwise, the advance payment is 50% or 100% of the Order price, and the balance is paid after acceptance.',
          '3.2. For each payment the Service Provider issues a receipt via the “My Tax” app and sends it to the Client (Article 14 of Federal Law No. 422-FZ of 27.11.2018). The Service Provider pays the professional income tax; VAT is not applicable.',
          '3.3. Work beyond the Order is performed and paid only after separate agreement.'
        ] },
        { h: '4. Timeline and communication', blocks: [
          '4.1. Deadlines are set in the Order and are extended accordingly if the Client delays materials, access or feedback.',
          '4.2. Work communication takes place in the agreed channels (e-mail, Telegram) on business days.',
          '4.3. The Service Provider may use artificial intelligence tools and remains responsible for the result.'
        ] },
        { h: '5. Revisions, delivery and acceptance', blocks: [
          '5.1. The price includes up to 2 rounds of revisions within the Order, unless the plan or Order states otherwise. Additional revisions or a change of concept are paid separately.',
          '5.2. The Client reviews the result and, within 3 business days after a milestone is delivered, accepts it or sends a reasoned rejection in the correspondence. If no rejection is sent, the milestone is deemed accepted.',
          '5.3. Acceptance does not deprive a Client who is a consumer of the right to raise claims regarding defects in the manner and within the periods established by law.'
        ] },
        { h: '6. Intellectual property', blocks: [
          '6.1. The exclusive right to the result created under the Order (source code, builds, graphics) passes to the Client in full upon full payment of the Order (Article 1296 of the Civil Code). Until then it belongs to the Service Provider.',
          '6.2. Third-party libraries, services and materials are used under their own licenses; rights to them are not transferred to the Client.',
          '6.3. The Service Provider may mention the project in the portfolio without disclosing confidential information, unless agreed otherwise.'
        ] },
        { h: '7. Liability', blocks: [
          '7.1. The parties are liable for non-performance or improper performance in accordance with the laws of the Russian Federation.',
          '7.2. The Service Provider guarantees that the result matches the Order but is not responsible for market factors or the Client’s business performance, nor for outages of third-party services (hosting, Telegram, payment systems, AI APIs) beyond the Service Provider’s control.',
          '7.3. The Client is responsible for the legality, accuracy and rights to materials provided (texts, logos, media).',
          '7.4. Support and maintenance after delivery are provided under a separate agreement, unless included in the plan.'
        ] },
        { h: '8. Termination', blocks: [
          '8.1. The Client may terminate the agreement at any time by paying the Service Provider’s actually incurred expenses (Article 782(1) of the Civil Code, Article 32 of the Consumer Protection Law). The rest of the advance is refunded.',
          '8.2. The Service Provider may terminate the agreement only upon full compensation of the Client’s losses (Article 782(2) of the Civil Code).'
        ] },
        { h: '9. Personal data and confidentiality', blocks: [
          `9.1. The Client’s personal data is processed in accordance with the ${privacyLink.en}. The parties agree that data related to the agreement is kept for 3 years after its performance to protect the parties’ rights (Article 196 of the Civil Code) and then destroyed.`,
          '9.2. The parties do not disclose to third parties non-public information received from each other in performing the agreement.'
        ] },
        { h: '10. Final provisions', blocks: [
          '10.1. If the Client is a consumer, these Terms apply to the extent they do not contradict the Russian Consumer Protection Law; terms infringing the consumer’s rights do not apply (Article 16 of that law).',
          '10.2. Disputes are resolved through negotiation and, failing agreement, in court under the laws of the Russian Federation.',
          '10.3. The Service Provider may amend these Terms. Concluded agreements are governed by the version in effect at the time of acceptance.'
        ] }
      ]
    }
  }
};
