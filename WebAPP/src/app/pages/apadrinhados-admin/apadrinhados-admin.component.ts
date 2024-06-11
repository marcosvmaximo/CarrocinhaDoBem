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
import { ApadrinhamentoService } from '../apadrinhados/apadrinhados.service';
import {IApadrinhamento} from "../apadrinhados/model/IApadrinhamento";

@Component({
  selector: 'app-apadrinhados-admin',
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
  templateUrl: './apadrinhados-admin.component.html',
  styleUrl: './apadrinhados-admin.component.scss',
  providers: [CurrencyPipe, DatePipe]
})
export class ApadrinhadosAdminComponent implements OnInit {
  padrinhamentos: IApadrinhamento[] = [];

  constructor(
    private apadrinhamentoService: ApadrinhamentoService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.loadSponsorships();
  }

  loadSponsorships(): void {
    this.apadrinhamentoService.getActiveIApadrinhamentos().subscribe(
      (data: IApadrinhamento[]) => {
        this.padrinhamentos = data;
      },
      (error: any) => {
        console.error('Erro ao carregar patrocínios:', error);
      }
    );
  }




  formatCurrency(value: number | undefined): string {
    return value !== undefined ? this.currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2') || '' : '';
  }

  formatDate(date: string | undefined): string {
    return date !== undefined ? this.datePipe.transform(date, 'dd/MM/yyyy') || '' : '';
  }
}

