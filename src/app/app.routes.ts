import { Routes } from '@angular/router';
import { Blank } from './layouts/blank/blank';
import { Home } from './pages/home/home';
import { Auth } from './layouts/auth/auth';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: Auth,
    children: [
      { path: 'login', component: Login, title: 'Nova - login' },
      { path: 'signup', component: Signup, title: 'Nova - signup' },
    ],
  },
  {
    path: '',
    component: Blank,
    children: [{ path: 'home', component: Home, title: 'Nove - home' }],
  },
  { path: '**', component: NotFound, title: 'Not found' },
];
