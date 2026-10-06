import { site } from './content.mjs';

const { name, inn } = site.legal;
const updated = { ru: 'Редакция от 6 октября 2026 г.', en: 'Last updated: October 6, 2026' };

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
  }
};
