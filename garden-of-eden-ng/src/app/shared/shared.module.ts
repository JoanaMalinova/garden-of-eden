import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    LoaderComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PageNotFoundComponent,
    LoaderComponent,
    CardComponent
  ]
})
export class SharedModule { }
