import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-switch-edit-content',
  templateUrl: './switch-edit-content.component.html',
  styleUrls: ['./switch-edit-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchEditContentComponent {

  @HostBinding('class.hidden')
  public isHidden = false;

  constructor() { }

}
