import { AuthService, UserData } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { CommonModule } from "@angular/common";
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isLoading = false;
  errorMsg = ""

  fields = [
    { name: 'userName', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
    { name: 'phone', label: 'Phone', type: 'number' },
  ];

  constructor(private authService: AuthService, private router: Router){}

  passwordVisible: Record<string, boolean> = {
    password: false,
    confirmPassword: false,
  };

  registerForm = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, { validators: this.passwordMatchValidator });


  togglePasswordVisibility(field: string): void {
    this.passwordVisible[field] = !this.passwordVisible[field];
  }

  getInputType(field: string): string {
    if ((field === 'password' || field === 'confirmPassword') && this.passwordVisible[field]) {
      return 'text';
    }
    if (field === 'password' || field === 'confirmPassword') {
      return 'password';
    }
    return this.fields.find(f => f.name === field)?.type || 'text';
  }

  getControl(name: string) {
    return this.registerForm.get(name);
  }

  passwordMatchValidator(control: AbstractControl): null | Record<string, any> {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

handleSubmit() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  const values = this.registerForm.value;
  this.register(values);
}

 register(value: any) {
  this.isLoading = true;
  this.errorMsg = "";

  const body = {
    name: value.userName,
    email: value.email,
    password: value.password,
    rePassword: value.confirmPassword,
    phone: value.phone,
  };

  this.authService.register(body).subscribe({
    next: (response) => {
      this.isLoading = false;
      this.router.navigate(['/home'])
    },
    error: (error) => {
      this.isLoading = false;
      this.errorMsg = error?.error?.message || 'Something went wrong. Please try again.';
    }
  });
}
}
