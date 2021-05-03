import { Error404Component } from './errors/error404/error404.component';
import { Error0Component } from './errors/error0/error0.component';
import { Error500Component } from './errors/error500/error500.component';
import { ChangePasswordComponent } from './authSystem/change-password/change-password.component';
import { ForgetPasswordComponent } from './authSystem/forget-password/forget-password.component';
import { RegisterComponent } from './authSystem/register/register.component';
import { LoginComponent } from './authSystem/login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { StoreProductsComponent } from './store-products/store-products.component';
import { MainViewComponent } from './main-view/main-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
  },
  // {
  //   path: 'Admin-Products',
  //   component: AdminProductsComponent,
  // },
  {
    path: 'Products',
    component: StoreProductsComponent,
  },
  {
    path: 'Past-Orders',
    component: CheckoutComponent,
  },
  {
    path: 'Checkout',
    component: CheckoutComponent,
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Register',
    component: RegisterComponent,
  },
  {
    path: 'Forget-Password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'Change-Password',
    component: ChangePasswordComponent,
  },
  {
    path: 'Error500',
    component: Error500Component,
  },
  {
    path: 'ConnectionError',
    component: Error0Component,
  },
  {
    path: '**',
    component: Error404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
