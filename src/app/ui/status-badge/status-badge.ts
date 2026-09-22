import { Component, input } from '@angular/core';

export type StatusBadgeTone = 'accent' | 'neutral';

@Component({
  selector: 'app-status-badge',
  host: { class: 'inline-flex' },
  templateUrl: './status-badge.html',
})
export class StatusBadgeComponent {
  label = input.required<string>();
  tone = input<StatusBadgeTone>('accent');
}
