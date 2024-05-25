import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../../models/animal';
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
  animalPicUrl!: string; // Variável para armazenar a URL da imagem do animal

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

  constructor(private formBuilder: FormBuilder, private animalService: AnimalService, private authService: AuthService) {
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
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return; // Se não houver arquivos selecionados, simplesmente retorne
    }

    const file: File = input.files[0];
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

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.value;
    const animal: Animal = {
      institutionId: 1, // Suponha que você obtenha isso de algum lugar
      petSize: formValue.porte,
      animalAge: formValue.dataNascimento,
      rescueDate: formValue.dataResgate,
      animalName: formValue.nome,
      breed: formValue.raca,
      color: formValue.cor,
      animalType: formValue.especie,
    };

    const inputElement = document.querySelector('#animalPic') as HTMLInputElement;
    const animalPic: File = inputElement.files![0];

    this.animalService.createAnimal(animal, animalPic).subscribe(
      response => {
        console.log('Animal cadastrado com sucesso:', response);
        // Adicione lógica para redirecionar ou mostrar uma mensagem de sucesso
      },
      error => {
        console.error('Erro ao cadastrar animal:', error);
        // Adicione lógica para mostrar mensagens de erro
        this.listaErros.push('Erro ao cadastrar animal: ' + error.message);
      }
    );
  }

  // Método para carregar a imagem do animal com base no ID
  loadAnimalPic(animalId: number | undefined): void {
    if (animalId !== undefined) {
      this.animalPicUrl = this.animalService.getAnimalImageUrl(animalId);
    }
  }

  fecharModal(): void {
    this.listaErros = [];
  }
}
