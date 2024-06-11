import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IApadrinhamento } from './model/IApadrinhamento';

@Injectable({
  providedIn: 'root'
})
export class ApadrinhamentoService {
  private apiUrl = 'https://localhost:7240/api/Sponsorship';

  constructor(private http: HttpClient) { }

  getActiveIApadrinhamentos(params?: any): Observable<IApadrinhamento[]> {
    let queryParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        queryParams = queryParams.append(key, params[key]);
      });
    }
    return this.http.get<IApadrinhamento[]>(this.apiUrl, { params: queryParams }).pipe(
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
