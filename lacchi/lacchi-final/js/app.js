/* ============================================================
   app.js — Main Application Engine
   Lakshmishree B K Birthday Website 👑

   ⚠️  You do NOT need to edit this file.
   All content changes go in the other JS files:
     photos.js   → photo gallery
     videos.js   → video gallery
     letter.js   → the letter for Angel
     wishes.js   → birthday wish cards
     timeline.js → memories timeline
     music.js    → music player
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── Inject letter date ──────────────────────────────────
  const dateEl = document.getElementById('letterDate');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // ── Populate letter ────────────────────────────────────
  if (typeof LETTER !== 'undefined') {
    const el = document.getElementById('letterGreeting');
    const bd = document.getElementById('letterBody');
    const sg = document.getElementById('letterSign');
    if (el) el.textContent = LETTER.greeting;
    if (bd) bd.textContent = LETTER.body;
    if (sg) sg.textContent = LETTER.sign;
  }

  // ── Populate wishes ────────────────────────────────────
  if (typeof WISHES !== 'undefined') {
    const box = document.getElementById('wishBoxes');
    if (box) {
      box.innerHTML = '';
      WISHES.forEach(function (w) {
        const div = document.createElement('div');
        div.className = 'wb';
        div.innerHTML =
          '<input class="wb-name" value="' + escHtml(w.name) + '" placeholder="Name">' +
          '<textarea class="wb-txt" rows="4">' + escHtml(w.text) + '</textarea>' +
          '<span class="wb-hint">✦ tap to edit</span>';
        box.appendChild(div);
      });
    }
  }

  // ── Populate timeline ──────────────────────────────────
  if (typeof TIMELINE !== 'undefined') {
    const tl = document.getElementById('timelineWrap');
    if (tl) {
      tl.innerHTML = '';
      TIMELINE.forEach(function (m) {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML =
          '<div class="timeline-dot"></div>' +
          '<div class="timeline-card">' +
          '<div class="timeline-year">' + escHtml(m.label) + '</div>' +
          '<h3>' + escHtml(m.title) + '</h3>' +
          '<p>' + escHtml(m.text) + '</p>' +
          '</div>';
        tl.appendChild(item);
      });
    }
  }

  // ── Populate video gallery ─────────────────────────────
  if (typeof VIDEOS !== 'undefined') {
    const grid = document.getElementById('videoGrid');
    if (grid) {
      grid.innerHTML = '';
      VIDEOS.forEach(function (video) {
        const card = document.createElement('div');
        card.className = 'video-card';
        let media = '';
        if (video.src) {
          if (video.type === 'youtube') {
            media = '<div class="video-wrapper"><iframe src="' + video.src + '" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe></div>';
          } else {
            media = '<div class="video-wrapper"><video controls><source src="' + video.src + '" type="video/mp4"></video></div>';
          }
        } else {
          media = '<div class="video-placeholder"><div style="font-size:2rem;opacity:.3">🎬</div><p style="font-size:.8rem;font-style:italic">Add video path in videos.js</p></div>';
        }
        card.innerHTML = media + '<div class="video-info"><h3>' + escHtml(video.title) + '</h3><p>' + escHtml(video.description) + '</p></div>';
        grid.appendChild(card);
      });
    }
  }

  // ── Build photo gallery ────────────────────────────────
  if (typeof GALLERY_PHOTOS !== 'undefined') {
    const outer = document.getElementById('slideOuter');
    if (outer) {
      outer.innerHTML = '';
      const captions = GALLERY_PHOTOS.map(function (p) { return p.caption; });
      for (let i = 0; i < 8; i++) {
        const s    = document.createElement('div');
        s.className = 'slide' + (i === 0 ? ' on' : '');
        s.id = 'sl' + i;

        const img  = document.createElement('img'); img.alt = '';
        const ph   = document.createElement('div'); ph.className = 'sl-ph'; ph.textContent = '📸';
        const hint = document.createElement('div'); hint.className = 'sl-hint'; hint.id = 'slhint' + i; hint.textContent = 'tap to add photo ' + (i + 1);
        const cap  = document.createElement('div'); cap.className = 'slide-cap';
        const inp  = document.createElement('input'); inp.value = captions[i] || ''; inp.placeholder = 'add a caption...';
        inp.addEventListener('click', function (e) { e.stopPropagation(); });
        cap.appendChild(inp);

        const finp = document.createElement('input'); finp.type = 'file'; finp.accept = 'image/*'; finp.style.display = 'none';
        finp.addEventListener('change', (function (si, sEl, imgEl, hintEl) {
          return function (e) {
            const f = e.target.files[0]; if (!f) return;
            const r = new FileReader();
            r.onload = function (ev) {
              imgEl.src = ev.target.result;
              sEl.classList.add('has-img');
              hintEl.textContent = 'tap to change';
            };
            r.readAsDataURL(f);
          };
        })(i, s, img, hint));

        s.addEventListener('click', (function (sEl, phEl, hintEl, finpEl) {
          return function (e) {
            if (!sEl.classList.contains('has-img') || e.target === phEl || e.target === hintEl) finpEl.click();
          };
        })(s, ph, hint, finp));

        // Pre-load if src is set
        if (GALLERY_PHOTOS[i] && GALLERY_PHOTOS[i].src) {
          img.src = GALLERY_PHOTOS[i].src;
          s.classList.add('has-img');
          hint.textContent = '✦';
        }

        s.appendChild(img); s.appendChild(ph); s.appendChild(hint); s.appendChild(cap); s.appendChild(finp);
        outer.appendChild(s);
      }
    }
  }

  // ── Music source ───────────────────────────────────────
  if (typeof MUSIC !== 'undefined' && MUSIC.src) {
    const aud = document.getElementById('aud');
    if (aud) {
      aud.innerHTML = '<source src="' + MUSIC.src + '" type="audio/mpeg">';
    }
  }

  // ── Kick off all engines ───────────────────────────────
  initCursor();
  initAurora();
  initParticles();
  initS1();
  initNameLetters();
  initCake();
  initSlideshow();
  updateUI();

});

/* ════════════════════════════════════
   CURSOR
════════════════════════════════════ */
function initCursor() {
  const C = document.getElementById('cur'), C2 = document.getElementById('cur2');
  let mx = 0, my = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    C.style.left = mx + 'px'; C.style.top = my + 'px';
  });
  setInterval(function () {
    tx += (mx - tx) * .12; ty += (my - ty) * .12;
    C2.style.left = tx + 'px'; C2.style.top = ty + 'px';
  }, 16);
}

