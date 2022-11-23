import { ChangeDetectionStrategy, Component, ContentChild, OnInit } from '@angular/core';
import { SwitchEditContentComponent } from '../switch-edit-content/switch-edit-content.component';
import { SwitchEditContentEditorComponent } from '../switch-edit-content-editor/switch-edit-content-editor.component';
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';
import { DestroyService } from '../../destroy';

@Component({
  selector: 'app-switch-edit',
  templateUrl: './switch-edit.component.html',
  styleUrls: ['./switch-edit.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchEditComponent extends DestroyService implements OnInit {

  @ContentChild(SwitchEditContentComponent, {static: true})
  content!: SwitchEditContentComponent;

  @ContentChild(SwitchEditContentEditorComponent, {static: true})
  editor!: SwitchEditContentEditorComponent;

  private readonly _isEdit$ = new BehaviorSubject(false);
  public readonly isEdit$: Observable<boolean> = this._isEdit$;

  constructor(
    private readonly _destroy$: DestroyService
  ) {
    super();
  }

  ngOnInit(): void {
    this._isEdit$.pipe(
      takeUntil(this._destroy$)
    ).subscribe(state => {
      this.content.isHidden = state;
      this.editor.isHidden = !state;
    })
  }

  changeState(state = true) {
    this._isEdit$.next(state);
  }
}
