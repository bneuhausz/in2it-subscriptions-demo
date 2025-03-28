import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'do-not-do-this',
    loadComponent: () => import('./do-not-do-this/do-not-do-this.component'),
  },
  {
    path: 'do-this-one',
    loadComponent: () => import('./do-this-one/do-this-one.component'),
  },
  {
    path: 'do-this-two',
    loadComponent: () => import('./do-this-two/do-this-two.component'),
  },
  {
    path: 'do-this-three',
    loadComponent: () => import('./do-this-three/do-this-three.component'),
  },
  {
    path: 'template-only',
    loadComponent: () => import('./template-only/template-only.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
