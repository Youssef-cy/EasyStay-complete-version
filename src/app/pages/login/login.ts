import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  myForm: FormGroup;



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.myForm.value).subscribe({
      next: (res) => {
        console.log(res);

        localStorage.setItem('token', res.token);

        Swal.fire({
          icon: 'success',
          title: 'Login Success',
          text: 'You have successfully logged in!',
          confirmButtonColor: '#3085d6'
        });

        this.router.navigate(['']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  goToSignup() {
    this.router.navigate(['signup']);
  }
}