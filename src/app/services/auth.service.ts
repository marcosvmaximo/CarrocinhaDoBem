import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from "../interfaces/IUser";
import { apiUrl } from "../api";
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any // Inject PLATFORM_ID to check platform
  ) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${apiUrl}/auth/login`, credentials);
  }

  registrar(nome: string, email: string, password: string, confirmPassword: string): Observable<any> {
    const user: IUser = {
      userName: nome,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };
    return this.http.post<any>(`${apiUrl}/auth/register`, user);
  }

  estaLogado(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Code to access sessionStorage only runs in the browser
      return sessionStorage.getItem('logado') === 'true';
    }
    return false; // Default to false on the server side
  }
}
