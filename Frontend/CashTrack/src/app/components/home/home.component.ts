import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth.service';
import AOS from 'aos';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule, HeaderComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    constructor(private authService: AuthService) {}

    ngOnInit() {
        // Load the Spline viewer script
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';
        document.head.appendChild(script);
        AOS.init();

        // Frissítjük a bejelentkezési állapotot
        this.authService.updateLoginStatus();
    }
}
