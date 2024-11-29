import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajeCreadoPageRoutingModule } from './viaje-creado-routing.module';

import { ViajeCreadoPage } from './viaje-creado.page';

import { HeaderModule } from '../Base/Componentes/header/header.module';
import { BottomModule } from '../Base/Componentes/bottom/bottom.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeCreadoPageRoutingModule,
    HeaderModule,
    BottomModule
  ],
  declarations: [ViajeCreadoPage]
})
export class ViajeCreadoPageModule {}
