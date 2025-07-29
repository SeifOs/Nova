import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IsBrowser } from '../../services/isBrowser/is-browser';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isBrowser = inject(IsBrowser);

  if (isBrowser.isBrowser()) {
    if (localStorage.getItem('token') == null) {
      return true;
    } else {
      router.navigate(['/home']);
      return false;
    }
  } else {
    router.navigate(['/notFound']);
    return false;
  }
};
