import { Component, input } from '@angular/core';

export type ChipIcon = 'check' | 'arrow';

@Component({
  selector: 'app-chip',
  host: {
    class:
      'flex items-center gap-2 rounded-md border border-hairline bg-white px-3.5 py-3.5 text-[12px] text-ink',
  },
  templateUrl: './chip.html',
})
export class ChipComponent {
  icon = input<ChipIcon>('check');
  label = input.required<string>();
}
