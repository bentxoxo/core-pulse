/* ============================================================
   Core Pulse — Main JavaScript
   core-pulse.io
   ============================================================ */

'use strict';

/* ---------- Navbar Scroll Effect ---------- */
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---------- Rotating Text Animation ---------- */
(function () {
  const container = document.querySelector('.rotating-text');
  if (!container) return;
  const spans = Array.from(container.querySelectorAll('span'));
  if (!spans.length) return;

  let current = 0;
  spans[0].classList.add('active');

  setInterval(() => {
    const prev = current;
    current = (current + 1) % spans.length;

    spans[prev].classList.remove('active');
    spans[prev].classList.add('exit');

    setTimeout(() => {
      spans[prev].classList.remove('exit');
    }, 500);

    spans[current].classList.add('active');
  }, 2800);
})();

/* ---------- Scroll Fade-In Observer ---------- */
(function () {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => observer.observe(el));
})();

/* ---------- Animated Counter ---------- */
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const formatNumber = (num, suffix) => {
    if (suffix === 'K+') return Math.floor(num / 1000) + 'K+';
    if (suffix === 'M+') return (num / 1000000).toFixed(0) + 'M+';
    return num + suffix;
  };

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (suffix === 'K+') {
        el.textContent = Math.floor(current / 1000) + 'K+';
      } else if (suffix === 'M+') {
        el.textContent = Math.floor(current / 1000000) + 'M+';
      } else if (suffix === '%') {
        el.textContent = current.toFixed(1) + '%';
      } else {
        el.textContent = Math.floor(current) + suffix;
      }

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
})();

/* ---------- AI Search Handler ---------- */
(function () {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const resultsPanel = document.getElementById('resultsPanel');
  const resultsBody = document.getElementById('resultsBody');
  const resultsQuery = document.getElementById('resultsQuery');

  if (!searchForm || !searchInput) return;

  // AI response templates
  const aiResponses = {
    default: [
      {
        title: 'AI-Powered Answer',
        body: 'Core Pulse AI has analysed your query across millions of sources. Sign up for a full, detailed AI response with citations, follow-up questions, and conversation history.',
      },
      {
        title: 'Related Insights',
        body: 'Based on your search, there are several key perspectives to explore. Upgrade to Core Pulse Pro for deep research reports, document analysis, and real-time data.',
      },
      {
        title: 'Quick Summary',
        body: 'Here is a concise overview of your topic. For comprehensive analysis, code generation, image creation, and more — create a free account.',
      },
    ],
  };

  const showResults = (query) => {
    if (!resultsPanel || !resultsBody) return;

    resultsPanel.style.display = 'block';
    resultsBody.innerHTML = `<div style="text-align:center;padding:24px;"><div class="spinner"></div><p style="margin-top:12px;color:var(--clr-text-muted);font-size:0.9rem;">Searching with AI…</p></div>`;

    if (resultsQuery) resultsQuery.textContent = `Results for: "${query}"`;

    setTimeout(() => {
      const responses = aiResponses.default;
      resultsBody.innerHTML = responses
        .map(
          (r) => `
          <div class="result-item">
            <h4>${r.title}</h4>
            <p>${r.body}</p>
          </div>`
        )
        .join('');

      // Scroll to results
      resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1400);
  };

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;
    showResults(query);
  });

  // Also allow Enter key
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (!query) return;
      showResults(query);
    }
  });
})();

/* ---------- Auth Tabs ---------- */
(function () {
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => t.classList.remove('active'));
      forms.forEach((f) => f.classList.remove('active'));
      tab.classList.add('active');
      const form = document.getElementById(target + 'Form');
      if (form) form.classList.add('active');
    });
  });
})();

/* ---------- Auth Form Submission ---------- */
(function () {
  const signupForm = document.getElementById('signupForm');
  const signinForm = document.getElementById('signinForm');

  const handleSubmit = (form, action) => {
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      if (!btn) return;
      const original = btn.textContent;
      btn.textContent = 'Processing…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = action === 'signup' ? '✓ Account Created!' : '✓ Signed In!';
        btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
          window.location.href = 'index.html';
        }, 1800);
      }, 1200);
    });
  };

  handleSubmit(signupForm, 'signup');
  handleSubmit(signinForm, 'signin');
})();

/* ---------- Language Selector ---------- */
(function () {
  const selects = document.querySelectorAll('.lang-select');
  selects.forEach((select) => {
    select.addEventListener('change', () => {
      const lang = select.value;
      // Store preference
      localStorage.setItem('cp_lang', lang);
      // Sync all selects on page
      selects.forEach((s) => { s.value = lang; });
    });

    // Restore saved preference
    const saved = localStorage.getItem('cp_lang');
    if (saved) select.value = saved;
  });
})();

/* ---------- Smooth Anchor Scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- Cookie Banner ---------- */
(function () {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  if (localStorage.getItem('cp_cookies_accepted')) {
    banner.style.display = 'none';
    return;
  }
  banner.style.display = 'flex';

  const acceptBtn = document.getElementById('cookieAccept');
  const rejectBtn = document.getElementById('cookieReject');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cp_cookies_accepted', '1');
      banner.style.opacity = '0';
      setTimeout(() => { banner.style.display = 'none'; }, 400);
    });
  }
  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      localStorage.setItem('cp_cookies_accepted', '0');
      banner.style.opacity = '0';
      setTimeout(() => { banner.style.display = 'none'; }, 400);
    });
  }
})();
