import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-switch-edit-content-editor',
  templateUrl: './switch-edit-content-editor.component.html',
  styleUrls: ['./switch-edit-content-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchEditContentEditorComponent {

  @HostBinding('class.hidden')
  public isHidden = true;

  constructor() { }

}
