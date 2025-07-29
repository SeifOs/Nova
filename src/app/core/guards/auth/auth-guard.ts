import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IsBrowser } from '../../services/isBrowser/is-browser';
import { UserData } from '../../services/userData/user-data';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isBrowser = inject(IsBrowser);
  const userData = inject(UserData);

  if (isBrowser.isBrowser() && localStorage.getItem('token') != null) {
    userData.saveToken(localStorage.getItem('token')!);
  }

  if (userData.getToken() != '') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
