import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./pages/home/home.component";
import {NotfoundComponent} from "./demo/components/notfound/notfound.component";
import {ContatoComponent} from "./pages/contato/contato.component";
import {NossaMissaoComponent} from "./pages/nossa-missao/nossa-missao.component";
import {SobreComponent} from "./pages/sobre/sobre.component";
import {ApadrinhadosComponent} from "./pages/apadrinhados/apadrinhados.component";
import {DoacoesComponent} from "./pages/doacoes/doacoes.component";
import {CatalogoAdocaoComponent} from "./pages/catalogo-adocao/catalogo-adocao.component";
import {ConfiguracaoComponent} from "./pages/configuracao/configuracao.component";
import {PerfilComponent} from "./pages/perfil/perfil.component";
import {PetCadastroComponent} from "./pages/pet-cadastro/pet-cadastro.component";
import {LandingComponent} from "./demo/components/landing/landing.component";
import {LadingPageComponent} from "./pages/lading-page/lading-page.component";
import {LadingPageHomeComponent} from "./pages/lading-page-home/lading-page-home.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {CadastroComponent} from "./pages/auth/cadastro/cadastro.component";
import {SemAcessoComponent} from "./pages/sem-acesso/sem-acesso.component";
import {authGuard} from "./commons/guards/auth.guard";
import {authInverterGuard} from "./commons/guards/auth-inverter.guard";
import {adminGuard} from "./commons/guards/admin.guard";
import {DoacoesCadastroComponent} from "./pages/doacoes-cadastro/doacoes-cadastro.component";
import {AdocaoComponent} from "./pages/adocao/adocao.component";
import {ApadrinhadosCadastroComponent} from "./pages/apadrinhados-cadastro/apadrinhados-cadastro.component";
import {DoacoesAdminComponent} from "./pages/doacoes-admin/doacoes-admin.component";
import {ApadrinhadosAdminComponent} from "./pages/apadrinhados-admin/apadrinhados-admin.component";

export const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {
    path: 'inicio', component: LadingPageComponent, children: [
      {path: '', component: LadingPageHomeComponent},
      {path: 'pets', component: CatalogoAdocaoComponent},
      {path: 'sobre', component: SobreComponent},
      {path: 'contato', component: ContatoComponent},
      {path: 'nossa-missao', component: NossaMissaoComponent},
      {path: 'configuracao', component: ConfiguracaoComponent}
    ]
  },
  {
    path: 'dashboard', component: AppLayoutComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'pets', component: CatalogoAdocaoComponent},
      {path: 'pets-cadastro', component: PetCadastroComponent, canActivate: [adminGuard]},
      {path: 'pets-adocao/:id', component: AdocaoComponent},
      {path: 'doacoes', component: DoacoesComponent},
      {path: 'doacoes-cadastro', component: DoacoesCadastroComponent},
      {path: 'doacoes-admin', component: DoacoesAdminComponent, canActivate: [adminGuard]},
      {path: 'apadrinhados', component: ApadrinhadosComponent},
      {path: 'apadrinhados-cadastro', component: ApadrinhadosCadastroComponent},
      {path: 'apadrinhados-admin', component: ApadrinhadosAdminComponent, canActivate: [adminGuard]},
      {path: 'sobre', component: SobreComponent},
      {path: 'nossa-missao', component: NossaMissaoComponent},
      {path: 'contato', component: ContatoComponent},
      {path: 'perfil', component: PerfilComponent},
      {path: 'configuracao', component: ConfiguracaoComponent}
    ], canActivate: [authGuard]
  },
  {
    path: 'entrar', component: LoginComponent, canActivate: [authInverterGuard]
  },
  {
    path: 'registrar', component: CadastroComponent, canActivate: [authInverterGuard]
  },
  {
    path: '**', component: SemAcessoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
