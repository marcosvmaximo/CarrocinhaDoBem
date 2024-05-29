import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.css']
})
export class PerfilEditComponent implements OnInit {
  perfilForm: FormGroup;
  userId!: number; // O ID do usuário logado

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {
    this.perfilForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(100)]],
      address: ['', [Validators.maxLength(200)]],
      phone: ['', [Validators.minLength(12), Validators.maxLength(20), Validators.pattern(/^\d{2} \d{5}-\d{4}$/)]],
      birthDate: ['', [Validators.required, this.validarDataPassada]]
    });
  }

  ngOnInit() {
    this.userId = this.profileService.getProfile(); // Obtenha o ID do usuário logado
    this.loadProfile(this.userId);
  }

  loadProfile(userId: number) {
    this.profileService.getProfile(userId).subscribe(
      profile => {
        this.perfilForm.patchValue(profile);
      },
      error => {
        console.error('Erro ao carregar perfil:', error);
      }
    );
  }

  onSubmit() {
    if (this.perfilForm.invalid) {
      return;
    }

    const formData: Partial<User> = {
      userName: this.perfilForm.value.userName,
      email: this.perfilForm.value.email,
      address: this.perfilForm.value.address,
      phone: this.perfilForm.value.phone,
      birthDate: this.perfilForm.value.birthDate,
    };

    this.profileService.updateProfile(this.userId, formData).subscribe(
      response => {
        console.log('Perfil atualizado com sucesso:', response);
        
      },
      error => {
        console.error('Erro ao atualizar perfil:', error);

      }
    );
  }

  validarDataPassada(control: any) {
    const birthDate = new Date(control.value);
    const hoje = new Date();
    if (birthDate > hoje) {
      return { dataFutura: true };
    }
    return null;
  }
}
