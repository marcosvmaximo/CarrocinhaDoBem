import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { Injectable } from "@angular/core";
import {GetLogin} from "./logado";

@Injectable({
  providedIn: 'root'
})
export class UsuarioNaoAutenticadoGuard implements CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router) { }
  canActivate(){
    if (!GetLogin()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
