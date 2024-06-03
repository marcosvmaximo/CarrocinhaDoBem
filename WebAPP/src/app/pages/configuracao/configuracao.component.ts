import { Component } from '@angular/core';
import { AppConfig, LayoutService } from '../../layout/service/app.layout.service';
import { SliderModule } from 'primeng/slider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-configuracao',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ButtonModule,
    DropdownModule,
    SliderModule,
    CheckboxModule
  ],
  templateUrl: './configuracao.component.html',
  styleUrl: './configuracao.component.scss'
})
export class ConfiguracaoComponent {
  config: AppConfig;
  inputStyles = [
    { label: 'Outlined', value: 'outlined' },
    { label: 'Filled', value: 'filled' }
  ];
  menuModes = [
    { label: 'Static', value: 'static' },
    { label: 'Overlay', value: 'overlay' }
  ];
  colorSchemes = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' }
  ];

  constructor(private layoutService: LayoutService) {
    this.config = this.layoutService.config();
  }

  onConfigChange() {
    this.layoutService.config.set(this.config);
  }
}
