import { Component, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';
import { Plant } from 'src/types';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [CatalogService]
})

export class CatalogComponent implements OnInit {

  plants: Plant[] = [];
  auth = getAuth();
  userId: string = "";
  currUser: boolean = false;
  searchWord: string = "";
  email: string = "";
  liked: string[] = [];
  inCart: string[] = [];

  constructor(
    private catalogService: CatalogService,
    private appService: AppService,
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currUser = true;
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
        this.currUser = false;
      }
    });

    this.appService.getSearchWord.subscribe(word => this.searchWord = word);
    console.log(this.searchWord);


    if (this.searchWord) {
      this.catalogService.getSerachedFor(this.searchWord)
        .subscribe({
          next: (plants) => {
            this.plants = Object.values(plants);
          },
          error: (e) => {
            console.log(e.message);
            this.router.navigate(['/error']);
          }
        })
    } else {
      this.catalogService.getAllPlants()
        .subscribe({
          next: (plants) => {
            this.plants = Object.values(plants);
          },
          error: (e) => {
            console.log(e.message);
            this.router.navigate(['/error']);
          }
        })
    }
  }

  redirectToDetails(event: Event, id: string): void {
    this.router.navigate([`/${id}/details`])
  }

  onHeartClick(plantId: string, name: string, imageUrl: string, price: number) {

    this.storeService.addToFavourites(plantId, name, imageUrl, price, this.userId, this.email);

    if (this.liked.includes(plantId)) {
      this.liked = this.liked.filter(e => e != plantId);
    } else {
      this.liked.push(plantId);
    }
  }

  onCartClick(plantId: string, name: string, imageUrl: string, price: number) {

    this.storeService.addToCart(plantId, this.userId, name, imageUrl, price);

    if (this.inCart.includes(plantId)) {
      this.inCart = this.inCart.filter(e => e != plantId);
    } else {
      this.inCart.push(plantId);
    }
  }
}


