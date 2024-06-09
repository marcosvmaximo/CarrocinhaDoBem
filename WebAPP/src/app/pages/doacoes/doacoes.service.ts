import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDoacao } from './model/IDoacao';

@Injectable({
  providedIn: 'root'
})
export class DoacoesService {
  private apiUrl = 'https://localhost:7240/api/Donation'; // Altere para o endpoint real

  constructor(private http: HttpClient) { }

  getDoacoes(): Observable<IDoacao[]> {
    return this.http.get<IDoacao[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
