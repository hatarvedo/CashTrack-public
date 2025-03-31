import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSource = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSource.asObservable();

  constructor() {
    // Figyeljük a localStorage változásait
    window.addEventListener('storage', () => {
      this.isLoggedInSource.next(this.checkLoginStatus());
    });
  }

  login() {
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedInSource.next(true);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('felhasznalo');
    this.isLoggedInSource.next(false);
  }

  private checkLoginStatus(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const hasUser = localStorage.getItem('felhasznalo') !== null;
    return isLoggedIn && hasUser;
  }
}
