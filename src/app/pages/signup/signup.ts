import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Auth } from '../../core/services/auth/auth';
import { Router, RouterLink } from '@angular/router';
import { UserData } from '../../core/services/userData/user-data';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  host: {
    ngSkipHydration: 'true',
  },
})
export class Signup {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly userData = inject(UserData);

  isLoading: boolean = false;
  errMsg: string = '';
  sucessMsg: string = '';

  signUpForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.passMatch
  );

  passMatch(form: AbstractControl) {
    const pass = form.get('password')?.value;
    const rePass = form.get('rePassword')?.value;

    if (pass === rePass) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  submitForm() {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      this.auth.signup(this.signUpForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          this.errMsg = '';
          this.sucessMsg = res.message;
          this.userData.saveToken(res.token);
          this.userData.saveName(res.user.name);
          this.userData.saveEmail(res.user.email);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        error: (err) => {
          this.isLoading = false;
          this.errMsg = err.error.message;
        },
      });
    }
  }
}
