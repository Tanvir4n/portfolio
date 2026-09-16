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

const MAX_VISIBLE_PAPERS = 10;
let isPublicationsExpanded = false;
const publicationsMoreWrap = document.getElementById('publications-more-wrap');
const seeMoreButton = document.getElementById('see-more-pub');

const updatePublicationsDisplay = () => {
  const activeBtn = document.querySelector('.filter-button.active');
  const selectedFilter = activeBtn ? activeBtn.dataset.filter : 'all';

  const matchingPublications = [];
  publications.forEach((pub) => {
    const matches = selectedFilter === 'all' || pub.dataset.category === selectedFilter;
    if (matches) {
      matchingPublications.push(pub);
    } else {
      pub.classList.add('hidden');
    }
  });

  const totalMatching = matchingPublications.length;

  if (totalMatching <= MAX_VISIBLE_PAPERS) {
    matchingPublications.forEach((pub) => pub.classList.remove('hidden'));
    if (publicationsMoreWrap) {
      publicationsMoreWrap.style.display = 'none';
    }
  } else {
    if (publicationsMoreWrap) {
      publicationsMoreWrap.style.display = 'flex';
    }

    if (isPublicationsExpanded) {
      matchingPublications.forEach((pub) => pub.classList.remove('hidden'));
      if (seeMoreButton) {
        seeMoreButton.innerHTML = 'See less papers <span class="see-more-arrow">↑</span>';
        seeMoreButton.setAttribute('aria-expanded', 'true');
      }
    } else {
      matchingPublications.forEach((pub, index) => {
        if (index < MAX_VISIBLE_PAPERS) {
          pub.classList.remove('hidden');
        } else {
          pub.classList.add('hidden');
        }
      });

      const remaining = totalMatching - MAX_VISIBLE_PAPERS;
      if (seeMoreButton) {
        seeMoreButton.innerHTML = `See more papers <span class="see-more-count">(${remaining} remaining)</span> <span class="see-more-arrow">↓</span>`;
        seeMoreButton.setAttribute('aria-expanded', 'false');
      }
    }
  }
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    isPublicationsExpanded = false;
    updatePublicationsDisplay();
  });
});

if (seeMoreButton) {
  seeMoreButton.addEventListener('click', () => {
    isPublicationsExpanded = !isPublicationsExpanded;
    updatePublicationsDisplay();

    if (!isPublicationsExpanded) {
      const writingSection = document.getElementById('writing');
      if (writingSection) {
        writingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

updatePublicationsDisplay();

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
