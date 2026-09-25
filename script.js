const filterButtons = document.querySelectorAll('.filter-button');
const publications = document.querySelectorAll('.publication');
const heroTitleWrap = document.querySelector('.hero-title-wrap');
const heroTags = document.querySelectorAll('.hero-tag');
const writingTitleWrap = document.querySelector('.writing-title-wrap');
const writingTags = document.querySelectorAll('.writing-tag');

function setupParallaxTags(wrapEl, tags) {
  if (!wrapEl || !tags.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const animate = () => {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    tags.forEach((tag) => {
      const depth = Number(tag.dataset.depth) || 1;
      tag.style.setProperty('--cursor-x', `${currentX * depth}px`);
      tag.style.setProperty('--cursor-y', `${currentY * depth}px`);
    });
    window.requestAnimationFrame(animate);
  };

  wrapEl.addEventListener('pointermove', (event) => {
    const bounds = wrapEl.getBoundingClientRect();
    targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
    targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 14;
  });

  wrapEl.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
  });

  animate();
}

setupParallaxTags(heroTitleWrap, heroTags);
setupParallaxTags(writingTitleWrap, writingTags);

const MAX_VISIBLE_PAPERS = 10;
let isPublicationsExpanded = false;
const publicationsMoreWrap = document.getElementById('publications-more-wrap');
const seeMoreButton = document.getElementById('see-more-pub');
const PIXEL_ARROW_SVG = '<svg class="pixel-arrow pixel-arrow-orange" viewBox="0 0 90 90" aria-hidden="true"><g fill="currentColor" stroke="rgba(255,255,255,0.35)" stroke-width="0.8"><polygon points="10,10 20,20 10,30 0,20"/><polygon points="30,10 40,20 30,30 20,20"/><polygon points="50,10 60,20 50,30 40,20"/><polygon points="70,30 80,40 70,50 60,40"/><polygon points="70,50 80,60 70,70 60,60"/><polygon points="70,70 80,80 70,90 60,80"/><polygon points="80,0 90,10 80,20 70,10"/><polygon points="70,10 80,20 70,30 60,20"/><polygon points="60,20 70,30 60,40 50,30"/><polygon points="50,30 60,40 50,50 40,40"/><polygon points="40,40 50,50 40,60 30,50"/><polygon points="30,50 40,60 30,70 20,60"/><polygon points="20,60 30,70 20,80 10,70"/><polygon points="10,70 20,80 10,90 0,80"/></g></svg>';

// Local search and filter controls
const searchInput = document.getElementById('publication-search-input');
const searchClearBtn = document.getElementById('publication-search-clear');
const searchCountBadge = document.getElementById('publication-search-count');
const publicationsEmpty = document.getElementById('publications-empty');
const emptyQueryTarget = document.getElementById('empty-query-target');
const emptyCategoryNote = document.getElementById('empty-category-note');
const emptyClearBtn = document.getElementById('empty-clear-btn');
const emptyAllBtn = document.getElementById('empty-all-btn');

const categoryKeywordMap = {
  vision: ['vision', 'xai', 'explainable', 'computer vision', 'cnn', 'vit', 'transformer', 'image', 'ultrasound', 'mri', 'medical', 'brain', 'blood', 'skin', 'pap-smear', 'cervix', 'cervical', 'rice', 'cactus', 'tumor', 'glioma', 'pmos', 'stylegan'],
  data: ['data', 'data paper', 'data papers', 'dental', 'panoramic'],
  dataset: ['dataset', 'datasets', 'mendeley', 'mendeley data', 'yolo', 'labels', 'radiograph', 'mopg'],
  security: ['security', 'cryptography', 'quantum', 'post-quantum', 'blockchain', 'injection', 'pqc', 'keystroke', 'usb'],
  systems: ['systems', 'solar', 'net metering', 'photovoltaics', 'renewable', 'energy', 'diu', 'cost-benefit']
};

const checkPaperMatchesSearch = (pub, tokens) => {
  if (!tokens || tokens.length === 0) return true;

  const title = (pub.querySelector('h3')?.textContent || '').toLowerCase();
  const venue = (pub.querySelector('p')?.textContent || '').toLowerCase();
  const state = (pub.querySelector('.pub-state')?.textContent || '').toLowerCase();
  const cat = (pub.dataset.category || '').toLowerCase();
  const catSynonyms = categoryKeywordMap[cat] || [];
  const searchable = `${title} ${venue} ${state} ${cat} ${catSynonyms.join(' ')}`;

  return tokens.every((token) => searchable.includes(token));
};