/* ════════════════════════════════════
   AURORA BACKGROUND
════════════════════════════════════ */
function initAurora() {
  const AC = document.getElementById('aurora'), AX = AC.getContext('2d');
  let AW, AH, at = 0;
  function rs() { AW = AC.width = innerWidth; AH = AC.height = innerHeight; } rs();
  window.addEventListener('resize', rs);
  const orbs = [
    { x: .2, y: .4, r: .5,  c: '#3d0020', sp: .0005 },
    { x: .8, y: .6, r: .45, c: '#1a0030', sp: .0004 },
    { x: .5, y: .3, r: .6,  c: '#200010', sp: .0003 }
  ];
  (function draw() {
    AX.clearRect(0, 0, AW, AH);
    AX.fillStyle = '#030108'; AX.fillRect(0, 0, AW, AH);
    orbs.forEach(function (o) {
      const ox = (o.x + Math.sin(at * o.sp) * .2) * AW;
      const oy = (o.y + Math.cos(at * o.sp * 1.3) * .15) * AH;
      const r  = o.r * Math.min(AW, AH);
      const g  = AX.createRadialGradient(ox, oy, 0, ox, oy, r);
      g.addColorStop(0, o.c); g.addColorStop(1, 'transparent');
      AX.fillStyle = g; AX.fillRect(0, 0, AW, AH);
    });
    at++; requestAnimationFrame(draw);
  })();
}

/* ════════════════════════════════════
   GOLDEN PARTICLES
════════════════════════════════════ */
function initParticles() {
  const canvas = document.getElementById('particle-canvas'), ctx = canvas.getContext('2d');
  function rs() { canvas.width = innerWidth; canvas.height = innerHeight; } rs();
  window.addEventListener('resize', rs);
  const COLORS = ['#FFD700', '#FFF0A0', '#E8B86D', '#B8860B', '#FFFACD'];
  const particles = [];
  function Particle() {
    this.reset = function () {
      this.x = Math.random() * canvas.width; this.y = canvas.height + 10;
      this.size = Math.random() * 3 + 1;
      this.speedY = -(Math.random() * .8 + .3); this.speedX = (Math.random() - .5) * .5;
      this.opacity = Math.random() * .6 + .2;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.tDir = 1; this.tSpd = Math.random() * .02 + .005;
    };
    this.reset(); this.y = Math.random() * canvas.height;
    this.update = function () {
      this.y += this.speedY; this.x += this.speedX;
      this.opacity += this.tSpd * this.tDir;
      if (this.opacity > .9 || this.opacity < .1) this.tDir *= -1;
      if (this.y < -10) this.reset();
    };
    this.draw = function () {
      ctx.save(); ctx.globalAlpha = this.opacity; ctx.fillStyle = this.color;
      ctx.shadowBlur = 6; ctx.shadowColor = this.color;
      ctx.beginPath(); ctx.translate(this.x, this.y); ctx.rotate(Math.PI / 4);
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    };
  }
  for (let i = 0; i < 120; i++) particles.push(new Particle());
  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function (p) { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  })();
}

/* ════════════════════════════════════
   SCENE ENGINE
════════════════════════════════════ */
const SCENES = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10'];
const TOT = SCENES.length;
var CUR = 0;

function goTo(to) {
  if (to === CUR || to < 0 || to >= TOT) return;
  const W = document.getElementById('wipe');
  W.style.transition = 'transform .6s cubic-bezier(.77,0,.18,1)';
  W.style.transformOrigin = 'left';
  W.style.transform = 'scaleX(1)';
  setTimeout(function () {
    document.getElementById(SCENES[CUR]).classList.remove('active');
    document.getElementById(SCENES[to]).classList.add('active');
    CUR = to;
    W.style.transition = 'transform .5s cubic-bezier(.77,0,.18,1)';
    W.style.transformOrigin = 'right';
    W.style.transform = 'scaleX(0)';
    updateUI(); onEnter(CUR);
  }, 620);
}
function nextScene() { goTo(CUR + 1); }

function updateUI() {
  const nb = document.getElementById('navBtn');
  const showNav = CUR > 0 && CUR < TOT - 1 && CUR !== 2;
  nb.style.display = showNav ? 'block' : 'none';
  nb.textContent = CUR === TOT - 2 ? 'Finale ✦' : 'Continue';
  document.getElementById('pips').style.display = CUR > 0 ? 'flex' : 'none';
  document.getElementById('musicPill').style.display = CUR > 0 ? 'flex' : 'none';
  const p = document.getElementById('pips'); p.innerHTML = '';
  for (let i = 1; i < TOT; i++) {
    const d = document.createElement('div');
    d.className = 'pip' + (i === CUR ? ' on' : '');
    d.setAttribute('onclick', 'goTo(' + i + ')');
    p.appendChild(d);
  }
}

function onEnter(idx) {
  if (idx === 1) animName();
  if (idx === 9) { launchConfetti(150); startFW(); setTimeout(function () { if (window._nameAnim) window._nameAnim(); }, 1200); }
}

/* ════════════════════════════════════
   S1 — ENVELOPE
════════════════════════════════════ */
function initS1() {
  const tap = document.getElementById('s1-tap');
  tap.addEventListener('click', function () { if (CUR === 0) goTo(1); });
  tap.addEventListener('touchend', function (e) { e.preventDefault(); if (CUR === 0) goTo(1); }, { passive: false });
  setTimeout(function () {
    document.getElementById('s1lbl').style.opacity = '1';
    document.getElementById('s1hint').style.opacity = '1';
  }, 1500);
}

/* ════════════════════════════════════
   S2 — NAME ANIMATION
════════════════════════════════════ */
function initNameLetters() {
  const nm = 'LAKSHMISHREE', row = document.getElementById('nameRow');
  nm.split('').forEach(function (ch, i) {
    const s = document.createElement('span'); s.className = 'nl'; s.textContent = ch;
    const dirs = [[0,-80],[80,-40],[-80,-40],[0,80],[80,40],[-80,40],[0,-80],[60,-60],[-60,60],[0,-80],[80,-40],[-80,-40]];
    const d = dirs[i % dirs.length];
    s.style.transform = 'translate(' + d[0] + 'px,' + d[1] + 'px)';
    s.style.transition = 'opacity .6s ease ' + (.08 + i * .07) + 's,transform .7s cubic-bezier(.2,1,.3,1) ' + (.08 + i * .07) + 's';
    row.appendChild(s);
  });
  row.addEventListener('mousemove', function (e) {
    const r = row.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / r.width * 15;
    const dy = (e.clientY - r.top - r.height / 2) / r.height * 6;
    document.querySelectorAll('.nl').forEach(function (l, i) {
      l.style.transform = 'translate(' + (dx * (i % 2 ? 1 : -1)) + 'px,' + dy + 'px)';
    });
  });
  row.addEventListener('mouseleave', function () {
    document.querySelectorAll('.nl').forEach(function (l) { l.style.transform = 'translate(0,0)'; });
  });
}

function animName() {
  document.querySelectorAll('.nl').forEach(function (l, i) {
    setTimeout(function () { l.style.opacity = '1'; l.style.transform = 'translate(0,0)'; }, i * 75);
  });
  setTimeout(function () {
    var n = document.getElementById('s2nick');
    var sv = document.getElementById('s2saved');
    var sw = document.getElementById('s2wish');
    var sd = document.getElementById('s2date');
    if (n) n.style.opacity = '1';
    if (sv) sv.style.opacity = '1';
    if (sw) sw.style.opacity = '1';
    if (sd) sd.style.opacity = '1';
  }, 950);
  // petal rain
  const pe = ['🌸', '🌷', '✦', '◈', '❋', '💛', '👑'];
  const id = setInterval(function () {
    if (CUR !== 1) { clearInterval(id); return; }
    const p = document.createElement('div');
    p.style.cssText = 'position:fixed;left:' + Math.random() * 100 + 'vw;top:-20px;font-size:' + (.7 + Math.random() * .8) + 'rem;pointer-events:none;z-index:12;animation:cfFall ' + (5 + Math.random() * 5) + 's linear forwards;color:rgba(201,168,76,.6)';
    p.textContent = pe[~~(Math.random() * pe.length)];
    document.body.appendChild(p); setTimeout(function () { p.remove(); }, 11000);
  }, 300);
}

/* ════════════════════════════════════
   S3 — 3-2-1 COUNTDOWN
════════════════════════════════════ */
function start321() {
  const ov = document.getElementById('ov321'), el = document.getElementById('n321');
  ov.classList.add('on');
  const nums = ['3', '2', '1', '🎂']; let i = 0;
  function tick() {
    el.textContent = nums[i]; el.style.animation = 'none'; void el.offsetWidth; el.style.animation = 'n321a .8s ease both';
    i++;
    if (i < nums.length) setTimeout(tick, 900);
    else setTimeout(function () { ov.classList.remove('on'); goTo(3); }, 700);
  }
  tick();
}

/* ════════════════════════════════════
   S4 — CAKE CANVAS
════════════════════════════════════ */
var blown = false;
function initCake() {
  const c = document.getElementById('cakeC'), ctx = c.getContext('2d');
  const W = 280, H = 260; let flames = [];
  function spF(x, y) { return { x: x + (-2 + Math.random() * 4), y, vy: -1.2 - Math.random() * .8, vx: (-.4 + Math.random() * .8), life: 1, size: 5 + Math.random() * 3 }; }
  function initF() { flames = []; [[84, 74], [140, 66], [196, 74]].forEach(function (b) { for (let i = 0; i < 6; i++) flames.push(spF(b[0], b[1])); }); } initF();
  function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath(); }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    // glow
    const bg = ctx.createRadialGradient(140, 235, 0, 140, 235, 150); bg.addColorStop(0, 'rgba(201,168,76,0.07)'); bg.addColorStop(1, 'transparent'); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    // bottom tier
    rr(14, 156, 252, 84, 12); const b1 = ctx.createLinearGradient(14, 156, 14, 240); b1.addColorStop(0, '#3d0f60'); b1.addColorStop(1, '#280a40'); ctx.fillStyle = b1; ctx.fill(); ctx.strokeStyle = 'rgba(201,168,76,.3)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, 168); for (let i = 0; i < 11; i++) { const px = 14 + i * 25; ctx.quadraticCurveTo(px + 12, 158, px + 25, 168); } ctx.strokeStyle = '#e8527a'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.stroke();
    ['🌸', '✦', '💛', '✨', '👑'].forEach(function (e, i) { ctx.font = '13px serif'; ctx.textAlign = 'center'; ctx.fillText(e, 46 + i * 48, 204); });
    // middle tier
    rr(38, 112, 204, 48, 8); const b2 = ctx.createLinearGradient(38, 112, 38, 160); b2.addColorStop(0, '#2d0a4e'); b2.addColorStop(1, '#1e0635'); ctx.fillStyle = b2; ctx.fill(); ctx.strokeStyle = 'rgba(201,168,76,.22)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(38, 123); for (let i = 0; i < 9; i++) { const px = 38 + i * 23; ctx.quadraticCurveTo(px + 11, 113, px + 23, 123); } ctx.strokeStyle = '#c9a84c'; ctx.lineWidth = 2.5; ctx.stroke();
    // top tier
    rr(66, 76, 148, 40, 6); const b3 = ctx.createLinearGradient(66, 76, 66, 116); b3.addColorStop(0, '#200535'); b3.addColorStop(1, '#160325'); ctx.fillStyle = b3; ctx.fill(); ctx.strokeStyle = 'rgba(201,168,76,.2)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(66, 86); for (let i = 0; i < 7; i++) { const px = 66 + i * 21; ctx.quadraticCurveTo(px + 10, 76, px + 21, 86); } ctx.strokeStyle = 'rgba(201,168,76,.65)'; ctx.lineWidth = 2; ctx.stroke();
    // candles
    [[84, 44], [140, 37], [196, 44]].forEach(function (pos, i) {
      const cg = ctx.createLinearGradient(pos[0] - 5, pos[1], pos[0] + 5, pos[1]);
      const col = [['#ffd6b8', '#f4a070'], ['#c9a84c', '#e8c97e'], ['#c084fc', '#9040d0']];
      cg.addColorStop(0, col[i][0]); cg.addColorStop(1, col[i][1]);
      rr(pos[0] - 5, pos[1], 10, 38 - i * 3, 4); ctx.fillStyle = cg; ctx.fill();
    });
    // flames
    if (!window._blown) {
      flames.forEach(function (f) {
        f.x += f.vx; f.y += f.vy; f.life -= .028;
        const bases = [[84, 74], [140, 66], [196, 74]];
        if (f.life <= 0) { const b = bases[~~(Math.random() * 3)]; Object.assign(f, spF(b[0], b[1])); f.life = 1; }
        const fg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * f.life);
        fg.addColorStop(0, 'rgba(255,220,50,' + f.life + ')'); fg.addColorStop(.5, 'rgba(255,120,0,' + (f.life * .65) + ')'); fg.addColorStop(1, 'transparent');
        ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(f.x, f.y, f.size * f.life, 0, Math.PI * 2); ctx.fill();
      });
    } else {
      [[84, 70], [140, 63], [196, 70]].forEach(function (pos) { ctx.font = '13px serif'; ctx.textAlign = 'center'; ctx.fillText('💨', pos[0], pos[1]); });
    }
    requestAnimationFrame(draw);
  } draw();

  function blowCandles() {
    if (blown) return; blown = true; window._blown = true;
    launchConfetti(80);
    document.getElementById('navBtn').style.display = 'none';
    document.querySelector('.s4-wrap').style.display = 'none';
    document.getElementById('s4wish').style.display = 'flex';
  }
  c.addEventListener('click', blowCandles);
  c.addEventListener('touchend', function (e) { e.preventDefault(); blowCandles(); }, { passive: false });
  document.getElementById('cakeLbl').addEventListener('click', blowCandles);
}

