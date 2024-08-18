import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprarPage } from './comprar.page';

const routes: Routes = [
  {
    path: '',
    component: ComprarPage
  },
  {
    path: 'detalle',
    loadChildren: () => import('./detalle/detalle.module').then( m => m.DetallePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprarPageRoutingModule {}
