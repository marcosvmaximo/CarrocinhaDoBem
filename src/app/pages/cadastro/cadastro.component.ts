import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import {delay, of} from "rxjs";

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
      nome: ['', Validators.required, Validators.maxLength(30), Validators.pattern("^[a-zA-ZÀ-ÖØ-öø-ÿ']+(\\s[a-zA-ZÀ-ÖØ-öø-ÿ']+)*$")],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      senha: ['', [Validators.required, this.validarSenha, Validators.maxLength(100)]],
      confirmarSenha: ['', Validators.required, this.validarSenha, Validators.maxLength(100), this.validarConfirmarSenha.bind(this)],
      concordatermos: [false, Validators.requiredTrue]
    });
  }

  validarSenha(control: AbstractControl): { [key: string]: boolean } | null {
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

    if (senha && confirmarSenha && senha.value !== confirmarSenha.value) {
      return { senhaDiferente: true };
    }

    return null;
  }

  onSubmit() {
    this.listaErros = [];

    Object.keys(this.signupForm.controls).forEach(campo => {
      const control = this.signupForm.get(campo);

      // @ts-ignore
      if (control.invalid) {
        // @ts-ignore
        Object.keys(control.errors).forEach(erro => {
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
            case 'senhaCurta':
              this.listaErros.push(`A senha deve ter no mínimo 8 caracteres.`);
              break;
            case 'senhasDiferentes':
              this.listaErros.push(`As senhas não coincidem.`);
              break;
            // Adicione outros casos de erro conforme necessário
          }
        });
      }
    });

    this.esconder();
  }

  esconder(): void{
    const timer = of(null).pipe(delay(5000));

    timer.subscribe(() => {
      this.listaErros = [];
    });
  }

  fecharModal(): void{
    this.listaErros = [];
  }
}
