import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  private baseUrl = 'https://localhost:7171/api/auth';

  constructor(private http: HttpClient) { }

  deleteAccount(credentials: { nome:string, email: string, senha: string }): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deletar-conta`, );
  }
}
