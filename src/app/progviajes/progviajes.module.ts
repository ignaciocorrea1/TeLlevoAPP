import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgviajesPageRoutingModule } from './progviajes-routing.module';

import { ProgviajesPage } from './progviajes.page';

import { HeaderModule } from '../Base/Componentes/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgviajesPageRoutingModule,
    HeaderModule
  ],
  declarations: [ProgviajesPage]
})
export class ProgviajesPageModule {}
