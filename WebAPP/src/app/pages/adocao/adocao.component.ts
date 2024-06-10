import {Component, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {NgIf} from "@angular/common";
import {Ripple} from "primeng/ripple";
import {AdocaoService} from "./adocao.service";
import {ActivatedRoute, Router} from "@angular/router";
import {format, isValid, parseISO} from "date-fns";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-adocao',
  standalone: true,
  imports: [
    ButtonDirective,
    NgIf,
    Ripple,
    ToastModule
  ],
  templateUrl: './adocao.component.html',
  styleUrl: './adocao.component.scss'
})
export class AdocaoComponent implements OnInit {

  pet: any = {};

  usuario: any = {};

  id: any;

  constructor(private route: ActivatedRoute, private service: AdocaoService, private msgService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.service.getPet(this.id).then(data => {
      this.pet = data;
    });

    const user = localStorage.getItem("user");
    this.usuario = JSON.parse(user!);
  }
  confirmarAdocao() {

    this.service.adotarAnimal(this.id, this.usuario.id)
      .subscribe((response)=> {
        this.msgService.add({ key: 'tst', severity: 'success', summary: 'Successo', detail: "Envio de adoção com sucesso" });
        this.router.navigate(['/dashboard/pets']);
      }, err => {
        this.msgService.add({ key: 'tst', severity: 'error', summary: 'Mensagem de Erro', detail: 'Ocorreu um erro inesperado ao realizar o pedido de adoção, tente novamente em alguns instantes.' });
      });
  }

  formatarTelefone(telefone: string): string {
    if (!telefone) return '-';

    const regexMascara = /(\d{2})(\d{5})(\d{4})/;
    const regexCodigoPais = /^\+[\d]{2}$/;

    if (regexCodigoPais.test(telefone)) {
      return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3');
    } else {
      return telefone.replace(regexMascara, '($1) $2-$3');
    }
  }

  formatDate(date: string): string {
    if (!date) return '-';
    const parsedDate = parseISO(date);

    if (!isValid(parsedDate) || date === '0001-01-01T00:00:00') {
      return '-';
    }

    return format(parsedDate, 'dd/MM/yyyy');
  }
}
