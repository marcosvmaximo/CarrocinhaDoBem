import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const adminGuard: CanActivateFn = (route, state) => {
  const isLogado = localStorage.getItem('admin');
  console.log(isLogado);
  if (isLogado === 'true') {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/home']);

    return false;
  }
};
