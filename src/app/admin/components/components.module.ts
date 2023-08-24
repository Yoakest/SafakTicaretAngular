import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminProductsModule } from './admin-products/admin-products.module';
import { DeleteDirectiveModule } from '../directives/delete-directive.module';
import { UserModule } from './user/user.module';



@NgModule({
  declarations: [  

  ],
  imports: [
    AdminProductsModule,
    CommonModule,
    OrdersModule,
    CustomersModule,
    DashboardModule,
    DeleteDirectiveModule,
    UserModule
  ]
})
export class ComponentsModule { }
