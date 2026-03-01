(function () {
  'use strict';

  const config = window.CONSENT_CONFIG;
  if (!config) {
    return;
  }

  const STORAGE_KEY = config.STORAGE_KEY || 'consent_status';
  const VERSION = config.CONSENT_VERSION || '1';
  const REVALIDATE_MS = (config.REVALIDATE_AFTER_DAYS || 183) * 24 * 60 * 60 * 1000;
  const OPTIONAL_CATEGORIES = ['analytics', 'marketing', 'social'];

  function now() {
    return Date.now();
  }

  function getStoredConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      return parsed;
    } catch (error) {
      return null;
    }
  }

  function isConsentValid(consent) {
    if (!consent) return false;
    if (consent.version !== VERSION) return false;
    if (!consent.timestamp || now() - consent.timestamp > REVALIDATE_MS) return false;
    return true;
  }

  function saveConsent(categories) {
    const normalized = {
      essential: true,
      analytics: !!categories.analytics,
      marketing: !!categories.marketing,
      social: !!categories.social
    };

    const payload = {
      version: VERSION,
      timestamp: now(),
      categories: normalized
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return payload;
  }

  function hasOptionalServices() {
    return OPTIONAL_CATEGORIES.some((category) => {
      const services = (config.services && config.services[category]) || [];
      return services.length > 0;
    });
  }

  function runServicesForCategory(category) {
    const services = (config.services && config.services[category]) || [];
    services.forEach((service) => {
      if (typeof service.init === 'function') {
        service.init();
      }
    });
  }

  function applyConsent(consent) {
    OPTIONAL_CATEGORIES.forEach((category) => {
      if (consent.categories && consent.categories[category]) {
        runServicesForCategory(category);
      }
    });
  }

  function createEl(tag, options) {
    const el = document.createElement(tag);
    if (options) {
      if (options.className) el.className = options.className;
      if (options.text) el.textContent = options.text;
      if (options.html) el.innerHTML = options.html;
      if (options.attrs) {
        Object.entries(options.attrs).forEach(([key, value]) => el.setAttribute(key, value));
      }
    }
    return el;
  }

  function trapFocus(modal, onEscape) {
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    function keyHandler(event) {
      if (event.key === 'Escape') {
        onEscape();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusables = modal.querySelectorAll(selectors);
      if (!focusables.length) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    modal.addEventListener('keydown', keyHandler);
    return () => modal.removeEventListener('keydown', keyHandler);
  }

  function ensureFooterLinks() {
    const footer = document.querySelector('footer') || createDefaultFooter();
    const legalLinks = [
      { href: 'mentions-legales.html', label: 'Mentions légales' },
      { href: 'politique-de-confidentialite.html', label: 'Politique de confidentialité' },
      { href: 'politique-cookies.html', label: 'Politique cookies' },
      { href: 'conditions-d-utilisation.html', label: 'Conditions d’utilisation' }
    ];

    let legalContainer = footer.querySelector('.footer-legal-links');
    if (!legalContainer) {
      legalContainer = createEl('p', { className: 'footer-legal-links' });
      footer.appendChild(legalContainer);
    }

    legalContainer.innerHTML = '';
    legalLinks.forEach((link, index) => {
      const anchor = createEl('a', { text: link.label, attrs: { href: link.href } });
      legalContainer.appendChild(anchor);
      if (index !== legalLinks.length - 1) {
        legalContainer.appendChild(document.createTextNode(' • '));
      }
    });

    let cookieContainer = footer.querySelector('.footer-cookie-links');
    if (!cookieContainer) {
      cookieContainer = createEl('p', { className: 'footer-cookie-links' });
      footer.appendChild(cookieContainer);
    }

    if (!footer.querySelector('[data-open-cookie-settings]')) {
      const button = createEl('button', {
        className: 'cookie-link-button',
        text: 'Gérer mes cookies',
        attrs: { type: 'button', 'data-open-cookie-settings': 'true' }
      });
      cookieContainer.appendChild(button);
    }

    footer.addEventListener('click', (event) => {
      const target = event.target;
      if (target && target.matches('[data-open-cookie-settings]')) {
        event.preventDefault();
        window.openCookieSettings();
      }
    });
  }

  function createDefaultFooter() {
    const footer = createEl('footer', { className: 'site-footer container' });
    footer.innerHTML = '<p>© ' + new Date().getFullYear() + ' SR Diagnostics Immobiliers</p>';
    document.body.appendChild(footer);
    return footer;
  }

  function initBanner(onAcceptAll, onRejectAll, onCustomize) {
    const banner = createEl('section', {
      className: 'cookie-banner',
      attrs: { role: 'dialog', 'aria-label': 'Gestion des cookies', 'aria-live': 'polite' }
    });

    banner.innerHTML =
      '<div class="cookie-banner__content">' +
      '<p class="cookie-banner__text">Nous utilisons des cookies essentiels et, avec votre accord, des cookies de mesure d’audience, marketing et contenus externes. <a href="politique-cookies.html">En savoir plus</a>.</p>' +
      '<div class="cookie-banner__actions">' +
      '<button type="button" class="cookie-btn" data-action="accept">Tout accepter</button>' +
      '<button type="button" class="cookie-btn" data-action="reject">Tout refuser</button>' +
      '<button type="button" class="cookie-btn" data-action="customize">Personnaliser</button>' +
      '</div>' +
      '</div>';

    banner.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      const action = button.getAttribute('data-action');
      if (action === 'accept') onAcceptAll();
      if (action === 'reject') onRejectAll();
      if (action === 'customize') onCustomize();
    });

    document.body.appendChild(banner);
    return banner;
  }

  function initModal(onSave) {
    const overlay = createEl('div', {
      className: 'cookie-modal-overlay',
      attrs: { hidden: 'true' }
    });

    overlay.innerHTML =
      '<div class="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">' +
      '<h2 id="cookie-modal-title">Personnaliser mes cookies</h2>' +
      '<p>Choisissez les catégories de cookies que vous souhaitez activer.</p>' +
      '<div class="cookie-modal__categories">' +
      '<label class="cookie-toggle cookie-toggle--fixed"><span><strong>Essentiels</strong><small>Toujours actifs</small></span><input type="checkbox" checked disabled></label>' +
      '<label class="cookie-toggle"><span><strong>Mesure d’audience / Analytics</strong><small>Amélioration des performances du site.</small></span><input type="checkbox" data-category="analytics"></label>' +
      '<label class="cookie-toggle"><span><strong>Marketing / Publicité</strong><small>Personnalisation et suivi des campagnes.</small></span><input type="checkbox" data-category="marketing"></label>' +
      '<label class="cookie-toggle"><span><strong>Réseaux sociaux / Contenus externes</strong><small>Affichage de contenus tiers.</small></span><input type="checkbox" data-category="social"></label>' +
      '</div>' +
      '<div class="cookie-modal__actions">' +
      '<button type="button" class="cookie-btn" data-modal-action="accept">Tout accepter</button>' +
      '<button type="button" class="cookie-btn" data-modal-action="reject">Tout refuser</button>' +
      '<button type="button" class="cookie-btn" data-modal-action="save">Enregistrer mes choix</button>' +
      '</div>' +
      '</div>';

    document.body.appendChild(overlay);

    const modal = overlay.querySelector('.cookie-modal');
    let lastFocused = null;
    let detachFocusTrap = null;

    function readChoices() {
      return {
        analytics: !!overlay.querySelector('[data-category="analytics"]').checked,
        marketing: !!overlay.querySelector('[data-category="marketing"]').checked,
        social: !!overlay.querySelector('[data-category="social"]').checked
      };
    }

    function writeChoices(choices) {
      OPTIONAL_CATEGORIES.forEach((category) => {
        const input = overlay.querySelector('[data-category="' + category + '"]');
        if (input) {
          input.checked = !!choices[category];
        }
      });
    }

    function close() {
      overlay.setAttribute('hidden', 'true');
      document.body.classList.remove('cookie-modal-open');
      if (detachFocusTrap) {
        detachFocusTrap();
        detachFocusTrap = null;
      }
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    function open(choices) {
      lastFocused = document.activeElement;
      writeChoices(choices || {});
      overlay.removeAttribute('hidden');
      document.body.classList.add('cookie-modal-open');
      detachFocusTrap = trapFocus(modal, close);
      const firstInput = overlay.querySelector('[data-category="analytics"]');
      if (firstInput) firstInput.focus();
    }

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        close();
        return;
      }
      const actionBtn = event.target.closest('button[data-modal-action]');
      if (!actionBtn) return;
      const action = actionBtn.getAttribute('data-modal-action');
      if (action === 'accept') {
        onSave({ analytics: true, marketing: true, social: true });
        close();
      }
      if (action === 'reject') {
        onSave({ analytics: false, marketing: false, social: false });
        close();
      }
      if (action === 'save') {
        onSave(readChoices());
        close();
      }
    });

    return { open, close };
  }

  function init() {
    ensureFooterLinks();

    const stored = getStoredConsent();
    if (isConsentValid(stored)) {
      applyConsent(stored);
    }

    const modalApi = initModal((choices) => {
      const saved = saveConsent(choices);
      applyConsent(saved);
      const banner = document.querySelector('.cookie-banner');
      if (banner) banner.remove();
    });

    window.openCookieSettings = function () {
      const current = getStoredConsent();
      modalApi.open((current && current.categories) || {});
    };

    if (!hasOptionalServices()) {
      return;
    }

    if (!isConsentValid(stored)) {
      initBanner(
        function acceptAll() {
          const saved = saveConsent({ analytics: true, marketing: true, social: true });
          applyConsent(saved);
          const banner = document.querySelector('.cookie-banner');
          if (banner) banner.remove();
        },
        function rejectAll() {
          saveConsent({ analytics: false, marketing: false, social: false });
          const banner = document.querySelector('.cookie-banner');
          if (banner) banner.remove();
        },
        function customize() {
          modalApi.open((stored && stored.categories) || {});
        }
      );
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
