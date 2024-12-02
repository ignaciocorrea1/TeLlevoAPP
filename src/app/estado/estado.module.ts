import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoPageRoutingModule } from './estado-routing.module';

import { EstadoPage } from './estado.page';

import { HeaderModule } from '../Base/Componentes/header/header.module';
import { BottomModule } from '../Base/Componentes/bottom/bottom.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoPageRoutingModule,
    HeaderModule,
    BottomModule
  ],
  declarations: [EstadoPage]
})
export class EstadoPageModule {}
