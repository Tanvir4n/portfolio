const filterButtons = document.querySelectorAll('.filter-button');
const publications = document.querySelectorAll('.publication');
const heroTitleWrap = document.querySelector('.hero-title-wrap');
const heroTags = document.querySelectorAll('.hero-tag');

if (heroTitleWrap && heroTags.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const animateHeroTags = () => {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    heroTags.forEach((tag) => {
      const depth = Number(tag.dataset.depth) || 1;
      tag.style.setProperty('--cursor-x', `${currentX * depth}px`);
      tag.style.setProperty('--cursor-y', `${currentY * depth}px`);
    });
    window.requestAnimationFrame(animateHeroTags);
  };

  heroTitleWrap.addEventListener('pointermove', (event) => {
    const bounds = heroTitleWrap.getBoundingClientRect();
    targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
    targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 14;
  });

  heroTitleWrap.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
  });

  animateHeroTags();
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    publications.forEach((publication) => {
      const matches = selectedFilter === 'all' || publication.dataset.category === selectedFilter;
      publication.classList.toggle('hidden', !matches);
    });
  });
});

const copyButton = document.querySelector('.copy-email');
const toast = document.querySelector('.toast');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const themeLabel = themeToggle.querySelector('.theme-label');

const updateThemeToggle = () => {
  const isDark = document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeIcon.textContent = isDark ? '☾' : '☼';
  themeLabel.textContent = isDark ? 'dark' : 'light';
};

updateThemeToggle();

themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem('theme', nextTheme);
  updateThemeToggle();
});

copyButton.addEventListener('click', async () => {
  const email = copyButton.dataset.email;

  try {
    await navigator.clipboard.writeText(email);
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 2200);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});
