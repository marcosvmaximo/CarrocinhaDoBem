import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { UsuarioCadastroComponent } from './navegacao/usuario-cadastro/usuario-cadastro.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'usuario-cadastro', component:UsuarioCadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
