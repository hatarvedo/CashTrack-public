import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    imports: [NgIf,RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    isLoggedIn: boolean = false;
    private subscription: any;
  
    constructor(private authService: AuthService) {}
  
    ngOnInit(): void {
      this.subscription = this.authService.isLoggedIn$.subscribe(status => {
        this.isLoggedIn = status;
      });
    }
  
}
