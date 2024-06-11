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
            label: 'Pages',
            items: [
              { label: 'Catalogo Adoções', icon: 'pi pi-fw pi-wallet', routerLink: ['/dashboard/pets'] },
              { label: 'Pet Cadastro', icon: 'pi pi-fw pi-plus-circle', routerLink: ['/dashboard/pets-cadastro'], admin: true },
              { label: 'Suas Doações', icon: 'pi pi-fw pi-wallet', routerLink: ['/dashboard/doacoes']},
              { label: 'Realizar Doação', icon: 'pi pi-fw pi-file-arrow-up', routerLink: ['/dashboard/doacoes-cadastro'] },
              { label: 'Todas Doações', icon: 'pi pi-fw pi-list-check', routerLink: ['/dashboard/doacoes-admin'], admin: true },
              { label: 'Seus Apadrinhados', icon: 'pi pi-fw pi-bookmark', routerLink: ['/dashboard/apadrinhados'] },
              { label: 'Realizar Apadrinhamento', icon: 'pi pi-fw pi-file-plus', routerLink: ['/dashboard/apadrinhados-cadastro'] },
              { label: 'Todos Apadrinhados', icon: 'pi pi-fw pi-list-check', routerLink: ['/dashboard/apadrinhados-admin'], admin: true },
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
