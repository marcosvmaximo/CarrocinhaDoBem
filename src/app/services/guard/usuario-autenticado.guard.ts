import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Router } from "express";
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router) { }
  canActivate(){
    if (this.authService.logado) {
      return true;
    }
    // @ts-ignore
    this.router.navigate(['login']);
    return false;
  }
}
