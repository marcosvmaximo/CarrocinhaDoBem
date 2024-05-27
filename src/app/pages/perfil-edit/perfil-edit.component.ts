import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.css']
})
export class PerfilEditComponent implements OnInit {
  perfilForm: FormGroup;
  listaErros: string[] = [];
  private apiUrl = 'https://localhost:7240;http://localhost:5174'; 
  userId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.perfilForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100), Validators.pattern("^[a-zA-ZÀ-ÖØ-öø-ÿ']+(\\s[a-zA-ZÀ-ÖØ-öø-ÿ']+)*$")]],
      email: ['', [Validators.required, Validators.minLength(10), Validators.email, Validators.maxLength(100)]],
      endereco: ['', [Validators.required, Validators.maxLength(100)]],
      telefone: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(100), Validators.pattern("^[0-9]{2}\\s[0-9]{4,5}-[0-9]{4}$")]],
      dataNascimento: ['', [Validators.required, this.dataPassadaValidator]]
    });
  }

  ngOnInit() {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id') || '', 10);
    if (this.userId) {
      this.loadProfile();
    } else {
      console.error('ID do usuário não encontrado.');
    }
  }

  dataPassadaValidator(control: AbstractControl) {
    const dataEscolhida = new Date(control.value);
    const dataAtual = new Date();
    if (dataEscolhida > dataAtual) {
      return { dataFutura: true };
    }
    return null;
  }

  loadProfile() {
    this.http.get(`${this.apiUrl}/${this.userId}`).subscribe(
      (data: any) => {
        this.perfilForm.patchValue(data);
      },
      (error) => {
        console.error('Erro ao carregar perfil:', error);
        alert('Erro ao carregar perfil. Por favor, tente novamente mais tarde.');
      }
    );
  }

  onSubmit() {
    this.listaErros = [];
    Object.keys(this.perfilForm.controls).forEach(campo => {
      const control = this.perfilForm.get(campo);
      if (control && control.invalid && control.touched) {
        const errors = control.errors as ValidationErrors;
        Object.keys(errors).forEach(erro => {
          switch (erro) {
            case 'required':
              this.listaErros.push(`O campo ${campo} é obrigatório.`);
              break;
            case 'maxlength':
              this.listaErros.push(`O campo ${campo} excedeu o número máximo de caracteres permitidos.`);
              break;
            case 'minlength':
              this.listaErros.push(`O campo ${campo} deve ter no mínimo 4 caracteres.`);
              break;
            case 'email':
              this.listaErros.push(`O campo ${campo} deve ser um e-mail válido.`);
              break;
          }
        });
      }
    });

    this.validarFormulario();
  }

  validarFormulario() {
    if (this.perfilForm.valid && this.listaErros.length === 0 && this.userId !== undefined) {
      const formData = this.perfilForm.value;
      this.http.put(`${this.apiUrl}/${this.userId}`, formData).subscribe(
        () => {
          alert("Dados atualizados com sucesso!");
          this.perfilForm.reset();
        },
        (error) => {
          console.error('Erro ao enviar dados:', error);
          alert("Erro ao enviar dados para a API. Por favor, tente novamente mais tarde.");
        }
      );
    }
  }

  deleteProfile() {
    if (this.userId !== undefined) {
      this.http.delete(`${this.apiUrl}/${this.userId}`).subscribe(
        () => {
          alert("Perfil deletado com sucesso!");
          this.perfilForm.reset();
        },
        (error) => {
          console.error('Erro ao deletar o perfil:', error);
          alert("Erro ao deletar o perfil. Por favor, tente novamente mais tarde.");
        }
      );
    } else {
      alert("ID do perfil não encontrado.");
    }
  }

  onFileSelected(files: FileList) {
    const file = files.item(0);
    if (file) {
      this.uploadFile(file);
    }
  }

  uploadFile(file: File) {
    console.log('Arquivo selecionado:', file);
  }
}
