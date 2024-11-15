import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';

import { HeaderModule } from '../Base/Componentes/header/header.module';
import { BottomModule } from '../Base/Componentes/bottom/bottom.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    HeaderModule,
    BottomModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
