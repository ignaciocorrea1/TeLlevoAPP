import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgviajesPage } from './progviajes.page';

const routes: Routes = [
  {
    path: '',
    component: ProgviajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgviajesPageRoutingModule {}
