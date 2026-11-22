/* Nativa · animaciones (GSAP + Lottie). El contenido se ve igual sin JS. */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function safe(fn) { try { fn(); } catch (e) { /* nunca romper la página */ } }

  // Agregar al carrito: el "+" se convierte en una tilde animada y suma al carrito
  safe(function () {
    var badge = document.querySelector('.cart i');
    document.querySelectorAll('.add').forEach(function (btn) {
      var original = btn.innerHTML;
      btn.setAttribute('role', 'button'); btn.setAttribute('tabindex', '0');
      function add() {
        if (btn.dataset.busy) return; btn.dataset.busy = '1';
        if (badge) {
          badge.textContent = String((parseInt(badge.textContent, 10) || 0) + 1);
          if (window.gsap && !reduce) gsap.fromTo(badge, { scale: 1.6 }, { scale: 1, duration: .5, ease: 'back.out(3)' });
        }
        btn.innerHTML = ''; btn.style.background = 'var(--olive)';
        if (window.lottie) {
          var a = lottie.loadAnimation({ container: btn, renderer: 'svg', loop: false, autoplay: !reduce, path: 'anim/check.json' });
          if (reduce) a.addEventListener('DOMLoaded', function () { a.goToAndStop(44, true); });
        } else { btn.textContent = '✓'; }
        setTimeout(function () { btn.innerHTML = original; btn.style.background = ''; delete btn.dataset.busy; }, 1600);
      }
      btn.addEventListener('click', add);
      btn.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); add(); } });
    });
  });

  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  // Con "reducir movimiento": solo fundidos suaves, sin desplazamientos ni loops
  var R = reduce ? 0 : 1;

  // Hero: título por palabras, productos que entran y flotan
  safe(function () {
    var h1 = document.querySelector('.hero h1');
    h1.innerHTML = h1.innerHTML.split(/(<em>.*?<\/em>)/).map(function (part) {
      if (part.indexOf('<em>') === 0) return '<em>' + part.slice(4, -5).split(' ').map(w).join(' ') + '</em>';
      return part.split(' ').map(w).join(' ');
    }).join('');
    function w(t) { return t ? '<span class="w" style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em"><span style="display:inline-block">' + t + '</span></span>' : ''; }
    var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('.hero .kick', { y: 14 * R, opacity: 0, duration: .6 })
      .from('.hero h1 .w > span', { yPercent: 110 * R, opacity: reduce ? 0 : 1, duration: 1, stagger: .08 }, '-=.3')
      .from('.hero .lead', { y: 20 * R, opacity: 0, duration: .7 }, '-=.6')
      .from('.hero .cta .btn', { y: 18 * R, opacity: 0, duration: .6, stagger: .08 }, '-=.5')
      .from('.hero .perks span', { y: 12 * R, opacity: 0, duration: .5, stagger: .07 }, '-=.4')
      .from('.stage', { clipPath: 'inset(12% 12% 12% 12% round 40px)', opacity: 0, duration: 1.1 }, .25)
      .from('.stage .p', { y: 80 * R, opacity: 0, duration: 1, stagger: .12 }, .55)
      .from('.stage .leaf', { scale: 0, rotation: -30, duration: 1, stagger: .1, ease: 'back.out(2)' }, .8);
    if (!reduce) gsap.utils.toArray('.stage .p').forEach(function (p, i) {
      gsap.to(p, { y: '-=10', duration: 2.4 + i * .3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.6 + i * .2 });
    });
    if (!reduce) gsap.utils.toArray('.stage .leaf').forEach(function (l, i) {
      gsap.to(l, { rotation: '+=6', duration: 3 + i, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    });
  });

  // Tienda: títulos, chips y productos al hacer scroll
  safe(function () {
    gsap.utils.toArray('section .head, .banner > div:first-child').forEach(function (el) {
      gsap.from(el, { y: 36 * R, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    ScrollTrigger.batch('.card, .step, .pay span', {
      start: 'top 92%', once: true,
      onEnter: function (els) { gsap.from(els, { y: 50 * R, opacity: 0, duration: .8, ease: 'power3.out', stagger: .08 }); }
    });
    gsap.from('.banner .p', { y: 60 * R, opacity: 0, duration: 1, stagger: .15, ease: 'expo.out', scrollTrigger: { trigger: '.banner', start: 'top 80%' } });
  });
})();
