import { Component } from '@angular/core';
import { getShow } from "./services/guard/show";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showNavBar(): boolean {
    return getShow();
  }

  showFooter(): boolean {
    return getShow();
  }
}
