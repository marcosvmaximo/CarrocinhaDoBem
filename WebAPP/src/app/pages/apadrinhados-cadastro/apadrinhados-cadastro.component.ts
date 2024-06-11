import { Component } from '@angular/core';
import { ApadrinhadosCadastroService } from './apadrinhados-cadastro.service';
import { IApadrinhamento } from '../apadrinhados/model/IApadrinhamento';
import { IAnimal } from '../catalogo-adocao/model/IAnimal';
import { FormBuilder, FormGroup, Validators, FormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ChipsModule } from 'primeng/chips';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { Ripple } from 'primeng/ripple';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/services/auth.service';
import {NgxTippyModule} from "ngx-tippy-wrapper";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-apadrinhados-cadastro',
  standalone: true,
    imports: [
        DropdownModule,
        AutoCompleteModule,
        CalendarModule,
        ReactiveFormsModule,
        ToastModule,
        ChipsModule,
        InputGroupAddonModule,
        InputGroupModule,
        InputMaskModule,
        InputNumberModule,
        InputTextModule,
        InputTextareaModule,
        MultiSelectModule,
        FormsModule,
        Ripple,
        FileUploadModule,
        CommonModule,
        NgxTippyModule
    ],
  templateUrl: './apadrinhados-cadastro.component.html',
  styleUrls: ['./apadrinhados-cadastro.component.scss']
})
export class ApadrinhadosCadastroComponent {
  cadastroForm: FormGroup;
  selectedAnimal: IAnimal;
  serverErrors: { [key: string]: string[] } = {};

  fieldNames = {};

  constructor(
    private fb: FormBuilder,
    private apadrinhadosCadastroService: ApadrinhadosCadastroService,
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
      initialDate: ['', [Validators.required, this.dateNotInFuture]],
      endDate: ['', [Validators.required]],
      sponsorshipValue: ['', [Validators.required, Validators.pattern('^[0-9,.]*$')]],
      sponsorshipType: ['', ],
      status: [''],
      animalId: [this.selectedAnimal ? this.selectedAnimal.id : null, [Validators.required]],
      animal: [this.selectedAnimal ? this.selectedAnimal.name : null, [Validators.required]]
    });

    this.fieldNames = {
      userId: 'Id do Usuário',
      initialDate: 'Data Inicial',
      endDate: 'Data Final',
      sponsorshipValue: 'Valor do Patrocínio',
      sponsorshipType: 'Tipo de Patrocínio',
      status: 'Status',
      animalId: 'Id do Animal',
      animal: 'Nome do Animal'
    };
  }

  onSubmit() {
    if(this.cadastroForm.invalid){
      this.showErrors();
      return;
    }

    const apadrinhamento: IApadrinhamento = this.cadastroForm.value;
    apadrinhamento.sponsorshipType = "Doação Mensal";

    this.apadrinhadosCadastroService.cadastrarApadrinhado(apadrinhamento)
      .subscribe(
        response => {
          this.msgService.add({ key: 'tst', severity: 'success', summary: 'Mensagem de Erro', detail: 'Apadrinhado cadastrado com sucesso!' });
          this.router.navigate(['/dashboard/pets']);
        },
        (err: HttpErrorResponse) => {
          this.showErrorViaToast('Ocorreu um erro ao cadastrar o apadrinhado: ' + err.message);
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
    this.msgService.add({ key: 'tst', severity: 'error', summary: 'Mensagem de Erro', detail: message ? message : 'Validação falhou' });
  }
}
