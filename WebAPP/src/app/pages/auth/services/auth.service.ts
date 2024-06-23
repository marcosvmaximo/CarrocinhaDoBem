import { Inject, Injectable, PLATFORM_ID, NgZone } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { apiUrl } from "../../../commons/api";
import { Observable, tap } from "rxjs";
import { isPlatformBrowser } from "@angular/common";
import { IUser } from "./IUser";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private timeoutHandle: any;
  private readonly SESSION_TIMEOUT = 30 * 1000; // 30 segundos

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any, 
    private router: Router,
    private ngZone: NgZone
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.setActivityListeners();
    }
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${apiUrl}/auth/login`, credentials).pipe(
      tap(() => {
        this.startSessionTimeout();
        localStorage.setItem('logado', 'true');
      })
    );
  }

  registrar(userName: string, email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post<any>(`${apiUrl}/auth/register`, {userName, email, password, confirmPassword, });
  }

  estaLogado(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('logado') === 'true';
    }
    return false;
  }

  obterIdLogado() {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user.id;
  }

  logout() {
    localStorage.removeItem('logado');
    localStorage.removeItem('user');
    this.clearSessionTimeout();
  }

  startSessionTimeout() {
    this.resetSessionTimeout();
  }

  resetSessionTimeout() {
    if (isPlatformBrowser(this.platformId)) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = setTimeout(() => {
        this.handleSessionTimeout();
      }, this.SESSION_TIMEOUT);
    }
  }

  private handleSessionTimeout() {
    this.logout();
    this.router.navigate(['/login']);
    alert('Sua sessão expirou. Faça login novamente.');
  }

  private clearSessionTimeout() {
    clearTimeout(this.timeoutHandle);
  }

  private setActivityListeners() {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', () => this.resetTimeoutDebounced());
      window.addEventListener('keydown', () => this.resetTimeoutDebounced());
    });
  }

  private resetTimeoutDebounced() {
    this.ngZone.run(() => {
      this.resetSessionTimeout();
    });
  }
}
