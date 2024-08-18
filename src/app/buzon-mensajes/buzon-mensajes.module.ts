import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuzonMensajesPageRoutingModule } from './buzon-mensajes-routing.module';

import { BuzonMensajesPage } from './buzon-mensajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuzonMensajesPageRoutingModule
  ],
  declarations: [BuzonMensajesPage]
})
export class BuzonMensajesPageModule {}
