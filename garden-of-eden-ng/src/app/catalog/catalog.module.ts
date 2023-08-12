import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CatalogComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class CatalogModule { }
