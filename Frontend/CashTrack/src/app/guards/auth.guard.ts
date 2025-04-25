import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard = async () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  try {
    const felhasznalo = localStorage.getItem('felhasznalo');
    if (!felhasznalo) {
      console.log('Nincs felhasználó a localStorage-ban');
      return router.parseUrl('/login');
    }
    const isLoggedIn = await authService.isLoggedIn;
    if (!isLoggedIn) {
      console.log('Nincs bejelentkezve');
      return router.parseUrl('/login');
    }

    console.log('Bejelentkezés sikeres, átirányítás a dashboard-ra');
    return true;
  }
  catch (error) {
    console.error('Hiba az auth guard-ban:', error);
    return router.parseUrl('/login');
  }
}; 