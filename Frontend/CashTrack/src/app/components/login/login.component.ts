import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { routes } from '../../app.routes';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { RegisterService } from '../../services/register.service';


@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule,HttpClientModule,NgIf,RouterModule,HeaderComponent],
  providers: [LoginService,AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email:string = '';
  jelszo: string = '';
  
  constructor( private http: HttpClient,private router: Router,  private loginService: LoginService, private authService:AuthService, private regiserService: RegisterService) { }

  belepes(): void {
    console.log('Login fuggveny');
    if (!this.email || !this.jelszo) {
      alert('Kérjük, töltse ki az email és jelszó mezőket!');
      return;
    }

    this.loginService.login(this.email, this.jelszo).subscribe({
      next: (response: any) => {
        if (response) {
          console.log('Sikeres bejelentkezés');
          localStorage.setItem('felhasznalo', JSON.stringify(response));
          console.log('Felhasználó adatai: ', response);
          this.authService.login();
          
          // Várunk egy kicsit, hogy a localStorage frissüljön
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 100);
        } else {
          console.log('Sikertelen bejelentkezés, hibás email vagy jelszó.');
          alert('Sikertelen bejelentkezés, hibás email vagy jelszó.');
        }
      },
      error: (error) => {
        console.error('Bejelentkezési hiba:', error);
        alert('Hiba történt a bejelentkezés során. Kérjük próbálja újra.');
      }
    });
  }
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
        this.belepesVizsgalat=true
        /* localStorage.setItem('felhasznalo',JSON.stringify(response)); */
        
      }
      else{
        alert('Sikertelen regisztráció');
      }
    });
  }
belepesVizsgalat=true;
/* ngOnInit(): void {
  this.LogOrReg();
} */

LogOrReg(): void {
  this.belepesVizsgalat = !this.belepesVizsgalat;
 
}



}

