import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,

  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); 
    console.log('logging out');
  }
}
