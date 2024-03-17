import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IAnimal } from '../interfaces/animal';


@Injectable({
  providedIn: 'root'
})
export class PetsServiceService {

  apiURL: string = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  getAnimals(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}`);
  }

  insertAnimal(animal: IAnimal): Observable<any> {
    return this.http.post(`${this.apiURL}`, animal);
  }
}
