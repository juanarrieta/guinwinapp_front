import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialBusquedaPage } from './historial-busqueda.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialBusquedaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialBusquedaPageRoutingModule {}
