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
import { IDoacao } from "../doacoes/model/IDoacao";
import { DoacoesService } from '../doacoes/doacoes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-doacoes',
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
  templateUrl: './doacoes-admin.component.html',
  styleUrls: ['./doacoes-admin.component.scss'],
  providers: [CurrencyPipe, DatePipe]
})
export class DoacoesAdminComponent implements OnInit {
  doacoes: IDoacao[] = [];

  constructor(
    private doacoesService: DoacoesService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.loadDonations();
  }

  loadDonations(): void {
    this.doacoesService.getDoacoes().subscribe(
      (data: IDoacao[]) => {
        this.doacoes = data;
        console.log('Doações carregadas:', this.doacoes);
      },
      (error: any) => {
        console.error('Erro ao carregar doações:', error);
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
