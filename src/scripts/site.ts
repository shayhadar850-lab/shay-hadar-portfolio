// Global site interactions (navigation, scroll progress, contact surface, footer wordmark)
// CSP-safe: external ES module, CSSOM-only style updates, no inline scripts or eval.

const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

function initNavigation(): void {
  const header = document.querySelector<HTMLElement>('[data-site-nav]');
  const navBox = document.querySelector<HTMLElement>('[data-nav-box]');
  const sentinel = document.querySelector<HTMLElement>('[data-scroll-sentinel]');
  const progressBar = document.querySelector<HTMLElement>('[data-scroll-progress]');
  const dropdown = document.querySelector<HTMLElement>('[data-nav-dropdown]');
  const dropdownBtn = document.querySelector<HTMLButtonElement>('[data-dropdown-btn]');
  const dropdownPanel = document.querySelector<HTMLElement>('[data-dropdown-panel]');
  const mobileBtn = document.querySelector<HTMLButtonElement>('[data-mobile-btn]');
  const mobileSheet = document.querySelector<HTMLElement>('[data-mobile-sheet]');

  if (header && sentinel && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      ([entry]) => {
        header.toggleAttribute('data-scrolled', !entry.isIntersecting);
      },
      { threshold: 0 },
    );
    io.observe(sentinel);
  } else if (header) {
    const onScroll = () => header.toggleAttribute('data-scrolled', window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Smooth scroll progress bar
  if (progressBar) {
    let target = 0;
    let current = 0;
    let raf = 0;

    const measure = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      target = scrollable > 0 ? clamp(window.scrollY / scrollable, 0, 1) : 0;
      if (reducedMotionQuery.matches) {
        current = target;
        progressBar.style.transform = `scaleX(${current.toFixed(4)})`;
        return;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      raf = 0;
      current += (target - current) * 0.22;
      if (Math.abs(target - current) < 0.001) current = target;
      progressBar.style.transform = `scaleX(${current.toFixed(4)})`;
      if (current !== target) raf = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    measure();
  }

  let dropdownOpen = false;
  let mobileOpen = false;

  const setDropdown = (next: boolean) => {
    dropdownOpen = next;
    if (dropdownBtn) dropdownBtn.setAttribute('aria-expanded', String(next));
    if (dropdownPanel) {
      dropdownPanel.toggleAttribute('data-open', next);
      dropdownPanel.querySelectorAll<HTMLAnchorElement>('a').forEach((a) => {
        a.tabIndex = next ? 0 : -1;
      });
    }
  };

  const setMobile = (next: boolean) => {
    mobileOpen = next;
    if (mobileBtn) {
      mobileBtn.setAttribute('aria-expanded', String(next));
      mobileBtn.setAttribute('aria-label', next ? 'סגירת תפריט ניווט' : 'פתיחת תפריט ניווט');
    }
    if (mobileSheet) {
      mobileSheet.toggleAttribute('data-open', next);
      mobileSheet.querySelectorAll<HTMLAnchorElement>('a').forEach((a) => {
        a.tabIndex = next ? 0 : -1;
      });
    }
  };

  setDropdown(false);
  setMobile(false);

  dropdownBtn?.addEventListener('click', () => setDropdown(!dropdownOpen));
  if (dropdown) {
    dropdown.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse') setDropdown(true);
    });
    dropdown.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'mouse') setDropdown(false);
    });
  }

  mobileBtn?.addEventListener('click', () => {
    setDropdown(false);
    setMobile(!mobileOpen);
  });

  document.querySelectorAll<HTMLElement>('[data-nav-close]').forEach((el) => {
    el.addEventListener('click', () => {
      setDropdown(false);
      setMobile(false);
    });
  });

  document.addEventListener('pointerdown', (e) => {
    if (!dropdownOpen && !mobileOpen) return;
    if (navBox && !navBox.contains(e.target as Node)) {
      setDropdown(false);
      setMobile(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (dropdownOpen) {
        setDropdown(false);
        dropdownBtn?.focus();
      }
      if (mobileOpen) {
        setMobile(false);
        mobileBtn?.focus();
      }
    }
  });
}

function initContactSurface(): void {
  const surfaces = document.querySelectorAll<HTMLElement>('[data-cta-surface]');
  for (const surface of surfaces) {
    const email = surface.dataset.email ?? 'shayhadar850@gmail.com';
    const topicBtns = Array.from(surface.querySelectorAll<HTMLButtonElement>('[data-topic-subject]'));
    const primaryMail = surface.querySelector<HTMLAnchorElement>('[data-mailto-link]');
    const secondaryMail = surface.querySelector<HTMLAnchorElement>('[data-mailto-secondary]');
    const copyBtn = surface.querySelector<HTMLButtonElement>('[data-copy-email]');
    const copyLabel = surface.querySelector<HTMLElement>('[data-copy-label]');
    const copyStatus = surface.querySelector<HTMLElement>('[data-copy-status]');

    for (const btn of topicBtns) {
      btn.addEventListener('click', () => {
        const subject = btn.dataset.topicSubject ?? 'שיתוף פעולה טכנולוגי';
        for (const other of topicBtns) {
          other.setAttribute('aria-pressed', String(other === btn));
        }
        const href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
        if (primaryMail) primaryMail.href = href;
        if (secondaryMail) secondaryMail.href = href;
      });
    }

    if (copyBtn) {
      let resetTimer = 0;
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(email);
          if (copyLabel) copyLabel.textContent = 'הכתובת הועתקה';
          if (copyStatus) copyStatus.textContent = `כתובת האימייל ${email} הועתקה ללוח.`;
        } catch {
          if (copyStatus) copyStatus.textContent = `ניתן להעתיק ידנית: ${email}`;
        }
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => {
          if (copyLabel) copyLabel.textContent = 'העתקת כתובת האימייל';
        }, 2600);
      });
    }

    // Pointer-responsive glow blobs (reference velocities 0.35, -0.25, 0.18)
    const blobs = Array.from(surface.querySelectorAll<HTMLElement>('.cta-blob'));
    if (blobs.length && !reducedMotionQuery.matches) {
      const weights = [0.35, -0.25, 0.18];
      const state = blobs.map(() => ({ tx: 0, ty: 0, x: 0, y: 0 }));
      let raf = 0;

      const animateBlobs = () => {
        raf = 0;
        let active = false;
        blobs.forEach((blob, i) => {
          const st = state[i];
          const ease = 0.065 + i * 0.015;
          st.x += (st.tx - st.x) * ease;
          st.y += (st.ty - st.y) * ease;
          if (Math.abs(st.tx - st.x) > 0.25 || Math.abs(st.ty - st.y) > 0.25) active = true;
          blob.style.transform = `translate3d(${st.x.toFixed(1)}px, ${st.y.toFixed(1)}px, 0)`;
        });
        if (active) raf = requestAnimationFrame(animateBlobs);
      };

      surface.addEventListener('pointermove', (e) => {
        if (reducedMotionQuery.matches) return;
        const rect = surface.getBoundingClientRect();
        const dx = e.clientX - rect.left - rect.width / 2;
        const dy = e.clientY - rect.top - rect.height / 2;
        state.forEach((st, i) => {
          const k = weights[i] ?? 0.2;
          st.tx = dx * k;
          st.ty = dy * k;
        });
        if (!raf) raf = requestAnimationFrame(animateBlobs);
      });

      surface.addEventListener('pointerleave', () => {
        state.forEach((st) => {
          st.tx = 0;
          st.ty = 0;
        });
        if (!raf) raf = requestAnimationFrame(animateBlobs);
      });
    }
  }
}

function initFooterWordmarkAndCtaUnfold(): void {
  const bigmark = document.querySelector<HTMLElement>('[data-bigmark]');
  const chars = bigmark ? Array.from(bigmark.querySelectorAll<HTMLElement>('.bigmark-ch')) : [];
  const ctaSurface = document.querySelector<HTMLElement>('[data-cta-surface]');

  if (reducedMotionQuery.matches) return;

  let raf = 0;
  const update = () => {
    raf = 0;
    const vh = window.innerHeight || 1;

    if (bigmark && chars.length) {
      const rect = bigmark.getBoundingClientRect();
      // Progress 0 as top enters bottom of screen, 1 when bottom reaches viewport bottom
      const span = Math.max(1, rect.height);
      const raw = clamp((vh - rect.top) / (span + 40), 0, 1);
      chars.forEach((ch, idx) => {
        const staggerStart = (idx / chars.length) * 0.38;
        const local = clamp((raw - staggerStart) / (1 - staggerStart), 0, 1);
        const y = (1 - local) * 102;
        ch.style.transform = `translate3d(0, ${y.toFixed(1)}%, 0)`;
      });
    }

    if (ctaSurface) {
      const rect = ctaSurface.getBoundingClientRect();
      const p = clamp((vh * 0.98 - rect.top) / (vh * 0.52), 0, 1);
      const scale = 0.93 + p * 0.07;
      const radius = 34 - p * 18;
      ctaSurface.style.transform = `scale(${scale.toFixed(4)})`;
      ctaSurface.style.borderRadius = `${radius.toFixed(1)}px`;
    }
  };

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  update();
}

initNavigation();
initContactSurface();
initFooterWordmarkAndCtaUnfold();

export {};
