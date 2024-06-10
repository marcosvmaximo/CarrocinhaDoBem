import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Button } from "primeng/button";
import { DataView, DataViewModule } from "primeng/dataview";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import {MessageService, PrimeTemplate, SelectItem } from "primeng/api";
import { RatingModule } from "primeng/rating";
import { FormsModule } from "@angular/forms";
import { IAnimal } from "./model/IAnimal";
import { CatalogoAdocaoService } from "./catalogo-adocao.service";
import { NgxTippyModule } from "ngx-tippy-wrapper";
import { UtilsService } from "../../commons/utils.service";

@Component({
  selector: 'app-catalogo-adocao',
  standalone: true,
  imports: [
    Button,
    DataViewModule,
    DropdownModule,
    InputTextModule,
    NgForOf,
    PrimeTemplate,
    RatingModule,
    FormsModule,
    NgClass,
    NgxTippyModule,
    NgIf
  ],
  templateUrl: './catalogo-adocao.component.html',
  styleUrl: './catalogo-adocao.component.scss'
})
export class CatalogoAdocaoComponent implements OnInit{
  animals: IAnimal[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  constructor(private service: CatalogoAdocaoService, private util: UtilsService, private router: Router, private msgService: MessageService) {
  }
  ngOnInit() {
    this.buscarAnimals();

    this.sortOptions = [
      { label: 'Alfabética [A-Z]', value: 'name' },
      { label: 'Alfabética [Z-A]', value: '!name' },
      { label: 'Recém-Chegados', value: 'rescueDate' },
      { label: 'Veteranos', value: '!rescueDate' },
      { label: 'Mais novos', value: 'birthDate' },
      { label: 'Mais velhos', value: '!birthDate' },
    ];
  }

  buscarAnimals(){
    this.service.getAnimals(this.sortField, this.sortOrder)
      .then(data => this.animals = data)
      .catch(err => {
        this.msgService.add({severity: 'error', summary: 'Erro ao buscar animais', detail: err.errors});
      });
  }

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }

    this.buscarAnimals();
  }

  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value, 'contains');
  }

  calcularIdade(dataAniversario: Date): string{
    return this.util.calcularIdade(dataAniversario);
  }

  carregarImagem(imagem: ArrayBuffer) {
    return 'data:image/jpeg;base64, ' + imagem;
  }

  adotarAnimal(id: number) {
    this.router.navigate(['/dashboard/pets-adocao', id]);
  }

  navigateToApadrinhamento(animal: IAnimal) {
    this.router.navigate(['dashboard/apadrinhados-cadastro'], { state: { animal } });
  }
}
