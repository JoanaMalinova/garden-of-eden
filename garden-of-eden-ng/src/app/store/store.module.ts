import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { FavouritesComponent } from './favourites/favourites.component';



@NgModule({
  declarations: [
    CartComponent,
    FavouritesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StoreModule { }
