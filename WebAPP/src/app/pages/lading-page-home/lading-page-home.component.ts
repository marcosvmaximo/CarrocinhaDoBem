import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-lading-page-home',
  standalone: true,
  imports: [
    ButtonDirective,
    Ripple,
    RouterLink
  ],
  templateUrl: './lading-page-home.component.html',
  styleUrl: './lading-page-home.component.scss'
})
export class LadingPageHomeComponent {

}
