import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from '../products/list/list.component';
import { ProductsModule } from '../products/products.module';



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: "", component: HomeComponent
    }])
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
