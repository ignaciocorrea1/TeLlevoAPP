import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

import { HeaderModule } from './Base/Componentes/header/header.module';
import { BottomModule } from './Base/Componentes/bottom/bottom.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'md',
      animated: true,
    }),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HeaderModule,
    BottomModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
