import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Ripple, RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { PetCadastroService } from '../pet-cadastro/pet-cadastro.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ChipsModule } from 'primeng/chips';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { format, isValid, parseISO, parse } from 'date-fns';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { PerfilService } from './perfil.service';
import {FileUploadModule} from "primeng/fileupload";
@Component({
  selector: 'app-perfil',
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
        ToastModule,
        ButtonModule,
        RippleModule,
        CommonModule,
        NgxMaskDirective,
        FileUploadModule
    ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit{
  editando: boolean = false;
  user: any;
  form: FormGroup;
  foto: any;

  private fieldNames = {};

  get f() { return this.form.controls; }

  constructor(private fb: FormBuilder, private msgService: MessageService, private router: Router, private service: PerfilService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.maxLength(15)]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      birthDate: ['', [Validators.required, this.dateNotInFuture]]
    });

    this.fieldNames = {
      name: "Nome",
      email: "E-mail",
      phone: "Telefone",
      address: "Endereço",
      birthDate: "Data de Aniversário",
      avatar: "Foto"
    }
   }

  ngOnInit(): void {
    this.obterUsuario();
  }

  obterUsuario(){
    const localStorageUser: string = localStorage.getItem("user")!;
    if(!localStorageUser){
      localStorage.setItem("user", "");
      localStorage.setItem("logado", "");

      this.router.navigate(['inicio']);
    }
    const user = JSON.parse(localStorageUser);

    this.user = {
      id: user.id,
      name: user.userName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      birthDate: user.birthDate ? this.formatDate(user.birthDate) : null,
      avatar: user.avatar
    }

    this.form.patchValue({
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      address: this.user.address,
      birthDate: this.user.birthDate
    });
  }

  dateNotInFuture(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    return selectedDate <= today ? null : { futureDate: true };
  }

  editar(){
    this.editando = !this.editando;
  }

  cancelar(){
    this.editando = false;
  }

  salvar(){
    if(this.form.invalid){
      this.showErrors();
    }

    const data = {
      userName: this.form.get("name")?.value,
      email: this.form.get("email")?.value,
      phone: this.form.get("phone")?.value,
      address: this.form.get("address")?.value,
      birthDate: this.convertDateToDateTime(this.form.get("birthDate")?.value),
      avatar: this.foto
    }


    this.service.atualizarPerfil(this.user.id, data)
    .subscribe((response)=> {
      this.msgService.add({ key: 'tst', severity: 'success', summary: 'Successo', detail: response.message});
      this.editando = false;

      localStorage.setItem("user", JSON.stringify(response.data))
      this.obterUsuario();
    }, err => {
      this.msgService.add({ key: 'tst', severity: 'error', summary: 'Mensagem de Erro', detail: 'Ocorreu um erro inesperado ao realizar o login, tente novamente em alguns instantes.' });
    });
  }

  convertDateToDateTime(date: string): string {
    const ddMMyyyyRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    let parsedDate: Date;

    if (ddMMyyyyRegex.test(date)) {
      parsedDate = parse(date, 'dd/MM/yyyy', new Date());
    } else {
      parsedDate = new Date(date);
    }

    if (!isValid(parsedDate) || date === '0001-01-01T00:00:00') {
      return '-';
    }

    return format(parsedDate, 'yyyy-MM-dd\'T\'HH:mm:ss');
  }

  formatDate(date: string): string {
    const parsedDate = parseISO(date);

    if (!isValid(parsedDate) || date === '0001-01-01T00:00:00') {
      return '-';
    }

    return format(parsedDate, 'dd/MM/yyyy');
  }

  formatarTelefone(telefone: string): string {
    if (!telefone) return '-';

    const regexMascara = /(\d{2})(\d{5})(\d{4})/;
    const regexCodigoPais = /^\+[\d]{2}$/;

    if (regexCodigoPais.test(telefone)) {
      return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3');
    } else {
      return telefone.replace(regexMascara, '($1) $2-$3');
    }
  }

  carregarImagem(imagem: ArrayBuffer) {
    return 'data:image/jpeg;base64, ' + imagem;
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
            case 'futureDate':
            // @ts-ignore
            this.showErrorViaToast('O valor do campo ' + this.fieldNames[key] + ' não deve ser uma data no futuro.');
            break;
            case 'maxlength':
              // @ts-ignore
              this.showErrorViaToast('O valor do campo ' + this.fieldNames[key] + ' é maior do que permitido.');
              break;
            case 'email':
              // @ts-ignore
              this.showErrorViaToast('O valor do campo ' + this.fieldNames[key] + ' não é um e-mail valido.');
              break;
            case 'passwordInvalid':
              // @ts-ignore
              this.showErrorViaToast('As senhas não coincidem.');
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
        const base64String = e.target.result.split(',')[1]; // Obtém a string base64
        this.foto = base64String; // Armazena a string base64
      };
      reader.readAsDataURL(event.files[0]); // Lê o arquivo como uma URL de dados base64
    }
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
}
