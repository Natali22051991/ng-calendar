import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CalendarPageComponent } from './calendar-page.component';
import { RouterModule, Routes } from '@angular/router';

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
  imports: [CommonModule, RouterModule.forChild(routes), IonicModule],
})
export class CalendarPageModule {}
