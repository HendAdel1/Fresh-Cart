import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoading = false;
  errorMsg = ""

  fields = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  constructor(private authService: AuthService, private router: Router) { }
  passwordVisible: Record<string, boolean> = {
    password: false,
  };

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
  });

  getInputType(field: string): string {
    if ((field === 'password') && this.passwordVisible[field]) {
      return 'text';
    }
    if (field === 'password') {
      return 'password';
    }
    return this.fields.find(f => f.name === field)?.type || 'text';
  }

  getControl(name: string) {
    return this.loginForm.get(name);
  }


  handleSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  }



}
