import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestorPublicacionesPage } from './gestor-publicaciones.page';

const routes: Routes = [
  {
    path: '',
    component: GestorPublicacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestorPublicacionesPageRoutingModule {}
