import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './calendar.component';
import { RouterModule, Routes } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoteComponent } from '../notes/note.component';
import { ShortDayComponent } from '../short-day/short-day.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class CalendarModule {}
