import { Component, input } from '@angular/core';

@Component({
  selector: 'app-resource-meter',
  host: { class: 'block h-2 w-full overflow-hidden rounded-full bg-hairline' },
  templateUrl: './resource-meter.html',
})
export class ResourceMeterComponent {
  /** 0–100 */
  percent = input.required<number>();
}
