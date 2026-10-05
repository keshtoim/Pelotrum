// pelotrum — поведение страницы. Весь контент уже есть в HTML,
// скрипт только добавляет интерактив: тема, меню, фильтр работ, анимация чата.
(function () {
  'use strict';

  var root = document.documentElement;
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canObserve = 'IntersectionObserver' in window;

  /* ---------- тема ---------- */
  var themeBtn = $('#themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.dataset.theme === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      store.set('theme', next);
    });
  }

  /* ---------- мобильное меню ---------- */
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

  /* ---------- граница шапки при скролле ---------- */
  var header = $('.header');
  var sentinel = $('#main');
  if (header && sentinel && canObserve) {
    // наблюдаем за верхом страницы вместо обработчика scroll
    var mark = document.createElement('div');
    mark.style.cssText = 'position:absolute;top:8px;height:1px;width:1px;pointer-events:none';
    document.body.prepend(mark);
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }).observe(mark);
  }

  /* ---------- фильтр портфолио ---------- */
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

  /* ---------- бегущая строка: пауза, когда не видна ---------- */
  var ticker = $('.ticker');
  if (ticker && canObserve) {
    new IntersectionObserver(function (entries) {
      ticker.classList.toggle('is-paused', !entries[0].isIntersecting);
    }).observe(ticker);
  }

  /* ---------- демо-чат ---------- */
  var chatBody = $('#chatBody');
  var chatData = $('#chatData');
  if (!chatBody || !chatData || reduceMotion) return; // без анимации остаётся готовый диалог из HTML

  var msgs;
  try { msgs = JSON.parse(chatData.textContent); } catch (e) { return; }

  var visible = false;   // чат на экране и вкладка активна
  var running = false;
  var wake = null;       // продолжить цикл, когда чат снова станет видим

  function bubble(m) {
    var el = document.createElement('div');
    el.className = 'msg msg--' + m.from;
    el.innerHTML = '<div class="msg__bubble">' + m.text + '</div>' +
      (m.buttons ? '<div class="msg__kb">' + m.buttons.map(function (b) { return '<span>' + b + '</span>'; }).join('') + '</div>' : '');
    return el;
  }

  // пауза, которая «замораживается», пока чат не виден
  function wait(ms) {
    return new Promise(function (resolve) {
      setTimeout(function check() {
        if (visible) resolve();
        else wake = function () { wake = null; resolve(); };
      }, ms);
    });
  }

  async function play() {
    running = true;
    for (;;) {
      // прошлый диалог стираем только перед первым новым сообщением,
      // чтобы чат никогда не висел пустым
      var fresh = true;
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
          chatBody.classList.add('is-animated'); // анимация только для новых сообщений
          fresh = false;
        }
        chatBody.appendChild(bubble(m));
        await wait(500);
      }
      await wait(4500);
    }
  }

  function setVisible(v) {
    visible = v && !document.hidden;
    if (visible && wake) wake();
    if (visible && !running) play();
  }

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
})();
