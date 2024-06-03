import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {RouterLink} from "@angular/router";
import {Ripple} from "primeng/ripple";

@Component({
  selector: 'app-sem-acesso',
  standalone: true,
  imports: [
    ButtonDirective,
    RouterLink,
    Ripple
  ],
  templateUrl: './sem-acesso.component.html',
  styleUrl: './sem-acesso.component.scss'
})
export class SemAcessoComponent {

}
