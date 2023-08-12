import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { LikedPlant } from 'src/types';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  plants: LikedPlant[] = [];
  auth = getAuth();
  userId: string = "";
  noFavourites: boolean = false;
  inCart: string[] = [];

  constructor(
    private storeService: StoreService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userId = user.uid;
        this.storeService.getAllLiked(this.userId)
          .subscribe(
            {
              next: (plants) => {
                if (plants) {
                  this.plants = Object.values(plants);
                } else {
                  this.noFavourites = true;
                }
              },
              error: (e) => {
                console.log(e.message);
                this.router.navigate(['/error']);
              }
            }
          );

        this.storeService.getAllInCart(this.userId)
          .subscribe({
            next: (plantsInCart) => {
              this.inCart = Object.keys(plantsInCart);
            },
            error: (e) => {
              console.log(e.message);
              this.router.navigate(['/error']);
            }
          });
      }
    });
  }

  redirectToDetails(event: Event, id: string): void {
    this.router.navigate([`/${id}/details`]);
  }

  onCartClick(plantId: string, name: string, imageUrl: string, price: number): void {
    this.storeService.addToCart(plantId, this.userId, name, imageUrl, price);

    if (this.inCart.includes(plantId)) {
      this.inCart = this.inCart.filter(e => e != plantId);
    } else {
      this.inCart.push(plantId);
    }
  }

  onTrashClick(plantId: string,): void {
    this.storeService.deleteLiked(plantId, this.userId);
    this.plants = this.plants.filter(e => e.id !== plantId);
    if (!this.plants.length) {
      this.noFavourites = true;
    }
  }

}
