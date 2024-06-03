import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  calcularIdade(dataDeAniversario: Date): string {
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth() + 1; // Meses são indexados de 0 a 11
    const diaAtual = hoje.getDate();

    const anoDeNascimento = new Date(dataDeAniversario).getFullYear();
    const mesDeNascimento = new Date(dataDeAniversario).getMonth() + 1;
    const diaDeNascimento = new Date(dataDeAniversario).getDate();

    let idadeAnos = anoAtual - anoDeNascimento;
    let idadeMeses = mesAtual - mesDeNascimento;
    let idadeDias = diaAtual - diaDeNascimento;

    // Ajuste para o caso de o dia de nascimento ser maior que o dia atual
    if (idadeDias < 0) {
      idadeMeses--; // Subtrai um mês
      const ultimoDiaDoMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
      idadeDias += ultimoDiaDoMesAnterior; // Adiciona o número de dias do último mês
    }

    // Ajuste para o caso de o mês de nascimento ser maior que o mês atual
    if (idadeMeses < 0) {
      idadeAnos--; // Subtrai um ano
      idadeMeses += 12; // Adiciona 12 meses
    }

    if (idadeAnos > 0) {
      return `${idadeAnos} ano${idadeAnos > 1 ? 's' : ''}`;
    } else if (idadeMeses > 0) {
      return `${idadeMeses} mês${idadeMeses > 1 ? 'es' : ''}`;
    } else {
      return `${idadeDias} dia${idadeDias > 1 ? 's' : ''}`;
    }
  }
}
