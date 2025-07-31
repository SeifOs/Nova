import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserData } from '../../services/userData/user-data';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const userData = inject(UserData);

  if (userData.getToken() != null) {
    req = req.clone({
      setHeaders: {
        token: userData.getToken()!,
      },
    });
  }

  return next(req);
};
