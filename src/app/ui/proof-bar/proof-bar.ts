import { Component, input } from '@angular/core';

@Component({
  selector: 'app-proof-bar',
  host: { '[class]': 'classes()' },
  templateUrl: './proof-bar.html',
})
export class ProofBarComponent {
  tone = input<'neutral' | 'accent'>('neutral');

  classes(): string {
    const base = 'flex w-full items-center justify-between gap-4 rounded-xl border p-6';
    const tone =
      this.tone() === 'accent' ? 'border-accent bg-accent-soft' : 'border-hairline bg-white';
    return `${base} ${tone}`;
  }
}
