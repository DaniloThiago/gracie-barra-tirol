import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';

interface Testimonial {
  id: number;
  badge: string;
  quote: string;
  author: string;
  belt: string;
}

interface TestimonialStat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.scss',
})
export class TestimonialsSectionComponent implements OnInit, OnDestroy {
  protected readonly autoRotateEnabled = true;
  protected readonly autoRotateIntervalMs = 6000;

  protected readonly testimonials: Testimonial[] = [
    {
      id: 1,
      badge: 'Faixa Azul - 5 anos na academia',
      quote:
        'Treino na Gracie Barra Tirol ha 5 anos e posso dizer que e a melhor academia da regiao. A metodologia Gracie Barra e impecavel, os professores sao altamente qualificados e o ambiente e sempre limpo e organizado.',
      author: 'Roberto Silva',
      belt: 'Faixa Roxa',
    },
    {
      id: 2,
      badge: 'Faixa Azul - competicao',
      quote:
        'A Gracie Barra Tirol transformou minha vida. Comecei sem nenhuma experiencia em artes marciais e hoje ja tenho minha faixa azul. Os professores sao atenciosos e a evolucao acontece de verdade.',
      author: 'Carlos Mendonca',
      belt: 'Faixa Azul',
    },
    {
      id: 3,
      badge: 'Faixa Branca - turma feminina',
      quote:
        'Entrei com medo de nao conseguir acompanhar as aulas, mas a turma e super acolhedora. Perdi peso, ganhei confianca e me sinto muito mais forte a cada semana.',
      author: 'Ana Paula Ferreira',
      belt: 'Faixa Branca',
    },
    {
      id: 4,
      badge: 'Faixa Branca - infantil',
      quote:
        'Comecei o Jiu Jitsu para aprender defesa pessoal e me surpreendi com tudo. A disciplina, o respeito e a evolucao sao visiveis desde os primeiros treinos.',
      author: 'Juliana Costa',
      belt: 'Faixa Branca',
    },
    {
      id: 5,
      badge: 'Faixa Azul - no gi',
      quote:
        'Meu filho e eu treinamos juntos na Gracie Barra Tirol. E uma experiencia unica poder compartilhar esse esporte com alguem da familia e ver a evolucao de perto.',
      author: 'Marcos Oliveira',
      belt: 'Faixa Azul',
    },
    {
      id: 6,
      badge: 'Faixa Laranja - no gi',
      quote:
        'Meu filho e eu treinamos juntos na Gracie Barra Tirol. E uma experiencia unica.',
      author: 'Danilo Oliveira',
      belt: 'Faixa Laranja',
    },
  ];

  protected readonly stats: TestimonialStat[] = [
    { value: '500+', label: 'Alunos ativos' },
    { value: '98%', label: 'Satisfacao' },
    { value: '15+', label: 'Anos de historia' },
    { value: '4.9', label: 'Avaliacao media' },
  ];

  protected readonly activeTestimonialIndex = signal(0);
  private autoRotateHandle: ReturnType<typeof setInterval> | null = null;

  protected readonly activeTestimonial = computed(() => {
    const currentIndex = this.activeTestimonialIndex();
    return this.testimonials[currentIndex] ?? this.testimonials[0];
  });

  ngOnInit(): void {
    this.startAutoRotate();
  }

  ngOnDestroy(): void {
    this.stopAutoRotate();
  }

  protected setActiveTestimonial(index: number): void {
    if (index < 0 || index >= this.testimonials.length) {
      return;
    }

    this.activeTestimonialIndex.set(index);
    this.restartAutoRotate();
  }

  protected isActive(index: number): boolean {
    return index === this.activeTestimonialIndex();
  }

  protected nextTestimonial(): void {
    const nextIndex = (this.activeTestimonialIndex() + 1) % this.testimonials.length;
    this.activeTestimonialIndex.set(nextIndex);
  }

  private startAutoRotate(): void {
    if (!this.autoRotateEnabled || this.testimonials.length < 2) {
      return;
    }

    this.stopAutoRotate();
    this.autoRotateHandle = setInterval(() => this.nextTestimonial(), this.autoRotateIntervalMs);
  }

  private stopAutoRotate(): void {
    if (this.autoRotateHandle === null) {
      return;
    }

    clearInterval(this.autoRotateHandle);
    this.autoRotateHandle = null;
  }

  private restartAutoRotate(): void {
    if (!this.autoRotateEnabled || this.testimonials.length < 2) {
      return;
    }

    this.stopAutoRotate();
    this.startAutoRotate();
  }
}
