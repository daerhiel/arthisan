import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('@features/explorer').then(m => m.Explorer) }
];
