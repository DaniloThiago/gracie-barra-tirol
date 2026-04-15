import { Component, EventEmitter, Input, Output } from '@angular/core';

export type StoreCategoryId = 'todos' | 'kimonos' | 'rashguards' | 'shorts' | 'faixas' | 'acessorios';
export type StoreArtKind = 'kimono' | 'rashguard' | 'shorts' | 'faixa' | 'acessorio';

export interface StoreSizeOption {
  model: string;
  size: string;
  value: string;
  installment: string;
  available?: boolean;
}

export interface StorePalette {
  base: string;
  accent: string;
  glow: string;
}

export interface StoreProduct {
  id: string;
  category: Exclude<StoreCategoryId, 'todos'>;
  categoryLabel: string;
  name: string;
  summary: string;
  tags?: string[];
  palette: StorePalette;
  kind: StoreArtKind;
  images: string[];
  sizeOptions: StoreSizeOption[];
}

@Component({
  selector: 'app-store-card',
  standalone: true,
  templateUrl: './store-card.component.html',
  styleUrl: './store-card.component.scss',
})
export class StoreCardComponent {
  @Input({ required: true }) product!: StoreProduct;
  @Output() view = new EventEmitter<StoreProduct>();

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

  protected emitView(): void {
    this.view.emit(this.product);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    this.emitView();
  }
}
