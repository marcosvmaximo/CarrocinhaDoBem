import { Injectable } from '@angular/core';
import {IAnimal} from "./model/IAnimal";
import {Product} from "../../demo/api/product";
import {HttpClient, HttpParams} from "@angular/common/http";
import {apiUrl} from "../../commons/api";

@Injectable({
  providedIn: 'root'
})
export class CatalogoAdocaoService {

  constructor(private http: HttpClient) { }

    getAnimals(sortField: string, sortOrder: number): Promise<IAnimal[]>{
      let params = new HttpParams();

      if(sortField){
        params = params.append('sortField', sortField);
        params = params.append('sortOrder', sortOrder === 1 ? "asc" : "desc");
      }

    // @ts-ignore
    return this.http.get<IAnimal[]>(`${apiUrl}/animals`, { params: params })
      .toPromise()
      .then(data => data);
  }
}
