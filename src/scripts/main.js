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

  // След за курсором только для мыши: на тач-экранах курсора нет, а при reduced motion эффект отвлекает.
  if (matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var canvas = document.createElement('canvas');
    canvas.className = 'cursor-trail';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.append(canvas);
    var ctx = canvas.getContext('2d');

    var resize = function () {
      var dpr = window.devicePixelRatio || 1;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    addEventListener('resize', resize);
    resize();

    var pointer = { x: 0, y: 0 };
    var trail = [];
    var frame = 0;

    var draw = function () {
      var head = trail[0];
      // Голова проходит 60% пути до курсора за кадр, остальные точки сдвигаются по цепочке — получается короткий хвост.
      trail.pop();
      trail.unshift({ x: head.x + (pointer.x - head.x) * 0.6, y: head.y + (pointer.y - head.y) * 0.6 });

      // --acc-text, а не --acc: светлая заливка акцента почти не видна на светлом фоне; цвет читается каждый кадр, чтобы следовать за сменой темы.
      var color = getComputedStyle(root).getPropertyValue('--acc-text').trim();
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.beginPath();
      ctx.lineCap = ctx.lineJoin = 'round';
      ctx.lineWidth = 5;
      ctx.globalAlpha = 0.45;
      ctx.strokeStyle = ctx.shadowColor = color;
      ctx.shadowBlur = 24;
      ctx.moveTo(trail[0].x, trail[0].y);
      for (var i = 1; i < trail.length - 1; i++) {
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, (trail[i].x + trail[i + 1].x) / 2, (trail[i].y + trail[i + 1].y) / 2);
      }
      ctx.stroke();

      var tail = trail[trail.length - 1];
      // Хвост догнал курсор — кадр очищен до точки, цикл останавливается до следующего движения.
      if (Math.abs(pointer.x - tail.x) + Math.abs(pointer.y - tail.y) < 0.5) {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        frame = 0;
      } else {
        frame = requestAnimationFrame(draw);
      }
    };

    document.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!trail.length) for (var i = 0; i < 6; i++) trail.push({ x: pointer.x, y: pointer.y });
      if (!frame) frame = requestAnimationFrame(draw);
    }, { passive: true });
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
