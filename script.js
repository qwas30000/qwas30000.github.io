/* =============================================
   Mohammed Al Nasser — Personal Link Website
   script.js
   ============================================= */

/* ===== DARK / LIGHT MODE TOGGLE ===== */
const toggleBtn = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved preference, default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

toggleBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ===== STAGGERED ENTRANCE ANIMATION ===== */
// All link buttons and the resume button animate in with a delay
const animItems = [
  ...document.querySelectorAll('.link-btn'),
  document.querySelector('.resume-btn'),
].filter(Boolean);

animItems.forEach((el, i) => {
  setTimeout(() => {
    el.style.transition =
      'opacity 0.4s ease, transform 0.4s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 150 + i * 80);
});

/* ===== FOOTER YEAR ===== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== LINK CLICK RIPPLE EFFECT ===== */
document.querySelectorAll('.link-btn, .resume-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      background: rgba(255,255,255,0.08);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.5s ease-out forwards;
      pointer-events: none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* Inject ripple keyframes once */
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(style);
