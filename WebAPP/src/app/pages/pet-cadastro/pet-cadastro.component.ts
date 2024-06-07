import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PetCadastroService } from './pet-cadastro.service';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ChipsModule } from 'primeng/chips';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { Ripple } from 'primeng/ripple';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-cadastro',
  templateUrl: './pet-cadastro.component.html',
  styleUrls: ['./pet-cadastro.component.scss'],
  standalone: true,
  imports: [
    DropdownModule,
    AutoCompleteModule,
    CalendarModule,
    ReactiveFormsModule,
    ToastModule,
    ChipsModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    FormsModule,
    Ripple,
    FileUploadModule,
    CommonModule
  ],
})

export class PetCadastroComponent {

  name: string = "";

  especies: any[];

  especie: any;

  racas: any[];

  racasAux: any[] = [
    { name: 'Vira-Lata Cão', especie: 'cão' },
    { name: 'Vira-Lata Gato', especie: 'gato' },
    { name: 'Labrador Retriever', especie: 'cão' },
    { name: 'Golden Retriever', especie: 'cão' },
    { name: 'Beagle', especie: 'cão' },
    { name: 'Bulldog Francês', especie: 'cão' },
    { name: 'Poodle', especie: 'cão' },
    { name: 'Bulldog Inglês', especie: 'cão' },
    { name: 'Yorkshire Terrier', especie: 'cão' },
    { name: 'Shih Tzu', especie: 'cão' },
    { name: 'Boxer', especie: 'cão' },
    { name: 'Rottweiler', especie: 'cão' },
    { name: 'Dachshund', especie: 'cão' },
    { name: 'Border Collie', especie: 'cão' },
    { name: 'Chihuahua', especie: 'cão' },
    { name: 'Pug', especie: 'cão' },
    { name: 'Husky Siberiano', especie: 'cão' },
    { name: 'Pastor Alemão', especie: 'cão' },
    { name: 'Doberman', especie: 'cão' },
    { name: 'Basset Hound', especie: 'cão' },
    { name: 'Schnauzer', especie: 'cão' },
    { name: 'Boston Terrier', especie: 'cão' },
    { name: 'Siamês', especie: 'gato' },
    { name: 'Persa', especie: 'gato' },
    { name: 'Maine Coon', especie: 'gato' },
    { name: 'Sphynx', especie: 'gato' },
    { name: 'Ragdoll', especie: 'gato' },
    { name: 'British Shorthair', especie: 'gato' },
    { name: 'Bengal', especie: 'gato' },
    { name: 'Scottish Fold', especie: 'gato' },
    { name: 'Abissínio', especie: 'gato' },
    { name: 'Sagrado da Birmânia', especie: 'gato' },
    { name: 'Shiba Inu', especie: 'cão' },
    { name: 'Maltese', especie: 'cão' },
    { name: 'Dálmata', especie: 'cão' },
    { name: 'Cocker Spaniel', especie: 'cão' },
    { name: 'Setter Irlandês', especie: 'cão' },
    { name: 'Pinscher Miniatura', especie: 'cão' },
    { name: 'Staffordshire Bull Terrier', especie: 'cão' },
    { name: 'Cane Corso', especie: 'cão' },
    { name: 'Shar Pei', especie: 'cão' },
    { name: 'Bulmastife', especie: 'cão' },
    { name: 'Himalaia', especie: 'gato' },
    { name: 'Birmanês', especie: 'gato' },
    { name: 'Tonquinês', especie: 'gato' },
    { name: 'Burmês', especie: 'gato' },
    { name: 'Exótico', especie: 'gato' },
    { name: 'Manx', especie: 'gato' },
    { name: 'Nebelung', especie: 'gato' },
    { name: 'Toyger', especie: 'gato' },
    { name: 'Azul Russo', especie: 'gato' },
  ];

  raca: any;

  sexos: any[];

  sexo: any;

  portes: any[];

  porte: any;

  dataNascimento: any;

  dataResgate: any;

  descricao: any;

  form: FormGroup;

  petImageBinary: any;
  private racaEspecie: string;

  private fieldNames: {
    especie: string;
    name: string;
    raca: string;
    porte: string;
    dataResgate: string;
    sexo: string;
    dataNascimento: string;
    descricao: string
  };

  get f() { return this.form.controls; }

