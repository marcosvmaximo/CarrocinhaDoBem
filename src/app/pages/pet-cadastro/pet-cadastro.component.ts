import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { timer } from 'rxjs';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-pet-cadastro',
  templateUrl: './pet-cadastro.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  styleUrls: ['./pet-cadastro.component.css']
})

export class PetCadastroComponent {
  resgisterForm: FormGroup;
  listaErros: string[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.resgisterForm = this.formBuilder.group({
      especie: ['', Validators.required],
      raca: ['', Validators.required],
      cor: ['', Validators.required],
      porte: ['', Validators.required],
      dataResgate: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    });
  }

  onSubmit() {
    this.listaErros = [];

    Object.keys(this.resgisterForm.controls).forEach(campo => {
      const control = this.resgisterForm.get(campo);

      if (control) {
        if (control.invalid && control.touched) {
          const errors = control.errors as ValidationErrors | null;

          if (errors) {
            Object.keys(errors).forEach(erro => {
              switch (erro) {
                case 'required':
                  this.listaErros.push(`O campo ${campo} é obrigatório.`);
                  break;
                case 'minlength':
                  if (errors['minlength']) {
                    this.listaErros.push(`O campo ${campo} deve conter no mínimo ${errors['minlength'].requiredLength} caracteres.`);
                  }
                  break;
                case 'maxlength':
                  if (errors['maxlength']) {
                    this.listaErros.push(`O campo ${campo} excedeu o número máximo de caracteres permitidos.`);
                  }
                  break;
                default:
                  break;
              }
            });
          }
        }
      }
    });

    this.esconder();
  }

  esconder(): void {
    const timer$ = timer(0);

    timer$.subscribe(() => {
      this.listaErros = [];
    });
  }

  fecharModal(): void {
    this.listaErros = [];
  }
}