const updatePublicationsDisplay = () => {
  const activeBtn = document.querySelector('.filter-button.active');
  const selectedFilter = activeBtn ? activeBtn.dataset.filter : 'all';
  const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
  const tokens = query.split(/\s+/).filter(Boolean);

  // Toggle clear button
  if (searchClearBtn) {
    searchClearBtn.style.display = query.length > 0 ? 'inline-flex' : 'none';
  }

  const matchingPublications = [];
  let totalMatchesAcrossAll = 0;

  publications.forEach((pub) => {
    const matchesSearch = checkPaperMatchesSearch(pub, tokens);
    if (matchesSearch) {
      totalMatchesAcrossAll++;
    }

    const matchesCategory = selectedFilter === 'all' || pub.dataset.category === selectedFilter;
    if (matchesCategory && matchesSearch) {
      matchingPublications.push(pub);
    } else {
      pub.classList.add('hidden');
    }
  });

  const totalMatching = matchingPublications.length;

  // Update live count badge
  if (searchCountBadge) {
    if (tokens.length > 0) {
      if (selectedFilter !== 'all') {
        searchCountBadge.textContent = `${totalMatching} in ${selectedFilter}`;
      } else {
        searchCountBadge.textContent = `${totalMatching} / ${publications.length} papers`;
      }
    } else {
      if (selectedFilter !== 'all') {
        const catLabel = activeBtn ? activeBtn.textContent.replace(/\d+$/, '').trim() : selectedFilter;
        searchCountBadge.textContent = `${totalMatching} ${catLabel}`;
      } else {
        searchCountBadge.textContent = `${publications.length} papers`;
      }
    }
  }

  // Handle empty state
  if (publicationsEmpty) {
    if (totalMatching === 0) {
      publicationsEmpty.style.display = 'flex';
      if (emptyQueryTarget) {
        emptyQueryTarget.textContent = query || selectedFilter;
      }
      if (emptyCategoryNote) {
        if (selectedFilter !== 'all') {
          emptyCategoryNote.textContent = ` in category "${selectedFilter}"`;
        } else {
          emptyCategoryNote.textContent = '';
        }
      }
      if (emptyAllBtn) {
        if (selectedFilter !== 'all' && totalMatchesAcrossAll > 0) {
          emptyAllBtn.style.display = 'inline-flex';
          emptyAllBtn.textContent = `Search all categories (${totalMatchesAcrossAll} match${totalMatchesAcrossAll === 1 ? '' : 'es'})`;
        } else {
          emptyAllBtn.style.display = 'none';
        }
      }
    } else {
      publicationsEmpty.style.display = 'none';
    }
  }

  // Handle pagination / "See more"
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
        seeMoreButton.innerHTML = `See less papers <span class="see-more-arrow">${PIXEL_ARROW_SVG}</span>`;
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
        seeMoreButton.innerHTML = `See more papers <span class="see-more-count">(${remaining} remaining)</span> <span class="see-more-arrow">${PIXEL_ARROW_SVG}</span>`;
        seeMoreButton.setAttribute('aria-expanded', 'false');
      }
    }
  }
};

if (searchInput) {
  searchInput.addEventListener('input', () => {
    isPublicationsExpanded = false;
    updatePublicationsDisplay();
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      updatePublicationsDisplay();
    }
  });
}

if (searchClearBtn) {
  searchClearBtn.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    updatePublicationsDisplay();
  });
}

if (emptyClearBtn) {
  emptyClearBtn.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    updatePublicationsDisplay();
  });
}

if (emptyAllBtn) {
  emptyAllBtn.addEventListener('click', () => {
    const allBtn = document.querySelector('.filter-button[data-filter="all"]');
    if (allBtn) {
      allBtn.click();
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    isPublicationsExpanded = false;
    updatePublicationsDisplay();
  });
});

