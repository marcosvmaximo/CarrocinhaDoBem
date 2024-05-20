import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IUser} from "../interfaces/IUser";
import {apiUrl} from "../api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  // @ts-ignore
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

  estaLogado() : boolean{
    return sessionStorage.getItem('logado') === 'true';
  }
}
