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
    path: '',
    redirectTo: 'do-not-do-this',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'do-not-do-this',
  }
];
