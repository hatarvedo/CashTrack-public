import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSource = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSource.asObservable();
  isLoggedIn = signal(this.checkLoginStatus());

  constructor() {
    // Figyeljük a localStorage változásait
    window.addEventListener('storage', () => {
      this.updateLoginStatus();
    });
  }

  login() {
    localStorage.setItem('isLoggedIn', 'true');
    this.updateLoginStatus();
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('felhasznalo');
    this.updateLoginStatus();
  }

  updateLoginStatus() {
    const status = this.checkLoginStatus();
    this.isLoggedInSource.next(status);
    this.isLoggedIn.set(status);
  }

  private checkLoginStatus(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const hasUser = localStorage.getItem('felhasznalo') !== null;
    return isLoggedIn && hasUser;
  }
}
