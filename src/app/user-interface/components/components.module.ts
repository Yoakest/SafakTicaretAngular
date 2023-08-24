import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ForgetPasswordModule } from './forget-password/forget-password.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordModule } from './reset-password/reset-password.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketsModule,
    RegisterModule,
    LoginModule,
    ForgetPasswordModule,
    ResetPasswordModule
  ],
  exports: [
    BasketsModule
  ]
})
export class ComponentsModule { }
