import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IApadrinhamento} from "../apadrinhados/model/IApadrinhamento";
import {Observable} from "rxjs";
import {apiUrl} from "../../commons/api";

@Injectable({
  providedIn: 'root'
})
export class DoacoesService {

  constructor(private http: HttpClient) { }

  cadastrarDoacoes(body: {  }): Observable<any> {
    return this.http.post(`${apiUrl}/Donation`, body);
  }
}
