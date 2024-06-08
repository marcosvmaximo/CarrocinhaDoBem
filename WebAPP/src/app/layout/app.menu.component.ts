import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                  { label: 'Inicio', icon: 'pi pi-f2w pi-home', routerLink: ['/dashboard'] }
                ]
            },
          {
            label: 'Pages',
            items: [
              { label: 'Catalogo Adoções', icon: 'pi pi-fw pi-wallet', routerLink: ['/dashboard/pets'] },
              { label: 'Pet Cadastro', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/dashboard/pets-cadastro'] },
              { label: 'Suas Doações', icon: 'pi pi-fw pi-wallet', routerLink: ['/dashboard/doacoes']},
              { label: 'Seus Apadrinhados', icon: 'pi pi-fw pi-bookmark', routerLink: ['/dashboard/apadrinhados'] },
            ]
          },
          {
            label: 'Site',
            items: [
              { label: 'Sobre', icon: 'pi pi-fw pi-question-circle', routerLink: ['/dashboard/sobre'] },
              { label: 'Nossa Missão', icon: 'pi pi-fw pi-star', routerLink: ['/dashboard/nossa-missao'] },
              { label: 'Contato', icon: 'pi pi-fw pi-address-book', routerLink: ['/dashboard/contato'] }
            ]
          },
            {
                label: 'Profile',
                items: [
                    { label: 'Seu Perfil', icon: 'pi pi-fw pi-user', routerLink: ['/dashboard/perfil'] },
                    { label: 'Configuração', icon: 'pi pi-fw pi-cog', routerLink: ['/dashboard/configuracao'] },
                ]
            }
        ];
    }
}
