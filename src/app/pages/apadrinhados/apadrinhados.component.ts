import { Component, OnInit } from '@angular/core';
import { SponsorshipService } from '../../services/sponsorship.service';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../../models/animal';
import { Sponsorship } from '../../../models/sponsorship';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-apadrinhados',
  templateUrl: './apadrinhados.component.html',
  styleUrls: ['./apadrinhados.component.css'],
  providers: [CurrencyPipe, DatePipe]
})
export class ApadrinhadosComponent implements OnInit {
  animals: Animal[] = [];
  animalPicUrl: string = '';
  sponsorships: Observable<Sponsorship[]>; // Alterado para Observable

  constructor(
    private sponsorshipService: SponsorshipService,
    private animalService: AnimalService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
  ) { 
    this.sponsorships = new Observable<Sponsorship[]>(/* inicialize aqui */);
   }

  ngOnInit(): void {
    this.loadAnimals();
    this.loadSponsorships(); // Chame o método para carregar os patrocínios
  }

  loadAnimals(): void {
    this.animalService.getAllAnimals().subscribe(
      data => {
        this.animals = data;
        console.log(this.animals);
      },
      error => {
        console.error('Erro ao carregar animais:', error);
      }
    );
  }

  loadSponsorships(): void {
    this.sponsorships = this.sponsorshipService.getActiveSponsorships(); // Carregue os patrocínios como um Observable
  }

  loadAnimalPics(): void {
    this.animals.forEach(animal => {
      this.loadAnimalPic(animal.id);
    });
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

  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2') || '';
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }
}
