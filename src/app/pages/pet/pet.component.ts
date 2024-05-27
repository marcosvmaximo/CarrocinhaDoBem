import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../../models/animal';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css'
})

export class PetComponent implements OnInit {
  animals: Animal[] = [];
  animalPicUrl: string = '';

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.loadAnimalPics();
    this.loadAnimals();
  }

  loadAnimals(): void {
    this.animalService.getAllAnimals().subscribe(
      data => {
        this.animals = data;
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

  // Função para carregar as imagens de todos os animais
  loadAnimalPics(): void {
    this.animals.forEach(animal => {
      this.loadAnimalPic(animal.id);
    });
  }
}
