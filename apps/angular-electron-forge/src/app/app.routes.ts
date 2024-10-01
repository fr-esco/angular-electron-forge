import { type Route } from '@angular/router'

export const appRoutes: Route[] = [
  {
    path: 'electron', title: 'Electron',
    loadComponent: () => import('./electron/electron-page.component').then(c => c.ElectronPageComponent),
  }
]
