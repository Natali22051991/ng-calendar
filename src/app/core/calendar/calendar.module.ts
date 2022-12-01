import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './calendar.component';
import { RouterModule, Routes } from '@angular/router';
import { NoteComponent } from '../notes/note.component';
import { ShortDayComponent } from '../short-day/short-day.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppCommonModule } from '../../common/app-common.module';
import { WorkingShiftsComponent } from '../working-shifts/working-shifts.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
  },
];

@NgModule({
  declarations: [
    CalendarComponent,
    NoteComponent,
    ShortDayComponent,
    WorkingShiftsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AppCommonModule,
  ],
})
export class CalendarModule {}
