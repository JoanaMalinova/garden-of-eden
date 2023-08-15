import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsService } from './details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Plant } from 'src/types';
import { Unsubscribe, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { StoreService } from 'src/app/store/store.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [DetailsService, StoreService]
})
export class DetailsComponent implements OnInit, OnDestroy {

  auth = getAuth();
  currUser: boolean = false;
  userId: string = '';
  liked: boolean = false;
  addedToCart: boolean = false;
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
    likes: null,
    inCart: null
  }
  plantId: string = this.route.snapshot.params['plantId'];
  subscriptions: Subscription[] = [];
  unsubscribes: Unsubscribe[] = [];
  modalStyle: string = 'none';

  constructor(
    private detailsService: DetailsService,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private router: Router,
    private location: Location,

  ) { }

  ngOnInit(): void {
    const unsubscribe = onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currUser = true;
        this.userId = user?.uid;
        this.email = user?.email ? user?.email : "";

      } else {
        this.currUser = false;
      }
    });

    this.unsubscribes.push(unsubscribe);

    const subscribe1 = this.detailsService.getSinglePlant(this.plantId)
      .subscribe({
        next: (plant) => {
          this.plant = plant;
          this.liked = plant.likes?.[`${this.userId}`] ? true : false;
          this.addedToCart = plant.inCart?.[`${this.userId}`] ? true : false;
        },
        error: (e) => {
          console.log(e.message);
          this.router.navigate(['/error']);
        }
      });
    this.subscriptions.push(subscribe1);
  }

  onHeartClick(plantId: string, plantName: string, imageUrl: string, price: number): void {
    this.storeService.addToFavourites(plantId, plantName, imageUrl, price, this.userId, this.email);
    this.liked = !this.liked;
  }

  onCartClick(plantId: string, name: string, imageUrl: string, price: number): void {

    this.storeService.addToCart(plantId, this.userId, name, imageUrl, price);
    this.addedToCart = !this.addedToCart;
  }

  onBackClick() {
    this.location.back()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe);
    this.unsubscribes.forEach(e => e());
  }

  onImageClick() {
    this.modalStyle = "block";
  }

  changeModalStyle(modalStyle: string) {
    this.modalStyle = modalStyle;
  }

}
