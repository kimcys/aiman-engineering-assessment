import { Component, inject } from '@angular/core';
import { ChapterSpyService } from '../../core/chapter-spy';
import { StatusBadgeComponent } from '../../ui/status-badge/status-badge';

interface ChapterLink {
  index: number;
  category: string;
}

@Component({
  selector: 'app-nav',
  host: { class: 'sticky top-0 z-20 block w-full border-b border-hairline bg-white' },
  imports: [StatusBadgeComponent],
  templateUrl: './nav.html',
})
export class NavComponent {
  readonly spy = inject(ChapterSpyService);

  readonly chapters: ChapterLink[] = [
    { index: 1, category: 'Delivery systems' },
    { index: 2, category: 'Image engineering' },
    { index: 3, category: 'Pipeline design' },
    { index: 4, category: 'Runtime security' },
    { index: 5, category: 'Supply-chain hardening' },
    { index: 6, category: 'Production incident' },
    { index: 7, category: 'Distributed work' },
    { index: 8, category: 'Resilience engineering' },
  ];

  goTo(index: number): void {
    this.spy.scrollTo(index);
  }
}