document.querySelectorAll('.pub-tag').forEach((tag) => {
  tag.addEventListener('click', (e) => {
    e.stopPropagation();
    const targetFilter = tag.dataset.tagFilter;
    if (!targetFilter) return;

    const targetBtn = document.querySelector(`.filter-button[data-filter="${targetFilter}"]`);
    if (targetBtn) {
      targetBtn.click();
      const pubSearchBar = document.getElementById('publication-search-bar');
      if (pubSearchBar) {
        pubSearchBar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
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

let toastTimer = null;
const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 2300);
};

const copyToClipboard = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Continue to textarea fallback
    }
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  textArea.setAttribute('readonly', '');
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  let successful = false;
  try {
    successful = document.execCommand('copy');
  } catch {
    successful = false;
  }
  document.body.removeChild(textArea);
  return successful;
};

const bibtexDatabase = {
  '01': `@incollection{hasan2025comparative,
  author    = {Hasan, Md. Tanvir and others},
  title     = {Comparative Evaluation of Deep CNN Models with Explainable AI for Accurate Breast Tumor Segmentation and Classification in Ultrasound},
  booktitle = {Intelligent Data Analytics and Applications (IDAA 2025)},
  publisher = {Taylor & Francis},
  year      = {2025}
}`,
  '02': `@article{hasan2024casestudy,
  author    = {Hasan, Md. Tanvir and others},
  title     = {A Case Study Conducted At DIU In Bangladesh Examines The Cost-Benefit Analysis And Viability Of Installing A Net Metering System Alongside Rooftop Solar Photovoltaics},
  journal   = {International Journal of Computer Applications},
  volume    = {187},
  number    = {100},
  year      = {2024},
  publisher = {Foundation of Computer Science (FCS), NY, USA},
  url       = {https://www.ijcaonline.org/archives/volume187/number100/a-case-study-conducted-at-diu-in-bangladesh-examines-the-cost-benefit-analysis-and-viability-of-installing-a-net-metering-system-alongside-rooftop-solar-photovoltaics/}
}`,
  '03': `@inproceedings{hasan2025cactus,
  author    = {Hasan, Md. Tanvir and others},
  title     = {Sample-Efficient Fine-Grained Classification of Cactus Species Using Hybrid Vision Transformers and Knowledge Distillation},
  booktitle = {2025 28th International Conference on Computer and Information Technology (ICCIT)},
  publisher = {IEEE},
  year      = {2025},
  url       = {https://ieeexplore.ieee.org/document/11491549}
}`,
  '04': `@inproceedings{hasan2026alzheimers,
  author    = {Hasan, Md. Tanvir and others},
  title     = {Optimizing Transfer Learning: A Deep Learning Approach for High-Accuracy Classification of Alzheimer’s Disease Stages},
  booktitle = {2026 International Conference on Artificial Intelligence and Sustainable Energy Innovations (AISEI)},
  publisher = {IEEE},
  year      = {2026},
  url       = {https://ieeexplore.ieee.org/document/11572889}
}`,
  '05': `@misc{hasan2026mopg7,
  author       = {Hasan, Md. Tanvir and others},
  title        = {MOPG-7: A Multi-Clinic Dental Panoramic Radiograph Dataset with Expert YOLO Labels},
  howpublished = {Mendeley Data},
  year         = {2026},
  url          = {https://data.mendeley.com/datasets/t66ytdrhf2/1}
}`,
  '06': `@article{hasan2026dentaldatapaper,
  author  = {Hasan, Md. Tanvir and others},
  title   = {A Multi-Clinic Dental Panoramic Radiograph Dataset with Expert Labels for Six Conditions and Healthy Cases},
  journal = {Data Paper},
  year    = {2026},
  note    = {Data Paper}
}`,
  '07': `@article{hasan2026lightbloodnet,
  author  = {Hasan, Md. Tanvir and others},
  title   = {Light-BloodNet: An Efficient Attention-Guided Deep Learning Framework with Explainability for Blood Cell Classification},
  journal = {Forthcoming},
  year    = {2026},
  note    = {Accepted}
}`,
  '08': `@article{hasan2026braindistill,
  author  = {Hasan, Md. Tanvir and others},
  title   = {BrainDistill: Explainable Multi-Scale Knowledge Distillation with Uncertainty-Aware Inference for Efficient Brain Tumor MRI Classification},
  journal = {Forthcoming},
  year    = {2026},
  note    = {Accepted}
}`,
  '09': `@article{hasan2026glioma,
  author  = {Hasan, Md. Tanvir and others},
  title   = {Interpretable Cross-Modal Evidential Learning for Calibrated Few-Shot Glioma Slice Classification},
  journal = {Under review / Q1 journal},
  year    = {2026},
  note    = {Under review}
}`,
  '10': `@article{hasan2026pmos,
  author  = {Hasan, Md. Tanvir and others},
  title   = {DenseViT-PMOSNet: An Interpretable Hybrid CNN–Vision Transformer Framework for Clinical PMOS Classification},
  journal = {Submitted / Under review},
  year    = {2026},
  note    = {Submitted}
}`,
  '11': `@article{hasan2026dermavit,
  author  = {Hasan, Md. Tanvir and others},
  title   = {DermaViT-XAI: An Empirical Study of Vision Transformers and CNNs for Explainable Multi-Class Skin Disease Classification from Dermatological Images},
  journal = {Submitted / Under review},
  year    = {2026},
  note    = {Submitted}
}`,
  '12': `@article{hasan2026cervixnet,
  author  = {Hasan, Md. Tanvir and others},
  title   = {EffiViT-CervixNet: An Explainable Hybrid CNN–Vision Transformer Framework for Cervical Cancer Screening Using Pap-Smear Images},
  journal = {Submitted / Under review},
  year    = {2026},
  note    = {Submitted}
}`,
  '13': `@article{hasan2026ricenet,
  author  = {Hasan, Md. Tanvir and others},
  title   = {EffiViT-RiceNet: A Hybrid Vision Transformer Framework for Explainable Classification of Rice Leaf Diseases},
  journal = {Submitted / Under review},
  year    = {2026},
  note    = {Submitted}
}`,
  '14': `@misc{hasan2026pumamil,
  author       = {Hasan, Md. Tanvir and others},
  title        = {PUMA-MIL: Prototype-Updated Multi-Modal Attention-Based Multiple Instance Learning for Slice-Level Brain Tumor Detection on Multi-Sequence MRI},
  howpublished = {Ongoing investigation},
  year         = {2026}
}`,
  '15': `@misc{hasan2026pqcblockchain,
  author       = {Hasan, Md. Tanvir and others},
  title        = {A Secure and Scalable Hybrid Classical–Post-Quantum Cryptographic Framework for Quantum-Resilient Blockchain Systems},
  howpublished = {Ongoing investigation},
  year         = {2026}
}`,
  '16': `@misc{hasan2026stylegan2ada,
  author       = {Hasan, Md. Tanvir and others},
  title        = {StyleGAN2-ADA-Driven Synthetic MRI Augmentation for Architecture-Aware Brain Tumor Classification with Hybrid CNN–Vision Transformers},
  howpublished = {Ongoing investigation},
  year         = {2026}
}`
};

const bibtexButtons = document.querySelectorAll('.bibtex-button');
bibtexButtons.forEach((btn) => {
  btn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const bibId = btn.dataset.bibId;
    const citation = bibtexDatabase[bibId];

    if (!citation) return;

    const success = await copyToClipboard(citation);

    if (success) {
      btn.classList.add('copied');
      const textSpan = btn.querySelector('.bibtex-btn-text');
      const originalText = textSpan ? textSpan.textContent : 'Export BibTeX';
      if (textSpan) {
        textSpan.textContent = 'Copied! ✓';
      }

      showToast(`BibTeX citation [${bibId}] copied to clipboard`);

      window.setTimeout(() => {
        btn.classList.remove('copied');
        if (textSpan) {
          textSpan.textContent = originalText;
        }
      }, 2000);
    } else {
      showToast('Unable to copy citation automatically');
    }
  });
});

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

