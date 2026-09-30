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
