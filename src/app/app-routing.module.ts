import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './user-interface/components/home/home.component';
import { AuthGuard } from './guards/common/auth.guard';

const routes: Routes = [
  {
    path: "admin", component: LayoutComponent, children: [
      { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
      { path: "customers", loadChildren: () => import("./admin/components/customers/customers.module").then(module => module.CustomersModule), canActivate: [AuthGuard] },
      { path: "orders", loadChildren: () => import("./admin/components/orders/orders.module").then(module => module.OrdersModule), canActivate: [AuthGuard] },
      { path: "products", loadChildren: () => import("./admin/components/admin-products/admin-products.module").then(module => module.AdminProductsModule), canActivate: [AuthGuard] },
      { path: "authorizemenu", loadChildren: () => import("./admin/authorize-menu/authorize-menu.module").then(module => module.AuthorizeMenuModule), canActivate: [AuthGuard] },
      { path: "roles", loadChildren: () => import("./admin/components/role/role.module").then(module => module.RoleModule), canActivate: [AuthGuard] },
      { path: "users", loadChildren: () => import("./admin/components/user/user.module").then(module => module.UserModule), canActivate: [AuthGuard] },
    ], canActivate: [AuthGuard]
  },
  { path: "", component: HomeComponent },
  { path: "products", loadChildren: () => import("./user-interface/components/products/products.module").then(module => module.ProductsModule) },
  { path: "products/:pageNo", loadChildren: () => import("./user-interface/components/products/products.module").then(module => module.ProductsModule) },
  { path: "basket", loadChildren: () => import("./user-interface/components/baskets/baskets.module").then(module => module.BasketsModule) },
  { path: "register", loadChildren: () => import("./user-interface/components/register/register.module").then(module => module.RegisterModule) },
  { path: "login", loadChildren: () => import("./user-interface/components/login/login.module").then(module => module.LoginModule) },
  { path: "logout", loadChildren: () => import("./logout/logout.module").then(module => module.LogoutModule) },
  { path: "forgetpassword", loadChildren: () => import("./user-interface/components/forget-password/forget-password.module").then(module => module.ForgetPasswordModule) },
  { path: "resetpassword/:userId/:resetToken", loadChildren: () => import("./user-interface/components/reset-password/reset-password.module").then(module => module.ResetPasswordModule) }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
