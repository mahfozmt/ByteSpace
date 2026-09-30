/* ByteSpace — small interactions: mobile menu, pill/tab toggles, filters */
(function () {
  'use strict';

  // Mobile navigation toggle
  document.querySelectorAll('.nav-toggle').forEach(function (btn) {
    var header = btn.closest('.site-header');
    btn.addEventListener('click', function () {
      var open = header.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // Pill / tab groups: [data-tabs] containers with role="tab" children
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = group.querySelectorAll('[role="tab"]');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle('is-active', on);
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          var panelId = t.getAttribute('aria-controls');
          if (panelId) {
            var panel = document.getElementById(panelId);
            if (panel) panel.hidden = !on;
          }
        });
      });
    });
  });

  // Simple list filter: <input data-filter="#list"> filters children by text
  document.querySelectorAll('[data-filter]').forEach(function (input) {
    var list = document.querySelector(input.getAttribute('data-filter'));
    if (!list) return;
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      Array.prototype.forEach.call(list.children, function (item) {
        item.hidden = q && item.textContent.toLowerCase().indexOf(q) === -1;
      });
    });
  });
})();

/* ---- page: search ---- */
/* Search page: category pill filter + pagination active state */
(function () {
  'use strict';

  var pills = document.querySelectorAll('.search-pills [data-filter-cat]');
  var items = document.querySelectorAll('.search-grid__item');
  var empty = document.querySelector('.search-empty');

  function apply(cat) {
    var shown = 0;
    items.forEach(function (item) {
      var cats = (item.getAttribute('data-category') || '').split(' ');
      var match = cat === 'all' || cats.indexOf(cat) !== -1;
      item.hidden = !match;
      if (match) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }

  // script.js already toggles .is-active / aria-selected for [data-tabs]; we add the filtering.
  pills.forEach(function (pill) {
    pill.addEventListener('click', function () { apply(pill.getAttribute('data-filter-cat')); });
  });

  // Preselect from ?c=slug (home category cards link here)
  var param = new URLSearchParams(window.location.search).get('c');
  if (param) {
    var target = Array.prototype.find.call(pills, function (p) { return p.getAttribute('data-filter-cat') === param; });
    if (target) target.click();
  }

  // Pagination
  var pager = document.querySelector('.search-pagination');
  if (pager) {
    var nums = pager.querySelectorAll('ol button');
    var prev = pager.querySelector('[aria-label="Previous page"]');
    var next = pager.querySelector('[aria-label="Next page"]');
    var current = 0;
    var go = function (i) {
      current = Math.max(0, Math.min(nums.length - 1, i));
      nums.forEach(function (b, k) {
        b.classList.toggle('is-current', k === current);
        if (k === current) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
      });
    };
    nums.forEach(function (b, k) { b.addEventListener('click', function () { go(k); }); });
    if (prev) prev.addEventListener('click', function () { go(current - 1); });
    if (next) next.addEventListener('click', function () { go(current + 1); });
  }
})();

/* ---- page: creator ---- */
/* ByteSpace — Creator profile: toggle filter buttons + follow state */
(function () {
  'use strict';
  document.querySelectorAll('.creator-tool[aria-pressed]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
  });
  var follow = document.querySelector('.creator-follow');
  if (follow) {
    follow.addEventListener('click', function () {
      var on = follow.getAttribute('aria-pressed') !== 'true';
      follow.setAttribute('aria-pressed', on ? 'true' : 'false');
      follow.textContent = on ? 'Following' : 'Follow';
    });
  }
})();

/* ---- page: auth ---- */
/* ByteSpace — auth pages: simple client-side validation */
(function () {
  'use strict';

  var form = document.querySelector('.auth-form');
  if (!form) return;

  var messages = {
    valueMissing: 'This field is required.',
    typeMismatch: 'Please enter a valid value.',
    tooShort: 'Must be at least 8 characters.'
  };

  function check(input) {
    var field = input.closest('.auth-field');
    var err = field && field.querySelector('.auth-field__error');
    var v = input.validity;
    var msg = '';
    if (v.valueMissing) msg = messages.valueMissing;
    else if (v.typeMismatch) msg = input.type === 'email' ? 'Please enter a valid email address.' : messages.typeMismatch;
    else if (v.tooShort) msg = messages.tooShort;
    if (field) field.classList.toggle('is-invalid', !!msg);
    if (err) err.textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  var inputs = form.querySelectorAll('input');
  inputs.forEach(function (input) {
    input.addEventListener('blur', function () { if (input.value) check(input); });
    input.addEventListener('input', function () {
      if (input.closest('.auth-field').classList.contains('is-invalid')) check(input);
    });
  });

  form.addEventListener('submit', function (e) {
    var ok = true;
    inputs.forEach(function (input) { if (!check(input)) ok = false; });
    if (!ok) {
      e.preventDefault();
      var bad = form.querySelector('.is-invalid input');
      if (bad) bad.focus();
    }
  });
})();

/* ---- page: course ---- */
(function(){'use strict';})();

