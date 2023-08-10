import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PageNotFoundComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
