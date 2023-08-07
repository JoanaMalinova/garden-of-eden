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
  userId: string = '';

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
    private storeService: StoreService
  ) { }

  onLike(plantId: string, plantName: string): void {
    if (this.auth.currentUser) {
      this.userId = this.auth.currentUser.uid;
    }
    this.storeService.addToFavourites(plantId, plantName, this.userId, this.auth.currentUser?.email);
    console.log("i clicked");
  }

  onCartAdd(plantId: string): void {
    this.storeService.addToCart(plantId);
  }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currUser = true;
      } else {
        this.currUser = false;
      }
    });
    this.detailsService.getSinglePlant(this.plantId)
      .subscribe({
        next: (plant) => {
          this.plant = plant;
        },
        error: (e) => {
          console.log(e.message);
        }
      })

  }
}
