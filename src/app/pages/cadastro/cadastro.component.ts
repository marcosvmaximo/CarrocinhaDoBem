import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { timer } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  signupForm: FormGroup;
  listaErros: string[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern("^[a-zA-ZÀ-ÖØ-öø-ÿ']+(\\s[a-zA-ZÀ-ÖØ-öø-ÿ']+)*$")]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email, Validators.maxLength(100)]],
      senha: ['', [Validators.required, this.validarSenha, Validators.maxLength(100)]],
      confirmarSenha: ['', [Validators.required, this.validarConfirmarSenha, Validators.maxLength(100)]],
      concordatermos: [false, Validators.requiredTrue]
    }, {
      validators: this.validarConfirmarSenha.bind(this)
    });
  }

  validarSenha(control: AbstractControl): ValidationErrors | null {
    const senha = control.value;
    const possuiLetraMaiuscula = /[A-Z]/.test(senha);
    const possuiNumero = /[0-9]/.test(senha);
    if (!possuiLetraMaiuscula || !possuiNumero) {
      return { senhaInvalida: true };
    }
    return null;
  }

  validarConfirmarSenha(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('senha');
    const confirmarSenha = control.get('confirmarSenha');

    if (senha && confirmarSenha) {
      if (senha.value !== confirmarSenha.value) {
        confirmarSenha.setErrors({ senhaDiferente: true });
        return { senhaDiferente: true };
      } else {
        confirmarSenha.setErrors(null);
        return null;
      }
    }

    return null;
  }



  onSubmit() {
    this.listaErros = [];

    Object.keys(this.signupForm.controls).forEach(campo => {
      const control = this.signupForm.get(campo);

      if (control && control.invalid && control.touched) {
        const errors = control.errors as ValidationErrors; // Convertendo para ValidationErrors

        Object.keys(errors).forEach(erro => {
          switch (erro) {
            case 'required':
              this.listaErros.push(`O campo ${campo} é obrigatório.`);
              break;
            case 'maxlength':
              this.listaErros.push(`O campo ${campo} excedeu o número máximo de caracteres permitidos.`);
              break;
            case 'email':
              this.listaErros.push(`O campo ${campo} deve ser um e-mail válido.`);
              break;
            case 'senhaInvalida':
              this.listaErros.push(`A senha deve conter letras maiúsculas e números.`);
              break;
            case 'senhaDiferente':
              this.listaErros.push(`As senhas não coincidem.`);
              break;
            default:
              break;
          }
        });
      }
    });


    this.esconder();
  }

  esconder(): void {
    const timer$ = timer(5000);

    timer$.subscribe(() => {
      this.listaErros = [];
    });
  }

  fecharModal(): void {
    this.listaErros = [];
  }

}
