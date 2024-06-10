import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../../commons/api";

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private http: HttpClient) { }

  enviarFormulario(form: { nome: string, email: string, mensagem: string }) {
    return true;
  }
}
