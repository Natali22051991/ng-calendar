import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarPageComponent } from './calendar-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

const routes: Routes = [
  {
    path: '',
    component: CalendarPageComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/core/calendar/calendar.module').then(
            (m) => m.CalendarModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [CalendarPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatToolbarModule],
})
export class CalendarPageModule {}
