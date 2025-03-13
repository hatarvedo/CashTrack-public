import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://127.0.0.1:8000/api/felhasznalok';

  constructor(private http: HttpClient) { }

  login(email: string, jelszo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/email/${email}`);
  }
  logout(): void {
    localStorage.removeItem('felhasznalo');
  }
}
