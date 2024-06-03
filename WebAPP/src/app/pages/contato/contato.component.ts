import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ButtonDirective,
    Ripple,
    ToastModule
  ],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.scss'
})
export class ContatoComponent {

  form: FormGroup;
  nome: any;
  email: any;
  mensagem: any;

  private fieldNames: {
    nome: "Nome";
    email: "E-mail";
    mensagem: "Mensagem";
  };

  constructor(private fb: FormBuilder, private msgService: MessageService) {
    this.form = this.fb.group({
      nome: ['', Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-ZÀ-ÿ\s]{3,50}')],
      email: ['', Validators.required, Validators.email],
      mensagem: ['', Validators.maxLength(100)]
    });

    this.fieldNames = {
      nome: "Nome",
      email: "E-mail",
      mensagem: "Mensagem"
    };
  }
  get f() { return this.form.controls; }

  onSubmit() {
    if(this.form.invalid){
      this.showErrors();
    }
  }

  showErrors(){
    Object.keys(this.form.controls).forEach(key => {
      // @ts-ignore
      const controlErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          switch (keyError) {
            case 'required':
              // @ts-ignore
              this.showErrorViaToast('O campo ' + this.fieldNames[key] + ' é obrigatório.');
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
