import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signInForm: FormGroup;
  listaErros: string[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      senha: ['', [Validators.required, this.validarSenha, Validators.maxLength(100)]]
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

  onSubmit() {
    this.listaErros = [];

    Object.keys(this.signInForm.controls).forEach(campo => {
      const control = this.signInForm.get(campo);

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
            // Adicione outros casos de erro conforme necessário
          }
        });
      }
    });

    this.esconder();
  }

  esconder(): void{
    const timer = of(null).pipe(delay(5000));

    // Quando o atraso terminar, define mostrarDiv como false
    timer.subscribe(() => {
      this.listaErros = [];
    });
  }

  fecharModal(): void{
    this.listaErros = [];
  }

}
