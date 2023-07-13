import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './account/register/register.component';
import { ForgotPasswordComponent } from './account/forgot-password/forgot-password.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './account/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UploadProductComponent } from './pages/upload-product/upload-product.component';

const routes: Routes = [
 //default router
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
 //login router  
  {
    path: 'login',
    component: LoginComponent,
  },
 //register router
  {
    path: 'register',
    component: RegisterComponent,
  },
 //forgot password router
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
 //home router
  {
    path: 'home',
    component: HomeComponent,
  },
   //upload-product router
   {
    path: 'upload-product',
    component: UploadProductComponent,
  },
 //not found router
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
