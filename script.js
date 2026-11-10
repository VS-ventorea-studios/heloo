const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const parallaxItems = document.querySelectorAll('[data-parallax]');
const parallax = () => {
  parallaxItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const speed = Number(item.dataset.parallax || 0.1);
    const offset = (window.innerHeight - rect.top) * speed * 0.18;
    item.style.transform = 'translate3d(0, ' + offset + 'px, 0)';
  });
};

window.addEventListener('scroll', parallax, { passive: true });
window.addEventListener('load', parallax);

let scrollShakeTimeout;
window.addEventListener(
  'scroll',
  () => {
    document.body.classList.add('is-scrolling');
    window.clearTimeout(scrollShakeTimeout);
    scrollShakeTimeout = window.setTimeout(() => {
      document.body.classList.remove('is-scrolling');
    }, 140);
  },
  { passive: true }
);

const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('pointermove', (event) => {
    const { innerWidth, innerHeight } = window;
    const offsetX = (event.clientX / innerWidth - 0.5) * 12;
    const offsetY = (event.clientY / innerHeight - 0.5) * 12;

    const cupScene = document.querySelector('.cup-scene');
    if (cupScene) {
      cupScene.style.transform = 'rotateX(' + (12 - offsetY) + 'deg) rotateY(' + (offsetX - 10) + 'deg) translateY(' + (-offsetY * 1.2) + 'px)';
    }

    const floatingTags = document.querySelectorAll('.floating-tag');
    floatingTags.forEach((tag, index) => {
      const float = index === 0 ? 8 : -8;
      tag.style.transform = 'translate(' + (offsetX * 2.2) + 'px, ' + (offsetY * (index === 0 ? 1.8 : 1.4) + float) + 'px)';
    });
  });

  hero.addEventListener('pointerleave', () => {
    const cupScene = document.querySelector('.cup-scene');
    if (cupScene) {
      cupScene.style.transform = 'rotateX(12deg) rotateY(-10deg)';
    }

    document.querySelectorAll('.floating-tag').forEach((tag) => {
      tag.style.transform = '';
    });
  });
}
