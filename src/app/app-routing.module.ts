import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilEditComponent } from './pages/perfil-edit/perfil-edit.component';

import { UsuarioNaoAutenticadoGuard } from './services/guard/usuario-nao-autenticado.guard';
import { UsuarioAutenticadoGuard } from './services/guard/usuario-autenticado.guard';
import {NossaMissaoComponent} from "./pages/nossa-missao/nossa-missao.component";
import {ContatoComponent} from "./pages/contato/contato.component";
import {DoacoesComponent} from "./pages/doacoes/doacoes.component";
import {PetsComponent} from "./pages/pets/pets.component";
import {PetCadastroComponent} from "./pages/pet-cadastro/pet-cadastro.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [UsuarioNaoAutenticadoGuard] },
  { path: 'cadastro', component: CadastroComponent, canActivate: [UsuarioNaoAutenticadoGuard] },
  { path: 'login', component: LoginComponent, canActivate: [UsuarioNaoAutenticadoGuard] },
  { path: 'pets', component: PetsComponent, canActivate: [UsuarioNaoAutenticadoGuard] },
  { path: 'pets-cadastro', component: PetCadastroComponent, canActivate: [UsuarioNaoAutenticadoGuard] },
  { path: 'doacoes', component: DoacoesComponent, canActivate: [UsuarioNaoAutenticadoGuard] },
  { path: 'contato', component: ContatoComponent, canActivate: [UsuarioNaoAutenticadoGuard] },
  { path: 'nossa-missao', component: NossaMissaoComponent, canActivate: [UsuarioNaoAutenticadoGuard] },
  { path: 'perfil-edit', component:PerfilEditComponent, canActivate: [UsuarioAutenticadoGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

