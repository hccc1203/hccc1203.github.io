(function () {
  'use strict';

  var canvas = document.createElement('canvas');
  canvas.className = 'particles-canvas';
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  var count = 60;
  var points = [];
  var lineDist = 120;
  var raf = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function init() {
    points = [];
    for (var i = 0; i < count; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.6 + 0.6
      });
    }
  }

  function color() {
    // 深色模式下用亮色粒子，浅色模式用主色
    return document.documentElement.classList.contains('dark-mode') ? 'rgba(188, 140, 255, .5)' : 'rgba(88, 166, 255, .45)';
  }

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var c = color();
    var stroke = c;

    points.forEach(function (p, i) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = c;
      ctx.fill();

      for (var j = i + 1; j < points.length; j++) {
        var q = points[j];
        var dx = p.x - q.x;
        var dy = p.y - q.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < lineDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = stroke;
          ctx.globalAlpha = 1 - d / lineDist;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    });

    raf = requestAnimationFrame(step);
  }

  window.addEventListener('resize', function () {
    resize();
    init();
  });

  resize();
  init();
  step();
})();
