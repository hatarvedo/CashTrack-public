import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import AOS from 'aos';

@Component({
    selector: 'app-about',
    imports: [HeaderComponent],
    templateUrl: './about.component.html',
    styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
    ngOnInit(): void {
        // AOS inicializálása a megfelelő beállításokkal
        AOS.init();
    }
}
