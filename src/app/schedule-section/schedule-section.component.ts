import { computed, Component, signal } from '@angular/core';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';

type ScheduleDayId = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado';
type SessionVariant = 'adulto' | 'feminino' | 'infantil' | 'open';

interface ScheduleSession {
  time: string;
  duration: string;
  title: string;
  instructor: string;
  level: string;
  variant: SessionVariant;
}

interface ScheduleDay {
  id: ScheduleDayId;
  label: string;
  sessions: ScheduleSession[];
}

interface LegendItem {
  label: string;
  variant: SessionVariant;
}

@Component({
  selector: 'app-schedule-section',
  standalone: true,
  imports: [SectionHeadingComponent],
  templateUrl: './schedule-section.component.html',
  styleUrl: './schedule-section.component.scss',
})
export class ScheduleSectionComponent {
  protected readonly activeDay = signal<ScheduleDayId>('segunda');

  protected readonly days: ScheduleDay[] = [
    {
      id: 'segunda',
      label: 'Segunda',
      sessions: [
        {
          time: '06:30',
          duration: '60 min',
          title: 'Jiu Jitsu Adulto',
          instructor: 'Prof. Ricardo',
          level: 'Todos os níveis',
          variant: 'adulto',
        },
        {
          time: '09:00',
          duration: '60 min',
          title: 'Jiu Jitsu Feminino',
          instructor: 'Prof. Ana',
          level: 'Todos os níveis',
          variant: 'feminino',
        },
        {
          time: '12:00',
          duration: '60 min',
          title: 'Jiu Jitsu Adulto',
          instructor: 'Prof. Ricardo',
          level: 'Todos os níveis',
          variant: 'adulto',
        },
        {
          time: '18:30',
          duration: '45 min',
          title: 'Jiu Jitsu Infantil',
          instructor: 'Prof. Lucas',
          level: 'Crianças 5-12 anos',
          variant: 'infantil',
        },
        {
          time: '19:30',
          duration: '90 min',
          title: 'Jiu Jitsu Adulto',
          instructor: 'Prof. Ricardo',
          level: 'Todos os níveis',
          variant: 'adulto',
        },
        {
          time: '21:00',
          duration: '60 min',
          title: 'Jiu Jitsu Avançado',
          instructor: 'Prof. Ricardo',
          level: 'Faixa Azul+',
          variant: 'open',
        },
      ],
    },
    {
      id: 'terca',
      label: 'Terça',
      sessions: [
        {
          time: '06:30',
          duration: '60 min',
          title: 'Jiu Jitsu Adulto',
          instructor: 'Prof. Ricardo',
          level: 'Todos os níveis',
          variant: 'adulto',
        },
        {
          time: '09:00',
          duration: '60 min',
          title: 'Jiu Jitsu Adulto',
          instructor: 'Prof. Ana',
          level: 'Todos os níveis',
          variant: 'adulto',
        },
        {
          time: '18:30',
          duration: '45 min',
          title: 'Jiu Jitsu Infantil',
          instructor: 'Prof. Lucas',
          level: 'Crianças 5-12 anos',
          variant: 'infantil',
        },
        {
          time: '19:30',
          duration: '90 min',
          title: 'Jiu Jitsu Adulto',
          instructor: 'Prof. Ricardo',
          level: 'Todos os níveis',
          variant: 'adulto',
        },
      ],
    },
    {
      id: 'quarta',
      label: 'Quarta',
      sessions: [
        {
          time: '06:30',
          duration: '60 min',
          title: 'Jiu Jitsu Adulto',
          instructor: 'Prof. Ricardo',
          level: 'Todos os níveis',
          variant: 'adulto',
        },
        {
          time: '09:00',
          duration: '60 min',
          title: 'Jiu Jitsu Feminino',
          instructor: 'Prof. Ana',
          level: 'Todos os níveis',
          variant: 'feminino',
        },
        {
          time: '12:00',
          duration: '60 min',
          title: 'Jiu Jitsu Adulto',
          instructor: 'Prof. Ricardo',
          level: 'Todos os níveis',
          variant: 'adulto',
        },
        {
          time: '18:30',
          duration: '45 min',
          title: 'Jiu Jitsu Infantil',
          instructor: 'Prof. Lucas',
          level: 'Crianças 5-12 anos',
          variant: 'infantil',
        },
        {
          time: '19:30',
          duration: '90 min',
          title: 'Jiu Jitsu Adulto',
          instructor: 'Prof. Ricardo',
          level: 'Todos os níveis',
          variant: 'adulto',
        },
      ],
    },
    {
      id: 'quinta',
      label: 'Quinta',
      sessions: [
        {
          time: '06:30',
          duration: '60 min',
          title: 'Jiu Jitsu Adulto',
          instructor: 'Prof. Ricardo',
          level: 'Todos os níveis',
          variant: 'adulto',
        },
        {
          time: '09:00',
          duration: '60 min',
          title: 'Jiu Jitsu Adulto',
          instructor: 'Prof. Ana',
          level: 'Todos os níveis',
          variant: 'adulto',
        },
        {
          time: '18:30',
          duration: '45 min',
          title: 'Jiu Jitsu Infantil',
          instructor: 'Prof. Lucas',
          level: 'Crianças 5-12 anos',
          variant: 'infantil',
        },
        {
          time: '19:30',
          duration: '90 min',
          title: 'Jiu Jitsu Adulto',
          instructor: 'Prof. Ricardo',
          level: 'Todos os níveis',
          variant: 'adulto',
        },
      ],
    },
    {
      id: 'sexta',
      label: 'Sexta',
      sessions: [
        {
          time: '06:30',
          duration: '60 min',
          title: 'Jiu Jitsu Adulto',
          instructor: 'Prof. Ricardo',
          level: 'Todos os níveis',
          variant: 'adulto',
        },
        {
          time: '09:00',
          duration: '60 min',
          title: 'Jiu Jitsu Feminino',
          instructor: 'Prof. Ana',
          level: 'Todos os níveis',
          variant: 'feminino',
        },
        {
          time: '12:00',
          duration: '60 min',
          title: 'Jiu Jitsu Adulto',
          instructor: 'Prof. Ricardo',
          level: 'Todos os níveis',
          variant: 'adulto',
        },
        {
          time: '18:30',
          duration: '45 min',
          title: 'Jiu Jitsu Infantil',
          instructor: 'Prof. Lucas',
          level: 'Crianças 5-12 anos',
          variant: 'infantil',
        },
        {
          time: '19:30',
          duration: '90 min',
          title: 'Jiu Jitsu Adulto',
          instructor: 'Prof. Ricardo',
          level: 'Todos os níveis',
          variant: 'adulto',
        },
      ],
    },
    {
      id: 'sabado',
      label: 'Sábado',
      sessions: [
        {
          time: '09:00',
          duration: '90 min',
          title: 'Jiu Jitsu Adulto',
          instructor: 'Prof. Ricardo',
          level: 'Todos os níveis',
          variant: 'adulto',
        },
        {
          time: '10:30',
          duration: '60 min',
          title: 'Jiu Jitsu Infantil',
          instructor: 'Prof. Lucas',
          level: 'Crianças 5-12 anos',
          variant: 'infantil',
        },
        {
          time: '11:30',
          duration: '60 min',
          title: 'Open Mat',
          instructor: 'Todos os Profs.',
          level: 'Faixa Azul+',
          variant: 'open',
        },
      ],
    },
  ];

  protected readonly activeDayInfo = computed(() => {
    const current = this.days.find(day => day.id === this.activeDay());
    return current ?? this.days[0];
  });

  protected readonly legend: LegendItem[] = [
    { label: 'Adulto', variant: 'adulto' },
    { label: 'Feminino', variant: 'feminino' },
    { label: 'Infantil', variant: 'infantil' },
    { label: 'Avançado / Open Mat', variant: 'open' },
  ];

  protected setActiveDay(day: ScheduleDayId): void {
    this.activeDay.set(day);
  }
}
