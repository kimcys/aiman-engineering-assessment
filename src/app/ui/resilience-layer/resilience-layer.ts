import { Component, input } from '@angular/core';

@Component({
  selector: 'app-resilience-layer',
  host: { class: 'block' },
  templateUrl: './resilience-layer.html',
})
export class ResilienceLayerComponent {
  label = input.required<string>();
  active = input(false);
}
