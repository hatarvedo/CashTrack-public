import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private isLoggedInSource = new BehaviorSubject<boolean>(this.checkLoginStatus());
    isLoggedIn$ = this.isLoggedInSource.asObservable();
  
   
  
    login() {
      localStorage.setItem('isLoggedIn', 'true');
      this.isLoggedInSource.next(true);
    }
  
    logout() {
      localStorage.removeItem('isLoggedIn');
      this.isLoggedInSource.next(false);
      localStorage.removeItem('kiadasok');
    }
  
    private checkLoginStatus(): boolean {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
  
}
