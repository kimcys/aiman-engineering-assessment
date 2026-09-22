import { Component } from '@angular/core';
import { DeploymentLinkComponent } from '../../ui/deployment-link/deployment-link';
import { IconComponent } from '../../ui/icon/icon';

@Component({
  selector: 'app-closing',
  host: { class: 'block w-full bg-accent px-6 py-16 text-white sm:px-12 sm:py-24' },
  imports: [DeploymentLinkComponent, IconComponent],
  templateUrl: './closing.html',
})
export class ClosingComponent {
  readonly year = new Date().getFullYear();
}
