import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaIni6Page } from './busqueda-ini6.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaIni6Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaIni6PageRoutingModule {}
