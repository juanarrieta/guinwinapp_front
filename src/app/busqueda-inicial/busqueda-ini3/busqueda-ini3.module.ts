import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaIni3PageRoutingModule } from './busqueda-ini3-routing.module';

import { BusquedaIni3Page } from './busqueda-ini3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaIni3PageRoutingModule
  ],
  declarations: [BusquedaIni3Page]
})
export class BusquedaIni3PageModule {}
