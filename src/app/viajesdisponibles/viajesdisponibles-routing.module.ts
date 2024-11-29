import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajesdisponiblesPage } from './viajesdisponibles.page';

const routes: Routes = [
  {
    path: '',
    component: ViajesdisponiblesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajesdisponiblesPageRoutingModule {}
