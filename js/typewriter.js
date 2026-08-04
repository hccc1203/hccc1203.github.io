(function () {
  'use strict';

  var el = document.querySelector('.site-subtitle');
  if (!el) return;

  var text = el.textContent;
  var prefix = '>_ ';
  var i = 0;
  el.classList.add('typing');

  function type() {
    el.textContent = prefix + text.slice(0, i);
    if (i < text.length) {
      i++;
      setTimeout(type, 120);
    }
  }

  type();
})();
