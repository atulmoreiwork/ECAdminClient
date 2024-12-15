import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PopupComponent
  ]
})
export class PopupModule { }