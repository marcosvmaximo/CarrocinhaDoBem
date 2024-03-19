import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service.model';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrl: './usuario-cadastro.component.css'
})
export class UsuarioCadastroComponent {
  formUser: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.formUser = this.formBuilder.group({
      nome:['', Validators.required],
      password:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      cpf:['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]]
    });

    
  }

  onSubmit() {

    if (this.formUser.valid) {
      alert('Formulário enviado com sucesso')
      console.log(this.formUser.value);
    } else{
      let mensagemErro = '';

      if (this.formUser.controls['nome'].invalid){
        mensagemErro += 'Nome é obrigatório.\n';
      }
      if (this.formUser.controls['email'].invalid){
        mensagemErro += 'Email é obrigatório.\n';
        if (this.formUser.controls['email'].hasError('email')){
          mensagemErro += 'Email inválido.\n';
        }
        if (this.formUser.controls['nome'].invalid){
          mensagemErro += 'Senha obrigatória.\n';
        }

      }
      alert(mensagemErro);
    }
  }

}
