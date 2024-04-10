import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PetCadastroComponent } from './pages/pet-cadastro/pet-cadastro.component';
import { PetComponent } from './pages/pet/pet.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '#', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'pet', component: PetComponent},
  { path: 'pet-cadastro', component: PetCadastroComponent},
  { path: 'cadastro', component: CadastroComponent},
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

