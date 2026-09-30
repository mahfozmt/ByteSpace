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
