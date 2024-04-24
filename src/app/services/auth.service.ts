import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://exemplo.com/api/auth'; 
  
  constructor(private http: HttpClient) { }

  login(credentials: { email: string, senha: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

 
  registrar(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/registrar`, usuario);
  }
}
