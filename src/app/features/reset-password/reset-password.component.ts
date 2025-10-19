import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  imports: [],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  step = 1;

  nextStep() {
    if (this.step < 3) this.step++;
  }

  finish() {
    console.log('Password reset complete');
  }
}
