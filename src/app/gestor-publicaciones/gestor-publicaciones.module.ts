import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestorPublicacionesPageRoutingModule } from './gestor-publicaciones-routing.module';

import { GestorPublicacionesPage } from './gestor-publicaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestorPublicacionesPageRoutingModule
  ],
  declarations: [GestorPublicacionesPage]
})
export class GestorPublicacionesPageModule {}
