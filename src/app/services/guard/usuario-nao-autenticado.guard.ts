import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UsuarioNaoAutenticadoGuard implements CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router) { }
  canActivate(){
    if (!this.authService.login) { 
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
