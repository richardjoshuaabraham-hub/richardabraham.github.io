
(() => {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  const media = lb.querySelector('.lb-media');
  const caption = lb.querySelector('.lb-caption');
  const btnClose = lb.querySelector('.lb-close');
  const btnPrev = lb.querySelector('.lb-prev');
  const btnNext = lb.querySelector('.lb-next');

  // Collect project images (links we wrapped)
  const links = Array.from(document.querySelectorAll('a.lb-link'));
  const items = links
    .map(a => a.querySelector('img.lb-img'))
    .filter(Boolean);

  let idx = -1;

  const openAt = (i) => {
    idx = (i + items.length) % items.length;
    const img = items[idx];
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt') || 'Project image';
    media.setAttribute('src', src);
    media.setAttribute('alt', alt);
    caption.textContent = alt;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    media.removeAttribute('src');
    document.body.style.overflow = '';
  };

  const prev = () => openAt(idx - 1);
  const next = () => openAt(idx + 1);

  links.forEach((a, i) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      openAt(i);
    });
  });

  // Keyboard accessibility: Enter/Space on image
  items.forEach((img, i) => {
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openAt(i);
      }
    });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  // Click outside image to close
  lb.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();
