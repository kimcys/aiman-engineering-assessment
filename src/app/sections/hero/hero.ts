import { Component } from '@angular/core';
import { StatusBadgeComponent } from '../../ui/status-badge/status-badge';

interface TerminalLine {
  text: string;
  accent?: boolean;
}

@Component({
  selector: 'app-hero',
  host: { class: 'block w-full bg-white' },
  imports: [StatusBadgeComponent],
  templateUrl: './hero.html',
})
export class HeroComponent {
  readonly terminalLines: TerminalLine[] = [
    { text: '$ git push origin main', accent: true },
    { text: '✓ test unit + integration' },
    { text: '✓ scan final images clean' },
    { text: '✓ build immutable SHA tags' },
    { text: '✓ deploy compose rollout' },
    { text: '✓ verify health checks passing' },
    { text: 'deployment complete_', accent: true },
  ];
}
