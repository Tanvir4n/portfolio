import * as d3 from 'd3';

export interface PublicationItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  venue: string;
  dateStr: string; // YYYY-MM-DD
  date: Date;
  year: number;
  category: 'vision' | 'systems' | 'security' | 'dataset' | 'data';
  categoryLabel: string;
  status: 'published' | 'accepted' | 'review' | 'submitted' | 'ongoing';
  statusLabel: string;
  authors: string;
  url?: string;
  bibId: string;
  impactNote?: string;
  keywords: string[];
}

export const RESEARCH_PUBLICATIONS: PublicationItem[] = [
  {
    id: 'pub-02',
    number: '02',
    title: 'A Case Study Conducted At DIU In Bangladesh Examines The Cost-Benefit Analysis And Viability Of Installing A Net Metering System Alongside Rooftop Solar Photovoltaics',
    shortTitle: 'Solar Net Metering Viability & Cost-Benefit Study',
    venue: 'International Journal of Computer Applications (IJCA)',
    dateStr: '2024-11-20',
    date: new Date('2024-11-20'),
    year: 2024,
    category: 'systems',
    categoryLabel: 'Systems & Energy',
    status: 'published',
    statusLabel: 'Published',
    authors: 'Md. Tanvir Hasan and others',
    url: 'https://www.ijcaonline.org/archives/volume187/number100/a-case-study-conducted-at-diu-in-bangladesh-examines-the-cost-benefit-analysis-and-viability-of-installing-a-net-metering-system-alongside-rooftop-solar-photovoltaics/',
    bibId: '02',
    impactNote: 'Published in IJCA (Vol 187, No 100). Technical feasibility and ROI modeling for rooftop grid-tied solar systems.',
    keywords: ['Net Metering', 'Photovoltaics', 'Energy Systems', 'Cost-Benefit Analysis']
  },
  {
    id: 'pub-01',
    number: '01',
    title: 'Comparative Evaluation of Deep CNN Models with Explainable AI for Accurate Breast Tumor Segmentation and Classification in Ultrasound',
    shortTitle: 'Deep CNNs with xAI for Breast Tumor Segmentation',
    venue: 'Taylor & Francis Book Chapter / IDAA 2025',
    dateStr: '2025-06-15',
    date: new Date('2025-06-15'),
    year: 2025,
    category: 'vision',
    categoryLabel: 'Vision + xAI',
    status: 'published',
    statusLabel: 'Published',
    authors: 'Md. Tanvir Hasan and others',
    bibId: '01',
    impactNote: 'Book Chapter in Intelligent Data Analytics & Applications (IDAA 2025), Taylor & Francis.',
    keywords: ['Explainable AI', 'Deep CNNs', 'Ultrasound Imaging', 'Tumor Segmentation']
  },
  {
    id: 'pub-03',
    number: '03',
    title: 'Sample-Efficient Fine-Grained Classification of Cactus Species Using Hybrid Vision Transformers and Knowledge Distillation',
    shortTitle: 'Cactus Species Classification via Hybrid ViT & KD',
    venue: 'IEEE / ICCIT 2025',
    dateStr: '2025-12-20',
    date: new Date('2025-12-20'),
    year: 2025,
    category: 'vision',
    categoryLabel: 'Vision + xAI',
    status: 'published',
    statusLabel: 'Published',
    authors: 'Md. Tanvir Hasan and others',
    url: 'https://ieeexplore.ieee.org/document/11491549',
    bibId: '03',
    impactNote: '28th International Conference on Computer and Information Technology (ICCIT), IEEE Xplore.',
    keywords: ['Vision Transformers', 'Knowledge Distillation', 'Fine-Grained Classification', 'Sample-Efficient']
  },
  {
    id: 'pub-04',
    number: '04',
    title: 'Optimizing Transfer Learning: A Deep Learning Approach for High-Accuracy Classification of Alzheimer’s Disease Stages',
    shortTitle: 'Transfer Learning for Alzheimer’s Disease Stages',
    venue: 'IEEE / AISEI 2026',
    dateStr: '2026-01-18',
    date: new Date('2026-01-18'),
    year: 2026,
    category: 'vision',
    categoryLabel: 'Vision + xAI',
    status: 'published',
    statusLabel: 'Published',
    authors: 'Md. Tanvir Hasan and others',
    url: 'https://ieeexplore.ieee.org/document/11572889',
    bibId: '04',
    impactNote: 'Conference on Artificial Intelligence & Sustainable Energy Innovations (AISEI), IEEE Xplore.',
    keywords: ['Alzheimer’s Detection', 'Transfer Learning', 'Medical Imaging', 'Neuroimaging']
  },
  {
    id: 'pub-05',
    number: '05',
    title: 'MOPG-7: A Multi-Clinic Dental Panoramic Radiograph Dataset with Expert YOLO Labels',
    shortTitle: 'MOPG-7 Multi-Clinic Dental Dataset',
    venue: 'Mendeley Data Repository',
    dateStr: '2026-02-10',
    date: new Date('2026-02-10'),
    year: 2026,
    category: 'dataset',
    categoryLabel: 'Mendeley Data',
    status: 'published',
    statusLabel: 'Published',
    authors: 'Md. Tanvir Hasan and others',
    url: 'https://data.mendeley.com/datasets/t66ytdrhf2/1',
    bibId: '05',
    impactNote: 'Open-access benchmark repository hosted on Mendeley Data with multi-clinic radiograph annotations.',
    keywords: ['Dental Panoramic Radiographs', 'YOLO Annotations', 'Mendeley Data', 'Open Benchmark']
  },
  {
    id: 'pub-06',
    number: '06',
    title: 'A Multi-Clinic Dental Panoramic Radiograph Dataset with Expert Labels for Six Conditions and Healthy Cases',
    shortTitle: 'Dental Radiograph Expert Annotation Data Paper',
    venue: 'Data Paper (Under Review)',
    dateStr: '2026-03-05',
    date: new Date('2026-03-05'),
    year: 2026,
    category: 'data',
    categoryLabel: 'Data Paper',
    status: 'review',
    statusLabel: 'Under Review',
    authors: 'Md. Tanvir Hasan and others',
    bibId: '06',
    impactNote: 'Comprehensive data descriptor paper accompanying the MOPG-7 dataset release.',
    keywords: ['Data Descriptor', 'Multi-Clinic Dataset', 'Dental Pathology', 'Benchmark Protocol']
  },
  {
    id: 'pub-07',
    number: '07',
    title: 'Light-BloodNet: An Efficient Attention-Guided Deep Learning Framework with Explainability for Blood Cell Classification',
    shortTitle: 'Light-BloodNet Attention Framework for Blood Cells',
    venue: 'Forthcoming / Accepted',
    dateStr: '2026-03-25',
    date: new Date('2026-03-25'),
    year: 2026,
    category: 'vision',
    categoryLabel: 'Vision + xAI',
    status: 'accepted',
    statusLabel: 'Accepted',
    authors: 'Md. Tanvir Hasan and others',
    bibId: '07',
    impactNote: 'Peer-reviewed and accepted for publication; lightweight attention mechanism for hematology microscopy.',
    keywords: ['Attention Mechanisms', 'Hematology', 'Blood Cell Classification', 'Explainable AI']
  },
  {
    id: 'pub-08',
    number: '08',
    title: 'BrainDistill: Explainable Multi-Scale Knowledge Distillation with Uncertainty-Aware Inference for Efficient Brain Tumor MRI Classification',
    shortTitle: 'BrainDistill Multi-Scale Distillation on MRI',
    venue: 'Forthcoming / Accepted',
    dateStr: '2026-04-12',
    date: new Date('2026-04-12'),
    year: 2026,
    category: 'vision',
    categoryLabel: 'Vision + xAI',
    status: 'accepted',
    statusLabel: 'Accepted',
    authors: 'Md. Tanvir Hasan and others',
    bibId: '08',
    impactNote: 'Accepted for forthcoming publication; combines teacher-student distillation with uncertainty calibration.',
    keywords: ['Knowledge Distillation', 'Brain MRI', 'Uncertainty Calibration', 'Neuro-oncology']
  },
  {
    id: 'pub-09',
    number: '09',
    title: 'Interpretable Cross-Modal Evidential Learning for Calibrated Few-Shot Glioma Slice Classification',
    shortTitle: 'Cross-Modal Evidential Learning for Glioma Slices',
    venue: 'Under Review (Q1 Journal)',
    dateStr: '2026-05-08',
    date: new Date('2026-05-08'),
    year: 2026,
    category: 'vision',
    categoryLabel: 'Vision + xAI',
    status: 'review',
    statusLabel: 'Under Review',
    authors: 'Md. Tanvir Hasan and others',
    bibId: '09',
    impactNote: 'Under peer review at high-impact Q1 biomedical journal; evidential deep learning for few-shot slices.',
    keywords: ['Evidential Learning', 'Glioma Classification', 'Few-Shot Learning', 'Uncertainty Estimation']
  },
  {
    id: 'pub-10',
    number: '10',
    title: 'DenseViT-PMOSNet: An Interpretable Hybrid CNN–Vision Transformer Framework for Clinical PMOS Classification',
    shortTitle: 'DenseViT-PMOSNet Hybrid CNN-ViT Framework',
    venue: 'Submitted / Under Review',
    dateStr: '2026-05-28',
    date: new Date('2026-05-28'),
    year: 2026,
    category: 'vision',
    categoryLabel: 'Vision + xAI',
    status: 'submitted',
    statusLabel: 'Submitted',
    authors: 'Md. Tanvir Hasan and others',
    bibId: '10',
    impactNote: 'Submitted manuscript evaluating dense residual connections integrated with vision transformer self-attention.',
    keywords: ['DenseNet', 'Vision Transformer', 'Hybrid Architecture', 'Clinical PMOS']
  },
  {
    id: 'pub-11',
    number: '11',
    title: 'DermaViT-XAI: An Empirical Study of Vision Transformers and CNNs for Explainable Multi-Class Skin Disease Classification from Dermatological Images',
    shortTitle: 'DermaViT-XAI Multi-Class Dermatology Study',
    venue: 'Submitted / Under Review',
    dateStr: '2026-06-14',
    date: new Date('2026-06-14'),
    year: 2026,
    category: 'vision',
    categoryLabel: 'Vision + xAI',
    status: 'submitted',
    statusLabel: 'Submitted',
    authors: 'Md. Tanvir Hasan and others',
    bibId: '11',
    impactNote: 'Comprehensive empirical benchmark comparing ViTs and CNN backbones with Grad-CAM and Integrated Gradients.',
    keywords: ['Dermatology', 'Skin Lesion Classification', 'Model Interpretability', 'Empirical Study']
  },
  {
    id: 'pub-12',
    number: '12',
    title: 'EffiViT-CervixNet: An Explainable Hybrid CNN–Vision Transformer Framework for Cervical Cancer Screening Using Pap-Smear Images',
    shortTitle: 'EffiViT-CervixNet Pap-Smear Screening',
    venue: 'Submitted / Under Review',
    dateStr: '2026-07-05',
    date: new Date('2026-07-05'),
    year: 2026,
    category: 'vision',
    categoryLabel: 'Vision + xAI',
    status: 'submitted',
    statusLabel: 'Submitted',
    authors: 'Md. Tanvir Hasan and others',
    bibId: '12',
    impactNote: 'Targeting automated high-throughput cervical cancer cytology screening with explainability heatmaps.',
    keywords: ['Pap-Smear', 'Cervical Cancer', 'EfficientNet', 'Vision Transformer']
  },
  {
    id: 'pub-13',
    number: '13',
    title: 'EffiViT-RiceNet: A Hybrid Vision Transformer Framework for Explainable Classification of Rice Leaf Diseases',
    shortTitle: 'EffiViT-RiceNet Agritech Disease Classification',
    venue: 'Submitted / Under Review',
    dateStr: '2026-07-28',
    date: new Date('2026-07-28'),
    year: 2026,
    category: 'vision',
    categoryLabel: 'Vision + xAI',
    status: 'submitted',
    statusLabel: 'Submitted',
    authors: 'Md. Tanvir Hasan and others',
    bibId: '13',
    impactNote: 'Applied agricultural AI enabling early diagnosis of rice foliage blight, blast, and brown spot.',
    keywords: ['Smart Agriculture', 'Rice Leaf Pathology', 'Hybrid ViT', 'Edge Explainability']
  },
  {
    id: 'pub-14',
    number: '14',
    title: 'PUMA-MIL: Prototype-Updated Multi-Modal Attention-Based Multiple Instance Learning for Slice-Level Brain Tumor Detection on Multi-Sequence MRI',
    shortTitle: 'PUMA-MIL Prototype Multiple Instance Learning',
    venue: 'Ongoing Investigation',
    dateStr: '2026-09-10',
    date: new Date('2026-09-10'),
    year: 2026,
    category: 'vision',
    categoryLabel: 'Vision + xAI',
    status: 'ongoing',
    statusLabel: 'Ongoing',
    authors: 'Md. Tanvir Hasan and others',
    bibId: '14',
    impactNote: 'Ongoing experimental development: multi-sequence MRI bag aggregation using memory-augmented prototype learning.',
    keywords: ['Multiple Instance Learning', 'Multi-Modal MRI', 'Prototype Learning', 'Attention Pooling']
  },
  {
    id: 'pub-15',
    number: '15',
    title: 'A Secure and Scalable Hybrid Classical–Post-Quantum Cryptographic Framework for Quantum-Resilient Blockchain Systems',
    shortTitle: 'Quantum-Resilient Blockchain Cryptographic Framework',
    venue: 'Ongoing Investigation',
    dateStr: '2026-10-15',
    date: new Date('2026-10-15'),
    year: 2026,
    category: 'security',
    categoryLabel: 'Security & PQC',
    status: 'ongoing',
    statusLabel: 'Ongoing',
    authors: 'Md. Tanvir Hasan and others',
    bibId: '15',
    impactNote: 'Active research investigation: lattice-based signature migration and hybrid key encapsulation for distributed ledgers.',
    keywords: ['Post-Quantum Cryptography', 'Lattice Cryptography', 'Blockchain Security', 'Fault Tolerance']
  },
  {
    id: 'pub-16',
    number: '16',
    title: 'StyleGAN2-ADA-Driven Synthetic MRI Augmentation for Architecture-Aware Brain Tumor Classification with Hybrid CNN–Vision Transformers',
    shortTitle: 'StyleGAN2-ADA Synthetic MRI Augmentation',
    venue: 'Ongoing Investigation',
    dateStr: '2026-11-20',
    date: new Date('2026-11-20'),
    year: 2026,
    category: 'vision',
    categoryLabel: 'Vision + xAI',
    status: 'ongoing',
    statusLabel: 'Ongoing',
    authors: 'Md. Tanvir Hasan and others',
    bibId: '16',
    impactNote: 'Ongoing investigation generating high-fidelity adaptive synthetic MRI slices to overcome extreme class imbalance.',
    keywords: ['StyleGAN2-ADA', 'Synthetic Augmentation', 'Generative Modeling', 'MRI Neuro-imaging']
  }
];

// Color palette matching portfolio variables
export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  vision: { bg: '#ff6545', text: '#ffffff', border: '#171717' },
  systems: { bg: '#6e8cff', text: '#ffffff', border: '#171717' },
  security: { bg: '#a855f7', text: '#ffffff', border: '#171717' },
  dataset: { bg: '#0969da', text: '#ffffff', border: '#171717' },
  data: { bg: '#0284c7', text: '#ffffff', border: '#171717' },
};

export const STATUS_COLORS: Record<string, { dot: string; label: string }> = {
  published: { dot: '#278042', label: 'Published' },
  accepted: { dot: '#10b981', label: 'Accepted' },
  review: { dot: '#e07800', label: 'Under Review' },
  submitted: { dot: '#d97706', label: 'Submitted' },
  ongoing: { dot: '#888888', label: 'Ongoing' },
};

export class ResearchTimelineComponent {
  private container: HTMLElement;
  private svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private mainGroup!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private zoomBehavior!: d3.ZoomBehavior<SVGSVGElement, unknown>;
  private tooltipEl!: HTMLElement;
  private inspectorEl: HTMLElement | null = null;

  private width = 1100;
  private height = 480;
  private margin = { top: 40, right: 60, bottom: 65, left: 60 };

  private timeScale!: d3.ScaleTime<number, number>;
  private currentXScale!: d3.ScaleTime<number, number>;

