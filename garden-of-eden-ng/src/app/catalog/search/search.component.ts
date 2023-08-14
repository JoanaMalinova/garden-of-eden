import { Component, OnInit } from '@angular/core';
import { getAuth, Unsubscribe, onAuthStateChanged } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Plant } from 'src/types';
import { CatalogService } from '../catalog/catalog.service';
import { StoreService } from 'src/app/store/store.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  plants: Plant[] = [];
  auth = getAuth();
  userId: string = "";
  isAuthenticated: boolean = false;
  email: string = "";
  liked: string[] = [];
  inCart: string[] = [];
  subscriptions: Subscription[] = [];
  unsubscribes: Unsubscribe[] = [];
  searchWord: string = this.route.snapshot.params['searchWord'];

  constructor(
    private catalogService: CatalogService,
    private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute
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
          });

        const subscribe = this.catalogService.getSerachedFor(this.searchWord)
          .subscribe({
            next: (plants) => {
              this.plants = Object.values(plants);
            },
            error: (e) => {
              console.log(e.message);
              this.router.navigate(['/error']);
            }
          })
        this.subscriptions.push(subscribe);

      } else {
        this.isAuthenticated = false;
      }
    });

    this.unsubscribes.push(unsubscribe);
  }

  updateFavourites(liked: string[]) {
    this.liked = liked;
  }

  updateCart(inCart: string[]) {
    this.inCart = inCart;
  }

  redirectToCatalog() {
    this.router.navigate(['/catalog']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe);
    this.unsubscribes.forEach(e => e());
  }
}
