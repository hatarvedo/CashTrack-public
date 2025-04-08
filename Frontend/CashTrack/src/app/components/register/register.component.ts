import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-register',
  imports: [FormsModule,HeaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private regiserService: RegisterService, private router: Router) { }


  vezeteknev: string = '';
  keresztnev: string = '';
  emailcim: string = '';
  password: string = '';
  regisztracio(): void {
    console.log('onsubmit fuggveny');
    const userData = { vezeteknev: this.vezeteknev,
      keresztnev: this.keresztnev,
      email: this.emailcim,
      jelszo: this.password };
    this.regiserService.registerUser(userData).subscribe((response:any)=>{
      console.log(response);
      if(response){
        alert('Sikeres regisztráció');
        this.router.navigate(['/login']);
        /* localStorage.setItem('felhasznalo',JSON.stringify(response)); */
        
      }
      else{
        alert('Sikertelen regisztráció');
      }
    });
  }

  LoginRoute(): void {
    this.router.navigate(['/login']);
  }
}
