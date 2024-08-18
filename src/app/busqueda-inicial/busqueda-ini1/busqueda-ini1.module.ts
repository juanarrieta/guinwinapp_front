import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaIni1PageRoutingModule } from './busqueda-ini1-routing.module';

import { BusquedaIni1Page } from './busqueda-ini1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaIni1PageRoutingModule
  ],
  declarations: [BusquedaIni1Page]
})
export class BusquedaIni1PageModule {}
