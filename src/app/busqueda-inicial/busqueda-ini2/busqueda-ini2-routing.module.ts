import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaIni2Page } from './busqueda-ini2.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaIni2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaIni2PageRoutingModule {}
