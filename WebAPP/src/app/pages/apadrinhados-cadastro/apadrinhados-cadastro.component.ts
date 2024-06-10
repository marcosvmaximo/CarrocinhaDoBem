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
    CommonModule
  ],
  templateUrl: './apadrinhados-cadastro.component.html',
  styleUrls: ['./apadrinhados-cadastro.component.scss']
})
export class ApadrinhadosCadastroComponent {
  cadastroForm: FormGroup;
  selectedAnimal: IAnimal;
  serverErrors: { [key: string]: string[] } = {};

  constructor(
    private fb: FormBuilder,
    private apadrinhadosCadastroService: ApadrinhadosCadastroService,
    private authService: AuthService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state && navigation.extras.state['animal']) {
      this.selectedAnimal = navigation.extras.state['animal'];
    }

    this.cadastroForm = this.fb.group({
      userId: [this.authService.obterIdLogado(), Validators.required],
      initialDate: ['', [Validators.required, this.dateNotInFuture]],
      endDate: ['', [Validators.required, this.dateNotInFuture]],
      sponsorshipValue: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      sponsorshipType: ['', [Validators.required, Validators.maxLength(20)]],
      status: ['', Validators.required],
      animalId: [this.selectedAnimal ? this.selectedAnimal.id : null, Validators.required],
      animal: [this.selectedAnimal ? this.selectedAnimal.name : null, Validators.required]
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const apadrinhamento: IApadrinhamento = this.cadastroForm.value;
      console.log('Dados enviados:', apadrinhamento);
      this.apadrinhadosCadastroService.cadastrarApadrinhado(apadrinhamento)
        .subscribe(
          response => {
            console.log('Apadrinhado cadastrado com sucesso', response);
            // Redirecionar ou exibir mensagem de sucesso
          },
          (error: HttpErrorResponse) => {
            if (error.status === 400 && error.error.errors) {
              this.serverErrors = error.error.errors;
            } else {
              console.error('Erro ao cadastrar apadrinhado', error.message, error.error);
            }
          }
        );
    } else {
      console.error('Formulário inválido');
      console.log(this.cadastroForm);
    }
  }

  getErrorMessage(controlName: string): string[] | null {
    return this.serverErrors[controlName] || null;
  }

  dateNotInFuture(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    return selectedDate <= today ? null : { futureDate: true };
  }
}
