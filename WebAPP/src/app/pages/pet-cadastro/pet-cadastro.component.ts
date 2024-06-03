import { Component } from '@angular/core';
import {AutoCompleteModule} from "primeng/autocomplete";
import {CalendarModule} from "primeng/calendar";
import {ChipsModule} from "primeng/chips";
import {DropdownModule} from "primeng/dropdown";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputMaskModule} from "primeng/inputmask";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MultiSelectModule} from "primeng/multiselect";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Ripple} from "primeng/ripple";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {PetCadastroService} from "./pet-cadastro.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pet-cadastro',
  standalone: true,
  imports: [
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    ReactiveFormsModule,
    FormsModule,
    Ripple,
    ToastModule
  ],
  templateUrl: './pet-cadastro.component.html',
  styleUrl: './pet-cadastro.component.scss'
})
export class PetCadastroComponent {

  name: string = "";

  especies: any[];

  especie: any;

  racas: any[];

  racasAux: any[] = [];

  raca: any;

  sexos: any[];

  sexo: any;

  portes: any[];

  porte: any;

  dataNascimento: any;

  dataResgate: any;

  descricao: any;




  form: FormGroup;

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
      dataNascimento: ['', [Validators.required]],
      dataResgate: ['', [Validators.required]],
      descricao: ['', [Validators.maxLength(100)]]
    });

    this.fieldNames = {
      name: 'Nome',
      especie: 'Espécie',
      raca: 'Raça',
      sexo: 'Sexo',
      porte: 'Porte',
      dataNascimento: 'Data de Nascimento',
      dataResgate: 'Data de Resgate',
      descricao: 'Descrição'
    };

    this.especies = [
      { name: 'Cão', value: "1" },
      { name: 'Gato', value: "2" }
    ];

    this.racas = [
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
    ]

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

  ngOnInit() {
  }


  buscarRacas(event: any) {
    // in a real application, make a request to a remote url with the query and
    // return filtered results, for demo we filter at client side
    const filtered: any[] = [];
    const query = event.query;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.racas.length; i++) {
      const raca = this.racas[i];
      if (raca.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(raca);
      }
    }

    this.racasAux = filtered;
  }

  onSubmit() {
    console.log(this.form.valid);
    if(this.f['raca'].valid){
      this.validarRaca()
    }
    if(this.f['dataNascimento'].valid){
      this.validarData('dataNascimento', this.f['dataNascimento'].value);
    }
    if(this.f['dataResgate'].valid){
      this.validarData('dataResgate', this.f['dataResgate'].value);
    }
    if(this.form.invalid){
      this.showErrors();
    }

    const name = this.f['name'].value;
    const raca = this.f['raca'].value;
    const sexo = this.f['sexo'].value;
    const porte = this.f['porte'].value;
    const dataNascimento = this.f['dataNascimento'].value;
    const dataResgate = this.f['dataResgate'].value;
    const descricao = this.f['descricao'].value;

    console.log(name)
    console.log(raca)
    console.log(sexo)
    console.log(porte)
    console.log(dataNascimento)
    console.log(dataResgate)
    console.log(descricao)

    // this.service.cadastrarPet()
    //   .subscribe((response)=> {
    //     this.msgService.add({ key: 'tst', severity: 'success', summary: 'Successo', detail: 'Pet cadastrado com sucesso' });
    //
    //     setTimeout(() => {
    //       this.router.navigate(['/dashboard/pets']);
    //     }, 1000);
    //   }, err => {
    //     this.msgService.add({ key: 'tst', severity: 'error', summary: 'Mensagem de Erro', detail: 'Ocorreu um erro inesperado ao realizar o login, tente novamente em alguns instantes.' });
    //   });
  }

  validarData(nomeCampo: string, data: Date): void{
    const value = new Date(data);
    const now = new Date();
    const thirtyYearsAgo = new Date(now.setFullYear(now.getFullYear() - 30));

    // @ts-ignore
    value < thirtyYearsAgo ? this.showErrorViaToast('O campo ' + this.fieldNames[nomeCampo] + ' não deve ser mais que 30 anos no passado') : null;
    // @ts-ignore
    value > now ? this.showErrorViaToast('O campo ' + this.fieldNames[nomeCampo] + ' não deve ser no futuro') : null;
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
}
