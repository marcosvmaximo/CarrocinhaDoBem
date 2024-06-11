import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {StyleClassModule} from "primeng/styleclass";
import {Ripple} from "primeng/ripple";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../auth/services/auth.service";
import {NgClass, NgIf} from "@angular/common";
import {MenubarModule} from "primeng/menubar";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-lading-page',
  standalone: true,
  imports: [
    ButtonDirective,
    DividerModule,
    StyleClassModule,
    Ripple,
    RouterOutlet,
    NgIf,
    NgClass,
    RouterLink,
    MenubarModule
  ],
  templateUrl: './lading-page.component.html',
  styleUrl: './lading-page.component.scss'
})
export class LadingPageComponent implements OnInit{
  router: Router;
  tieredItems: MenuItem[] = [];
  constructor(router: Router, private authService: AuthService) {
    this.router = router;
  }

  ngOnInit(): void {
    this.tieredItems = [
      {
        label: this.obterUser(),
        items: [
          {
            label: 'Perfil',
            icon: 'pi pi-user',
            command: event => this.router.navigate(['/dashboard/perfil'])
          },
          {
            label: 'Configurações',
            icon: 'pi pi-cog',
            command: event => this.router.navigate(['/dashboard/configuracao'])
          },
          {
            label: 'Sair',
            command: event => this.deslogar()
          }
        ]
      },
    ]
  }

  logado(){
    return this.authService.estaLogado();
  }

  deslogar(){
    localStorage.setItem("logado", "false");
    localStorage.setItem("admin", "false");
    localStorage.setItem("user", "");
  }

  private obterUser() {
    const user = localStorage.getItem("user");
    // @ts-ignore
    const obj = JSON.parse(user);
    return `Seja bem-vindo ${obj.userName}`;
  }
}
