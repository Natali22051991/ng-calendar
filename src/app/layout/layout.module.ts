import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default.layout/default.layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DefaultLayoutComponent
  ],
  exports: [
    DefaultLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      loadChildren:() => import('../pages/main/main.module').then(m => m.MainModule)
    }])

  ]
})
export class LayoutModule { }
