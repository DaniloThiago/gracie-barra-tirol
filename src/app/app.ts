import { Component, signal, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.landing.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('gracie-barra');

  protected stats: Stat[] = [
    { value: '500+', label: 'Alunos Ativos' },
    { value: '15+',  label: 'Anos de Experiência' },
    { value: '8',    label: 'Professores Certificados' },
    { value: '3x',   label: 'Campeões Estaduais' },
  ];

  ngAfterViewInit(): void {
    const video = document.querySelector('.hero-video') as HTMLVideoElement | null;
      if (video) {
        // Ensure the muted attribute/property is set before attempting play
        try {
          video.muted = true;
          video.setAttribute('muted', '');
          video.playsInline = true;
        } catch (e) {
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
            btn.addEventListener('click', () => {
              try { video.muted = true; video.setAttribute('muted', ''); } catch (e) {}
              video.play().then(() => overlay.remove()).catch(e => console.warn('Play after user gesture failed:', e));
            }, { once: true });
          }
        });
    }
  }
}
