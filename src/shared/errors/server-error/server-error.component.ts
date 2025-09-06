import { Component, inject, signal } from '@angular/core';
import { ApiError } from '../../../types/error';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css'
})
export class ServerErrorComponent {
  protected error: ApiError | undefined;
  private router = inject(Router);
  protected showDetails = false;

  constructor() {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.['error'];
  }

  toggleDetails() { 
    this.showDetails = !this.showDetails;
  }

}
