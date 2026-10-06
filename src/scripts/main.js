(function () {
  'use strict';

  var root = document.documentElement;
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  // localStorage бросает исключение в приватном режиме и при запрете cookies.
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  $('#themeToggle').addEventListener('click', function () {
    var next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    store.set('theme', next);
  });

  var burger = $('#burger');
  var nav = $('#nav');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
  }
  burger.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); burger.focus(); }
  });

  // Граница шапки при прокрутке: наблюдаем за меткой у верха страницы вместо обработчика scroll на каждый пиксель.
  var header = $('.header');
  var mark = document.createElement('div');
  mark.style.cssText = 'position:absolute;top:8px;height:1px;width:1px;pointer-events:none';
  document.body.prepend(mark);
  new IntersectionObserver(function (entries) {
    header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
  }).observe(mark);

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

  // Бегущая строка вне экрана ставится на паузу, чтобы не тратить ресурсы на невидимую анимацию.
  var ticker = $('.ticker');
  if (ticker) {
    new IntersectionObserver(function (entries) {
      ticker.classList.toggle('is-paused', !entries[0].isIntersecting);
    }).observe(ticker);
  }

  // Свечение курсора только для мыши: на тач-экранах курсора нет, а при reduced motion эффект отвлекает.
  if (matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var glow = document.createElement('div');
    var light = document.createElement('div');
    glow.className = 'cursor-glow';
    light.className = 'cursor-light';
    document.body.append(light, glow);

    var x = 0, y = 0, gx = 0, gy = 0, lx = 0, ly = 0, frame = 0;
    var move = function () {
      // Ореол догоняет курсор медленнее ядра — получается короткий тусклый шлейф.
      gx += (x - gx) * 0.35; gy += (y - gy) * 0.35;
      lx += (x - lx) * 0.12; ly += (y - ly) * 0.12;
      glow.style.transform = 'translate(' + gx + 'px,' + gy + 'px)';
      light.style.transform = 'translate(' + lx + 'px,' + ly + 'px)';
      // Цикл останавливается, когда ореол догнал курсор, чтобы не крутить кадры впустую.
      frame = Math.abs(x - lx) + Math.abs(y - ly) > 0.5 ? requestAnimationFrame(move) : 0;
    };

    document.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      if (!root.classList.contains('cursor-on')) { gx = lx = e.clientX; gy = ly = e.clientY; }
      x = e.clientX; y = e.clientY;
      root.classList.add('cursor-on');
      if (!frame) frame = requestAnimationFrame(move);
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', function () { root.classList.remove('cursor-on'); });
  }

  /*
  Демо-чат отключён вместе с разметкой (chatDemo в src/page.mjs).
  Диалог уже отрисован в HTML; скрипт проигрывает сценарий из #chatData по кругу,
  пока чат виден, и замораживает таймеры, когда он прокручен или вкладка скрыта.

  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var chatBody = $('#chatBody');
  var chatData = $('#chatData');
  if (chatBody && chatData && !reduceMotion) {
    var msgs;
    try { msgs = JSON.parse(chatData.textContent); } catch (e) { msgs = null; }

    var visible = false;
    var running = false;
    var wake = null;

    var bubble = function (m) {
      var el = document.createElement('div');
      el.className = 'msg msg--' + m.from;
      el.innerHTML = '<div class="msg__bubble">' + m.text + '</div>' +
        (m.buttons ? '<div class="msg__kb">' + m.buttons.map(function (b) { return '<span>' + b + '</span>'; }).join('') + '</div>' : '');
      return el;
    };

    var wait = function (ms) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          if (visible) resolve();
          else wake = function () { wake = null; resolve(); };
        }, ms);
      });
    };

    var play = async function () {
      running = true;
      for (;;) {
        // Прошлый диалог стирается только перед первым новым сообщением, иначе при зависшем таймере чат остался бы пустым.
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
            chatBody.classList.add('is-animated');
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

    var onScreen = false;
    new IntersectionObserver(function (entries) {
      onScreen = entries[0].isIntersecting;
      setVisible(onScreen);
    }, { threshold: 0.3 }).observe(chatBody);
    document.addEventListener('visibilitychange', function () { setVisible(onScreen); });
  }
  */
})();
