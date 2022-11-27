import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {

  @Input()
  content!: string | number | null | undefined;

  @Input()
  color!: string;

  @HostBinding('class.hidden')
  get isHidden() {
    return !this.content;
  }

  constructor() {
  }

}
