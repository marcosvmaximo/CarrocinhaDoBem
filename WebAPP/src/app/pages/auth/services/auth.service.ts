import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../../../commons/api";
import {Observable} from "rxjs";
import {isPlatformBrowser} from "@angular/common";
import {IUser} from "./IUser";

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

  registrar(userName: string, email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post<any>(`${apiUrl}/auth/register`, {userName, email, password, confirmPassword});
  }

  estaLogado(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('logado') === 'true';
    }
    return false;
  }

  obterIdLogado() {
    return localStorage.getItem('logado') === 'true';
  }
}