  constructor(private fb: FormBuilder, private msgService: MessageService, private router: Router, private service: PetCadastroService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-ZÀ-ÿ\s]{3,50}')]],
      especie: ['', [Validators.required]],
      raca: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      porte: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required, this.validarData]],
      dataResgate: ['', [Validators.required,  this.validarData]],
      descricao: ['', [Validators.maxLength(100)]],
    });

    this.fieldNames = {
      name: 'Nome',
      especie: 'Espécie',
      raca: 'Raça',
      sexo: 'Sexo',
      porte: 'Porte',
      dataNascimento: 'Data de Nascimento',
      dataResgate: 'Data de Resgate',
      descricao: 'Descrição',
    };

    this.especies = [
      { name: 'Cão', value: "1" },
      { name: 'Gato', value: "2" }
    ];

    this.racas =

    this.sexos = [
      { name: "Macho", value: "1"},
      { name: "Fêmea", value: "2"}
    ]

    this.portes = [
      { name: "Pequeno", value: "1"},
      { name: "Médio", value: "2"},
      { name: "Grande", value: "3"}
    ]
  }

  buscarRacas(event: any) {
    this.racas = this.racasAux;
    this.racas = this.racasAux.filter(raca => raca.especie === this.racaEspecie);

    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.racas.length; i++) {
      const raca = this.racas[i];
      if (raca.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(raca);
      }
    }

    this.racas = filtered;
  }

  onSubmit() {
    if(this.f['raca'].valid){
      this.validarRaca();
    }

    if(!this.petImageBinary) {
      this.showErrorViaToast('Imagem do Pet não pode ser vazia.');
      return;
    }

    if(this.form.invalid){
      this.showErrors();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('species', this.form.get('especie')?.value.value);
    formData.append('breed', this.form.get('raca')?.value.name);
    formData.append('sex', this.form.get('sexo')?.value.value);
    formData.append('petSize', this.form.get('porte')?.value.value);
    formData.append('birthDate', this.form.get('dataNascimento')?.value.toISOString());
    formData.append('rescueDate', this.form.get('dataResgate')?.value.toISOString());
    formData.append('description', this.form.get('descricao')?.value);
    formData.append('animalPic', this.petImageBinary);
    formData.append('InstitutionId', '1');


    this.service.cadastrarPet(formData).subscribe(
    response => {
      this.msgService.add({ key: 'tst', severity: 'success', summary: 'Mensagem de Erro', detail: 'Pet cadastrado com sucesso!' });
    },
    error => {
      this.showErrorViaToast('Erro ao cadastrar o pet: ' + error);
    }
  );
  }

  validarData(control: AbstractControl){
    const dataEscolhida = new Date(control.value);
    const dataAtual = new Date();

    if(dataEscolhida > dataAtual) {
      return { dataFuture: true };
    }

    return null;
  }

  onChangeEspecie(event: any) {
    if (event) {
      if (event.value === '1') {
        this.racaEspecie = 'cão';
      } else {
        this.racaEspecie = 'gato';
      }

      this.racas = this.racasAux.filter(raca => raca.especie === this.racaEspecie);
    }
  }
  validarRaca(){
    const racaValue = this.f['raca'].value;
    const isRacaValid = this.racas.some(raca => raca === racaValue);

    if(!isRacaValid){
      this.showErrorViaToast('O campo ' + this.fieldNames['raca'] + ' informado, não existe, insira um válido para continuar.');
    }
  }

  showErrors(){
    Object.keys(this.form.controls).forEach(key => {
      // @ts-ignore
      const controlErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          switch (keyError) {
            case 'required':
              // @ts-ignore
              this.showErrorViaToast('O campo ' + this.fieldNames[key] + ' é obrigatório.');
              break;
            case 'dataFuture':
               // @ts-ignore
               this.showErrorViaToast('O campo ' + this.fieldNames[key] + ' nâo permite data no futuro.');
               break;
            case 'minlength':
              // @ts-ignore
              this.showErrorViaToast('O valor do campo ' + this.fieldNames[key] + ' é menor do que permitido.');
              break;
            case 'maxlength':
              // @ts-ignore
              this.showErrorViaToast('O valor do campo ' + this.fieldNames[key] + ' é maior do que permitido.');
              break;
            default:
              // @ts-ignore
              this.showErrorViaToast('Erro no campo ' + this.fieldNames[key] + '.');
              break;
          }
        });
      }
    });
  }

  showErrorViaToast(message: string = "") {
    this.msgService.add({ key: 'tst', severity: 'error', summary: 'Mensagem de Erro', detail: message ? message : 'Validação falhou' });
  }

  onBasicUpload() {
    this.msgService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }

  onFileSelect(event: any){
    if (event.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const arrayBuffer = e.target.result; // Obtém o array de bytes da imagem
        const blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'image/jpeg' }); // Cria um Blob a partir do array de bytes
        this.petImageBinary = blob; // Atribui ao petImageBinary
      };
      reader.readAsArrayBuffer(event.files[0]);
    }
  }
}
