import { Routes } from '@angular/router';
import { Blank } from './layouts/blank/blank';
import { Home } from './pages/home/home';
import { Auth } from './layouts/auth/auth';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { NotFound } from './pages/not-found/not-found';
import { Brands } from './pages/brands/brands';
import { Cart } from './pages/cart/cart';
import { Categories } from './pages/categories/categories';
import { Products } from './pages/products/products';

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
    children: [
      { path: 'home', component: Home, title: 'Nove - home' },
      { path: 'brands', component: Brands, title: 'Nove - brands' },
      { path: 'cart', component: Cart, title: 'Nove - cart' },
      { path: 'categories', component: Categories, title: 'Nove - categories' },
      { path: 'products', component: Products, title: 'Nove - products' },
    ],
  },
  { path: '**', component: NotFound, title: 'Not found' },
];
