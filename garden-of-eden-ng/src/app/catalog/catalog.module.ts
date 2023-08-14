import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    CatalogComponent,
    DetailsComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class CatalogModule { }
