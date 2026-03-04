(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const encode = (data) =>
    Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      });

      if (!response.ok) {
        throw new Error(`Netlify Forms error: ${response.status}`);
      }

      window.location.href = form.getAttribute('action') || '/merci.html';
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue lors de l’envoi. Merci de réessayer.');
    }
  });
})();
