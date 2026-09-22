import { Component, input } from '@angular/core';
import { StatusBadgeComponent } from '../status-badge/status-badge';

@Component({
  selector: 'app-deployment-link',
  host: { class: 'flex flex-1 items-center justify-between rounded-xl bg-white p-5.5' },
  imports: [StatusBadgeComponent],
  templateUrl: './deployment-link.html',
})
export class DeploymentLinkComponent {
  label = input.required<string>();
  url = input.required<string>();
}
