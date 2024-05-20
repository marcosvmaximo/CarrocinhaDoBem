import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const autorizadoGuard: CanActivateFn = (route, state) => {
  const isLogado = sessionStorage.getItem('logado');

  if (isLogado === 'true') {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/login']);

    return false;
  }
};