/* ════════════════════════════════════
   S5 — SLIDESHOW NAVIGATION
════════════════════════════════════ */
var slIdx = 0;
function initSlideshow() { updateSlide(); }
function updateSlide() {
  document.querySelectorAll('.slide').forEach(function (s, i) { s.classList.toggle('on', i === slIdx); });
  var el = document.getElementById('slCtr');
  if (el) el.textContent = (slIdx + 1) + ' / 8';
}
function nextSlide() { slIdx = (slIdx + 1) % 8; updateSlide(); }
function prevSlide() { slIdx = (slIdx - 1 + 8) % 8; updateSlide(); }

/* ════════════════════════════════════
   S10 — FIREWORKS
════════════════════════════════════ */
const FWC = document.getElementById('fwC'), FWCTX = FWC.getContext('2d');
var FWR = [], FWP = [], fwOn = false;
const FWCOLS = ['#c9a84c', '#e8c97e', '#d4527a', '#f0a0c0', '#c084fc', '#fff', '#f0c060'];
function rsFW() { FWC.width = innerWidth; FWC.height = innerHeight; } rsFW();
window.addEventListener('resize', rsFW);
function lRkt() { FWR.push({ x: innerWidth * .1 + Math.random() * innerWidth * .8, y: innerHeight, tx: innerWidth * .15 + Math.random() * innerWidth * .7, ty: 50 + Math.random() * innerHeight * .4, color: FWCOLS[~~(Math.random() * FWCOLS.length)], spd: 12 + Math.random() * 5, trail: [] }); }
function boom(x, y, col) { for (let i = 0; i < 100; i++) { const a = Math.random() * Math.PI * 2, s = 2 + Math.random() * 6; FWP.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, color: col, life: 1, size: 2 + Math.random() * 2.5 }); } }
function fwLoop() {
  if (!fwOn) return;
  FWCTX.fillStyle = 'rgba(3,1,8,.17)'; FWCTX.fillRect(0, 0, FWC.width, FWC.height);
  FWR.forEach(function (r, i) {
    r.trail.push({ x: r.x, y: r.y }); if (r.trail.length > 12) r.trail.shift();
    r.trail.forEach(function (p, ti) { FWCTX.beginPath(); FWCTX.arc(p.x, p.y, 1.5 * (ti / r.trail.length), 0, Math.PI * 2); FWCTX.fillStyle = 'rgba(201,168,76,' + (ti / r.trail.length * .5) + ')'; FWCTX.fill(); });
    const dx = r.tx - r.x, dy = r.ty - r.y, dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < r.spd) { boom(r.x, r.y, r.color); FWR.splice(i, 1); return; }
    r.x += dx / dist * r.spd; r.y += dy / dist * r.spd;
    FWCTX.beginPath(); FWCTX.arc(r.x, r.y, 2.5, 0, Math.PI * 2); FWCTX.fillStyle = r.color; FWCTX.fill();
  });
  FWP.forEach(function (p) { p.x += p.vx; p.y += p.vy; p.vy += .07; p.vx *= .97; p.life -= .015; });
  FWP = FWP.filter(function (p) { return p.life > 0; });
  FWP.forEach(function (p) { FWCTX.beginPath(); FWCTX.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2); FWCTX.fillStyle = p.color; FWCTX.globalAlpha = p.life * p.life; FWCTX.fill(); FWCTX.globalAlpha = 1; });
  requestAnimationFrame(fwLoop);
}
function startFW() {
  fwOn = true; FWCTX.fillStyle = 'rgba(3,1,8,1)'; FWCTX.fillRect(0, 0, FWC.width, FWC.height); fwLoop();
  lRkt(); lRkt();
  const id = setInterval(function () { lRkt(); if (Math.random() < .4) lRkt(); }, 700);
  setTimeout(function () { clearInterval(id); }, 20000);
}

