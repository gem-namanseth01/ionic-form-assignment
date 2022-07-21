import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetimagePopupPageRoutingModule } from './setimage-popup-routing.module';
import { SetimagePopupPage } from './setimage-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetimagePopupPageRoutingModule,
  ],
  declarations: [SetimagePopupPage]
})
export class SetimagePopupPageModule {}