if (copyButton) {
  copyButton.addEventListener('click', async () => {
    const email = copyButton.dataset.email;
    const success = await copyToClipboard(email);
    if (success) {
      showToast('Email copied to clipboard');
    } else {
      window.location.href = `mailto:${email}`;
    }
  });
}

// Gentle fade-in animation for all sections on scroll using Intersection Observer
const setupSectionFadeObserver = () => {
  const sections = document.querySelectorAll('section');
  if (!sections.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fallback if IntersectionObserver is not supported or user prefers reduced motion
  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    sections.forEach((section) => {
      section.classList.add('is-visible');
    });
    return;
  }

  // Initialize all sections with the fade-section base class
  sections.forEach((section) => {
    section.classList.add('fade-section');
  });

  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
};

setupSectionFadeObserver();

// Responsive mobile navigation menu toggle (< 800px)
const setupMobileNavigation = () => {
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('primary-navigation') || document.querySelector('.nav-links');
  if (!mobileNavToggle || !navLinks) return;

  const mobileNavText = mobileNavToggle.querySelector('.mobile-nav-text');

  const openMobileMenu = () => {
    mobileNavToggle.setAttribute('aria-expanded', 'true');
    mobileNavToggle.setAttribute('aria-label', 'Close navigation menu');
    navLinks.classList.add('is-open');
    if (mobileNavText) {
      mobileNavText.textContent = 'close';
    }
  };

  const closeMobileMenu = () => {
    mobileNavToggle.setAttribute('aria-expanded', 'false');
    mobileNavToggle.setAttribute('aria-label', 'Open navigation menu');
    navLinks.classList.remove('is-open');
    if (mobileNavText) {
      mobileNavText.textContent = 'menu';
    }
  };

  const toggleMobileMenu = (event) => {
    event.stopPropagation();
    const isOpen = mobileNavToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  mobileNavToggle.addEventListener('click', toggleMobileMenu);

  // Close when clicking any navigation link
  const links = navLinks.querySelectorAll('a');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 800) {
        closeMobileMenu();
      }
    });
  });

  // Close when clicking outside of the header/navigation
  document.addEventListener('click', (event) => {
    if (mobileNavToggle.getAttribute('aria-expanded') === 'true') {
      const isInside = navLinks.contains(event.target) || mobileNavToggle.contains(event.target);
      if (!isInside) {
        closeMobileMenu();
      }
    }
  });

  // Close on Escape key press and return focus to the toggle
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileNavToggle.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
      mobileNavToggle.focus();
    }
  });

  // Clean up states when window is resized above 800px
  window.addEventListener('resize', () => {
    if (window.innerWidth > 800 && mobileNavToggle.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
    }
  });
};

