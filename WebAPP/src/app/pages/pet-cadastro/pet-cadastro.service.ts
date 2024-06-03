import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../../commons/api";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PetCadastroService {

  constructor(private http: HttpClient) { }

  cadastrarPet(body: any): Observable<any>{
    const formData = new FormData();
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        formData.append(key, body[key]);
      }
    }

    console.log('1', body);
    return this.http.post(`${apiUrl}/animals`, formData);
  }
}
