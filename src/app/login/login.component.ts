import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  registerFormVisible: boolean = false;

  loadingLogin = false;
  hidePassword: boolean = true;
  loginError: boolean = false;
  registerError: boolean = false;

  loadingRegister = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      try {
        setTimeout(async () => {
          const { email, password, remember } = this.loginForm.value;
          this.loadingLogin = true;
          console.log('Login called');

          const success = await this.authService.login(email, password);
          if (success) {
            this.router.navigate(['']); 
          } else {
            this.loginError = true;
            this.loadingLogin = false; 
          }
        }, 2000);
      } catch (error) {
        console.error('Login error:', error);
        this.loginError = true;
        this.loadingLogin = false;
      } 
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      try {
        setTimeout(async () => {
      const { name, email, password } = this.registerForm.value;

      const success = await this.authService.register(name, email, password);
        if (success) {
          // Registration successful, handle accordingly (e.g., redirect)
          this.registerError = true;
        } else {
          // Registration failed
          
        }
      }, 2000);
      } catch (error) {
        console.error('Registration error:', error);
        this.registerError = true;
      } finally {
        this.loadingRegister = false;
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); 
    console.log('logging out');
  }

  forgotPassword() {
    throw new Error('Method not implemented.');
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleRegisterForm() {
    this.registerFormVisible = !this.registerFormVisible;
  }
  
  googleSignIn() {
    throw new Error('Method not implemented.');
  }



}
