import { Component, input } from '@angular/core';

@Component({
  selector: 'app-evidence-card',
  host: { class: 'flex h-full flex-col gap-4 rounded-xl border border-hairline bg-white p-6' },
  templateUrl: './evidence-card.html',
})
export class EvidenceCardComponent {
  title = input.required<string>();
}
