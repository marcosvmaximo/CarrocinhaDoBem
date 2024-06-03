import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const isLogado = localStorage.getItem('logado');

  if (isLogado === 'true') {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/entrar']);

    return false;
  }
};
