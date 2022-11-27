import { NgModule } from '@angular/core';
import { SwitchEditComponent } from './components/switch-edit/switch-edit.component';
import { SwitchEditContentComponent } from './components/switch-edit-content/switch-edit-content.component';
import { SwitchEditContentEditorComponent } from './components/switch-edit-content-editor/switch-edit-content-editor.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FilterTaskPipe } from './pipes/filter-task.pipe';
import { BadgeComponent } from './components/badge/badge.component';

@NgModule({
  declarations: [
    SwitchEditComponent,
    SwitchEditContentComponent,
    SwitchEditContentEditorComponent,
    FilterTaskPipe,
    BadgeComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    SwitchEditComponent,
    SwitchEditContentComponent,
    SwitchEditContentEditorComponent,
    FilterTaskPipe,
    BadgeComponent
  ]
})
export class AppCommonModule {}
