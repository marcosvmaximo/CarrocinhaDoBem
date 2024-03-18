import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, this.validarSenha]],
      confirmarSenha: ['', Validators.required],
      concordatermos: [false, Validators.requiredTrue]
    });
  }

  validarSenha(control: AbstractControl): { [key: string]: boolean } | null {
    const senha = control.value;
    const possuiLetraMaiuscula = /[A-Z]/.test(senha);
    const possuiNumero = /[0-9]/.test(senha);
    if (!possuiLetraMaiuscula || !possuiNumero) {
      return { senhaInvalida: true };
    }
    return null;
  }

  onSubmit() {
    const senhaControl = this.signupForm.controls['senha'];
    const confirmarSenhaControl = this.signupForm.controls['confirmarSenha'];

    if (this.signupForm.valid) {
      if (senhaControl.value !== confirmarSenhaControl.value) {
        alert('As senhas não coincidem.');
      } else {
        alert('Formulário enviado com sucesso!');
        // Aqui você pode adicionar a lógica para enviar os dados para o servidor, por exemplo:
        // this.authService.signup(this.signupForm.value).subscribe(...);
      }
    } else {
      let errorMessage = '';

      if (this.signupForm.controls['nome'].invalid) {
        errorMessage += 'Nome é obrigatório.\n';
      }
      if (this.signupForm.controls['email'].invalid) {
        errorMessage += 'Email é obrigatório.\n';
        if (this.signupForm.controls['email'].hasError('email')) {
          errorMessage += 'Email inválido.\n';
        }
      }
      if (senhaControl.invalid) {
        if (senhaControl.hasError('senhaInvalida')) {
          errorMessage += 'Senha deve conter pelo menos uma letra maiúscula e um número.\n';
        } else {
          errorMessage += 'Senha é obrigatória.\n';
        }
      }
      if (confirmarSenhaControl.invalid) {
        errorMessage += 'Confirmação de senha é obrigatória.\n';
      }
      if (!this.signupForm.controls['concordatermos'].value) {
        errorMessage += 'Você deve concordar com os termos de serviço.\n';
      }
      
      alert(errorMessage);
    }
  }
}
