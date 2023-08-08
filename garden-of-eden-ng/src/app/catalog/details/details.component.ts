import { Component, OnInit } from '@angular/core';
import { DetailsService } from './details.service';
import { ActivatedRoute } from '@angular/router';
import { Plant } from 'src/types';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [DetailsService, StoreService]
})
export class DetailsComponent implements OnInit {

  auth = getAuth();
  currUser: boolean = false;
  userId: string | undefined = '';
  liked: boolean = false;
  email: string | undefined | null = "";

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

  ) { }

  onLike(plantId: string, plantName: string, imageUrl: string, price: number): void {

    onAuthStateChanged(this.auth, (user) => {
      this.userId = user?.uid;
      this.email = user?.email;
      this.storeService.addToFavourites(plantId, plantName, imageUrl, price, this.userId, this.email);
    });

    console.log("i clicked");
  }

  onCartClick(plantId: string, name: string, imageUrl: string, price: number): void {
    this.storeService.addToCart(plantId, this.userId, name, imageUrl, price);
  }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currUser = true;
        this.userId = user?.uid;
        console.log(this.userId);
      } else {
        this.currUser = false;
      }
    });
    this.detailsService.getSinglePlant(this.plantId)
      .subscribe({
        next: (plant) => {
          this.plant = plant;
          console.log(this.userId)
          this.liked = plant.likes?.[`${this.userId}`] ? true : false;
          console.log(this.liked);
        },
        error: (e) => {
          console.log(e.message);
        }
      })
  }

}
