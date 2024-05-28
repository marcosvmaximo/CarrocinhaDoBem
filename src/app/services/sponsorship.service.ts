
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Sponsorship } from '../../models/sponsorship';

@Injectable({
  providedIn: 'root'
})
export class SponsorshipService {
  private apiUrl = 'https://localhost:7240/api/sponsorship';

  constructor(private http: HttpClient) { }

  // Método para obter apenas os patrocínios ativos
  getActiveSponsorships(): Observable<Sponsorship[]> {
    // Aqui você pode adicionar lógica para filtrar apenas os patrocínios ativos
    return this.http.get<Sponsorship[]>(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para lidar com erros de HTTP
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Erro no cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Erro no servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
