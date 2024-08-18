import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaIni5PageRoutingModule } from './busqueda-ini5-routing.module';

import { BusquedaIni5Page } from './busqueda-ini5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaIni5PageRoutingModule
  ],
  declarations: [BusquedaIni5Page]
})
export class BusquedaIni5PageModule {}
