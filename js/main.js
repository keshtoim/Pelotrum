(function () {
  'use strict';

  var root = document.documentElement;
  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  var lang = root.lang === 'en' ? 'en' : 'ru';
  var t = function (k) { return I18N[lang][k]; };

  /* ---------- i18n ---------- */
  function applyLang() {
    root.lang = lang;
    $$('[data-i18n]').forEach(function (el) {
      var v = t(el.dataset.i18n);
      if (typeof v === 'string') el.innerHTML = v;
    });
    renderWork();
    renderPrices();
    renderBenefits();
    renderBlog();
    renderTicker();
    startChat();
  }

  /* ---------- Портфолио ---------- */
  var currentFilter = 'all';

  function renderWork() {
    $('#workGrid').innerHTML = t('work').map(function (w, i) {
      return '<article class="card work" data-cat="' + w.cat + '"' + (currentFilter !== 'all' && currentFilter !== w.cat ? ' hidden' : '') + '>' +
        '<div class="work__cover work__cover--' + (i % 6) + '"><span class="work__glyph">' + w.glyph + '</span></div>' +
        '<div class="work__body">' +
          '<div class="work__meta"><span class="tag">' + w.tag + '</span><span class="work__time">⏱ ' + w.time + '</span></div>' +
          '<h3 class="work__title">' + w.title + '</h3>' +
          '<p class="work__desc">' + w.desc + '</p>' +
          '<a href="#" class="link-arrow">' + t('work.more') + '</a>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  $('#filters').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-filter]');
    if (!btn) return;
    currentFilter = btn.dataset.filter;
    $$('#filters .chip').forEach(function (c) { c.classList.toggle('is-active', c === btn); });
    $$('#workGrid .work').forEach(function (card) {
      card.hidden = currentFilter !== 'all' && card.dataset.cat !== currentFilter;
    });
  });

  /* ---------- Цены ---------- */
  function renderPrices() {
    $('#priceGrid').innerHTML = t('prices').map(function (p) {
      return '<article class="card price' + (p.hot ? ' price--hot' : '') + '">' +
        (p.hot ? '<span class="sticker sticker--hot">' + p.hot + '</span>' : '') +
        '<h3 class="price__name">' + p.name + '</h3>' +
        '<p class="price__desc">' + p.desc + '</p>' +
        '<div class="price__value">' + p.price + '</div>' +
        '<div class="price__term">⏱ ' + p.term + '</div>' +
        '<ul class="price__list">' + p.features.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' +
        '<a href="#contact" class="btn ' + (p.hot ? 'btn--acc' : 'btn--ghost') + ' btn--block">' + p.cta + '</a>' +
      '</article>';
    }).join('');
  }

  /* ---------- Преимущества ---------- */
  function renderBenefits() {
    $('#benefitsGrid').innerHTML = t('benefits').map(function (b, i) {
      return '<article class="card benefit">' +
        '<span class="benefit__num">0' + (i + 1) + '</span>' +
        '<h3 class="benefit__title">' + b.t + '</h3>' +
        '<p class="benefit__desc">' + b.d + '</p>' +
      '</article>';
    }).join('');
  }

  /* ---------- Блог ---------- */
  function renderBlog() {
    $('#blogGrid').innerHTML = t('blog').map(function (p, i) {
      return '<a href="#" class="card post">' +
        '<div class="post__cover post__cover--' + i + '"></div>' +
        '<div class="post__body">' +
          '<div class="post__meta"><span class="tag">' + p.tag + '</span><span>' + p.date + ' · ' + p.min + ' ' + t('blog.read') + '</span></div>' +
          '<h3 class="post__title">' + p.title + '</h3>' +
          '<p class="post__desc">' + p.desc + '</p>' +
        '</div>' +
      '</a>';
    }).join('');
  }

  /* ---------- Бегущая строка ---------- */
  function renderTicker() {
    var items = t('ticker').map(function (x) { return '<span>' + x + '</span><i>✦</i>'; }).join('');
    $('#ticker').innerHTML = items + items; // дубль для бесшовной прокрутки
  }

  /* ---------- Демо-чат ---------- */
  var chatRun = 0;
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  function bubble(msg) {
    var el = document.createElement('div');
    el.className = 'msg msg--' + msg.from;
    el.innerHTML = '<div class="msg__bubble">' + msg.text + '</div>' +
      (msg.buttons ? '<div class="msg__kb">' + msg.buttons.map(function (b) { return '<span>' + b + '</span>'; }).join('') + '</div>' : '');
    return el;
  }

  function startChat() {
    var body = $('#chatBody');
    var run = ++chatRun;
    var msgs = t('chat');
    body.innerHTML = '';

    if (reduceMotion) {
      msgs.forEach(function (m) { body.appendChild(bubble(m)); });
      return;
    }

    (async function loop() {
      while (run === chatRun) {
        body.innerHTML = '';
        for (var i = 0; i < msgs.length; i++) {
          if (run !== chatRun) return;
          var m = msgs[i];
          if (m.from === 'bot') {
            var typing = bubble({ from: 'bot', text: '<span class="typing"><i></i><i></i><i></i></span>' });
            body.appendChild(typing);
            body.scrollTop = body.scrollHeight;
            await wait(900);
            if (run !== chatRun) return;
            typing.remove();
          } else {
            await wait(700);
            if (run !== chatRun) return;
          }
          body.appendChild(bubble(m));
          body.scrollTop = body.scrollHeight;
          await wait(500);
        }
        await wait(4500);
      }
    })();
  }

  /* ---------- Тема ---------- */
  $('#themeToggle').addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    store.set('theme', next);
  });

  /* ---------- Язык ---------- */
  $('#langToggle').addEventListener('click', function () {
    lang = lang === 'ru' ? 'en' : 'ru';
    store.set('lang', lang);
    applyLang();
  });

  /* ---------- Мобильное меню ---------- */
  var burger = $('#burger');
  burger.addEventListener('click', function () {
    document.body.classList.toggle('menu-open');
  });
  $('#nav').addEventListener('click', function (e) {
    if (e.target.closest('a')) document.body.classList.remove('menu-open');
  });

  /* ---------- Тень у шапки при скролле ---------- */
  var header = $('.header');
  var onScroll = function () { header.classList.toggle('is-scrolled', scrollY > 8); };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Переключатель прототипов ---------- */
  function setSkin(s) {
    root.dataset.skin = s;
    $('#skinLink').href = 'css/skins/' + SKINS[s].file + '.css';
    $('#protoName').textContent = SKINS[s].name;
    $$('#proto [data-skin]').forEach(function (b) { b.classList.toggle('is-active', b.dataset.skin === s); });
    store.set('variant', s);
    var url = new URL(location.href);
    url.searchParams.set('style', s);
    history.replaceState(null, '', url);
  }

  // в собранной версии одного варианта панели нет
  if ($('#proto')) {
    $('#proto').addEventListener('click', function (e) {
      var b = e.target.closest('[data-skin]');
      if (b) setSkin(b.dataset.skin);
    });
    setSkin(root.dataset.skin || 'a');
  }

  applyLang();
})();
