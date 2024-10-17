import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAlunosPageRoutingModule } from './lista-alunos-routing.module';

import { ListaAlunosPage } from './lista-alunos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAlunosPageRoutingModule
  ],
  declarations: [ListaAlunosPage]
})
export class ListaAlunosPageModule {}
