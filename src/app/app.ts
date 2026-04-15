import { AfterViewInit, Component, OnDestroy, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BenefitCardComponent } from './benefit-card/benefit-card.component';
import { SectionHeadingComponent } from './section-heading/section-heading.component';
import { ScheduleSectionComponent } from './schedule-section/schedule-section.component';
import { StoreCardComponent, type StoreProduct } from './store-card/store-card.component';

type StoreCategoryId = 'todos' | 'kimonos' | 'rashguards' | 'shorts' | 'faixas' | 'acessorios';
type StoreArtKind = 'kimono' | 'rashguard' | 'shorts' | 'faixa' | 'acessorio';

interface Stat {
  value: string;
  label: string;
}

interface Benefit {
  icon: string;
  text: string;
}

interface StoreCategory {
  id: StoreCategoryId;
  label: string;
}

interface StorePalette {
  base: string;
  accent: string;
  glow: string;
}

function assetPath(path: string): string {
  return `assets/${path}`;
}

function createStoreImages(folder: string, galleryCount: number): string[] {
  const cover = assetPath(`store/${folder}/cover.jpg`);
  const gallery = Array.from({ length: galleryCount }, (_, index) =>
    assetPath(`store/${folder}/gallery/${String(index + 1).padStart(2, '0')}.jpg`),
  );

  return [cover, ...gallery];
}

