import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FooterModule } from 'app/layout/components/footer/footer.module';
import { AuthForgotPasswordV2Component } from 'app/main/pages/authentication/auth-forgot-password-v2/auth-forgot-password-v2.component';
import { AuthLoginV2Component } from 'app/main/pages/authentication/auth-login-v2/auth-login-v2.component';
import { AuthRegisterV2Component } from 'app/main/pages/authentication/auth-register-v2/auth-register-v2.component';
import { AuthForgotActiveComponent } from './auth-forgot-active/auth-forgot-active.component';



// routing
const routes: Routes = [
  {
    path: 'authentication/login',
    component: AuthLoginV2Component,
    data: { animation: 'auth' }
  },
  {
    path: 'authentication/register-v2',
    component: AuthRegisterV2Component
  },
  {
    path: 'authentication/forgot-password-v2',
    component: AuthForgotPasswordV2Component
  },
  {
    path: 'authentication/forgot',
    component: AuthForgotActiveComponent
  }
];

@NgModule({
  declarations: [
    AuthLoginV2Component,
    AuthRegisterV2Component,
    AuthForgotPasswordV2Component,
    AuthForgotActiveComponent
  ],
  imports: [
        CommonModule, 
        RouterModule.forChild(routes), 
        NgbModule, 
        FormsModule, 
        ReactiveFormsModule, 
        CoreCommonModule, 
        NgSelectModule,
        FooterModule,
        SweetAlert2Module.forRoot(),
      ]
})
export class AuthenticationModule {}
