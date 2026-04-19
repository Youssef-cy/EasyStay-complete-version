import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, CreateAccountRequest } from '../../core/service/auth.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {

  myForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {

    this.myForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],

        location: this.fb.group({
          latitude: [null, Validators.required],
          longitude: [null, Validators.required],
          city: ['', Validators.required],
          country: ['Egypt', Validators.required],
        }),
      },
      { validators: passwordMatchValidator }
    );
  }

  get passwordMismatch(): boolean {
    return (
      !!this.myForm.errors?.['passwordMismatch'] &&
      !!this.myForm.get('confirmPassword')?.touched
    );
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const formValue = this.myForm.value;

    const request: CreateAccountRequest = {
      name: formValue.fullName,
      email: formValue.email,
      password: formValue.password,
      phoneNumber: formValue.phoneNumber,
      location: formValue.location,
    };

    this.authService.signup(request).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);

        Swal.fire({
          icon: 'success',
          title: 'Account Created!',
          text: 'You have successfully signed up.',
          confirmButtonColor: '#3085d6',
        }).then(() => this.router.navigate(['']));
      },

      error: (err) => {
        this.isLoading = false;

        const message = err?.error?.message || 'Signup failed. Please try again.';

        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: message,
          confirmButtonColor: '#d33',
        });
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }
}