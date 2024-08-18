import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialBusquedaPageRoutingModule } from './historial-busqueda-routing.module';

import { HistorialBusquedaPage } from './historial-busqueda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialBusquedaPageRoutingModule
  ],
  declarations: [HistorialBusquedaPage]
})
export class HistorialBusquedaPageModule {}
