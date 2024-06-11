import { Component, OnInit } from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors, Validators
} from '@angular/forms';
import {Router, RouterLink} from "@angular/router";
import {ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {Ripple} from "primeng/ripple";
import {NgClass, NgIf} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {AuthService} from "../services/auth.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ButtonDirective,
    InputTextModule,
    PasswordModule,
    Ripple,
    FormsModule,
    NgIf,
    NgClass,
    ToastModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent{
  password!: string;
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthService, private msgService: MessageService, private router: Router) {
    this.form = fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(50)]],
      senha: ['', [Validators.required, this.passwordValidator, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  get f() { return this.form.controls; }

  private fieldNames: any = {
    username: "Nome",
    email: "E-mail",
    senha: "Senha",
    confirmarSenha: "Confirmar Senha"
  };

  cadastrar() {
    if (this.form.invalid) {
      this.showErrors();
      return;
    }

    const username = this.f['username'].value;
    const email = this.f['email'].value;
    const senha = this.f['senha'].value;
    const confirmarSenha = this.f['confirmarSenha'].value;

    if(senha != confirmarSenha){
      this.showErrorViaToast("Senhas não coincidem.");
      return;
    }

    this.service.registrar(username, email, senha, confirmarSenha)
      .subscribe((response)=> {
        this.msgService.add({ key: 'tst', severity: 'success', summary: 'Successo', detail: 'Registro realizado com sucesso' });

        localStorage.setItem("logado", "true");
        localStorage.setItem("user", JSON.stringify(response));

        if(email === 'admin@gmail.com' && senha === 'Admin123'){
          localStorage.setItem("admin", "true");
        }

        setTimeout(() => {
          this.router.navigate(['/inicio']);
        }, 1000);
      }, err => {
        this.msgService.add({ key: 'tst', severity: 'error', summary: 'Mensagem de Erro', detail: 'Ocorreu um erro inesperado ao realizar o login, tente novamente em alguns instantes.' });
      });
  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    const hasNumber = /[0-9]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasMinimumLength = value ? value.length >= 6 : false;

    const passwordValid = hasNumber && hasUpperCase && hasLowerCase && hasMinimumLength;
    if (!passwordValid) {
      return { 'passwordInvalid': true };
    }
    return null;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('senha');
    const confirmarSenha = control.get('confirmarSenha');

    if (!senha || !confirmarSenha) {
      return null;
    }

    return senha.value === confirmarSenha.value ? null : { passwordsMismatch: true };
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
            case 'email':
              // @ts-ignore
              this.showErrorViaToast('O valor do campo ' + this.fieldNames[key] + ' não é um e-mail valido.');
              break;
            case 'passwordInvalid':
              // @ts-ignore
              this.showErrorViaToast('As senhas não coincidem.');
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
