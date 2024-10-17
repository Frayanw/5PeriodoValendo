import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAlunosPage } from './lista-alunos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAlunosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaAlunosPageRoutingModule {}
