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
