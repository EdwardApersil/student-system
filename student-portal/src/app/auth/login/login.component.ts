import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const auth = this.loginForm.value;
      // console.log('Auth Data:', auth); 
      this.authService.loginAuth(auth).subscribe(
        (user) => {
          if (user) {
            console.log('Login successful:', user);
            this.navigateToRolePage(user.role);
          } else {
            console.error('Login failed: Invalid credentials');
            this.loginError = 'Invalid credentials. Please try again.';
          }
        },
        error => {
          console.error('Error logging in:', error);
          this.loginError = 'Error logging in. Please try again later.';
        }
      );
    } else {
      console.log('Form is invalid, please fix the errors.');
      this.loginError = 'Please fill in all required fields.';
    }
  }

  navigateToRolePage(role: string): void {
    switch (role) {
      case 'admin':
        this.router.navigate(['/home']);
        break;
      case 'line_manager':
        this.router.navigate(['/line-manager']);
        break;
      case 'intern':
        this.router.navigate(['/intern-dashboard']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }
}
