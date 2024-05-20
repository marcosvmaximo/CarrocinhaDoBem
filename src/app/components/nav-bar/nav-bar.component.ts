import { Component, HostListener } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isDropdownOpen = false;

  constructor(private router: Router, private authService: AuthService) {
  }

  estaLogado(): boolean {
    return this.authService.estaLogado();
  }

  logout(){
    sessionStorage.setItem('logado', '');
    localStorage.setItem('logado', '');
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

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister(){
    this.router.navigate(['/cadastrar']);
  }
}

