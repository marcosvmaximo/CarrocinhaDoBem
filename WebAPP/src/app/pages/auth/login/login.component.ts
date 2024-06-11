import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, Validators
} from '@angular/forms';
import {Router, RouterLink} from "@angular/router";
import {ButtonDirective} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {Ripple} from "primeng/ripple";
import {MessageModule} from "primeng/message";
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from "../services/auth.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ButtonDirective,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    Ripple,
    MessageModule,
    NgIf,
    NgClass,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  senha!: string;
  form: FormGroup;

  private fieldNames: any = {
    email: "E-mail",
    senha: "Senha"
  };
  constructor(private fb: FormBuilder, private service: AuthService, private msgService: MessageService, private router: Router) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      // senha: ['', [Validators.required, this.passwordValidator]],
      senha: ['', [Validators.required]]
    });
  }

  get f() { return this.form.controls; }

  entrar() {
    if (this.form.invalid) {
      this.showErrors();
      return;
    }

    const email = this.f['email'].value;
    const senha = this.f['senha'].value;
    this.service.login({email: email, password: senha})
      .subscribe((response)=> {
        this.msgService.add({ key: 'tst', severity: 'success', summary: 'Successo', detail: 'Login realizado com sucesso' });

        localStorage.setItem("logado", "true");
        localStorage.setItem("user", JSON.stringify(response.data));

        if(email === 'admin@gmail.com' && senha === 'Admin123'){
          localStorage.setItem("admin", "true");
        }

        setTimeout(() => {
          this.router.navigate(['/inicio']);
        }, 1000);
      }, err => {
        this.msgService.add({ key: 'tst', severity: 'error', summary: 'Mensagem de Erro', detail: 'Email ou senha inválidos.' });
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
