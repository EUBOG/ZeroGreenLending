// ============================================================
// 1. Scroll Progress Bar — интерактивный индикатор прокрутки
// ============================================================
var scrollBar = document.getElementById("scrollBar");

window.addEventListener("scroll", function () {
  var h = document.documentElement;
  var pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  scrollBar.style.width = pct + "%";
});

// ============================================================
// 2. Header shrink on scroll — анимация сжатия шапки
// ============================================================
var header = document.getElementById("header");

window.addEventListener("scroll", function () {
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ============================================================
// 3. Mobile menu toggle — адаптивное меню
// ============================================================
var menuToggle = document.getElementById("menuToggle");
var nav = document.getElementById("nav");

menuToggle.addEventListener("click", function () {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    nav.classList.remove("open");
  });
});

// ============================================================
// 4. Ripple effect on all buttons — плавная анимация волны
// ============================================================
document.querySelectorAll(".btn").forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    var rect = this.getBoundingClientRect();
    var ripple = document.createElement("span");
    ripple.className = "ripple";
    var size = Math.max(rect.width, rect.height);
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";
    this.appendChild(ripple);
    setTimeout(function () {
      ripple.remove();
    }, 600);
  });
});

// ============================================================
// 5. Mouse parallax in hero — эффект параллакса (вайб-кодинг)
// ============================================================
var par1 = document.getElementById("p1");
var par2 = document.getElementById("p2");
var par3 = document.getElementById("p3");
var hero = document.querySelector(".hero");

if (hero) {
  hero.addEventListener("mousemove", function (e) {
    var x = e.clientX / window.innerWidth - 0.5;
    var y = e.clientY / window.innerHeight - 0.5;
    par1.style.transform = "translate(" + x * 30 + "px, " + y * 20 + "px)";
    par2.style.transform = "translate(" + x * -40 + "px, " + y * 30 + "px)";
    par3.style.transform = "translate(" + x * 20 + "px, " + y * -25 + "px)";
  });
}

// ============================================================
// 6. Scroll reveal animation — появление блоков при скролле
// ============================================================
var revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach(function (el) {
  revealObserver.observe(el);
});

// ============================================================
// 7. Animated counters — счётчики с плавной анимацией
// ============================================================
var counterObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = "1";
        var target = parseInt(entry.target.dataset.target);
        var duration = 2000;
        var startTime = performance.now();

        function step(currentTime) {
          var progress = Math.min((currentTime - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          entry.target.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            entry.target.textContent = target.toLocaleString("ru-RU");
          }
        }

        requestAnimationFrame(step);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-counter").forEach(function (el) {
  counterObserver.observe(el);
});

// ============================================================
// 8. CTA form — отправка заявки на скидку 15%
// ============================================================
document.getElementById("ctaForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var msg = document.getElementById("ctaSuccess");
  msg.style.display = "block";
  this.reset();
  setTimeout(function () {
    msg.style.display = "none";
  }, 5000);
});

// ============================================================
// 9. Contact form — отправка сообщения
// ============================================================
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var msg = document.getElementById("msgSuccess");
  msg.style.display = "block";
  this.reset();
  setTimeout(function () {
    msg.style.display = "none";
  }, 4000);
});

// ============================================================
// 10. Modal popup — всплывающее окно с промокодом
// ============================================================
var modalOverlay = document.getElementById("modalOverlay");

setTimeout(function () {
  modalOverlay.classList.add("open");
}, 40000);

document.getElementById("modalClose").addEventListener("click", function () {
  modalOverlay.classList.remove("open");
});

modalOverlay.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) {
    modalOverlay.classList.remove("open");
  }
});

// ============================================================
// 11. Order buttons — открытие модалки при клике "В корзину"
// ============================================================
document.querySelectorAll(".btn-order").forEach(function (btn) {
  btn.addEventListener("click", function () {
    modalOverlay.classList.add("open");
  });
});
