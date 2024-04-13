import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { delay, of, timer } from 'rxjs';
import {setShow} from "../../services/guard/show";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit{

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
    if (control.touched && (!possuiLetraMaiuscula || !possuiNumero)) {
      return { senhaInvalida: true };
    }
    return null;
  }
  ngOnInit(): void {
    setShow(false);
  }

  validarConfirmarSenha(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('senha');
    const confirmarSenha = control.get('confirmarSenha');

    if  (senha && confirmarSenha) {
      if (control.touched && (senha.value !== confirmarSenha.value)) {
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
        const errors = control.errors as ValidationErrors;

        Object.keys(errors).forEach(erro => {
          switch (erro) {
            case 'required':
              this.listaErros.push(`O campo ${campo} é obrigatório.`);
              break;
            case 'maxlength':
              this.listaErros.push(`O campo ${campo} excedeu o número máximo de caracteres permitidos.`);
              break;
              case 'minlength':
              this.listaErros.push(`O campo ${campo} deve ter no minimo 3 caracteres.`);
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
