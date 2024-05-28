import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { delay, of, timer } from 'rxjs';
import {AuthService} from "../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {IUser} from "../../interfaces/IUser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  signupForm: FormGroup;
  listaErros: string[] = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
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

    const formValue = this.signupForm.value;
    this.authService.registrar(formValue.nome, formValue.email, formValue.senha, formValue.confirmarSenha).subscribe(
      (response: any) => {
        localStorage.setItem('logado', 'true');
        localStorage.setItem('nome', formValue.nome);

        this.router.navigate(['/home']);
      },
      (error: HttpErrorResponse) => {
        console.error('Erro ao registrar usuário:', error);

        if (error.error && Array.isArray(error.error)) {
          error.error.forEach((item: any) => {
            this.listaErros.push(`${item.code}: ${item.description}`);
          });
        } else if (error.error && typeof error.error === 'object') {
          const errorObj = error.error;
          const code = errorObj.code || 'Unknown';
          const description = errorObj.description || 'Unknown description';
          this.listaErros.push(`${code}: ${description}`);
        } else {
          this.listaErros.push(error.message || 'Erro ao registrar usuário. Por favor, tente novamente.');
        }

        this.esconder();
      }
    );
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
