import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {PrimeTemplate} from "primeng/api";
import {Ripple} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {IDoacao} from "./model/IDoacao";

@Component({
  selector: 'app-doacoes',
  standalone: true,
  imports: [
    ButtonDirective,
    PrimeTemplate,
    Ripple,
    TableModule
  ],
  templateUrl: './doacoes.component.html',
  styleUrl: './doacoes.component.scss'
})
export class DoacoesComponent {
  doacoes: IDoacao[] = [];

  constructor() {
    this.doacoes = [
      { codigo: 'Y6GD47', dataRealizacao: '12-12-2023', valor: 10.90, descricao: 'Pro cachorrinho' },
      { codigo: 'Y6GD47', dataRealizacao: '12-10-2023', valor: 12.90, descricao: 'Pro cachorrinho' },
      { codigo: 'Y6GD47', dataRealizacao: '12-09-2023', valor: 9.90, descricao: 'Pro cachorrinho' },
      { codigo: 'Y6GD47', dataRealizacao: '12-02-2023', valor: 1.90, descricao: 'Pro cachorrinho' },
    ];
  }
}
