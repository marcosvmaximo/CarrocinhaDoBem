import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authInverterGuard: CanActivateFn = (route, state) => {
  const isLogado = localStorage.getItem('logado');

  if (!isLogado || isLogado === 'false') {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/inicio']);

    return false;
  }
};
