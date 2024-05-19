import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../interfaces/IUser";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'https://localhost:7171/api/auth';
  constructor(private http: HttpClient) { }

  updateProfile(user: object, id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, user);
  }

  deleteProfile(id: number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
