// Curriculum Vitae Page JavaScript
// Matches portfolio functionality: theme toggle, mobile navigation, BibTeX copy, print, and copy-to-clipboard

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
  note    = {Under review}
}`,
  '07': `@article{hasan2026lightbloodnet,
  author  = {Hasan, Md. Tanvir and others},
  title   = {Light-BloodNet: An Efficient Attention-Guided Deep Learning Framework with Explainability for Blood Cell Classification},
  journal = {Medical & Biological Engineering & Computing},
  year    = {2026},
  note    = {Accepted / Forthcoming}
}`,
  '08': `@article{hasan2026braindistill,
  author  = {Hasan, Md. Tanvir and others},
  title   = {BrainDistill: Explainable Multi-Scale Knowledge Distillation with Uncertainty-Aware Inference for Efficient Brain Tumor MRI Classification},
  journal = {Computers in Biology and Medicine},
  year    = {2026},
  note    = {Accepted / Forthcoming}
}`,
  '09': `@article{hasan2026evidentialglioma,
  author  = {Hasan, Md. Tanvir and others},
  title   = {Interpretable Cross-Modal Evidential Learning for Calibrated Few-Shot Glioma Slice Classification},
  journal = {IEEE Transactions on Medical Imaging},
  year    = {2026},
  note    = {Under review / Q1 journal}
}`,
  '10': `@article{hasan2026densevitpmos,
  author  = {Hasan, Md. Tanvir and others},
  title   = {DenseViT-PMOSNet: An Interpretable Hybrid CNN-Vision Transformer Framework for Clinical PMOS Classification},
  journal = {Pattern Recognition Letters},
  year    = {2026},
  note    = {Submitted / Under review}
}`,
  '11': `@article{hasan2026dermavit,
  author  = {Hasan, Md. Tanvir and others},
  title   = {DermaViT-XAI: An Empirical Study of Vision Transformers and CNNs for Explainable Multi-Class Skin Disease Classification from Dermatological Images},
  journal = {Expert Systems with Applications},
  year    = {2026},
  note    = {Submitted / Under review}
}`,
  '12': `@article{hasan2026effivitcervix,
  author  = {Hasan, Md. Tanvir and others},
  title   = {EffiViT-CervixNet: An Explainable Hybrid CNN-Vision Transformer Framework for Cervical Cancer Screening Using Pap-Smear Images},
  journal = {Biomedical Signal Processing and Control},
  year    = {2026},
  note    = {Submitted / Under review}
}`,
  '13': `@article{hasan2026effivitrice,
  author  = {Hasan, Md. Tanvir and others},
  title   = {EffiViT-RiceNet: A Hybrid Vision Transformer Framework for Explainable Classification of Rice Leaf Diseases},
  journal = {Computers and Electronics in Agriculture},
  year    = {2026},
  note    = {Submitted / Under review}
}`,
  '14': `@article{hasan2026pumamil,
  author  = {Hasan, Md. Tanvir and others},
  title   = {PUMA-MIL: Prototype-Updated Multi-Modal Attention-Based Multiple Instance Learning for Slice-Level Brain Tumor Detection on Multi-Sequence MRI},
  journal = {Investigational Research Manuscript},
  year    = {2026},
  note    = {Ongoing investigation}
}`,
  '15': `@article{hasan2026quantumblockchain,
  author  = {Hasan, Md. Tanvir and others},
  title   = {A Secure and Scalable Hybrid Classical-Post-Quantum Cryptographic Framework for Quantum-Resilient Blockchain Systems},
  journal = {Investigational Research Manuscript},
  year    = {2026},
  note    = {Ongoing investigation}
}`,
  '16': `@article{hasan2026styleganmri,
  author  = {Hasan, Md. Tanvir and others},
  title   = {StyleGAN2-ADA-Driven Synthetic MRI Augmentation for Architecture-Aware Brain Tumor Classification with Hybrid CNN-Vision Transformers},
  journal = {Investigational Research Manuscript},
  year    = {2026},
  note    = {Ongoing investigation}
}`
};

// Toast notification helper
const toast = document.querySelector('.toast');
let toastTimer = null;
const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
};

// Clipboard fallback helper
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

// Theme toggle setup
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  const themeIcon = themeToggle.querySelector('.theme-icon');
  const themeLabel = themeToggle.querySelector('.theme-label');

  const updateThemeToggle = () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    if (themeIcon) themeIcon.textContent = isDark ? '☾' : '☼';
    if (themeLabel) themeLabel.textContent = isDark ? 'dark' : 'light';
  };

  updateThemeToggle();

  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    updateThemeToggle();
  });
}

// Copy email buttons
const copyButtons = document.querySelectorAll('.copy-email');
copyButtons.forEach((btn) => {
  btn.addEventListener('click', async () => {
    const email = btn.dataset.email || 'tanvir4n.cse@gmail.com';
    const success = await copyToClipboard(email);
    if (success) {
      showToast('Email copied to clipboard: ' + email);
    } else {
      window.location.href = `mailto:${email}`;
    }
  });
});

// BibTeX export buttons
const bibtexButtons = document.querySelectorAll('.bibtex-button');
bibtexButtons.forEach((btn) => {
  btn.addEventListener('click', async () => {
    const bibId = btn.dataset.bibId;
    const citation = bibtexDatabase[bibId];
    if (!citation) {
      showToast('Citation not found');
      return;
    }

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

// Mobile navigation menu toggle
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

  // Close on outside click
  document.addEventListener('click', (event) => {
    if (mobileNavToggle.getAttribute('aria-expanded') === 'true') {
      const isInside = navLinks.contains(event.target) || mobileNavToggle.contains(event.target);
      if (!isInside) {
        closeMobileMenu();
      }
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileNavToggle.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
      mobileNavToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 800 && mobileNavToggle.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
    }
  });
};

setupMobileNavigation();

// Scroll to top button handling
const setupScrollToTop = () => {
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  if (!scrollToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollToTopBtn.classList.add('is-visible');
    } else {
      scrollToTopBtn.classList.remove('is-visible');
    }
  }, { passive: true });

  scrollToTopBtn.addEventListener('click', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  });
};

setupScrollToTop();
