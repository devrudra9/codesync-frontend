import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CurrentUserService } from '../../../core/services/current-user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  private readonly fb = inject(FormBuilder);

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly currentUserService = inject(CurrentUserService);

  signupForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],

    email: ['', [Validators.required, Validators.email]],

    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.authService.signup(this.signupForm.getRawValue()).subscribe({
      next: (response) => {
        this.currentUserService.setCurrentUser({
          userId: response.userId,
          username: response.username,
          email: response.email,
        });

        this.router.navigate(['/app/dashboard']);
      },

      error: (error) => {
        console.error(error);
        alert('Unable to create account.');
      },
    });
  }
}
