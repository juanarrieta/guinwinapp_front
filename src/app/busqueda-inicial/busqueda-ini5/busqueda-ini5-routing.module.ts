import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaIni5Page } from './busqueda-ini5.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaIni5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaIni5PageRoutingModule {}
