import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';
import { Plant } from 'src/types';
import { Router } from '@angular/router';
import { Unsubscribe, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { StoreService } from 'src/app/store/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [CatalogService]
})

export class CatalogComponent implements OnInit, OnDestroy {

  plants: Plant[] = [];
  auth = getAuth();
  userId: string = "";
  searchWord: string = "";
  isAuthenticated: boolean = false;
  email: string = "";
  liked: string[] = [];
  inCart: string[] = [];
  subscriptions: Subscription[] = [];
  unsubscribes: Unsubscribe[] = [];

  constructor(
    private catalogService: CatalogService,
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const unsubscribe = onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isAuthenticated = true;
        this.userId = user?.uid;
        this.email = user?.email ? user.email : "";

        this.storeService.getAllLiked(this.userId)
          .subscribe({
            next: (likedPlants) => {
              this.liked = Object.keys(likedPlants);
            },
            error: (e) => {
              console.log(e.message);
              this.router.navigate(['/error']);
            }
          });

        this.storeService.getAllInCart(this.userId)
          .subscribe({
            next: (plantsInCart) => {
              this.inCart = Object.keys(plantsInCart);
            },
            error: (e) => {
              console.log(e.message);
              this.router.navigate(['/error']);
            }
          })

      } else {
        this.isAuthenticated = false;
      }
    });

    const subscribe = this.catalogService.getAllPlants()
      .subscribe({
        next: (plants) => {
          this.plants = Object.values(plants);
        },
        error: (e) => {
          console.log(e.message);
          this.router.navigate(['/error']);
        }
      });

    this.subscriptions.push(subscribe)

    this.unsubscribes.push(unsubscribe);
  }

  updateFavourites(liked: string[]) {
    this.liked = liked;
  }

  updateCart(inCart: string[]) {
    this.inCart = inCart;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe);
    this.unsubscribes.forEach(e => e());
  }
}


