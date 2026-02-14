import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  username = '';
  password = '';
  showPassword = signal(false);
  errorMessage = signal('');
  isLoading = signal(false);

  onSubmit(): void {
    this.errorMessage.set('');
    this.isLoading.set(true);

    // Small delay for UX feel
    setTimeout(() => {
      const error = this.authService.login(this.username, this.password);
      this.isLoading.set(false);

      if (error) {
        this.errorMessage.set(error);
      } else {
        this.router.navigate(['/home']);
      }
    }, 600);
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }
}
