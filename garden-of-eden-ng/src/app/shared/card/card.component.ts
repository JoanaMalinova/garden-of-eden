import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/store/store.service';
import { Plant, LikedPlant } from 'src/types';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  path: string = this.location.path();
  withTrash: boolean = this.path == "/favourites" ? true : false;

  constructor(
    private storeService: StoreService,
    private router: Router,
    private location: Location
  ) { }

  @Input() liked: string[] = [];
  @Input() inCart: string[] = [];
  @Input() userId: string = '';
  @Input() email: string = "";
  @Input() isAuthenticated: boolean = this.path == "/favourites" ? true : false;
  @Input() plant: Plant | LikedPlant =
    {
      name: '',
      price: 0,
      light: '',
      temperature: '',
      humidity: '',
      fertilizer: '',
      water: '',
      imageUrl: '',
      id: '',
      likes: null,
      inCart: null
    }
  @Input() plants: LikedPlant[] = [];
  @Input() noFavourites: boolean = false;
  @Output() heartClickEvent = new EventEmitter<string[]>();
  @Output() cartClickEvent = new EventEmitter<string[]>();
  @Output() trashClickEvent = new EventEmitter<{ plants: LikedPlant[], noFavourites: boolean }>();

  redirectToDetails(id: string): void {
    this.router.navigate([`/${id}/details`]);
  }

  onHeartClick(plantId: string, name: string, imageUrl: string, price: number) {

    this.storeService.addToFavourites(plantId, name, imageUrl, price, this.userId, this.email);

    if (this.liked.includes(plantId)) {
      this.liked = this.liked.filter(e => e != plantId);
    } else {
      this.liked.push(plantId);
    }
    this.heartClickEvent.emit(this.liked);
  }

  onCartClick(plantId: string, name: string, imageUrl: string, price: number) {

    this.storeService.addToCart(plantId, this.userId, name, imageUrl, price);

    if (this.inCart.includes(plantId)) {
      this.inCart = this.inCart.filter(e => e != plantId);
    } else {
      this.inCart.push(plantId);
    }
    this.cartClickEvent.emit(this.inCart);
  }

  onTrashClick(plantId: string) {
    this.storeService.deleteLiked(plantId, this.userId);
    this.plants = this.plants.filter(e => e.id !== plantId);
    if (!this.plants.length) {
      this.noFavourites = true;
    }
    this.trashClickEvent.emit({ plants: this.plants, noFavourites: this.noFavourites })
  }

}
