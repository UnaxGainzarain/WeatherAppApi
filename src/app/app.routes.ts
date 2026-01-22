import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'hourly',
        loadComponent: () => import('./hourly/hourly.page').then((m) => m.HourlyPage),
      },
      {
        path: 'daily',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: '',
        redirectTo: '/tabs/daily', // Default to daily view
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'tabs',
    redirectTo: '',
    pathMatch: 'full'
  },
];
