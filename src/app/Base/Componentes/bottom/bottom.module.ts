import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BottomComponent } from './bottom.component';

@NgModule({
  declarations: [BottomComponent],
  imports: [CommonModule,IonicModule],
  exports: [BottomComponent]
})
export class BottomModule { }
