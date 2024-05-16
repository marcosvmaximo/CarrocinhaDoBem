import { Component, HostListener } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {GetLogin, logado} from "../../services/guard/logado";



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isDropdownOpen = false;

  constructor(private authService: AuthService) {
  }

  toggleDropdown(force?: boolean) {
    if (typeof force !== 'undefined') {
      this.isDropdownOpen = force;
    } else {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.toggleDropdown(false);
    }
  }

  isLoggedIn: boolean = false;

  login() {

    this.isLoggedIn = true;
  }

  logout() {

    this.isLoggedIn = false;
  }

}

