/* Revitá — motor de interações e animações
   Carregado em cada página via <script src="./revita-fx.js"> no <helmet>.
   Idempotente, respeita prefers-reduced-motion e desativa efeitos de ponteiro no touch. */
(function () {
  if (window.__revitaFX) return;
  window.__revitaFX = true;

  var docEl = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var ACCENT = "rgb(162,132,94)";
  var TAUPE = "rgb(122,108,94)";
  var CREAM = "rgb(236,231,222)";

  /* ---------- estilos injetados ---------- */
  var css = [
    "html.revita-anim [data-reveal]{opacity:0;will-change:opacity,transform;}",
    'html.revita-anim [data-reveal="fade-up"]{transform:translateY(34px);}',
    'html.revita-anim [data-reveal="fade-left"]{transform:translateX(48px);}',
    'html.revita-anim [data-reveal="fade-right"]{transform:translateX(-48px);}',
    'html.revita-anim [data-reveal="scale-up"]{transform:scale(.92);}',
    "html.revita-anim [data-reveal].is-in{opacity:1;transform:none;transition:opacity 1s cubic-bezier(.22,.61,.36,1),transform 1s cubic-bezier(.22,.61,.36,1);}",
    /* cursor */
    "@media (hover:hover) and (pointer:fine){html.revita-cursor,html.revita-cursor *{cursor:none !important;}}",
    "#revita-cursor{position:fixed;top:0;left:0;width:9px;height:9px;border-radius:50%;background:" + CREAM + ";mix-blend-mode:difference;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);border:1.5px solid transparent;transition:width .3s cubic-bezier(.22,.61,.36,1),height .3s cubic-bezier(.22,.61,.36,1),background .3s ease,border-color .3s ease,opacity .3s ease;}",
    "#revita-cursor.big{width:46px;height:46px;background:transparent;border-color:" + CREAM + ";}",
    "#revita-cursor.press{transform:translate(-50%,-50%) scale(.7);}",
    /* page transitions */
    "html.revita-leave [data-screen-label]{opacity:0;transform:translateY(-10px);transition:opacity .3s ease,transform .3s ease;}",
    "html.revita-enter [data-screen-label]{opacity:0;transform:translateY(18px);}",
    "html.revita-enter-active [data-screen-label]{opacity:1;transform:none;transition:opacity .6s cubic-bezier(.22,.61,.36,1),transform .6s cubic-bezier(.22,.61,.36,1);}",
    /* marquee pause */
    "[data-marquee]:hover [data-marquee-track]{animation-play-state:paused;}",
    "@media (prefers-reduced-motion: reduce){html.revita-anim [data-reveal]{opacity:1 !important;transform:none !important;}[data-marquee-track]{animation:none !important;}}",
  ].join("\n");
  var styleEl = document.createElement("style");
  styleEl.setAttribute("data-revita-fx", "");
  styleEl.textContent = css;
  (document.head || docEl).appendChild(styleEl);

  docEl.classList.add("revita-anim");
  if (fine && !reduce) docEl.classList.add("revita-cursor");

  /* ---------- helpers ---------- */
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  /* ---------- scroll reveal (rect-based, confiável) ---------- */
  function revealCheck() {
    if (reduce) return;
    var vh = window.innerHeight || docEl.clientHeight || 800;
    document.querySelectorAll("[data-reveal]:not(.is-in)").forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > -40) {
        var d = el.getAttribute("data-reveal-delay");
        if (d) el.style.transitionDelay = d + "ms";
        el.classList.add("is-in");
      }
    });
  }

  /* ---------- 3D tilt ---------- */
  function bindTilt() {
    if (!fine || reduce) return;
    document.querySelectorAll("[data-tilt]:not([data-tilt-bound])").forEach(function (el) {
      el.setAttribute("data-tilt-bound", "");
      var max = parseFloat(el.getAttribute("data-tilt")) || 6;
      var lift = el.getAttribute("data-tilt-lift");
      lift = lift == null ? 6 : parseFloat(lift);
      el.style.transition = "transform .25s cubic-bezier(.22,.61,.36,1), box-shadow .35s ease";
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
          "perspective(1000px) rotateY(" + px * max + "deg) rotateX(" + -py * max + "deg) translateY(-" + lift + "px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }

  /* ---------- parallax ---------- */
  var parallaxEls = [];
  function scanParallax() {
    if (reduce || window.innerWidth < 760) return;
    document.querySelectorAll("[data-parallax]:not([data-parallax-bound])").forEach(function (el) {
      el.setAttribute("data-parallax-bound", "");
      parallaxEls.push(el);
    });
  }

  /* ---------- nav ---------- */
  var nav = null,
    lastY = 0;
  function getNav() {
    if (!nav) nav = document.querySelector("[data-revita-nav]");
    return nav;
  }

  function onScroll() {
    var y = window.pageYOffset || docEl.scrollTop || 0;
    var n = getNav();
    if (n) {
      var over = n.getAttribute("data-over-hero") === "1";
      var scrolled = y > 60;
      if (over) {
        if (scrolled) {
          n.style.background = "rgba(122,108,94,0.92)";
          n.style.backdropFilter = "blur(12px)";
          n.style.webkitBackdropFilter = "blur(12px)";
          n.style.borderBottomColor = "rgba(236,231,222,0.22)";
        } else {
          n.style.background = "transparent";
          n.style.backdropFilter = "none";
          n.style.webkitBackdropFilter = "none";
          n.style.borderBottomColor = "transparent";
        }
      } else {
        n.style.boxShadow = scrolled ? "0 8px 30px -18px rgba(30,23,18,0.55)" : "none";
      }
      if (!reduce) {
        if (y > 220 && y > lastY + 4) n.style.transform = "translateY(-100%)";
        else if (y < lastY - 4 || y <= 60) n.style.transform = "translateY(0)";
      }
    }
    for (var i = 0; i < parallaxEls.length; i++) {
      var el = parallaxEls[i];
      var f = parseFloat(el.getAttribute("data-parallax")) || 0.25;
      el.style.transform = "scale(1.15) translate3d(0," + y * f + "px,0)";
    }
    lastY = y;
    revealCheck();
  }
  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      revealCheck();
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
    },
    { passive: true }
  );

  /* ---------- custom cursor ---------- */
  function initCursor() {
    if (!fine || reduce || !document.body) return;
    var dot = document.createElement("div");
    dot.id = "revita-cursor";
    document.body.appendChild(dot);
    var mx = window.innerWidth / 2,
      my = window.innerHeight / 2,
      cx = mx,
      cy = my,
      shown = false;
    window.addEventListener("mousemove", function (e) {
      mx = e.clientX;
      my = e.clientY;
      if (!shown) {
        shown = true;
        dot.style.opacity = "1";
      }
    });
    window.addEventListener("mousedown", function () {
      dot.classList.add("press");
    });
    window.addEventListener("mouseup", function () {
      dot.classList.remove("press");
    });
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest && e.target.closest('a,button,input,textarea,select,[role="button"],[data-cursor]')) dot.classList.add("big");
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest && e.target.closest('a,button,input,textarea,select,[role="button"],[data-cursor]')) dot.classList.remove("big");
    });
    (function loop() {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      dot.style.left = cx + "px";
      dot.style.top = cy + "px";
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- page transitions ---------- */
  function isInternal(href) {
    if (!href) return false;
    if (href.charAt(0) === "#") return false;
    if (/^(https?:|mailto:|tel:|\/\/)/.test(href)) return false;
    return /\.dc\.html(\?|#|$)/.test(href) || (!/^[a-z]+:/i.test(href) && href.indexOf(".html") > -1);
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    if (a.target === "_blank") return;
    var href = a.getAttribute("href");
    if (!isInternal(href)) return;
    if (reduce) return;
    e.preventDefault();
    try {
      sessionStorage.setItem("revita-nav", "1");
    } catch (err) {}
    docEl.classList.add("revita-leave");
    setTimeout(function () {
      window.location.href = href;
    }, 300);
  });
  function playEnter() {
    var flag = false;
    try {
      flag = sessionStorage.getItem("revita-nav");
      if (flag) sessionStorage.removeItem("revita-nav");
    } catch (err) {}
    if (!flag || reduce) return;
    docEl.classList.add("revita-enter");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        docEl.classList.add("revita-enter-active");
      });
    });
    setTimeout(function () {
      docEl.classList.remove("revita-enter", "revita-enter-active");
    }, 800);
  }

  /* ---------- boot ---------- */
  function tick() {
    revealCheck();
    bindTilt();
    scanParallax();
  }
  ready(function () {
    initCursor();
    playEnter();
    tick();
    onScroll();
    var mo = new MutationObserver(function () {
      tick();
    });
    mo.observe(document.body || docEl, { childList: true, subtree: true });
    [60, 200, 450, 800, 1300, 2000, 3000].forEach(function (t) {
      setTimeout(function () {
        tick();
        onScroll();
      }, t);
    });
    window.addEventListener("resize", revealCheck, { passive: true });
    window.addEventListener("pointermove", function pm() {
      revealCheck();
    }, { passive: true, once: true });
  });
  window.addEventListener("load", function () {
    tick();
    onScroll();
  });
})();
