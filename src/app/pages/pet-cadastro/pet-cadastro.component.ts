import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { timer } from 'rxjs';
import { CommonModule } from "@angular/common";

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
  registerForm: FormGroup;
  listaErros: string[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      especie: ['', Validators.required],
      raca: ['', Validators.required],
      cor: ['', Validators.required],
      porte: ['', Validators.required],
      dataResgate: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      animalPic: [null, Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ animalPic: file });
      this.registerForm.get('animalPic')!.updateValueAndValidity();

      // Preview da imagem (opcional)
      const reader = new FileReader();
      reader.onload = () => {
        const preview: any = document.getElementById('pet-image-preview');
        if (preview) {
          preview.src = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.listaErros = [];

    Object.keys(this.registerForm.controls).forEach(campo => {
      const control = this.registerForm.get(campo);

      if (control && control.invalid && (control.touched || control.dirty)) {
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
    });

    if (this.registerForm.invalid) {
      return;
    }

    const formData = new FormData();
    Object.keys(this.registerForm.controls).forEach(key => {
      formData.append(key, this.registerForm.get(key)!.value);
    });

    // Aqui você faria a submissão do formulário usando o formData
    // Exemplo:
    // this.http.post('/api/animals', formData).subscribe(response => { ... });

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
