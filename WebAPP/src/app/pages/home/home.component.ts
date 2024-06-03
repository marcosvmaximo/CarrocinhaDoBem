import { Component } from '@angular/core';
import {TableModule} from "primeng/table";
import {PaginatorModule} from "primeng/paginator";
import {Ripple} from "primeng/ripple";
import {ButtonDirective} from "primeng/button";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableModule,
    PaginatorModule,
    Ripple,
    ButtonDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products!: [];
}
