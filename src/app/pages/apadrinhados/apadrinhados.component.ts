import { Component, OnInit } from '@angular/core';
import { SponsorshipService } from '../../services/sponsorship.service';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../../models/animal';
import { Sponsorship } from '../../../models/sponsorship';
import { CurrencyPipe, DatePipe } from '@angular/common'; // Importe os pipes CurrencyPipe e DatePipe

@Component({
  selector: 'app-apadrinhados',
  templateUrl: './apadrinhados.component.html',
  styleUrls: ['./apadrinhados.component.css'],
  providers: [CurrencyPipe, DatePipe] // Adicione providers aqui
})
export class ApadrinhadosComponent implements OnInit {
  animals: Animal[] = [];
  animalPicUrl: string = '';
  sponsorships: Sponsorship[] = []; // Adicione uma propriedade para armazenar os patrocínios

  constructor(
    private sponsorshipService: SponsorshipService,
    private animalService: AnimalService,
    private currencyPipe: CurrencyPipe, // Injete o CurrencyPipe
    private datePipe: DatePipe // Injete o DatePipe
  ) { }

  ngOnInit(): void {
    this.loadSponsoredPets();
  }

  loadSponsoredPets(): void {
    this.sponsorshipService.getActiveSponsorships().subscribe(
      sponsorships => {
        this.sponsorships = sponsorships; // Atribua os patrocínios para a propriedade sponsorships
        // Obter os IDs dos animais apadrinhados
        const sponsoredAnimalIds = sponsorships.map(sponsorship => sponsorship.animalId);
        
        // Carregar apenas os animais apadrinhados
        sponsoredAnimalIds.forEach(id => {
          this.animalService.getAnimalById(id).subscribe(
            animal => {
              this.animals.push(animal);
              this.loadAnimalPic(animal.id);
            },
            error => {
              console.error('Erro ao carregar animais apadrinhados:', error);
            }
          );
        });
      },
      error => {
        console.error('Erro ao carregar patrocínios ativos:', error);
      }
    );
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

  // Métodos para utilizar os pipes currency e date
  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2') || '';
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }
}