import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajesdisponiblesPageRoutingModule } from './viajesdisponibles-routing.module';

import { ViajesdisponiblesPage } from './viajesdisponibles.page';

import { HeaderModule } from '../Base/Componentes/header/header.module';
import { BottomModule } from '../Base/Componentes/bottom/bottom.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajesdisponiblesPageRoutingModule,
    HeaderModule,
    BottomModule
  ],
  declarations: [ViajesdisponiblesPage]
})
export class ViajesdisponiblesPageModule {}
