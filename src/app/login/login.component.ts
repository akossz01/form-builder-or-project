import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    /*private router: Router,
    private messageService: MessageService*/
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
      setTimeout(async () => {

        const { email, password, remember } = this.loginForm.value;

        await this.authService.login(email, password);

      }, 2000);
    }
  }
  onRegister() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

    }
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
