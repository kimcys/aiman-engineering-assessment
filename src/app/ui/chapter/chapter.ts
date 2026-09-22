import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  input,
  inject,
  signal,
} from '@angular/core';
import { ChapterSpyService } from '../../core/chapter-spy';
import { IconComponent } from '../icon/icon';

@Component({
  selector: 'app-chapter',
  host: {
    '[id]': '"chapter-" + index()',
    '[class]': 'classes()',
    style: 'scroll-margin-top: 72px',
  },
  imports: [IconComponent],
  templateUrl: './chapter.html',
})
export class ChapterComponent implements AfterViewInit, OnDestroy {
  index = input.required<number>();
  total = input(8);
  category = input.required<string>();
  question = input.required<string>();
  tinted = input(false);

  readonly expanded = signal(true);

  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly spy = inject(ChapterSpyService);
  private observer?: IntersectionObserver;

  toggle(): void {
    this.expanded.update((value) => !value);
  }

  classes(): string {
    const bg = this.tinted() ? 'bg-tint' : 'bg-white';
    return `block w-full border-t border-hairline px-6 py-16 sm:px-12 lg:py-26 ${bg}`;
  }

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      // Not available in the test/jsdom environment — scroll-spy is a
      // progressive enhancement, the page works fine without it.
      return;
    }
    this.observer = new IntersectionObserver(
      ([entry]) => this.spy.report(this.index(), entry.isIntersecting ? entry.intersectionRatio : 0),
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
