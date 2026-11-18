import { Routes } from '@angular/router';

// Every page is lazy-loaded, so the first visit only downloads the shell and the page it lands on.
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home'), title: 'Haveli · Rooftop dining opposite the Badshahi Mosque' },
  { path: 'menu', loadComponent: () => import('./pages/menu'), title: 'Menu · Haveli Lahore' },
  { path: 'reserve', loadComponent: () => import('./pages/reserve'), title: 'Reserve a table · Haveli Lahore' },
  { path: '**', redirectTo: '' },
];