  private selectedCategory = 'all';
  private selectedStatus = 'all';
  private selectedPubId: string | null = 'pub-04'; // Default to first 2026 published paper

  private resizeObserver: ResizeObserver | null = null;
  private themeObserver: MutationObserver | null = null;

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) {
      console.warn(`[Timeline] Container #${containerId} not found`);
      return;
    }
    this.container = el;
    this.init();
  }

  private init() {
    this.container.innerHTML = '';
    this.container.classList.add('d3-timeline-root');

    // Create Tooltip DOM
    this.createTooltip();

    // Setup Inspector element if present in DOM
    this.inspectorEl = document.getElementById('timeline-inspector');

    // Render Toolbar controls
    this.renderToolbar();

    // Render Canvas & SVG
    this.setupSvg();

    // Setup Scales & Zoom
    this.setupScales();

    // Render Timeline contents
    this.render();

    // Initial inspector update
    this.updateInspector(RESEARCH_PUBLICATIONS.find((p) => p.id === this.selectedPubId) || RESEARCH_PUBLICATIONS[0]);

    // Handle Resize
    this.setupResizeObserver();

    // Handle Theme changes
    this.setupThemeObserver();
  }

  private isDarkMode(): boolean {
    return document.documentElement.dataset.theme === 'dark';
  }

  private getThemeColors() {
    const isDark = this.isDarkMode();
    return {
      ink: isDark ? '#f2eee6' : '#171717',
      paper: isDark ? '#171717' : '#f2eee6',
      surface: isDark ? '#222222' : '#ffffff',
      softLine: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(23, 23, 23, 0.14)',
      axisLine: isDark ? '#f2eee6' : '#171717',
      textMuted: isDark ? '#a0a0a0' : '#666666',
      accent: isDark ? '#d9f44b' : '#ff6545',
      yearBandBg: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
      activeGlow: isDark ? '#d9f44b' : '#ff6545',
    };
  }

  private createTooltip() {
    let tip = document.getElementById('d3-timeline-tooltip');
    if (!tip) {
      tip = document.createElement('div');
      tip.id = 'd3-timeline-tooltip';
      tip.className = 'timeline-tooltip';
      tip.setAttribute('role', 'tooltip');
      tip.setAttribute('aria-hidden', 'true');
      document.body.appendChild(tip);
    }
    this.tooltipEl = tip;
  }

  private renderToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'timeline-toolbar';
    toolbar.innerHTML = `
      <div class="timeline-controls-row">
        <div class="timeline-filter-group" role="tablist" aria-label="Filter by Domain">
          <span class="timeline-group-label">Domain:</span>
          <button type="button" class="timeline-btn active" data-category="all">All (16)</button>
          <button type="button" class="timeline-btn" data-category="vision">Vision + xAI (12)</button>
          <button type="button" class="timeline-btn" data-category="systems">Systems (1)</button>
          <button type="button" class="timeline-btn" data-category="security">Security (1)</button>
          <button type="button" class="timeline-btn" data-category="dataset">Datasets (2)</button>
        </div>

        <div class="timeline-filter-group" role="tablist" aria-label="Filter by Status">
          <span class="timeline-group-label">Status:</span>
          <button type="button" class="timeline-btn active" data-status="all">All</button>
          <button type="button" class="timeline-btn" data-status="published">Published</button>
          <button type="button" class="timeline-btn" data-status="accepted">Accepted</button>
          <button type="button" class="timeline-btn" data-status="review">In Review</button>
          <button type="button" class="timeline-btn" data-status="ongoing">Ongoing</button>
        </div>

        <div class="timeline-view-actions">
          <span class="timeline-group-label">View:</span>
          <button type="button" class="timeline-btn timeline-action-btn" id="tl-zoom-in" title="Zoom in (+)" aria-label="Zoom in">+</button>
          <button type="button" class="timeline-btn timeline-action-btn" id="tl-zoom-out" title="Zoom out (-)" aria-label="Zoom out">−</button>
          <button type="button" class="timeline-btn timeline-action-btn" id="tl-reset" title="Reset timeline view" aria-label="Reset view">⊙ Reset</button>
          <button type="button" class="timeline-btn timeline-action-btn" id="tl-pan-left" title="Pan left" aria-label="Pan left">←</button>
          <button type="button" class="timeline-btn timeline-action-btn" id="tl-pan-right" title="Pan right" aria-label="Pan right">→</button>
        </div>
      </div>

      <div class="timeline-quick-jump">
        <span class="timeline-quick-label">Jump to Period:</span>
        <div class="timeline-jump-chips">
          <button type="button" class="timeline-chip" data-jump="2024">2024 (Foundation)</button>
          <button type="button" class="timeline-chip" data-jump="2025">2025 (xAI & ViT)</button>
          <button type="button" class="timeline-chip" data-jump="2026-h1">Early 2026 (Medical Vision)</button>
          <button type="button" class="timeline-chip" data-jump="2026-h2">Late 2026 (PQC & Frontiers)</button>
          <button type="button" class="timeline-chip active" data-jump="fit">Overview Fit</button>
        </div>
        <div class="timeline-interaction-hint">
          <span>⠿ Drag / swipe to pan · Scroll to zoom · Click node to inspect</span>
        </div>
      </div>
    `;

    this.container.appendChild(toolbar);

    // Bind event handlers
    toolbar.querySelectorAll<HTMLButtonElement>('[data-category]').forEach((btn) => {
      btn.addEventListener('click', () => {
        toolbar.querySelectorAll('[data-category]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedCategory = btn.dataset.category || 'all';
        this.applyFilterAndTransition();
      });
    });

    toolbar.querySelectorAll<HTMLButtonElement>('[data-status]').forEach((btn) => {
      btn.addEventListener('click', () => {
        toolbar.querySelectorAll('[data-status]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedStatus = btn.dataset.status || 'all';
        this.applyFilterAndTransition();
      });
    });

    // Zoom buttons
    toolbar.querySelector('#tl-zoom-in')?.addEventListener('click', () => {
      this.svg.transition().duration(300).call(this.zoomBehavior.scaleBy, 1.35);
    });
    toolbar.querySelector('#tl-zoom-out')?.addEventListener('click', () => {
      this.svg.transition().duration(300).call(this.zoomBehavior.scaleBy, 0.75);
    });
    toolbar.querySelector('#tl-reset')?.addEventListener('click', () => {
      this.resetZoom(true);
    });
    toolbar.querySelector('#tl-pan-left')?.addEventListener('click', () => {
      this.svg.transition().duration(300).call(this.zoomBehavior.translateBy, 180, 0);
    });
    toolbar.querySelector('#tl-pan-right')?.addEventListener('click', () => {
      this.svg.transition().duration(300).call(this.zoomBehavior.translateBy, -180, 0);
    });

    // Period Jump Chips
    toolbar.querySelectorAll<HTMLButtonElement>('[data-jump]').forEach((chip) => {
      chip.addEventListener('click', () => {
        toolbar.querySelectorAll('[data-jump]').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const jumpTarget = chip.dataset.jump;
        this.jumpToPeriod(jumpTarget);
      });
    });
  }

  private setupSvg() {
    const viewportWrapper = document.createElement('div');
    viewportWrapper.className = 'timeline-viewport';

    this.container.appendChild(viewportWrapper);

    const rect = viewportWrapper.getBoundingClientRect();
    this.width = Math.max(rect.width || 1000, 760);
    this.height = 420;

    const svg = d3
      .select(viewportWrapper)
      .append('svg')
      .attr('width', '100%')
      .attr('height', this.height)
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .attr('class', 'd3-timeline-svg');

    // Defs for gradients, patterns, and filters
    const defs = svg.append('defs');

    // Clip path for main viewport area
    defs
      .append('clipPath')
      .attr('id', 'timeline-clip')
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.width)
      .attr('height', this.height);

    // Drop shadow filter for active nodes
    const filter = defs
      .append('filter')
      .attr('id', 'node-glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    filter
      .append('feDropShadow')
      .attr('dx', '0')
      .attr('dy', '3')
      .attr('stdDeviation', '4')
      .attr('flood-color', '#ff6545')
      .attr('flood-opacity', '0.5');

    // Background rectangle for pan/drag events
    svg
      .append('rect')
      .attr('class', 'timeline-bg-catch')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('fill', 'transparent');

    this.svg = svg;
    this.mainGroup = svg.append('g').attr('class', 'timeline-main-group');
  }

  private setupScales() {
    // Domain starts at October 2024 and goes through December 2026
    const minDate = new Date('2024-09-01');
    const maxDate = new Date('2026-12-31');

    this.timeScale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([this.margin.left, this.width - this.margin.right]);

    this.currentXScale = this.timeScale.copy();

    // Zoom behavior
    this.zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.8, 3.5])
      .translateExtent([
        [-this.width * 0.5, 0],
        [this.width * 2, this.height],
      ])
      .on('zoom', (event) => {
        this.currentXScale = event.transform.rescaleX(this.timeScale);
        this.updatePositions();
      });

    this.svg.call(this.zoomBehavior);
  }

  private resetZoom(animated = true) {
    if (animated) {
      this.svg.transition().duration(500).call(this.zoomBehavior.transform, d3.zoomIdentity);
    } else {
      this.svg.call(this.zoomBehavior.transform, d3.zoomIdentity);
    }
  }

  private jumpToPeriod(period?: string) {
    if (!period || period === 'fit') {
      this.resetZoom(true);
      return;
    }

    let targetDate: Date;
    let targetK = 1.8;

    if (period === '2024') {
      targetDate = new Date('2024-11-20');
      targetK = 2.2;
    } else if (period === '2025') {
      targetDate = new Date('2025-08-01');
      targetK = 1.9;
    } else if (period === '2026-h1') {
      targetDate = new Date('2026-03-15');
      targetK = 2.0;
    } else if (period === '2026-h2') {
      targetDate = new Date('2026-09-15');
      targetK = 2.0;
    } else {
      this.resetZoom(true);
      return;
    }

    const targetX = this.timeScale(targetDate);
    const centerX = this.width / 2;
    const transform = d3.zoomIdentity.translate(centerX - targetX * targetK, 0).scale(targetK);

    this.svg.transition().duration(600).ease(d3.easeCubicOut).call(this.zoomBehavior.transform, transform);
  }

  private calculateNodeOffsets(): Map<string, { y: number; stemDirection: 'up' | 'down'; level: number }> {
    const offsets = new Map<string, { y: number; stemDirection: 'up' | 'down'; level: number }>();
    const axisY = this.height / 2 + 15;

    // We distribute the 16 nodes across staggered levels above and below the baseline
    // Levels above: -110px, -65px, -155px
    // Levels below: +65px, +110px, +155px
    // Alternating assignment based on chronological sequence and domain clustering
    const pattern = [
      { offset: -70, dir: 'up', level: 1 },
      { offset: 70, dir: 'down', level: 1 },
      { offset: -125, dir: 'up', level: 2 },
      { offset: 125, dir: 'down', level: 2 },
      { offset: -75, dir: 'up', level: 1 },
      { offset: 75, dir: 'down', level: 1 },
      { offset: -130, dir: 'up', level: 2 },
      { offset: 130, dir: 'down', level: 2 },
      { offset: -75, dir: 'up', level: 1 },
      { offset: 75, dir: 'down', level: 1 },
      { offset: -130, dir: 'up', level: 2 },
      { offset: 130, dir: 'down', level: 2 },
      { offset: -80, dir: 'up', level: 1 },
      { offset: 80, dir: 'down', level: 1 },
      { offset: -135, dir: 'up', level: 2 },
      { offset: 135, dir: 'down', level: 2 },
    ] as const;

    RESEARCH_PUBLICATIONS.forEach((pub, i) => {
      const p = pattern[i % pattern.length];
      offsets.set(pub.id, {
        y: axisY + p.offset,
        stemDirection: p.dir,
        level: p.level,
      });
    });

    return offsets;
  }

  private render() {
    this.mainGroup.selectAll('*').remove();
    const colors = this.getThemeColors();
    const axisY = this.height / 2 + 15;

    // 1. Year Background Zones
    const yearZonesGroup = this.mainGroup.append('g').attr('class', 'timeline-year-zones');
    const years = [2024, 2025, 2026];

    years.forEach((yr, idx) => {
      const start = new Date(`${yr}-01-01`);
      const end = new Date(`${yr}-12-31T23:59:59`);
      const x1 = this.currentXScale(start);
      const x2 = this.currentXScale(end);

      const zoneG = yearZonesGroup.append('g').attr('class', `year-band year-band-${yr}`);

      // Background fill for alternate years
      if (idx % 2 === 1) {
        zoneG
          .append('rect')
          .attr('class', 'year-band-rect')
          .attr('x', x1)
          .attr('y', 20)
          .attr('width', Math.max(0, x2 - x1))
          .attr('height', this.height - 40)
          .attr('fill', colors.yearBandBg)
          .attr('rx', 8);
      }

      // Year boundary guideline
      zoneG
        .append('line')
        .attr('class', 'year-boundary-line')
        .attr('x1', x1)
        .attr('x2', x1)
        .attr('y1', 25)
        .attr('y2', this.height - 25)
        .attr('stroke', colors.softLine)
        .attr('stroke-dasharray', '3 3')
        .attr('stroke-width', 1);

      // Large subtle year watermarked label
      zoneG
        .append('text')
        .attr('class', 'year-watermark-label')
        .attr('x', (x1 + x2) / 2)
        .attr('y', 70)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.textMuted)
        .attr('opacity', 0.28)
        .attr('font-size', '44px')
        .attr('font-family', 'Space Grotesk, sans-serif')
        .attr('font-weight', '700')
        .attr('letter-spacing', '0.08em')
        .text(yr);
    });

    // 2. Main Timeline Spine Axis Line
    const spineGroup = this.mainGroup.append('g').attr('class', 'timeline-spine-group');

    // Glow background line
    spineGroup
      .append('line')
      .attr('class', 'timeline-spine-glow')
      .attr('x1', this.margin.left - 20)
      .attr('x2', this.width - this.margin.right + 20)
      .attr('y1', axisY)
      .attr('y2', axisY)
      .attr('stroke', colors.accent)
      .attr('stroke-width', 3)
      .attr('opacity', 0.2);

    // Solid spine line
    spineGroup
      .append('line')
      .attr('class', 'timeline-spine-line')
      .attr('x1', this.margin.left - 20)
      .attr('x2', this.width - this.margin.right + 20)
      .attr('y1', axisY)
      .attr('y2', axisY)
      .attr('stroke', colors.axisLine)
      .attr('stroke-width', 2);

    // Spine terminal points
    spineGroup
      .append('circle')
      .attr('cx', this.margin.left - 20)
      .attr('cy', axisY)
      .attr('r', 4)
      .attr('fill', colors.axisLine);

    spineGroup
      .append('circle')
      .attr('cx', this.width - this.margin.right + 20)
      .attr('cy', axisY)
      .attr('r', 4)
      .attr('fill', colors.axisLine);

    // 3. Time Axis Month / Year ticks
    const axisGroup = this.mainGroup.append('g').attr('class', 'timeline-axis-ticks');
    this.renderAxisTicks(axisGroup, axisY, colors);

    // 4. Stems & Publication Nodes
    const nodeOffsets = this.calculateNodeOffsets();
    const stemsGroup = this.mainGroup.append('g').attr('class', 'timeline-stems-group');
    const nodesGroup = this.mainGroup.append('g').attr('class', 'timeline-nodes-group');

    RESEARCH_PUBLICATIONS.forEach((pub) => {
      const pos = nodeOffsets.get(pub.id)!;
      const x = this.currentXScale(pub.date);
      const y = pos.y;
      const catColor = CATEGORY_COLORS[pub.category] || CATEGORY_COLORS.vision;
      const statusInfo = STATUS_COLORS[pub.status] || STATUS_COLORS.published;
      const isSelected = pub.id === this.selectedPubId;

      // Stem line connecting axis to node
      const stem = stemsGroup
        .append('line')
        .attr('class', `node-stem stem-${pub.id}`)
        .attr('data-id', pub.id)
        .attr('x1', x)
        .attr('y1', axisY)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', isSelected ? colors.accent : colors.softLine)
        .attr('stroke-width', isSelected ? 2 : 1.2)
        .attr('stroke-dasharray', isSelected ? 'none' : '2 2')
        .attr('opacity', 0.85);

      // Axis anchor point
      stemsGroup
        .append('circle')
        .attr('class', `stem-anchor stem-anchor-${pub.id}`)
        .attr('cx', x)
        .attr('cy', axisY)
        .attr('r', isSelected ? 4 : 2.5)
        .attr('fill', isSelected ? colors.accent : colors.axisLine)
        .attr('stroke', colors.paper)
        .attr('stroke-width', 1);

      // Node Group
      const nodeG = nodesGroup
        .append('g')
        .attr('class', `pub-node-g pub-node-${pub.id} cat-${pub.category} status-${pub.status} ${isSelected ? 'selected' : ''}`)
        .attr('data-id', pub.id)
        .attr('tabindex', '0')
        .attr('role', 'button')
        .attr('aria-label', `Paper ${pub.number}: ${pub.shortTitle}`)
        .attr('transform', `translate(${x}, ${y})`)
        .style('cursor', 'pointer');

      // Outer status halo ring
      nodeG
        .append('circle')
        .attr('class', 'node-halo')
        .attr('r', 18)
        .attr('fill', 'none')
        .attr('stroke', statusInfo.dot)
        .attr('stroke-width', isSelected ? 2.5 : 1.5)
        .attr('stroke-dasharray', pub.status === 'review' || pub.status === 'ongoing' ? '3 2' : 'none')
        .attr('opacity', isSelected ? 1 : 0.7);

      // Main Node Disk
      nodeG
        .append('circle')
        .attr('class', 'node-body')
        .attr('r', 13)
        .attr('fill', catColor.bg)
        .attr('stroke', colors.paper)
        .attr('stroke-width', 2);

      // Number text inside disk
      nodeG
        .append('text')
        .attr('class', 'node-text')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('font-size', '10px')
        .attr('font-family', 'DM Mono, monospace')
        .attr('font-weight', '700')
        .attr('fill', '#ffffff')
        .text(pub.number);

      // Node label tag (positioned slightly offset)
      const labelX = 22;
      const labelY = pos.stemDirection === 'up' ? -4 : 4;
      const labelG = nodeG.append('g').attr('class', 'node-label-group').attr('transform', `translate(${labelX}, ${labelY})`);

      // Label background pill
      const labelText = labelG
        .append('text')
        .attr('class', 'node-label-title')
        .attr('font-size', '11px')
        .attr('font-family', 'Space Grotesk, sans-serif')
        .attr('font-weight', '600')
        .attr('fill', colors.ink)
        .attr('dominant-baseline', 'middle')
        .text(pub.shortTitle);

      const dateText = labelG
        .append('text')
        .attr('class', 'node-label-date')
        .attr('y', 14)
        .attr('font-size', '9.5px')
        .attr('font-family', 'DM Mono, monospace')
        .attr('fill', colors.textMuted)
        .attr('dominant-baseline', 'middle')
        .text(`${this.formatDate(pub.date)} · ${pub.categoryLabel}`);

      // Event Listeners: Hover, Click, Focus
      nodeG.on('mouseenter', (event: MouseEvent) => {
        this.highlightNode(pub.id, true);
        this.showTooltip(pub, event);
      });

      nodeG.on('mousemove', (event: MouseEvent) => {
        this.positionTooltip(event);
      });

      nodeG.on('mouseleave', () => {
        this.highlightNode(pub.id, false);
        this.hideTooltip();
      });

      nodeG.on('click', () => {
        this.selectPublication(pub);
      });

      nodeG.on('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.selectPublication(pub);
        }
      });
    });
  }

  private renderAxisTicks(
    axisGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
    axisY: number,
    colors: ReturnType<typeof this.getThemeColors>
  ) {
    axisGroup.selectAll('*').remove();

    // Months ticks
    const months = this.currentXScale.ticks(d3.timeMonth.every(1) || 12);
    months.forEach((m) => {
      const x = this.currentXScale(m);
      if (x < this.margin.left || x > this.width - this.margin.right) return;

      const isQuarter = m.getMonth() % 3 === 0;
      const isJan = m.getMonth() === 0;

      axisGroup
        .append('line')
        .attr('class', 'axis-tick-line')
        .attr('x1', x)
        .attr('x2', x)
        .attr('y1', axisY - (isJan ? 8 : isQuarter ? 5 : 3))
        .attr('y2', axisY + (isJan ? 8 : isQuarter ? 5 : 3))
        .attr('stroke', isJan ? colors.ink : isQuarter ? colors.textMuted : colors.softLine)
        .attr('stroke-width', isJan ? 2 : 1);

      if (isQuarter || isJan) {
        const monthLabel = d3.timeFormat('%b')(m);
        axisGroup
          .append('text')
          .attr('class', 'axis-tick-label')
          .attr('x', x)
          .attr('y', axisY + 20)
          .attr('text-anchor', 'middle')
          .attr('font-size', isJan ? '11px' : '9px')
          .attr('font-family', 'DM Mono, monospace')
          .attr('font-weight', isJan ? '700' : '400')
          .attr('fill', isJan ? colors.ink : colors.textMuted)
          .text(isJan ? `${m.getFullYear()}` : monthLabel);
      }
    });
  }

  private updatePositions() {
    const colors = this.getThemeColors();
    const axisY = this.height / 2 + 15;
    const nodeOffsets = this.calculateNodeOffsets();

    // Update Year Zones
    const years = [2024, 2025, 2026];
    years.forEach((yr) => {
      const start = new Date(`${yr}-01-01`);
      const end = new Date(`${yr}-12-31T23:59:59`);
      const x1 = this.currentXScale(start);
      const x2 = this.currentXScale(end);

      const zoneG = this.mainGroup.select(`.year-band-${yr}`);
      zoneG.select('.year-band-rect').attr('x', x1).attr('width', Math.max(0, x2 - x1));
      zoneG.select('.year-boundary-line').attr('x1', x1).attr('x2', x1);
      zoneG.select('.year-watermark-label').attr('x', (x1 + x2) / 2);
    });

    // Update Axis ticks
    const axisGroup = this.mainGroup.select<SVGGElement>('.timeline-axis-ticks');
    this.renderAxisTicks(axisGroup, axisY, colors);

    // Update Nodes and Stems
    RESEARCH_PUBLICATIONS.forEach((pub) => {
      const pos = nodeOffsets.get(pub.id)!;
      const x = this.currentXScale(pub.date);
      const y = pos.y;

      // Update node transform
      this.mainGroup.select(`.pub-node-${pub.id}`).attr('transform', `translate(${x}, ${y})`);

      // Update stem
      this.mainGroup
        .select(`.stem-${pub.id}`)
        .attr('x1', x)
        .attr('y1', axisY)
        .attr('x2', x)
        .attr('y2', y);

      this.mainGroup.select(`.stem-anchor-${pub.id}`).attr('cx', x).attr('cy', axisY);
    });
  }

  private applyFilterAndTransition() {
    RESEARCH_PUBLICATIONS.forEach((pub) => {
      const matchesCategory =
        this.selectedCategory === 'all' ||
        pub.category === this.selectedCategory ||
        (this.selectedCategory === 'dataset' && (pub.category === 'dataset' || pub.category === 'data'));

      const matchesStatus =
        this.selectedStatus === 'all' ||
        pub.status === this.selectedStatus ||
        (this.selectedStatus === 'review' && (pub.status === 'review' || pub.status === 'submitted'));

      const visible = matchesCategory && matchesStatus;

      const node = this.mainGroup.select(`.pub-node-${pub.id}`);
      const stem = this.mainGroup.select(`.stem-${pub.id}`);
      const anchor = this.mainGroup.select(`.stem-anchor-${pub.id}`);

      node
        .transition()
        .duration(300)
        .style('opacity', visible ? 1 : 0.12)
        .style('pointer-events', visible ? 'all' : 'none');

      stem.transition().duration(300).style('opacity', visible ? 0.85 : 0.08);
      anchor.transition().duration(300).style('opacity', visible ? 1 : 0.08);
    });
  }

  private highlightNode(pubId: string, active: boolean) {
    const isSelected = pubId === this.selectedPubId;
    const colors = this.getThemeColors();

    const nodeG = this.mainGroup.select(`.pub-node-${pubId}`);
    const stem = this.mainGroup.select(`.stem-${pubId}`);

    if (active) {
      nodeG
        .select('.node-body')
        .transition()
        .duration(150)
        .attr('r', 16);
      nodeG
        .select('.node-halo')
        .transition()
        .duration(150)
        .attr('r', 22)
        .attr('stroke-width', 2.5);
      stem.attr('stroke', colors.accent).attr('stroke-width', 2);
    } else {
      nodeG
        .select('.node-body')
        .transition()
        .duration(150)
        .attr('r', 13);
      nodeG
        .select('.node-halo')
        .transition()
        .duration(150)
        .attr('r', 18)
        .attr('stroke-width', isSelected ? 2.5 : 1.5);
      stem
        .attr('stroke', isSelected ? colors.accent : colors.softLine)
        .attr('stroke-width', isSelected ? 2 : 1.2);
    }
  }

  private selectPublication(pub: PublicationItem) {
    this.selectedPubId = pub.id;
    const colors = this.getThemeColors();

    // Clear previous selected states
    this.mainGroup.selectAll('.pub-node-g').classed('selected', false);
    this.mainGroup.selectAll('.node-halo').attr('stroke-width', 1.5);
    this.mainGroup.selectAll('.node-stem').attr('stroke', colors.softLine).attr('stroke-width', 1.2);
    this.mainGroup.selectAll('.stem-anchor').attr('fill', colors.axisLine).attr('r', 2.5);

    // Apply new selected state
    const selectedG = this.mainGroup.select(`.pub-node-${pub.id}`);
    selectedG.classed('selected', true);
    selectedG.select('.node-halo').attr('stroke-width', 2.5);

    this.mainGroup
      .select(`.stem-${pub.id}`)
      .attr('stroke', colors.accent)
      .attr('stroke-width', 2);

    this.mainGroup
      .select(`.stem-anchor-${pub.id}`)
      .attr('fill', colors.accent)
      .attr('r', 4);

    // Update inspector
    this.updateInspector(pub);

    // Highlight corresponding publication card in Research Log above if present
    this.highlightMainPublicationCard(pub.number);
  }

  private highlightMainPublicationCard(paperNumber: string) {
    const pubCards = document.querySelectorAll<HTMLElement>('.publication');
    pubCards.forEach((card) => {
      const numEl = card.querySelector('.pub-number');
      if (numEl && numEl.textContent?.trim() === paperNumber) {
        card.classList.remove('hidden');
        card.style.transition = 'background-color 0.4s ease, outline 0.4s ease';
        card.style.backgroundColor = 'var(--acid)';
        card.style.outline = '2px solid var(--ink)';

        setTimeout(() => {
          card.style.backgroundColor = '';
          card.style.outline = '';
        }, 2200);
      }
    });
  }

  private updateInspector(pub: PublicationItem) {
    if (!this.inspectorEl) {
      this.inspectorEl = document.getElementById('timeline-inspector');
    }
    if (!this.inspectorEl) return;

    const catColor = CATEGORY_COLORS[pub.category] || CATEGORY_COLORS.vision;
    const statusInfo = STATUS_COLORS[pub.status] || STATUS_COLORS.published;

    this.inspectorEl.innerHTML = `
      <div class="inspector-card">
        <div class="inspector-header">
          <div class="inspector-number-badge" style="background-color: ${catColor.bg};">
            <span>${pub.number}</span>
          </div>
          <div class="inspector-title-area">
            <div class="inspector-meta-row">
              <span class="inspector-category" style="color: ${catColor.bg}; font-weight: 700;">${pub.categoryLabel}</span>
              <span class="inspector-sep">·</span>
              <span class="inspector-status status-${pub.status}">
                <span class="status-dot-inline" style="background-color: ${statusInfo.dot};"></span>
                ${pub.statusLabel}
              </span>
              <span class="inspector-sep">·</span>
              <span class="inspector-date">${this.formatDateFull(pub.date)}</span>
            </div>
            <h3 class="inspector-title">${pub.title}</h3>
          </div>
        </div>

        <div class="inspector-body">
          <div class="inspector-venue-box">
            <span class="inspector-venue-label">Venue / Publication Channel:</span>
            <strong class="inspector-venue">${pub.venue}</strong>
          </div>
          
          ${pub.impactNote ? `<p class="inspector-note">${pub.impactNote}</p>` : ''}

          <div class="inspector-keywords">
            ${pub.keywords.map((k) => `<span class="inspector-keyword-tag">${k}</span>`).join('')}
          </div>
        </div>

        <div class="inspector-actions">
          ${
            pub.url
              ? `<a href="${pub.url}" target="_blank" rel="noreferrer" class="inspector-btn inspector-btn-link">
                  Read Paper / Dataset <span class="pixel-arrow-icon">↗</span>
                </a>`
              : `<span class="inspector-pending-badge">Full text indexing in progress</span>`
          }
          <button type="button" class="inspector-btn inspector-btn-bibtex" data-bib-id="${pub.bibId}">
            <span>📋</span> Copy BibTeX
          </button>
          <button type="button" class="inspector-btn inspector-btn-locate" data-locate="${pub.number}">
            <span>↓</span> View In Research Log
          </button>
        </div>
      </div>
    `;

    // Bind BibTeX button in inspector
    const bibBtn = this.inspectorEl.querySelector<HTMLButtonElement>('.inspector-btn-bibtex');
    if (bibBtn) {
      bibBtn.addEventListener('click', async () => {
        const bibId = bibBtn.dataset.bibId;
        const scriptWin = window as unknown as { bibtexDatabase?: Record<string, string> };
        const bibtexDatabase = scriptWin.bibtexDatabase || {};
        const citation = bibId ? bibtexDatabase[bibId] : '';

        if (citation) {
          try {
            await navigator.clipboard.writeText(citation);
            bibBtn.innerHTML = '<span>✓</span> Copied to Clipboard!';
            bibBtn.classList.add('copied');
            setTimeout(() => {
              bibBtn.innerHTML = '<span>📋</span> Copy BibTeX';
              bibBtn.classList.remove('copied');
            }, 2500);
          } catch {
            bibBtn.innerHTML = '<span>✕</span> Copy failed';
          }
        }
      });
    }

    // Bind Locate in Research Log button
    const locateBtn = this.inspectorEl.querySelector<HTMLButtonElement>('.inspector-btn-locate');
    if (locateBtn) {
      locateBtn.addEventListener('click', () => {
        const writingSection = document.getElementById('writing');
        if (writingSection) {
          writingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          this.highlightMainPublicationCard(pub.number);
        }
      });
    }
  }

  private showTooltip(pub: PublicationItem, event: MouseEvent) {
    const statusInfo = STATUS_COLORS[pub.status] || STATUS_COLORS.published;
    const catColor = CATEGORY_COLORS[pub.category] || CATEGORY_COLORS.vision;

    this.tooltipEl.innerHTML = `
      <div class="tooltip-inner">
        <div class="tooltip-header">
          <span class="tooltip-num" style="background: ${catColor.bg};">[ ${pub.number} ]</span>
          <span class="tooltip-cat">${pub.categoryLabel}</span>
          <span class="tooltip-status" style="color: ${statusInfo.dot};">● ${pub.statusLabel}</span>
        </div>
        <div class="tooltip-title">${pub.title}</div>
        <div class="tooltip-venue">${pub.venue}</div>
        <div class="tooltip-footer">
          <span class="tooltip-date">${this.formatDateFull(pub.date)}</span>
          <span class="tooltip-prompt">Click node to inspect ↗</span>
        </div>
      </div>
    `;

    this.tooltipEl.classList.add('show');
    this.tooltipEl.setAttribute('aria-hidden', 'false');
    this.positionTooltip(event);
  }

  private positionTooltip(event: MouseEvent) {
    const pad = 16;
    const tipRect = this.tooltipEl.getBoundingClientRect();
    let left = event.clientX + pad;
    let top = event.clientY + pad;

    if (left + tipRect.width > window.innerWidth - 10) {
      left = event.clientX - tipRect.width - pad;
    }
    if (top + tipRect.height > window.innerHeight - 10) {
      top = event.clientY - tipRect.height - pad;
    }

    this.tooltipEl.style.left = `${Math.max(10, left)}px`;
    this.tooltipEl.style.top = `${Math.max(10, top)}px`;
  }

  private hideTooltip() {
    this.tooltipEl.classList.remove('show');
    this.tooltipEl.setAttribute('aria-hidden', 'true');
  }

  private formatDate(date: Date): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  private formatDateFull(date: Date): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  private setupResizeObserver() {
    const viewportWrapper = this.container.querySelector('.timeline-viewport');
    if (!viewportWrapper) return;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = Math.max(entry.contentRect.width || 1000, 700);
        if (Math.abs(newWidth - this.width) > 10) {
          this.width = newWidth;
          this.svg.attr('viewBox', `0 0 ${this.width} ${this.height}`);
          this.svg.select('#timeline-clip rect').attr('width', this.width);
          this.svg.select('.timeline-bg-catch').attr('width', this.width);
          this.timeScale.range([this.margin.left, this.width - this.margin.right]);
          this.currentXScale = this.timeScale.copy();
          this.render();
        }
      }
    });

    this.resizeObserver.observe(viewportWrapper);
  }

  private setupThemeObserver() {
    this.themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          this.render();
          if (this.selectedPubId) {
            const pub = RESEARCH_PUBLICATIONS.find((p) => p.id === this.selectedPubId);
            if (pub) this.updateInspector(pub);
          }
        }
      });
    });

    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  }

  public destroy() {
    this.resizeObserver?.disconnect();
    this.themeObserver?.disconnect();
  }
}

// Auto-mount when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const mountPoint = document.getElementById('d3-timeline-mount');
  if (mountPoint) {
    new ResearchTimelineComponent('d3-timeline-mount');
  }
});
