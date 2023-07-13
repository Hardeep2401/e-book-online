import { Component, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  submitted = false;
  setValue: any;
  display: boolean = false;
  isDisplay: boolean = false;
  isUnDisplay: boolean = false; 
  fieldTextTypePassword:boolean = false;
  constructor(private authServices: AuthService, private router: Router) { }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(12),
    ]),
  });

  get userEmail() {
    return this.loginForm.get('email');
  }
  get loginPassword() {
    return this.loginForm.get('password');
  }

  get loginCheckBox() {
    return this.loginForm.get('checkbox');
  } 
  onSubmit() {
    // validation check
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // submit login on click
    this.authServices.signIn().subscribe(
      (res: any) => {
        const userCredential = res.find((result: any) => {
          return (
          
            result.email === this.loginForm.value.email &&
            result.password === this.loginForm.value.password
          );
        });
        if (userCredential) {
          this.router.navigate(['/home']);
        } else {
          this.display = true;
        }
      },
      (_err) => {
        this.isUnDisplay = true;
      }
    );
  }
  // this is not api work pass msg
  unDisplayClick() {
    this.isUnDisplay = !this.isUnDisplay;
  }
  // this is not login add properly
  invalidClick() {
    this.display = !this.display;
  }
  // this is show credential password 
 // this is show password
 showPassword() {
  this.fieldTextTypePassword = !this.fieldTextTypePassword;
}
}
