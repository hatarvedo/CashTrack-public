import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private felhasznalokUrl = 'http://127.0.0.1:8000/api/felhasznalok';
  private felhasznaloEmailUrl = 'http://127.0.0.1:8000/api/felhasznalok/';
  constructor(private http: HttpClient) { }

  getFelhasznalok(): Observable<any> {
    return this.http.get(this.felhasznalokUrl);
  }

  getFelhasznaloByEmail(): Observable<any>{
    return this.http.get(this.felhasznalokUrl);
  }

  registerUser(userData: { vezeteknev: string, keresztnev: string, email: string, jelszo: string }): Observable<any> {
    return this.http.post(this.felhasznalokUrl, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
