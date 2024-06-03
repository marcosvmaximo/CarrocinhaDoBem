import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {PrimeTemplate} from "primeng/api";
import {ProgressBarModule} from "primeng/progressbar";
import {SliderModule} from "primeng/slider";
import {TableModule} from "primeng/table";
import {IDoacao} from "../doacoes/model/IDoacao";
import {IApadrinhamento} from "./model/IApadrinhamento";

@Component({
  selector: 'app-apadrinhados',
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
    TableModule
  ],
  templateUrl: './apadrinhados.component.html',
  styleUrl: './apadrinhados.component.scss'
})
export class ApadrinhadosComponent {
  padrinhamentos: IApadrinhamento[] = [];

  constructor() {
    this.padrinhamentos = [
      { codigo: 'Y6GD47', animal: 'Caramelinho', dataRealizacao: '12-12-2023', valorMensal: 10.90, valorAcumulado: 10.90},
      { codigo: 'Y6GD47', animal: 'Caramelinho', dataRealizacao: '12-12-2023', valorMensal: 10.90, valorAcumulado: 10.90},
      { codigo: 'Y6GD47', animal: 'Caramelinho', dataRealizacao: '12-12-2023', valorMensal: 10.90, valorAcumulado: 10.90},
      { codigo: 'Y6GD47', animal: 'Caramelinho', dataRealizacao: '12-12-2023', valorMensal: 10.90, valorAcumulado: 10.90},
      { codigo: 'Y6GD47', animal: 'Caramelinho', dataRealizacao: '12-12-2023', valorMensal: 10.90, valorAcumulado: 10.90},
      { codigo: 'Y6GD47', animal: 'Caramelinho', dataRealizacao: '12-12-2023', valorMensal: 10.90, valorAcumulado: 10.90},
      { codigo: 'Y6GD47', animal: 'Caramelinho', dataRealizacao: '12-12-2023', valorMensal: 10.90, valorAcumulado: 10.90},
      { codigo: 'Y6GD47', animal: 'Caramelinho', dataRealizacao: '12-12-2023', valorMensal: 10.90, valorAcumulado: 10.90},
    ];
  }
}
