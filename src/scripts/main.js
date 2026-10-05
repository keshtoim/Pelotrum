// =====================================================================
// pelotrum — поведение страницы.
// Весь контент уже есть в HTML, скрипт только добавляет интерактив:
// тема, мобильное меню, граница шапки, фильтр работ, пауза анимаций.
// Подключается с defer: DOM к моменту запуска уже разобран.
// Без транспиляции: простой синтаксис, который понимают все современные браузеры
// (async/await есть только в отключённом блоке демо-чата).
// =====================================================================
(function () {
  'use strict';

  // --- общие помощники ---
  var root = document.documentElement;
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  // localStorage может бросать исключение (приватный режим, запрет cookies) —
  // оборачиваем, чтобы сайт работал и без сохранения настроек
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  var canObserve = 'IntersectionObserver' in window;

  /* ---------------------------------------------------------------
     Тема. Начальное значение ставит инлайн-скрипт в <head> (без вспышки),
     здесь — только переключение и запоминание выбора.
     --------------------------------------------------------------- */
  var themeBtn = $('#themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      store.set('theme', next);
    });
  }

  /* ---------------------------------------------------------------
     Мобильное меню (бургер). Состояние — класс на <body> + aria-expanded
     для скринридеров. Закрывается по клику на пункт и по Esc.
     --------------------------------------------------------------- */
  var burger = $('#burger');
  var nav = $('#nav');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
  }
  if (burger && nav) {
    burger.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); burger.focus(); }
    });
  }

  /* ---------------------------------------------------------------
     Граница под шапкой, когда страница прокручена.
     Вместо обработчика scroll (срабатывает на каждый пиксель) следим
     через IntersectionObserver за невидимой меткой у верхнего края.
     --------------------------------------------------------------- */
  var header = $('.header');
  if (header && canObserve) {
    var mark = document.createElement('div');
    mark.style.cssText = 'position:absolute;top:8px;height:1px;width:1px;pointer-events:none';
    document.body.prepend(mark);
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }).observe(mark);
  }

  /* ---------------------------------------------------------------
     Фильтр портфолио. Карточки уже в HTML, просто скрываем лишние
     атрибутом hidden; aria-pressed отражает активную кнопку.
     --------------------------------------------------------------- */
  var filters = $('#filters');
  if (filters) {
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;
      var f = btn.dataset.filter;
      $$('#filters .chip').forEach(function (c) {
        var on = c === btn;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', String(on));
      });
      $$('#workGrid .work').forEach(function (card) {
        card.hidden = f !== 'all' && card.dataset.cat !== f;
      });
    });
  }

  /* ---------------------------------------------------------------
     Бегущая строка: ставим CSS-анимацию на паузу, когда лента вне экрана,
     чтобы не тратить ресурсы на невидимую отрисовку.
     --------------------------------------------------------------- */
  var ticker = $('.ticker');
  if (ticker && canObserve) {
    new IntersectionObserver(function (entries) {
      ticker.classList.toggle('is-paused', !entries[0].isIntersecting);
    }).observe(ticker);
  }

  /* ---------------------------------------------------------------
     Демо-чат с ботом — ОТКЛЮЧЁН вместе с разметкой (см. chatDemo в src/page.mjs).
     Чтобы вернуть: раскомментировать блок ниже и вызов chatDemo(t) в шаблоне.

     Как работает: диалог уже отрисован в HTML; когда чат появляется на экране,
     скрипт проигрывает сценарий из <script id="chatData"> по кругу.
     Пока чат не виден (прокручен или вкладка скрыта) — таймеры «замораживаются».
     При prefers-reduced-motion анимации нет, остаётся готовый диалог.
     --------------------------------------------------------------- */
  /*
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var chatBody = $('#chatBody');
  var chatData = $('#chatData');
  if (chatBody && chatData && !reduceMotion) {
    var msgs;
    try { msgs = JSON.parse(chatData.textContent); } catch (e) { msgs = null; }

    var visible = false;   // чат на экране и вкладка активна
    var running = false;   // цикл уже запущен
    var wake = null;       // продолжить ожидание, когда чат снова станет виден

    // Пузырь сообщения; у бота — опциональная inline-клавиатура
    var bubble = function (m) {
      var el = document.createElement('div');
      el.className = 'msg msg--' + m.from;
      el.innerHTML = '<div class="msg__bubble">' + m.text + '</div>' +
        (m.buttons ? '<div class="msg__kb">' + m.buttons.map(function (b) { return '<span>' + b + '</span>'; }).join('') + '</div>' : '');
      return el;
    };

    // Пауза, которая не завершается, пока чат не виден
    var wait = function (ms) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          if (visible) resolve();
          else wake = function () { wake = null; resolve(); };
        }, ms);
      });
    };

    // Бесконечный сценарий: «печатает…» → сообщение → пауза → заново
    var play = async function () {
      running = true;
      for (;;) {
        var fresh = true;  // прошлый диалог стираем только перед первым новым сообщением
        for (var i = 0; i < msgs.length; i++) {
          var m = msgs[i];
          if (m.from === 'bot') {
            var typing = bubble({ from: 'bot', text: '<span class="typing"><i></i><i></i><i></i></span>' });
            chatBody.appendChild(typing);
            await wait(900);
            typing.remove();
          } else {
            await wait(700);
          }
          if (fresh) {
            chatBody.textContent = '';
            chatBody.classList.add('is-animated'); // анимация появления — только для новых сообщений
            fresh = false;
          }
          chatBody.appendChild(bubble(m));
          await wait(500);
        }
        await wait(4500);
      }
    };

    var setVisible = function (v) {
      visible = v && !document.hidden;
      if (visible && wake) wake();
      if (visible && !running && msgs) play();
    };

    if (canObserve) {
      var onScreen = false;
      new IntersectionObserver(function (entries) {
        onScreen = entries[0].isIntersecting;
        setVisible(onScreen);
      }, { threshold: 0.3 }).observe(chatBody);
      document.addEventListener('visibilitychange', function () { setVisible(onScreen); });
    } else {
      setVisible(true);
    }
  }
  */
})();
