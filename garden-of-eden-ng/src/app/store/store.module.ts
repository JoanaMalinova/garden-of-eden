import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CartComponent,
    FavouritesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class StoreModule { }
