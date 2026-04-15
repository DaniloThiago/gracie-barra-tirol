import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  templateUrl: './section-heading.component.html',
  styleUrl: './section-heading.component.scss',
})
export class SectionHeadingComponent {
  @Input() id = '';
  @Input({ required: true }) eyebrow = '';
  @Input({ required: true }) title = '';
  @Input() inverse = false;
  @Input() compact = false;
}
