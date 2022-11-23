import { NgModule } from '@angular/core';
import { SwitchEditComponent } from './components/switch-edit/switch-edit.component';
import { SwitchEditContentComponent } from './components/switch-edit-content/switch-edit-content.component';
import {
  SwitchEditContentEditorComponent
} from './components/switch-edit-content-editor/switch-edit-content-editor.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    SwitchEditComponent,
    SwitchEditContentComponent,
    SwitchEditContentEditorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SwitchEditComponent,
    SwitchEditContentComponent,
    SwitchEditContentEditorComponent  ]
})
export class AppCommonModule { }