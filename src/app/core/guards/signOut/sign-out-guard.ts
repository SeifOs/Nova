import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserData } from '../../services/userData/user-data';
import { IsBrowser } from '../../services/isBrowser/is-browser';

export const signOutGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isBrowser = inject(IsBrowser);
  const userData = inject(UserData);

  if (isBrowser.isBrowser() && localStorage.getItem('token') != null) {
    userData.saveToken(localStorage.getItem('token')!);
  }

  if (userData.getToken() == null) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