function createStoreProduct(
  product: Omit<StoreProduct, 'images'> & { folder: string; galleryCount: number },
): StoreProduct {
  const { folder, galleryCount, ...rest } = product;

  return {
    ...rest,
    images: createStoreImages(folder, galleryCount),
  };
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BenefitCardComponent, SectionHeadingComponent, ScheduleSectionComponent, StoreCardComponent],
  templateUrl: './app.landing.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly title = signal('gracie-barra');
  protected readonly isHeaderSticky = signal(false);
  protected readonly activeStoreCategory = signal<StoreCategoryId>('todos');
  protected readonly selectedProduct = signal<StoreProduct | null>(null);
  protected readonly selectedImageIndex = signal(0);
  protected readonly selectedVariantIndex = signal(0);

  protected readonly stats: Stat[] = [
    { value: '500+', label: 'Alunos' },
    { value: '15+', label: 'Anos' },
    { value: '8', label: 'Profs.' },
  ];

  protected readonly benefits: Benefit[] = [
    {
      icon: 'ri-shield-check-line',
      text: 'Metodologia Gracie Barra Oficial',
    },
    {
      icon: 'ri-group-line',
      text: 'Turmas para todas as idades',
    },
    {
      icon: 'ri-medal-line',
      text: 'Professores certificados',
    },
    {
      icon: 'ri-heart-pulse-line',
      text: 'Ambiente seguro e acolhedor',
    },
  ];

  protected readonly storeCategories: StoreCategory[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'kimonos', label: 'Kimonos' },
    { id: 'rashguards', label: 'Rash Guards' },
    { id: 'shorts', label: 'Shorts' },
    { id: 'faixas', label: 'Faixas' },
    { id: 'acessorios', label: 'Acessórios' },
  ];

  protected readonly storeProducts: StoreProduct[] = [
    createStoreProduct({
      id: 'kimono-branco',
      category: 'kimonos',
      categoryLabel: 'Kimonos',
      name: 'Kimono GB Adulto Branco',
      summary: 'Modelo tradicional com reforços, corte premium e acabamento oficial.',
      tags: ['Mais Vendido'],
      kind: 'kimono',
      palette: {
        base: '#f7f7f5',
        accent: '#d9d6cf',
        glow: '#ffffff',
      },
      folder: 'kimono-gb-adulto-branco',
      galleryCount: 4,
      sizeOptions: [
        { model: 'Tradicional', size: 'A1 - A3', value: 'R$ 349,90', installment: '10x de R$ 34,99' },
        { model: 'Slim Fit', size: 'A1L - A2L', value: 'R$ 369,90', installment: '10x de R$ 36,99' },
        { model: 'Competition', size: 'A0 - A2', value: 'R$ 389,90', installment: '10x de R$ 38,99', available: false },
      ],
    }),
    createStoreProduct({
      id: 'kimono-preto',
      category: 'kimonos',
      categoryLabel: 'Kimonos',
      name: 'Kimono GB Adulto Preto',
      summary: 'Versão preta com toque moderno e construção pensada para treinos intensos.',
      tags: ['Novo'],
      kind: 'kimono',
      palette: {
        base: '#111111',
        accent: '#2f2f34',
        glow: '#7c7f86',
      },
      folder: 'kimono-gb-adulto-preto',
      galleryCount: 4,
      sizeOptions: [
        { model: 'Tradicional', size: 'A1 - A3', value: 'R$ 369,90', installment: '10x de R$ 36,99' },
        { model: 'Premium', size: 'A1L - A2L', value: 'R$ 399,90', installment: '10x de R$ 39,99' },
        { model: 'Competition', size: 'A0 - A2', value: 'R$ 419,90', installment: '10x de R$ 41,99', available: false },
      ],
    }),
    createStoreProduct({
      id: 'rashguard-manga-longa',
      category: 'rashguards',
      categoryLabel: 'Rash Guards',
      name: 'Rash Guard Manga Longa',
      summary: 'Alta compressão, proteção extra e liberdade total para rolar e treinar.',
      tags: ['Oferta'],
      kind: 'rashguard',
      palette: {
        base: '#101010',
        accent: '#c21d1d',
        glow: '#f1c3b7',
      },
      folder: 'rash-guard-manga-longa',
      galleryCount: 3,
      sizeOptions: [
        { model: 'Classic', size: 'P - GG', value: 'R$ 189,90', installment: '10x de R$ 18,99' },
        { model: 'Pro', size: 'P - GG', value: 'R$ 219,90', installment: '10x de R$ 21,99' },
        { model: 'No-Gi', size: 'P - GG', value: 'R$ 239,90', installment: '10x de R$ 23,99', available: false },
      ],
    }),
    createStoreProduct({
      id: 'shorts-treino',
      category: 'shorts',
      categoryLabel: 'Shorts',
      name: 'Shorts de Treino GB',
      summary: 'Leve, resistente e com mobilidade ideal para treino funcional e no-gi.',
      tags: ['Promoção'],
      kind: 'shorts',
      palette: {
        base: '#151515',
        accent: '#242424',
        glow: '#e4d19c',
      },
      folder: 'shorts-gb',
      galleryCount: 4,
      sizeOptions: [
        { model: 'Curto', size: 'P - GG', value: 'R$ 149,90', installment: '10x de R$ 14,99' },
        { model: 'Largo', size: 'P - GG', value: 'R$ 159,90', installment: '10x de R$ 15,99' },
        { model: 'Premium', size: 'P - GG', value: 'R$ 179,90', installment: '10x de R$ 17,99', available: false },
      ],
    }),
    createStoreProduct({
      id: 'faixa-oficial',
      category: 'faixas',
      categoryLabel: 'Faixas',
      name: 'Faixa Oficial GB',
      summary: 'Faixa oficial com trama firme e cores de graduação para treino e cerimônia.',
      kind: 'faixa',
      palette: {
        base: '#1f1f1f',
        accent: '#c33d1c',
        glow: '#f5d28e',
      },
      folder: 'faixas',
      galleryCount: 3,
      sizeOptions: [
        { model: 'Branca', size: 'Único', value: 'R$ 49,90', installment: '10x de R$ 4,99' },
        { model: 'Cinza', size: 'Único', value: 'R$ 49,90', installment: '10x de R$ 4,99' },
        { model: 'Amarela', size: 'Único', value: 'R$ 49,90', installment: '10x de R$ 4,99' },
        { model: 'Laranja', size: 'Único', value: 'R$ 49,90', installment: '10x de R$ 4,99' },
        { model: 'Verde', size: 'Único', value: 'R$ 49,90', installment: '10x de R$ 4,99' },
        { model: 'Azul', size: 'Único', value: 'R$ 59,90', installment: '10x de R$ 5,99' },
        { model: 'Roxa', size: 'Único', value: 'R$ 59,90', installment: '10x de R$ 5,99' },
        { model: 'Marrom', size: 'Único', value: 'R$ 69,90', installment: '10x de R$ 6,99' },
        { model: 'Preta', size: 'Único', value: 'R$ 69,90', installment: '10x de R$ 6,99' },
      ],
    }),
    createStoreProduct({
      id: 'protetor-bucal-simples',
      category: 'acessorios',
      categoryLabel: 'Acessórios',
      name: 'Protetor Bucal Simples',
      summary: 'Proteção leve e confortável para treinos, rolas e atividades de contato.',
      tags: ['Novo'],
      kind: 'acessorio',
      palette: {
        base: '#191919',
        accent: '#b91c1c',
        glow: '#86a5d9',
      },
      folder: 'protetor-bucal-simples',
      galleryCount: 3,
      sizeOptions: [
        { model: 'Adulto', size: 'Único', value: 'R$ 39,90', installment: '10x de R$ 3,99' },
        { model: 'Junior', size: 'Único', value: 'R$ 34,90', installment: '10x de R$ 3,49' },
        { model: 'Premium', size: 'Único', value: 'R$ 49,90', installment: '10x de R$ 4,99', available: false },
      ],
    }),
  ];

  protected readonly visibleStoreProducts = computed(() =>
    this.activeStoreCategory() === 'todos'
      ? this.storeProducts
      : this.storeProducts.filter(product => product.category === this.activeStoreCategory()),
  );

  protected readonly selectedStoreImage = computed(() => {
    const product = this.selectedProduct();
    if (!product) {
      return '';
    }

    const modalImages = this.getModalImages(product);
    return modalImages[this.selectedImageIndex()] ?? modalImages[0] ?? '';
  });

  protected readonly selectedStoreImages = computed(() => {
    const product = this.selectedProduct();
    return product ? this.getModalImages(product) : [];
  });

  protected readonly selectedVariant = computed(() => {
    const product = this.selectedProduct();
    if (!product || product.sizeOptions.length === 0) {
      return null;
    }

    const current = product.sizeOptions[this.selectedVariantIndex()];
    if (current) {
      return current;
    }

    return product.sizeOptions[0] ?? null;
  });

  protected readonly unavailableVariantIndices = computed(() => {
    const product = this.selectedProduct();
    return product?.sizeOptions.map((variant, index) => (!variant.available ? index : -1)).filter(index => index >= 0) ?? [];
  });

  protected readonly hasUnavailableVariants = computed(() => this.unavailableVariantIndices().length > 0);

  protected readonly isStoreModalOpen = computed(() => this.selectedProduct() !== null);

  private readonly onScroll = (): void => {
    this.isHeaderSticky.set(window.scrollY > 8);
  };

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.selectedProduct()) {
      this.closeStoreModal();
    }
  };

  private previousBodyOverflow = '';

  ngAfterViewInit(): void {
    this.onScroll();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('keydown', this.onKeyDown);

    const video = document.querySelector('.hero-video') as HTMLVideoElement | null;
    if (video) {
      try {
        video.muted = true;
        video.setAttribute('muted', '');
        video.playsInline = true;
      } catch {
        // ignore
      }

      video.play().catch(err => {
        console.warn('Video play prevented or failed:', err);

        const hero = document.querySelector('.hero') ?? document.body;
        const overlay = document.createElement('div');
        overlay.className = 'video-play-overlay';
        overlay.innerHTML = '<button class="video-play-btn" aria-label="Play background video">▶</button>';
        hero.appendChild(overlay);

        const btn = overlay.querySelector('button');
        if (btn) {
          btn.addEventListener(
            'click',
            () => {
              try {
                video.muted = true;
                video.setAttribute('muted', '');
              } catch {
                // ignore
              }

              video
                .play()
                .then(() => overlay.remove())
                .catch(error => console.warn('Play after user gesture failed:', error));
            },
            { once: true },
          );
        }
      });
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('keydown', this.onKeyDown);
    this.unlockStoreScroll();
  }

  protected setActiveStoreCategory(category: StoreCategoryId): void {
    this.activeStoreCategory.set(category);
  }

  protected openStoreModal(product: StoreProduct): void {
    this.selectedProduct.set(product);
    this.selectedImageIndex.set(0);
    this.selectedVariantIndex.set(this.findFirstAvailableVariantIndex(product));
    this.lockStoreScroll();
  }

  protected closeStoreModal(): void {
    this.selectedProduct.set(null);
    this.selectedImageIndex.set(0);
    this.selectedVariantIndex.set(0);
    this.unlockStoreScroll();
  }

  protected selectStoreImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  protected selectStoreVariant(index: number): void {
    const product = this.selectedProduct();
    if (!product) {
      return;
    }

    const variant = product.sizeOptions[index];
    if (!variant?.available) {
      return;
    }

    this.selectedVariantIndex.set(index);
  }

  protected previousStoreImage(event?: Event): void {
    event?.stopPropagation();
    const product = this.selectedProduct();
    const modalImages = product ? this.getModalImages(product) : [];
    if (modalImages.length === 0) {
      return;
    }

    const nextIndex = (this.selectedImageIndex() - 1 + modalImages.length) % modalImages.length;
    this.selectedImageIndex.set(nextIndex);
  }

  protected nextStoreImage(event?: Event): void {
    event?.stopPropagation();
    const product = this.selectedProduct();
    const modalImages = product ? this.getModalImages(product) : [];
    if (modalImages.length === 0) {
      return;
    }

    const nextIndex = (this.selectedImageIndex() + 1) % modalImages.length;
    this.selectedImageIndex.set(nextIndex);
  }

  protected enterContact(): void {
    this.closeStoreModal();
    const target = document.querySelector('#contato');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected tagTone(tag: string): string {
    const normalized = tag.toLowerCase();

    if (normalized.includes('vend')) {
      return 'store-tag--hot';
    }

    if (normalized.includes('novo')) {
      return 'store-tag--new';
    }

    if (normalized.includes('ofert') || normalized.includes('promo')) {
      return 'store-tag--promo';
    }

    return 'store-tag--neutral';
  }

  private lockStoreScroll(): void {
    if (!this.previousBodyOverflow) {
      this.previousBodyOverflow = document.body.style.overflow;
    }

    document.body.style.overflow = 'hidden';
  }

  private unlockStoreScroll(): void {
    document.body.style.overflow = this.previousBodyOverflow;
    this.previousBodyOverflow = '';
  }

  private findFirstAvailableVariantIndex(product: StoreProduct): number {
    const firstAvailable = product.sizeOptions.findIndex(variant => variant.available !== false);
    return firstAvailable >= 0 ? firstAvailable : 0;
  }

  private getModalImages(product: StoreProduct): string[] {
    return product.images.slice(1).length > 0 ? product.images.slice(1) : product.images;
  }
}
