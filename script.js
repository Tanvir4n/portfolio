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
  '06': `@article{hasan2026lightbloodnet,
  author  = {Hasan, Md. Tanvir and others},
  title   = {Light-BloodNet: An Efficient Attention-Guided Deep Learning Framework with Explainability for Blood Cell Classification},
  journal = {Forthcoming},
  year    = {2026},
  note    = {Accepted}
}`,
  '07': `@article{hasan2026braindistill,
  author  = {Hasan, Md. Tanvir and others},
  title   = {BrainDistill: Explainable Multi-Scale Knowledge Distillation with Uncertainty-Aware Inference for Efficient Brain Tumor MRI Classification},
  journal = {Forthcoming},
  year    = {2026},
  note    = {Accepted}
}`,
  '08': `@article{hasan2026glioma,
  author  = {Hasan, Md. Tanvir and others},
  title   = {Interpretable Cross-Modal Evidential Learning for Calibrated Few-Shot Glioma Slice Classification},
  journal = {Under review / Q1 journal},
  year    = {2026},
  note    = {Under review}
}`,
  '09': `@article{hasan2026pmos,
  author  = {Hasan, Md. Tanvir and others},
  title   = {DenseViT-PMOSNet: An Interpretable Hybrid CNN–Vision Transformer Framework for Clinical PMOS Classification},
  journal = {Submitted / Under review},
  year    = {2026},
  note    = {Submitted}
}`,
  '10': `@article{hasan2026dermavit,
  author  = {Hasan, Md. Tanvir and others},
  title   = {DermaViT-XAI: An Empirical Study of Vision Transformers and CNNs for Explainable Multi-Class Skin Disease Classification from Dermatological Images},
  journal = {Submitted / Under review},
  year    = {2026},
  note    = {Submitted}
}`,
  '11': `@article{hasan2026cervixnet,
  author  = {Hasan, Md. Tanvir and others},
  title   = {EffiViT-CervixNet: An Explainable Hybrid CNN–Vision Transformer Framework for Cervical Cancer Screening Using Pap-Smear Images},
  journal = {Submitted / Under review},
  year    = {2026},
  note    = {Submitted}
}`,
  '12': `@article{hasan2026ricenet,
  author  = {Hasan, Md. Tanvir and others},
  title   = {EffiViT-RiceNet: A Hybrid Vision Transformer Framework for Explainable Classification of Rice Leaf Diseases},
  journal = {Submitted / Under review},
  year    = {2026},
  note    = {Submitted}
}`,
  '13': `@misc{hasan2026pumamil,
  author       = {Hasan, Md. Tanvir and others},
  title        = {PUMA-MIL: Prototype-Updated Multi-Modal Attention-Based Multiple Instance Learning for Slice-Level Brain Tumor Detection on Multi-Sequence MRI},
  howpublished = {Ongoing investigation},
  year         = {2026}
}`,
  '14': `@misc{hasan2026pqcblockchain,
  author       = {Hasan, Md. Tanvir and others},
  title        = {A Secure and Scalable Hybrid Classical–Post-Quantum Cryptographic Framework for Quantum-Resilient Blockchain Systems},
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

