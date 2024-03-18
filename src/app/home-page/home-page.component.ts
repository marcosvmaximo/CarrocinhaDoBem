import { Component, OnInit } from '@angular/core';
import { PetsServiceService } from '../services/pets-service.service';
import { IAnimal } from '../interfaces/animal';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: ``
})

export class HomePageComponent implements OnInit {

  public animals: IAnimal[] = [];

  constructor(public service: PetsServiceService){

  }

  ngOnInit(): void {
    this.getAnimals();
  }

  getAnimals(){
    this.service.getAnimals().subscribe((response) => {
      this.animals = response;
    }, (error) => {
      console.error(error);
    })
  }
}
