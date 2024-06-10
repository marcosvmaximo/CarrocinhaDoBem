import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../../commons/api";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdocaoService {

  constructor(private http: HttpClient) { }

  getPet(id: any): Promise<any> {
    return this.http.get(`${apiUrl}/animals/${id}`)
      .toPromise()
      .then(data => data);
  }

  adotarAnimal(animalId: any, userId: any): Observable<any> {
    return this.http.post(`${apiUrl}/adoptions`, {userId, animalId});
  }
}
