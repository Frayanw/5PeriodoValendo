import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaTreinosPageRoutingModule } from './lista-treinos-routing.module';

import { ListaTreinosPage } from './lista-treinos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaTreinosPageRoutingModule
  ],
  declarations: [ListaTreinosPage]
})
export class ListaTreinosPageModule {}
