import { Component, input } from '@angular/core';

@Component({
  selector: 'app-timeline-event',
  host: { class: 'flex flex-1 flex-col gap-3' },
  templateUrl: './timeline-event.html',
})
export class TimelineEventComponent {
  time = input.required<string>();
  phase = input.required<string>();
  detail = input.required<string>();
}
