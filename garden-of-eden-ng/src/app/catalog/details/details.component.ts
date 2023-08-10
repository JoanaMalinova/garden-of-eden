import { Component, OnInit } from '@angular/core';
import { DetailsService } from './details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Plant } from 'src/types';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { StoreService } from 'src/app/store/store.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [DetailsService, StoreService]
})
export class DetailsComponent implements OnInit {

  auth = getAuth();
  currUser: boolean = false;
  userId: string = '';
  liked: boolean = false;
  email: string = "";

  plant: Plant = {
    name: '',
    price: 0,
    light: '',
    temperature: '',
    humidity: '',
    fertilizer: '',
    water: '',
    imageUrl: '',
    id: '',
  }
  plantId: string = this.route.snapshot.params['plantId'];

  constructor(
    private detailsService: DetailsService,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private router: Router,
    private location: Location,

  ) { }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currUser = true;
        this.userId = user?.uid;
        this.email = user?.email ? user?.email : "";

      } else {
        this.currUser = false;
      }
    });

    this.detailsService.getSinglePlant(this.plantId)
      .subscribe({
        next: (plant) => {
          this.plant = plant;
          this.liked = plant.likes?.[`${this.userId}`] ? true : false;
        },
        error: (e) => {
          console.log(e.message);
          this.router.navigate(['/error']);
        }
      })
  }

  onHeartClick(plantId: string, plantName: string, imageUrl: string, price: number): void {

    this.storeService.addToFavourites(plantId, plantName, imageUrl, price, this.userId, this.email);
    this.liked = !this.liked;

    console.log("i clicked");
  }

  onCartClick(plantId: string, name: string, imageUrl: string, price: number): void {

    this.storeService.addToCart(plantId, this.userId, name, imageUrl, price);

  }

  onBackClick() {
    this.location.back()
  }

}
