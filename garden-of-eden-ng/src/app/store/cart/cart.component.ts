import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { StoreService } from '../store.service';
import { PlantInCart } from 'src/types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  auth = getAuth();
  userId: string = '';
  plants: PlantInCart[] = [];
  cartIsEmpty = false;

  constructor(
    private router: Router,
    private storeService: StoreService
  ) { }

  onContinueClick(): void {
    console.log('Im in');
    this.router.navigate(['/catalog']);
  }

  ngOnInit(): void {

    onAuthStateChanged(this.auth, ((user) => {
      if (user) {
        this.userId = user.uid;
        this.storeService.getAllInCart(this.userId)
          .subscribe({
            next: (plants) => {
              if (plants) {
                this.plants = Object.values(plants);
              } else {
                this.cartIsEmpty = true;
              }

            },
            error: (e) => {
              console.log(e.message);
            }
          })
      }
    }));
  }

  onTrashClick(id: string): void {
    this.storeService.deleteFromCart(id, this.userId);
  }

  onImageClick(id: string): void {
    this.router.navigate([`${id}/details`]);
  }

  onPlus(plantId: string) {
    this.storeService.addQuantity(this.userId, plantId);
  }

  onMinus(plantId: string) {
    this.storeService.reduceQuantity(this.userId, plantId);
  }
}
