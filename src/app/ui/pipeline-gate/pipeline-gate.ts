import { Component, input } from '@angular/core';

@Component({
  selector: 'app-pipeline-gate',
  host: { class: 'flex-1' },
  templateUrl: './pipeline-gate.html',
})
export class PipelineGateComponent {
  order = input.required<string>();
  label = input.required<string>();
  active = input(false);
}