// Name particles finale
(function () {
  const nc = document.getElementById('nmC'), nctx = nc.getContext('2d');
  function rs() { nc.width = innerWidth; nc.height = innerHeight; } rs(); window.addEventListener('resize', rs);
  window._nameAnim = function () {
    const tmp = document.createElement('canvas'); tmp.width = innerWidth; tmp.height = 100;
    const tc = tmp.getContext('2d');
    tc.font = 'bold ' + Math.min(innerWidth * .1, 90) + 'px "Cinzel Decorative",serif';
    tc.textAlign = 'center'; tc.fillStyle = '#fff'; tc.fillText('LAKSHMISHREE', innerWidth / 2, 90);
    const d = tc.getImageData(0, 0, innerWidth, 100).data;
    const pts = [];
    for (let y = 0; y < 100; y += 4) for (let x = 0; x < innerWidth; x += 4) { if (d[(y * innerWidth + x) * 4 + 3] > 128) pts.push([x, y + innerHeight * .28]); }
    const parts = pts.slice(0, Math.min(pts.length, 600)).map(function (p) { return { tx: p[0], ty: p[1], x: Math.random() * innerWidth, y: Math.random() * innerHeight, vx: 0, vy: 0, color: FWCOLS[~~(Math.random() * FWCOLS.length)], size: 1.5 + Math.random() * 1.5 }; });
    function anim() {
      nctx.clearRect(0, 0, nc.width, nc.height); let done = true;
      parts.forEach(function (p) {
        const dx = p.tx - p.x, dy = p.ty - p.y;
        if (Math.abs(dx) > .5 || Math.abs(dy) > .5) done = false;
        p.vx += dx * .06; p.vy += dy * .06; p.vx *= .72; p.vy *= .72; p.x += p.vx; p.y += p.vy;
        nctx.beginPath(); nctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); nctx.fillStyle = p.color; nctx.globalAlpha = .9; nctx.fill(); nctx.globalAlpha = 1;
      });
      if (!done) requestAnimationFrame(anim);
    }
    setTimeout(anim, 800);
  };
})();

/* ════════════════════════════════════
   MUSIC
════════════════════════════════════ */
var musicOn = false;
function toggleMusic() {
  const aud = document.getElementById('aud'), bs = document.querySelectorAll('.wb2');
  if (!musicOn) {
    aud.play().then(function () { musicOn = true; document.getElementById('mLbl').textContent = (typeof MUSIC !== 'undefined' ? MUSIC.label : 'Now playing ✦'); bs.forEach(function (b) { b.classList.add('a'); }); }).catch(function () {});
  } else {
    aud.pause(); musicOn = false; document.getElementById('mLbl').textContent = 'Play music'; bs.forEach(function (b) { b.classList.remove('a'); });
  }
}

/* ════════════════════════════════════
   CONFETTI
════════════════════════════════════ */
function launchConfetti(n) {
  const cs = ['#c9a84c', '#e8c97e', '#d4527a', '#f0a0c0', '#c084fc', '#fff'];
  for (let i = 0; i < (n || 80); i++) {
    const el = document.createElement('div'); el.className = 'cf';
    el.style.cssText = 'left:' + Math.random() * 100 + 'vw;top:-20px;width:' + (5 + Math.random() * 9) + 'px;height:' + (5 + Math.random() * 9) + 'px;background:' + cs[~~(Math.random() * cs.length)] + ';animation-delay:' + (Math.random() * 1.5) + 's;border-radius:' + (Math.random() > .5 ? '50%' : '1px');
    document.body.appendChild(el); setTimeout(function () { el.remove(); }, 5000);
  }
}

/* ════════════════════════════════════
   RESTART
════════════════════════════════════ */
function restart() {
  fwOn = false; FWCTX.clearRect(0, 0, FWC.width, FWC.height); FWR = []; FWP = [];
  blown = false; window._blown = false;
  document.getElementById('s4wish').style.display = 'none';
  document.querySelector('.s4-wrap').style.display = 'flex';
  document.querySelectorAll('.nl').forEach(function (l) { l.style.opacity = '0'; l.style.transform = 'translate(0,0)'; });
  goTo(0);
}

/* ── Utility ── */
function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
