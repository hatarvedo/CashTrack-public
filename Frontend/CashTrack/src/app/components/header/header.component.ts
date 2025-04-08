import { NgIf } from '@angular/common';
import { Component, computed, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import AOS from 'aos';
import { signal } from '@angular/core';
import { Subscription, filter } from 'rxjs';

@Component({
    selector: 'app-header',
    imports: [NgIf,RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
    private subscription: Subscription | undefined;
    private routerSubscription: Subscription | undefined;
    
    authService = inject(AuthService);
    router = inject(Router);
    
    loggedIn = computed(() => this.authService.isLoggedIn());
    isMenuOpen = false;
    
    ngOnInit(): void {
      console.log('loggedIn',this.loggedIn());
      AOS.init();
      
      // Feliratkozás a bejelentkezési állapot változásaira
      this.subscription = this.authService.isLoggedIn$.subscribe(() => {
        console.log('Bejelentkezési állapot változott:', this.loggedIn());
      });
      
      // Feliratkozás a router eseményekre
      this.routerSubscription = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        console.log('Navigáció történt, bejelentkezési állapot frissítése');
        // Frissítjük a bejelentkezési állapotot
        this.authService.updateLoginStatus();
      });
    }
    
    ngOnDestroy(): void {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      if (this.routerSubscription) {
        this.routerSubscription.unsubscribe();
      }
    }

    toggleMenu(): void {
      this.isMenuOpen = !this.isMenuOpen;
    }
}
