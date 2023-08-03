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

  onLike(plantId: string): void {
    this.storeService.addToFavourites(plantId, this.auth.currentUser?.uid);
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
          console.log(plant);
        },
        error: (e) => {
          console.log(e.message);
        }
      })

  }
}
