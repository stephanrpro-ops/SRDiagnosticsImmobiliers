(function () {
  const root = typeof window !== 'undefined' ? window : globalThis;

  root.CONSENT_CONFIG = {
    CONSENT_VERSION: '2026-03-01',
    STORAGE_KEY: 'consent_status',
    REVALIDATE_AFTER_DAYS: 183,
    categories: {
      essential: {
        label: 'Essentiels',
        required: true,
        description: 'Nécessaires au bon fonctionnement du site (sécurité, préférences, navigation).'
      },
      analytics: {
        label: 'Mesure d’audience / Analytics',
        description: 'Permettent de mesurer la fréquentation du site pour améliorer les contenus.'
      },
      marketing: {
        label: 'Marketing / Publicité',
        description: 'Permettent de personnaliser les campagnes et la publicité.'
      },
      social: {
        label: 'Réseaux sociaux / Contenus externes',
        description: 'Permettent d’afficher des contenus tiers (vidéos, widgets sociaux, cartes intégrées).'
      }
    },
    services: {
      analytics: [
        {
          id: 'ga4',
          name: 'Google Analytics 4 (exemple)',
          description: 'Mesure d’audience (à activer uniquement avec votre identifiant réel).',
          init: function () {
            const measurementId = 'G-XXXXXXXXXX';
            if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
              return;
            }

            if (window.__ga4Loaded) {
              return;
            }
            window.__ga4Loaded = true;

            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
              window.dataLayer.push(arguments);
            };
            window.gtag('js', new Date());
            window.gtag('config', measurementId, { anonymize_ip: true });

            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
            script.setAttribute('data-consent-service', 'ga4');
            document.head.appendChild(script);
          }
        }
      ],
      marketing: [],
      social: []
    }
  };
})();
