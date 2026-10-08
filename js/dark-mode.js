(function () {
  'use strict';

  var KEY = 'hexo-theme-mode';
  var html = document.documentElement;
  var btn = document.createElement('a');
  btn.className = 'theme-toggle-btn';
  btn.href = 'javascript:;';
  btn.title = '切换深/浅色';

  function icon(dark) {
    btn.innerHTML = dark ? '<i class="fa fa-sun-o"></i>' : '<i class="fa fa-moon-o"></i>';
  }

  function apply(dark) {
    if (dark) {
      html.classList.add('dark-mode');
    } else {
      html.classList.remove('dark-mode');
    }
    icon(dark);
  }

  function toggle() {
    var next = !html.classList.contains('dark-mode');
    apply(next);
    try {
      localStorage.setItem(KEY, next ? 'dark' : 'light');
    } catch (e) { /* ignore */ }
  }

  btn.addEventListener('click', toggle);

  var stored = null;
  try {
    stored = localStorage.getItem(KEY);
  } catch (e) { /* ignore */ }

  if (stored === 'dark') {
    apply(true);
  } else if (stored === 'light') {
    apply(false);
  } else {
    // 未手动选择过时跟随系统，并监听系统切换
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    apply(mq.matches);
    var onSysChange = function (e) {
      var s = null;
      try { s = localStorage.getItem(KEY); } catch (err) { /* ignore */ }
      if (s === null) apply(e.matches);
    };
    if (mq.addEventListener) {
      mq.addEventListener('change', onSysChange);
    } else if (mq.addListener) {
      mq.addListener(onSysChange);
    }
  }

  document.body.appendChild(btn);
})();
