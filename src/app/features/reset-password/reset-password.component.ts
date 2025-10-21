import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ForgetPasswordService } from '../../core/services/forget-password.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  step = 1;
  isLoading = false;
  errorMessage = '';
  resendAvailable = false;
  countdown = 60;
  countdownInterval: any;

  showPassword = false;
  showConfirmPassword = false;

  // Step 1: Forgot Password Form
  forgotPasswordGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  // Step 2: Verify Code Form
  verifyCodeGroup = new FormGroup({
  code1: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
  code2: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
  code3: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
  code4: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
  code5: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
  code6: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
  resetCode: new FormControl('', [Validators.required, Validators.minLength(6)]),
});


  // Step 3: Reset Password Form
  resetPasswordGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)
    ]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    }, { validators: this.passwordMatchValidator });

    passwordMatchValidator(control: AbstractControl): null | Record<string, any> {
     const password = control.get('newPassword')?.value;
     const confirmPassword = control.get('confirmPassword')?.value;
     return password === confirmPassword ? null : { passwordMismatch: true };
   };

  constructor(
    private router: Router,
    private forgetPasswordService: ForgetPasswordService
  ) { }

   togglePasswordVisibility(field: 'password' | 'confirm') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
  
  nextStep() {
    if (this.step < 3) this.step++;
  }

startResendTimer() {
  if (this.countdownInterval) clearInterval(this.countdownInterval);

  this.resendAvailable = false;
  this.countdown = 60;

  this.countdownInterval = setInterval(() => {
    this.countdown--;
    if (this.countdown <= 0) {
      clearInterval(this.countdownInterval);
      this.resendAvailable = true;
    }
  }, 1000);
}

  // Step 1 - Send Verification Code
  handleForgotPassword() {
    if (this.forgotPasswordGroup.invalid) {
      this.forgotPasswordGroup.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.forgotPasswordGroup.value.email;
    this.resetPasswordGroup.get('email')?.patchValue(this.forgotPasswordGroup.value.email || '');
    this.errorMessage = '';

    const emailData = { email: this.forgotPasswordGroup.value.email! };

    this.forgetPasswordService.forgetPassword(emailData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.nextStep();
         this.startResendTimer();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to send reset code.';
      }
    });
  }

  resendCode() {
  if (!this.resendAvailable) return; // يمنع المستخدم لو لسه الوقت ما خلصش

  this.resendAvailable = false; // نخفي الزرار فورًا
  this.startResendTimer(); // نبدأ العداد

  const emailData = { email: this.forgotPasswordGroup.value.email! };
  this.forgetPasswordService.forgetPassword(emailData).subscribe({
    next: (res) => {
      // ممكن تضيفي إشعار بسيط هنا لو حبيتي "Code resent successfully!"
    },
    error: (err) => {
      this.errorMessage = err.error?.message || 'Failed to resend code.';
    }
  });
}

ngOnDestroy() {
  if (this.countdownInterval) clearInterval(this.countdownInterval);
}

  updateResetCode() {
  const values = [
    this.verifyCodeGroup.value.code1,
    this.verifyCodeGroup.value.code2,
    this.verifyCodeGroup.value.code3,
    this.verifyCodeGroup.value.code4,
    this.verifyCodeGroup.value.code5,
    this.verifyCodeGroup.value.code6
  ].join('');

  this.verifyCodeGroup.get('resetCode')?.setValue(values);
}


  // Step 2 - Verify Code
  handleVerifyCode() {
    if (this.verifyCodeGroup.invalid) {
      this.verifyCodeGroup.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const codeData = { resetCode: this.verifyCodeGroup.value.resetCode! };

    this.forgetPasswordService.verifyCode(codeData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.nextStep();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || err.error?.statusMsg || 'Failed to send reset code.';
      }


    });
  }

  // Step 3 - Reset Password
  handleResetPassword() {
    if (this.resetPasswordGroup.invalid) {
      this.resetPasswordGroup.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const data = {
      email: this.resetPasswordGroup.value.email!,
      newPassword: this.resetPasswordGroup.value.newPassword!
    };

    this.forgetPasswordService.resetPassword(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || err.error?.statusMsg || 'Failed to reset password.';
      }


    });
  }
}
