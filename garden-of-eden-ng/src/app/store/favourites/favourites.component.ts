import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { LikedPlant } from 'src/types';
import { Unsubscribe, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  plants: LikedPlant[] = [];
  auth = getAuth();
  userId: string = "";
  noFavourites: boolean = false;
  inCart: string[] = [];
  subscriptions: Subscription[] = [];
  unsubscribes: Unsubscribe[] = [];


  constructor(
    private storeService: StoreService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const unsubscribe = onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userId = user.uid;
        this.storeService.getAllLiked(this.userId)
          .subscribe(
            {
              next: (plants) => {
                if (plants) {
                  this.plants = Object.values(plants);
                  if (!this.plants.length) {
                    this.noFavourites = true;
                  }
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
        this.unsubscribes.push(unsubscribe);

        const subscribe1 = this.storeService.getAllInCart(this.userId)
          .subscribe({
            next: (plantsInCart) => {
              this.inCart = Object.keys(plantsInCart);
            },
            error: (e) => {
              console.log(e.message);
              this.router.navigate(['/error']);
            }
          });
        this.subscriptions.push(subscribe1)
      }
    });
  }

  updateCart(inCart: string[]) {
    this.inCart = inCart;
  }

  updateFavourites(param: { plants: LikedPlant[], noFavourites: boolean }) {
    this.plants = param.plants;
    this.noFavourites = param.noFavourites;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe);
    this.unsubscribes.forEach(e => e());
  }

}
