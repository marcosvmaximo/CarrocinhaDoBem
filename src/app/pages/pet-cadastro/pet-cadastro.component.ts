import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pet-cadastro',
  templateUrl: './pet-cadastro.component.html',
  styleUrls: ['./pet-cadastro.component.css']
})
export class PetCadastroComponent {
  registerForm: FormGroup;
  listaErros: string[] = [];
  isLoggedIn: boolean;

  formFields = [
    { controlName: 'especie', label: 'Espécie', type: 'text', placeholder: 'Digite a espécie do animal', errorMsg: 'Espécie é obrigatória.' },
    { controlName: 'raca', label: 'Raça', type: 'text', placeholder: 'Digite a raça do animal', errorMsg: 'Raça é obrigatória.' },
    { controlName: 'cor', label: 'Cor', type: 'text', placeholder: 'Digite a cor do animal', errorMsg: 'Cor é obrigatória.' },
    { controlName: 'porte', label: 'Porte', type: 'text', placeholder: 'Digite o porte do animal', errorMsg: 'Porte é obrigatório.' },
    { controlName: 'dataResgate', label: 'Data de resgate', type: 'date', errorMsg: 'Data de resgate é obrigatória.' },
    { controlName: 'dataNascimento', label: 'Data de nascimento', type: 'date', errorMsg: 'Data de nascimento é obrigatória.' },
    { controlName: 'nome', label: 'Nome', type: 'text', placeholder: 'Digite o nome do animal', errorMsg: 'Nome é obrigatório e deve conter entre 3 e 100 caracteres.' },
    { controlName: 'animalPic', label: 'Foto do Animal', type: 'file', errorMsg: 'A foto do animal é obrigatória.' }
  ];

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
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

    this.isLoggedIn = this.authService.estaLogado();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const preview: HTMLImageElement | null = document.getElementById('pet-image-preview') as HTMLImageElement;
        if (preview) {
          preview.src = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (!this.isLoggedIn) {
      this.listaErros = ['Você precisa estar logado para cadastrar um pet.'];
      return;
    }

    this.listaErros = [];

    Object.keys(this.registerForm.controls).forEach(campo => {
      const control = this.registerForm.get(campo);

      if (control && control.invalid && (control.touched || control.dirty)) {
        const errors = control.errors;

        if (errors) {
          Object.keys(errors).forEach(erro => {
            switch (erro) {
              case 'required':
                this.listaErros.push(`O campo ${this.getCampoNome(campo)} é obrigatório.`);
                break;
              case 'minlength':
                if (errors['minlength']) {
                  this.listaErros.push(`O campo ${this.getCampoNome(campo)} deve conter no mínimo ${errors['minlength'].requiredLength} caracteres.`);
                }
                break;
              case 'maxlength':
                if (errors['maxlength']) {
                  this.listaErros.push(`O campo ${this.getCampoNome(campo)} excedeu o número máximo de caracteres permitidos.`);
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

    this.esconder();
  }

  getCampoNome(campo: string): string {
    const campos: { [key: string]: string } = {
      especie: 'Espécie',
      raca: 'Raça',
      cor: 'Cor',
      porte: 'Porte',
      dataResgate: 'Data de Resgate',
      dataNascimento: 'Data de Nascimento',
      nome: 'Nome',
      animalPic: 'Foto do Animal'
    };
    return campos[campo] || campo;
  }

  esconder(): void {
    const timer$ = timer(3000);
    timer$.subscribe(() => {
      this.listaErros = [];
    });
  }

  fecharModal(): void {
    this.listaErros = [];
  }
}
