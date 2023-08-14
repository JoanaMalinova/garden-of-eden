import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/store/store.service';
import { Plant } from 'src/types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  constructor(
    private storeService: StoreService,
    private router: Router
  ) { }

  @Input() liked: string[] = [];
  @Input() inCart: string[] = [];
  @Input() userId: string = '';
  @Input() email: string = "";
  @Input() isAuthenticated: boolean = false;
  @Input() plant: Plant = {
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
  @Output() heartClickEvent = new EventEmitter<string[]>();
  @Output() cartClickEvent = new EventEmitter<string[]>();

  redirectToDetails(id: string): void {
    this.router.navigate([`/${id}/details`])
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

}
