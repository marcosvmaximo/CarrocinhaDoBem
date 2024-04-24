import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserUptadeService {

  constructor(private http: HttpClient) { }

  atualizarUsuario(usuarioData: any): Observable<any> {
    
    const url = 'URL_DA_API_PARA_ATUALIZAR_USUARIO';
    return this.http.put(url, usuarioData);
  }
}
