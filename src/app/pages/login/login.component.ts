import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { delay, of } from 'rxjs';
import {setShow} from "../../services/guard/show";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  signInForm: FormGroup;
  listaErros: string[] = [];


  constructor(private formBuilder: FormBuilder) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3), Validators.email, Validators.maxLength(100)]],
      senha: ['', [Validators.required, this.validarSenha, Validators.maxLength(100)]],

    });
  }

  ngOnInit(): void {
    setShow(false);
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

  onSubmit() {
    this.listaErros = [];

    Object.keys(this.signInForm.controls).forEach(campo => {
      const control = this.signInForm.get(campo);

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
            case 'email':
              this.listaErros.push(`O campo ${campo} deve ser um e-mail válido.`);
              break;
            case 'senhaCurta':
              this.listaErros.push(`A senha deve ter no mínimo 8 caracteres.`);
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
