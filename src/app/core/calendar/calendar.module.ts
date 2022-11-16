import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './calendar.component';
import { RouterModule, Routes } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoteComponent } from '../notes/note.component';
import { ShortDayComponent } from '../short-day/short-day.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
  },
];

@NgModule({
  declarations: [CalendarComponent, NoteComponent, ShortDayComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class CalendarModule {}
