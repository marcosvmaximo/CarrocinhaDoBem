import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth.service";
import {logado} from "./logado";

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    if (logado) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
