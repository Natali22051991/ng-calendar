import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './components/main.page/main.page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: MainPageComponent
    }])
  ]
})
export class MainModule { }
