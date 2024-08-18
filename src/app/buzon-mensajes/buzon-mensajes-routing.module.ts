import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuzonMensajesPage } from './buzon-mensajes.page';

const routes: Routes = [
  {
    path: '',
    component: BuzonMensajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuzonMensajesPageRoutingModule {}
