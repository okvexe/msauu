(function () {
  /* menu */
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  });

  /* committees accordion */
  var items = Array.prototype.slice.call(document.querySelectorAll('.cmte'));
  items.forEach(function (item) {
    var btn = item.querySelector('.cmte-btn');
    btn.addEventListener('click', function () {
      var open = !item.classList.contains('open');
      item.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
    });
  });


  /* intro paragraph: zigzag line shape (long, shorter, long, shorter, long), centred */
  var intro = document.querySelector('.intro');
  var canvas = document.createElement('canvas').getContext('2d');
  function zigzag() {
    if (!intro || !canvas) return;
    var text = intro.getAttribute('data-text');
    if (!text) { text = intro.textContent.replace(/\s+/g, ' ').trim(); intro.setAttribute('data-text', text); }
    intro.textContent = text;
    intro.style.whiteSpace = '';
    var wmax = intro.getBoundingClientRect().width * 0.985;
    var cs = getComputedStyle(intro);
    canvas.font = cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
    var words = text.split(' '), n = words.length;
    var wd = words.map(function (x) { return canvas.measureText(x).width; });
    var sp = canvas.measureText(' ').width;
    var P = [0]; for (var i = 0; i < n; i++) P.push(P[i] + wd[i]);
    function lw(a, b) { return P[b] - P[a] + (b - a - 1) * sp; }
    var total = lw(0, n), r = 0.8, INF = 1e15;
    var order = [3, 5, 6, 7, 8, 9, 11];
    for (var c = 0; c < order.length; c++) {
      var N = order[c];
      if (N > n) continue;
      var nl = Math.ceil(N / 2), ns = Math.floor(N / 2);
      var L = (total - (N - 1) * sp) / (nl + r * ns);
      if (L > wmax) continue;
      var deltas = [0.06, 0.03, 0, -0.05];
      for (var d = 0; d < deltas.length; d++) {
        var gap = deltas[d] * L, dp = [], par = [];
        for (var k = 0; k <= N; k++) {
          dp.push([]); par.push([]);
          for (var x = 0; x <= n; x++) { dp[k].push(new Array(n + 1).fill(INF)); par[k].push(new Array(n + 1).fill(-1)); }
        }
        for (var j1 = 1; j1 <= n; j1++) { var w1 = lw(0, j1); if (w1 <= wmax) dp[1][0][j1] = (w1 - L) * (w1 - L); }
        for (var k2 = 2; k2 <= N; k2++) {
          var tgt = (k2 % 2 === 1) ? L : r * L;
          for (var s = k2 - 1; s < n; s++) {
            for (var e = s + 1; e <= n; e++) {
              var w = lw(s, e); if (w > wmax) break;
              for (var p = k2 - 2; p < s; p++) {
                var prev = dp[k2 - 1][p][s]; if (prev >= INF) continue;
                var pw = lw(p, s);
                if (k2 % 2 === 0 ? (w > pw - gap) : (w < pw + gap)) continue;
                var cost = prev + (w - tgt) * (w - tgt);
                if (cost < dp[k2][s][e]) { dp[k2][s][e] = cost; par[k2][s][e] = p; }
              }
            }
          }
        }
        var bs = -1, bc = INF;
        for (var s2 = 0; s2 < n; s2++) { if (dp[N][s2][n] < bc) { bc = dp[N][s2][n]; bs = s2; } }
        if (bs < 0) continue;
        var out = [], st = bs, en = n;
        for (var k3 = N; k3 >= 1; k3--) {
          out.unshift(words.slice(st, en).join(' '));
          var pp = par[k3][st][en]; en = st; st = pp;
        }
        intro.innerHTML = out.join('<br>');
        intro.style.whiteSpace = 'nowrap';
        return;
      }
    }
  }
  if (intro) {
    var run = function () { zigzag(); };
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(run); } else { run(); }
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(run, 150); });
  }

  /* scroll reveal: soft fade-up, lightly staggered within each group */
  var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  ['.stats', '.about-grid', '.cards', '.cm-list'].forEach(function (sel) {
    Array.prototype.forEach.call(document.querySelectorAll(sel), function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        child.style.setProperty('--d', ((i % 3) * 0.08) + 's');
      });
    });
  });
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();
