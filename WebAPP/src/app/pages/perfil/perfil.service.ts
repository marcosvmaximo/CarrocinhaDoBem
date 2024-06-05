import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {IUser} from "../auth/services/IUser";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'https://localhost:7240/api/userController';
  constructor(private http: HttpClient) { }

  getActiveUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }
  

  updateProfile(user: object, id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, user);
  }

  deleteProfile(id: number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
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
