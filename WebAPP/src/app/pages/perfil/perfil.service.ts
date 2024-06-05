import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../commons/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

  atualizarPerfil(id: number, body: any): Observable<any>{
    return this.http.put(`${apiUrl}/userController/${id}`, body);
  }
}
