import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { CardComponent } from './card/card.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    LoaderComponent,
    CardComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PageNotFoundComponent,
    LoaderComponent,
    CardComponent,
    ModalComponent
  ]
})
export class SharedModule { }
