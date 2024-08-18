import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaIni6PageRoutingModule } from './busqueda-ini6-routing.module';

import { BusquedaIni6Page } from './busqueda-ini6.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaIni6PageRoutingModule
  ],
  declarations: [BusquedaIni6Page]
})
export class BusquedaIni6PageModule {}
