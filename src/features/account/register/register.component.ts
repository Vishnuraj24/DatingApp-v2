import { Component, inject, input, output } from '@angular/core';
import { RegisterCreds, User } from '../../../types/user';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountservice = inject(AccountService);
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;

  register() {
    this.accountservice.register(this.creds).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.cancel();
      },
      error: (error) => {
        console.error('Registration failed:', error);
      }
    });
    // Reset the creds after registration
    this.creds = {} as RegisterCreds;
  }

  cancel() {
    this.creds = {} as RegisterCreds;
    this.cancelRegister.emit(false);
  }
}
