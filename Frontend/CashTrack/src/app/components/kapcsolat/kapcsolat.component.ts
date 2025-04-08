import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import AOS from 'aos';

@Component({
    selector: 'app-kapcsolat',
    imports: [HeaderComponent],
    templateUrl: './kapcsolat.component.html',
    styleUrl: './kapcsolat.component.css'
})
export class KapcsolatComponent {
    ngOnInit(): void {
        AOS.init();
    }
}
