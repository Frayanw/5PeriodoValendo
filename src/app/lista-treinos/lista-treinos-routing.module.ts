import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaTreinosPage } from './lista-treinos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaTreinosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaTreinosPageRoutingModule {}
