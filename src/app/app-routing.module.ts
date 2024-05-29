import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilEditComponent } from './pages/perfil-edit/perfil-edit.component';
import {NossaMissaoComponent} from "./pages/nossa-missao/nossa-missao.component";
import {ContatoComponent} from "./pages/contato/contato.component";
import {DoacoesComponent} from "./pages/doacoes/doacoes.component";
import {PetCadastroComponent} from "./pages/pet-cadastro/pet-cadastro.component";
import {PetComponent} from "./pages/pet/pet.component";
import {autorizadoGuard} from "./services/guard/autorizado.guard";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import { PetManageComponent } from './pages/pet-manage/pet-manage/pet-manage.component';
import {ApadrinhadosComponent} from "./pages/apadrinhados/apadrinhados.component";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'pets', component: PetComponent, canActivate: [autorizadoGuard]  },
      { path: 'pets-cadastro', component: PetCadastroComponent, canActivate: [autorizadoGuard]  },
      { path: 'doacoes', component: DoacoesComponent, canActivate: [autorizadoGuard] },
      { path: 'contato', component: ContatoComponent, canActivate: [autorizadoGuard] },
      { path: 'nossa-missao', component: NossaMissaoComponent, canActivate: [autorizadoGuard] },
      { path: 'perfil-edit', component: PerfilEditComponent, canActivate: [autorizadoGuard] },
      { path: 'pet-manage', component: PetManageComponent, canActivate: [autorizadoGuard]},
      { path: 'apadrinhados', component: ApadrinhadosComponent, canActivate: [autorizadoGuard] }
    ]
  },
  { path: 'cadastrar', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

