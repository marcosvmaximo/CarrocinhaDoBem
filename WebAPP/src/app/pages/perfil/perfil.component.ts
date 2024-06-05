
import { IUser } from '../auth/services/IUser';
import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from "@angular/common";
import { ButtonDirective } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { PrimeTemplate } from "primeng/api";
import { ProgressBarModule } from "primeng/progressbar";
import { SliderModule } from "primeng/slider";
import { TableModule } from "primeng/table";
import { ProfileService } from '../perfil/perfil.service';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    ButtonDirective,
    CurrencyPipe,
    DatePipe,
    DropdownModule,
    InputTextModule,
    MultiSelectModule,
    PrimeTemplate,
    ProgressBarModule,
    SliderModule,
    TableModule,
    CommonModule,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  user: IUser[] = [];

  constructor(
    private perfilService: ProfileService

  ) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.perfilService.getActiveUsers().subscribe(
      (data: IUser[]) => {
        this.user = data;
        console.log( this.user)
      },
      (error: any) => {
        console.error('Erro ao carregar users:', error);
      }
    );
  }
  
 
}
