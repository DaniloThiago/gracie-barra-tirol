import { AfterViewInit, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BenefitCardComponent } from './benefit-card/benefit-card.component';
import { SectionHeadingComponent } from './section-heading/section-heading.component';
import { ScheduleSectionComponent } from './schedule-section/schedule-section.component';

interface Stat {
  value: string;
  label: string;
}

interface Benefit {
  icon: string;
  text: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BenefitCardComponent, SectionHeadingComponent, ScheduleSectionComponent],
  templateUrl: './app.landing.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  protected readonly title = signal('gracie-barra');

  protected stats: Stat[] = [
    { value: '500+', label: 'Alunos' },
    { value: '15+', label: 'Anos' },
    { value: '8', label: 'Profs.' },
  ];

  protected benefits: Benefit[] = [
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

  ngAfterViewInit(): void {
    const video = document.querySelector('.hero-video') as HTMLVideoElement | null;
    if (video) {
      // Ensure the muted attribute/property is set before attempting play
      try {
        video.muted = true;
        video.setAttribute('muted', '');
        video.playsInline = true;
      } catch {
        // ignore
      }

      video.play().catch(err => {
        console.warn('Video play prevented or failed:', err);

        // Create a lightweight overlay with a play button so the user can start playback
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
                .catch(e => console.warn('Play after user gesture failed:', e));
            },
            { once: true },
          );
        }
      });
    }
  }
}
