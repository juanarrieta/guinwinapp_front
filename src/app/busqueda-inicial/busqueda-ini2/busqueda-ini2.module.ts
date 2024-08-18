import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaIni2PageRoutingModule } from './busqueda-ini2-routing.module';

import { BusquedaIni2Page } from './busqueda-ini2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaIni2PageRoutingModule
  ],
  declarations: [BusquedaIni2Page]
})
export class BusquedaIni2PageModule {}
