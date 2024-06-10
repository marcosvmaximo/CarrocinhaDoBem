import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {NgxTippyModule} from "ngx-tippy-wrapper";
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastModule} from "primeng/toast";
import {IApadrinhamento} from "../apadrinhados/model/IApadrinhamento";
import {ApadrinhamentoService} from "../apadrinhados/apadrinhados.service";
import {IAnimal} from "../catalogo-adocao/model/IAnimal";
import {ApadrinhadosCadastroService} from "../apadrinhados-cadastro/apadrinhados-cadastro.service";
import {AuthService} from "../auth/services/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";
import {DoacoesService} from "./doacoes.service";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'app-doacoes-cadastro',
  standalone: true,
  imports: [
    Button,
    CalendarModule,
    InputTextModule,
    NgForOf,
    NgIf,
    NgxTippyModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextareaModule
  ],
  templateUrl: './doacoes-cadastro.component.html',
  styleUrl: './doacoes-cadastro.component.scss'
})
export class DoacoesCadastroComponent {
  cadastroForm: FormGroup;
  selectedAnimal: IAnimal;
  serverErrors: { [key: string]: string[] } = {};

  fieldNames = {};

  constructor(
    private fb: FormBuilder,
    private donationService: DoacoesService,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state && navigation.extras.state['animal']) {
      this.selectedAnimal = navigation.extras.state['animal'];
    }

    this.cadastroForm = this.fb.group({
      userId: [this.authService.obterIdLogado(), [Validators.required]],
      donationDate: ['', [Validators.required, this.dateNotInFuture]],
      institutionId: ['1', [Validators.required]],
      donationValue: ['', [Validators.required, Validators.pattern('^[0-9,.]*$')]],
      description: ['', [Validators.required]]
    });
    this.fieldNames = {
      userId: 'Id do Usuário',
      donationDate: 'Data da Doação',
      institutionId: 'Id da Instituição',
      donationValue: 'Valor da Doação',
      description: 'Descrição'
    };
  }

  onSubmit() {
    if(this.cadastroForm.invalid){
      this.showErrors();
      return;
    }

    const body = {
      userId: this.authService.obterIdLogado(),
      donationDate: this.cadastroForm.value.donationDate,
      institutionId: this.cadastroForm.value.institutionId,
      donationValue: this.cadastroForm.value.donationValue,
      description: this.cadastroForm.value.description
    };

    this.donationService.cadastrarDoacoes(this.cadastroForm.value)
      .subscribe(
        response => {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Mensagem de Erro', detail: 'Doação cadastrada com sucesso!' });
          this.router.navigate(['/dashboard/pets']);
        },
        (err: HttpErrorResponse) => {
          this.showErrorViaToast('Ocorreu um erro ao cadastrar a doação: ' + err.message);
        }
      );
  }

  getErrorMessage(controlName: string): string[] | null {
    return this.serverErrors[controlName] || null;
  }

  dateNotInFuture(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    return selectedDate <= today ? null : { futureDate: true };
  }

  showErrors(){
    console.log('showErrors', this.cadastroForm.controls);
    Object.keys(this.cadastroForm.controls).forEach(key => {
      // @ts-ignore
      const controlErrors = this.cadastroForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          switch (keyError) {
            case 'required':
              // @ts-ignore
              this.showErrorViaToast('O campo ' + this.fieldNames[key] + ' é obrigatório.');
              break;
            case 'dataFuture':
              // @ts-ignore
              this.showErrorViaToast('O campo ' + this.fieldNames[key] + ' nâo permite data no futuro.');
              break;
            case 'minlength':
              // @ts-ignore
              this.showErrorViaToast('O valor do campo ' + this.fieldNames[key] + ' é menor do que permitido.');
              break;
            case 'maxlength':
              // @ts-ignore
              this.showErrorViaToast('O valor do campo ' + this.fieldNames[key] + ' é maior do que permitido.');
              break;
            default:
              // @ts-ignore
              this.showErrorViaToast('Erro no campo ' + this.fieldNames[key] + '.');
              break;
          }
        });
      }
    });
  }

  showErrorViaToast(message: string = "") {
    console.log('showErrorViaToast', message);
    this.msgService.add({ key: 'tst', severity: 'error', summary: 'Mensagem de Erro', detail: message ? message : 'Validação falhou' });
  }
}
