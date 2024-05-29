import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'https://localhost:7240/api/userController'; // URL da API 

  constructor(private http: HttpClient) { }

  // get
  getProfile(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // update
  updateProfile(id: number, user: Partial<User>): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  // delete
  deleteProfile(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      // Erro do lado do servidor
      console.error(
        `Código do erro ${error.status}, ` +
        `corpo do erro: ${error.error}`);
    }
    // Retornar um observable com uma mensagem de erro amigável ao usuário
    return throwError('Algo de errado aconteceu; por favor, tente novamente mais tarde.');
  }
}
