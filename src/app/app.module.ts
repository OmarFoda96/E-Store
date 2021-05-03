import { TokenInterceptor } from './authSystem/services/token.interceptor';
import { Error500Component } from './errors/error500/error500.component';
import { Error404Component } from './errors/error404/error404.component';
import { Error0Component } from './errors/error0/error0.component';
import { ChangePasswordComponent } from './authSystem/change-password/change-password.component';
import { ForgetPasswordComponent } from './authSystem/forget-password/forget-password.component';
import { RegisterComponent } from './authSystem/register/register.component';
import { LoginComponent } from './authSystem/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { StoreProductsComponent } from './store-products/store-products.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainViewComponent } from './main-view/main-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { CountComponent } from './shared/count/count.component';
import { ProductCardComponent } from './store-products/product-card/product-card.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StoreProductsComponent,
    CheckoutComponent,
    NavbarComponent,
    MainViewComponent,
    SpinnerComponent,
    CountComponent,
    ProductCardComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    Error0Component,
    Error404Component,
    Error500Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    NgbModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
