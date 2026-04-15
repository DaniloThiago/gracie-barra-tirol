import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-benefit-card',
  standalone: true,
  templateUrl: './benefit-card.component.html',
  styleUrl: './benefit-card.component.scss',
})
export class BenefitCardComponent {
  @Input({ required: true }) icon = '';
  @Input({ required: true }) text = '';
}
