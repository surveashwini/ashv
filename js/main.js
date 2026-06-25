/**
 * main.js – UI interactions
 */
document.addEventListener("DOMContentLoaded", () => {

  // ── Current year in footer ────────────────────────────────
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Mobile nav toggle ─────────────────────────────────────
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.classList.toggle("is-open", isOpen);
    });

    // Close on nav link click
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close on outside click
    document.addEventListener("click", e => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ── Sticky header shadow ──────────────────────────────────
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ── Hero star field ───────────────────────────────────────
  const starsContainer = document.getElementById("hero-stars");
  if (starsContainer && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const count = 60;
    for (let i = 0; i < count; i++) {
      const star = document.createElement("span");
      star.className = "star";
      star.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${Math.random() * 2 + 1}px;
        height: ${Math.random() * 2 + 1}px;
        animation-delay: ${Math.random() * 4}s;
        animation-duration: ${2 + Math.random() * 3}s;
        opacity: ${0.3 + Math.random() * 0.7};
      `;
      starsContainer.appendChild(star);
    }
  }

  // ── Scroll-reveal ─────────────────────────────────────────
  if ("IntersectionObserver" in window) {
    const revealEls = document.querySelectorAll(
      ".book-card, .testimonial-card, .author-content, .author-photo-wrap, .stat"
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => {
      el.classList.add("reveal-on-scroll");
      observer.observe(el);
    });
  }

  // ── Smooth scroll for anchor links ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ── Newsletter subscribe (stub – wire to your email provider) ──
  const subscribeBtn = document.getElementById("subscribe-btn");
  const emailInput = document.getElementById("email-input");
  (function () { emailjs.init("hAzLBU2exWAeLuZfR"); })();
  if (subscribeBtn && emailInput) {
    subscribeBtn.addEventListener("click", async () => {
      if (!emailInput.validity.valid) {
        emailInput.focus();
        return;
      }

      subscribeBtn.textContent = "✓ You're in!";
      subscribeBtn.disabled = true;

      try { await emailjs.send("service_aehbtca", "template_rslye92", { email: emailInput.value }); subscribeBtn.textContent = "✓ You're in!"; emailInput.disabled = true; } catch (err) { subscribeBtn.textContent = "Try again"; subscribeBtn.disabled = false; }

    });
  }

});
