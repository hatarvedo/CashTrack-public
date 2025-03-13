import { Component } from '@angular/core';
import { FormsModule, FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  ReactiveFormsModule, } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { routes } from '../../app.routes';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { RegisterService } from '../../services/register.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule,HttpClientModule,NgIf,RouterModule,HeaderComponent,MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  providers: [LoginService,AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email:string = '';
  jelszo: string = '';
  
  constructor( private http: HttpClient,private router: Router,  private loginService: LoginService, private authService:AuthService, private regiserService: RegisterService) { }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  belepes(): void {
    console.log('Login fuggveny');
    const userData = {email:this.email,jelszo:this.jelszo};
    this.loginService.login(this.email,this.jelszo).subscribe((response:any)=>{
      if(this.email === response.email && this.jelszo === response.jelszo){
        console.log('Sikeres bejelentkezés');
        localStorage.setItem('felhasznalo',JSON.stringify(response));
        
        console.log('Felhasználó adatai: ',response);
        this.router.navigate(['/dashboard']);
        this.authService.login();

      }
      else{
        console.log('Sikertelen bejelentkezés, hibás email vagy jelszó.');
        alert('Sikertelen bejelentkezés, hibás email vagy jelszó.');
      }
    }
    );
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