setupMobileNavigation();

// Scroll-to-top button handling with dynamic footer clearance
const setupScrollToTop = () => {
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  const heroSection = document.querySelector('.hero');
  const footer = document.querySelector('footer');
  if (!scrollToTopBtn || !heroSection) return;

  const updateVisibilityAndClearance = () => {
    const heroRect = heroSection.getBoundingClientRect();
    // Appears when the user has scrolled down past the hero section
    const isPastHero = heroRect.bottom <= 0;
    if (isPastHero) {
      scrollToTopBtn.classList.add('is-visible');
    } else {
      scrollToTopBtn.classList.remove('is-visible');
    }

    // Dynamic clearance calculation so button never overlaps footer or contact button
    const viewportHeight = window.innerHeight;
    const isMobile = window.innerWidth <= 480;
    const defaultBottom = isMobile ? 18 : 28;
    const clearance = 16;
    let requiredBottom = defaultBottom;

    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const footerTopFromBottom = viewportHeight - footerRect.top;
      if (footerTopFromBottom > 0) {
        requiredBottom = Math.max(requiredBottom, footerTopFromBottom + clearance);
      }
    }

    // Also avoid overlapping the "START A CONVERSATION" button if it is in view
    const contactBtn = document.querySelector('.contact-button');
    if (contactBtn) {
      const btnRect = contactBtn.getBoundingClientRect();
      const btnTopFromBottom = viewportHeight - btnRect.top;
      const btnBottomFromBottom = viewportHeight - btnRect.bottom;
      const btnRight = btnRect.right;
      const btnLeft = btnRect.left;
      const scrollBtnWidth = scrollToTopBtn.offsetWidth || 50;
      const scrollBtnRightEdge = window.innerWidth - (isMobile ? 14 : 28);
      const scrollBtnLeftEdge = scrollBtnRightEdge - scrollBtnWidth;

      // Check horizontal collision range
      const isHorizontallyOverlapping = btnRight >= scrollBtnLeftEdge && btnLeft <= scrollBtnRightEdge;
      if (isHorizontallyOverlapping && btnTopFromBottom > 0 && btnBottomFromBottom < defaultBottom + 40) {
        requiredBottom = Math.max(requiredBottom, btnTopFromBottom + clearance);
      }
    }

    scrollToTopBtn.style.setProperty('--scroll-btn-bottom', `${Math.round(requiredBottom)}px`);
  };

  // Smooth scroll back to the top of the page on click
  scrollToTopBtn.addEventListener('click', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  });

  // IntersectionObserver for efficient viewport monitoring of hero section
  if ('IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            scrollToTopBtn.classList.add('is-visible');
          } else if (entry.isIntersecting || entry.boundingClientRect.top >= 0) {
            scrollToTopBtn.classList.remove('is-visible');
          }
        });
      },
      {
        root: null,
        threshold: 0,
      }
    );
    heroObserver.observe(heroSection);
  }

  // Passive scroll listener backed by requestAnimationFrame for rapid responsiveness
  let scrollTicking = false;
  const onScroll = () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateVisibilityAndClearance();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Initial check on page load
  updateVisibilityAndClearance();
};

setupScrollToTop();


