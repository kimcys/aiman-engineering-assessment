import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChapterSpyService {
  readonly active = signal(1);

  private readonly visibility = new Map<number, number>();

  report(index: number, ratio: number): void {
    this.visibility.set(index, ratio);

    let best = this.active();
    let bestRatio = 0;
    for (const [chapter, chapterRatio] of this.visibility) {
      if (chapterRatio > bestRatio) {
        bestRatio = chapterRatio;
        best = chapter;
      }
    }
    if (bestRatio > 0) {
      this.active.set(best);
    }
  }

  scrollTo(index: number): void {
    document.getElementById(`chapter-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
