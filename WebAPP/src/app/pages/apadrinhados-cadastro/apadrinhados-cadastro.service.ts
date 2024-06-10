import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../../commons/api';
import { IApadrinhamento } from '../apadrinhados/model/IApadrinhamento';

@Injectable({
  providedIn: 'root'
})
export class ApadrinhadosCadastroService {

  constructor(private http: HttpClient) { }

  cadastrarApadrinhado(body: IApadrinhamento): Observable<any> {
    return this.http.post(`${apiUrl}/Sponsorship`, body);
  }
}
