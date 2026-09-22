import { Component, input, signal } from '@angular/core';
import { StatusBadgeComponent } from '../status-badge/status-badge';

@Component({
  selector: 'app-code-panel',
  host: { class: 'flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-white' },
  imports: [StatusBadgeComponent],
  templateUrl: './code-panel.html',
})
export class CodePanelComponent {
  filename = input.required<string>();
  lines = input.required<string[]>();

  readonly copied = signal(false);

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.lines().join('\n'));
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch {
      // Clipboard access can be denied by the browser; the toolbar badge
      // simply won't flip to "COPIED" in that case.
    }
  }
}
