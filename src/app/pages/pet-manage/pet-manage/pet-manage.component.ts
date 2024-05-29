import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../../models/animal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-manage',
  templateUrl: './pet-manage.component.html',
  styleUrls: ['./pet-manage.component.css']
})
export class PetManageComponent implements OnInit {
  animals: Animal[] = [];
  animalPicUrl: string = '';
  selectedAnimal: Animal | null = null;
  newAnimalPic: File | undefined;

  constructor(private animalService: AnimalService, private router: Router) { }

  ngOnInit(): void {
    this.loadAnimals();
  }

  loadAnimals(): void {
    this.animalService.getAllAnimals().subscribe(
      data => {
        this.animals = data;
        this.loadAnimalPics();
      },
      error => {
        console.error('Erro ao carregar animais:', error);
      }
    );
  }

  loadAnimalPic(animalId: number | undefined): void {
    console.log("Método loadAnimalPic chamado com ID:", animalId);
    if (animalId !== undefined) {
      this.animalPicUrl = this.animalService.getAnimalImageUrl(animalId);
      console.log("Animal Pic URL:", this.animalPicUrl);
    } else {
      console.error('ID do animal é indefinido.');
    }
  }

  loadAnimalPics(): void {
    this.animals.forEach(animal => {
      this.loadAnimalPic(animal.id);
    });
  }

  openEditModal(animal: Animal): void {
    this.selectedAnimal = { ...animal }; // Clonar o objeto animal para evitar alterações diretas
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newAnimalPic = file;
    }
  }

  saveChanges(): void {
    if (this.selectedAnimal) {
      this.animalService.updateAnimal(this.selectedAnimal.id!, this.selectedAnimal, this.newAnimalPic).subscribe(
        response => {
          console.log('Animal atualizado com sucesso:', response);
          this.loadAnimals();
          this.selectedAnimal = null;
          this.newAnimalPic = undefined;
          this.router.navigate(['/pets']);
          window.location.reload();
        },
        error => {
          console.error('Erro ao atualizar animal:', error);
        }
      );
    }
  }

  deleteAnimal(animalId: number | undefined): void {
    if (animalId !== undefined) {
      this.animalService.deleteAnimal(animalId).subscribe(
        response => {
          console.log('Animal deletado com sucesso:', response);
          this.loadAnimals();
        },
        error => {
          console.error('Erro ao deletar animal:', error);
        }
      );
    } else {
      console.error('ID do animal é indefinido.');
    }
  }
}
