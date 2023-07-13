import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  submitted: boolean = false;
  valueValid: boolean = false;
  valueInvalid: boolean = false;
  fieldTextType: boolean = false;
  fieldTextTypePassword: boolean = false;
  fieldTextTypeConfirmPassword: boolean = false;
  confirmPassword: boolean = false;
  formBuilder: any;
  emailExists: boolean = false;
  userData: any = [];
  usersEmail: any;
  user: any;
  isDuplicateEmail: boolean = false;
  constructor(
    private authServices: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    ConfirmPassword: new FormControl('', Validators.required),
  });

  // user validation
  get userFirstName() {
    return this.registerForm.get('firstName');
  }

  get userLastName() {
    return this.registerForm.get('lastName');
  }
  get userCity() {
    return this.registerForm.get('city');
  }

  get userEmail() {
    return this.registerForm.get('email');
  }
  get userPassword() {
    return this.registerForm.get('password');
  }

  get userConfPassword() {
    return this.registerForm.get('ConfirmPassword');
  }

  saveList(isValid: boolean) {
    if (isValid) {
      console.log(this.registerForm);
    }
  }
  // this is confirm password validation
  confirmPasswordValidate() {
    let password = this.registerForm.get('password')?.value;
    let showConfirmPassword = this.registerForm.get('ConfirmPassword')?.value;
    if (password === showConfirmPassword) {
      this.confirmPassword = false;
    } else {
      this.confirmPassword = true;
    }
  }

  // submit register form
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
        // this is validation confirm password
    let password = this.registerForm.get('password')?.value;
    let showConfirmPassword = this.registerForm.get('ConfirmPassword')?.value;
    if (password === showConfirmPassword) {
      this.submitted = true;
    } else {
      this.submitted = false;
      this.confirmPassword = true;
      return;
    }
    // this is validation check exist email
    this.authServices.signIn().subscribe((data) => {
      this.userData = data;
      let registerEmail = this.registerForm.get('email')?.value;
      
      for (let user of this.userData) {
        if (registerEmail === user.email) {
          this.submitted = false;
          this.valueInvalid = true; 
          this.isDuplicateEmail = true;
          return;
        }
      }      
      this.submitted = true;
      this.authServices.signUp(this.registerForm.value).subscribe(
        (res) => {
          this.valueValid = true;
        },
        (err) => {
          this.valueInvalid = true;
        }
      );
    });
 
}
  // this is signUp Valid
  signUp() {
    this.valueValid = !this.valueValid;
  }
  // this is signUp invalid
  signUpInvalid() {
    this.valueInvalid = !this.valueInvalid;
  }
  // this is show password
  showPassword() {
    this.fieldTextTypePassword = !this.fieldTextTypePassword;
  }
  // this is show confirm password
  showConfirmPassword() {
    this.fieldTextTypeConfirmPassword = !this.fieldTextTypeConfirmPassword;
  }
}
