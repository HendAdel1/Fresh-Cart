import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { CommonModule } from "@angular/common";
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fields = [
    { name: 'userName', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
    { name: 'phone', label: 'Phone', type: 'number' },
  ];

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

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
  }
}
