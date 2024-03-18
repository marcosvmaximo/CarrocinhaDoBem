import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetsServiceService } from '../services/pets-service.service';
import { IAnimal } from '../interfaces/animal';

@Component({
  selector: 'app-register-pets',
  templateUrl: './register-pets.component.html'
})
export class RegisterPetsComponent implements OnInit {
  formPet: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: PetsServiceService) {
    this.formPet = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.formPet = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      porte: ['', [Validators.required, Validators.pattern('^(pequeno|médio|grande)$')]],
      descricao: ['', [Validators.required]]
    });
  }

  adicionar() {
    const animal: IAnimal = this.formPet.getRawValue() as IAnimal;
    if(this.formPet.invalid){
      alert("erro");
      return;
    }
    console.log("Animal adicionado")
    /*
    this.service.insertAnimal(animal).subscribe((response) => {
      console.log("resposta da API", response);
    });*/
  }
}
