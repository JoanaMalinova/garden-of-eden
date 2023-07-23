import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    CatalogComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CatalogModule { }
