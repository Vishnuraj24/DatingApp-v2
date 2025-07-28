import { Component, inject, signal } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [FormsModule,CommonModule, RouterLink,RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  protected accountservice = inject(AccountService);
  private router = inject(Router);
  protected creds: any = {};

  login() {
    this.accountservice.login(this.creds).subscribe({
      next: response => {
        this.creds = {};
        console.log('Login successful', response);
        this.router.navigateByUrl('/members');

      },
      error: error => {
        console.error('Login failed', error);
      },
      complete: () => {
        console.log('Login request completed');
      }
    });
  }

  logout() {
    this.accountservice.logout();
    this.creds = {};
    console.log('Logged out');
    this.router.navigateByUrl('/');
  }

}
