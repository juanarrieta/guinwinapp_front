import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaIni1Page } from './busqueda-ini1.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaIni1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaIni1PageRoutingModule {}
