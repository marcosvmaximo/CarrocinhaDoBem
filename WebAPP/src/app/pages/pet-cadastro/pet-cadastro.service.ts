import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../../commons/api";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PetCadastroService {

  constructor(private http: HttpClient) { }

  cadastrarPet(body: FormData): Observable<any>{
    return this.http.post(`${apiUrl}/animals`, body);
  }
}
