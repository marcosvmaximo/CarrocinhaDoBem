import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IUser} from "../interfaces/IUser";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7171/api/auth';
  public logado: boolean = false

  constructor(private http: HttpClient) { }

  // @ts-ignore
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  registrar(nome: string, email: string, password: string, confirmPassword: string): Observable<any> {
    const user: IUser = {
      userName: nome,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };
    return this.http.post<any>(`${this.baseUrl}/registrar`, user);
  }
}
