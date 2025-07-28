import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavComponent } from "../layout/nav/nav.component";
import { lastValueFrom } from 'rxjs';
import { AccountService } from '../core/services/account.service';
import { HomeComponent } from "../features/home/home.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  protected title = 'MyDatingAppUI';
  protected members = signal<any>([]);
  router = inject(Router);

  async ngOnInit() {
    this.members.set(await this.getMembers());
    this.setCurrentUser();
  } 

  setCurrentUser() { 
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  async getMembers() { 
    try {
      return lastValueFrom(this.http.get<any[]>('https://localhost:5001/api/members'));
    }
    catch (error) {
      console.error('Error fetching members:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }
}
