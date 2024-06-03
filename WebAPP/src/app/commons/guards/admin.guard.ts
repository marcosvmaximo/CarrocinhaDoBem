import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const adminGuard: CanActivateFn = (route, state) => {
  const isLogado = localStorage.getItem('logado');
  const isAdmin = localStorage.getItem('admin');

  if (isLogado === 'true' && isAdmin === 'true') {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/inicio']);

    return false;
  }
};
