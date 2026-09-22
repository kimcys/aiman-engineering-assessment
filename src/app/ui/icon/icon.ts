import { Component, input } from '@angular/core';

export type IconName = 'minus' | 'arrow-right' | 'arrow-up-right';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
})
export class IconComponent {
  name = input.required<IconName>();
  sizeClass = input('size-4');
}
