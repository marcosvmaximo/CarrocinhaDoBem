import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7171/api/auth';
  public logado: boolean = false

  constructor(private http: HttpClient) { }

  // @ts-ignore
  login(credentials: { email: string, senha: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  registrar(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/registrar`, usuario);
  }
}
