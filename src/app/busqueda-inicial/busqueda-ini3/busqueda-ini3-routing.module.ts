import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaIni3Page } from './busqueda-ini3.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaIni3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaIni3PageRoutingModule {}
