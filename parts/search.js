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
