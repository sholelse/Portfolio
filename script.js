// header scroll state
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  // size all swatch fills to one uniform height — tall enough for the tallest title
  function sizeSwatchFills(){
    const grid = document.querySelector('.swatch-grid');
    if (!grid) return;
    const swatches = document.querySelectorAll('.swatch');
    let maxH = 0;
    swatches.forEach(swatch => {
      const bottom = swatch.querySelector('.swatch-bottom');
      if (!bottom) return;
      // offsetHeight naturally excludes the hidden paragraph (max-height:0 when not hovered)
      maxH = Math.max(maxH, bottom.offsetHeight);
    });
    grid.style.setProperty('--fill-h', maxH + 'px');
  }
  function debounce(fn, wait){
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
  }
  window.addEventListener('load', sizeSwatchFills);
  window.addEventListener('resize', debounce(sizeSwatchFills, 150));
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(sizeSwatchFills); // re-measure once Fraunces/Inter finish loading
  }

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
