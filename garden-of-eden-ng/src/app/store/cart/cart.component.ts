import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { StoreService } from '../store.service';
import { PlantInCart } from 'src/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit, OnDestroy {

  auth = getAuth();
  userId: string = '';
  plants: PlantInCart[] = [];
  cartIsEmpty: boolean = false;
  totalPrice: number = 0;
  itemsQuantity: {
    id: string,
    quantity: number
    price: number
  }[] = [];
  subscriptions: Subscription[] = [];
  unsubscribes: Unsubscribe[] = [];

  constructor(
    private router: Router,
    private storeService: StoreService
  ) { }

  onContinueClick(): void {
    this.router.navigate(['/catalog']);
  }

  ngOnInit(): void {

    const unsubscribe = onAuthStateChanged(this.auth, ((user) => {
      if (user) {
        this.userId = user.uid;
        const subscribe1 = this.storeService.getAllInCart(this.userId)
          .subscribe({
            next: (plants) => {
              if (plants) {
                this.plants = Object.values(plants);
                if (!this.plants.length) {
                  this.cartIsEmpty = true;
                }
                this.plants.forEach((plant) => {
                  this.totalPrice += plant.quantity * plant.price;
                  this.itemsQuantity.push({
                    id: plant.id,
                    quantity: plant.quantity,
                    price: plant.price
                  });
                })
              } else {
                this.cartIsEmpty = true;
              }
            },
            error: (e) => {
              console.log(e.message);
              this.router.navigate(['/error']);
            }
          })
        this.subscriptions.push(subscribe1);
      }
    }));
    this.unsubscribes.push(unsubscribe);
  }

  onTrashClick(id: string): void {
    this.storeService.deleteFromCart(id, this.userId);
    const curr = this.plants.find(e => e.id === id)
    this.plants = this.plants.filter(e => e.id !== id);
    if (curr) {
      this.totalPrice -= curr.quantity * curr.price
    }
    if (!this.plants.length) {
      this.cartIsEmpty = true;
    }
  }

  onImageClick(id: string): void {
    this.router.navigate([`${id}/details`]);
  }

  onPlus(plantId: string) {
    this.storeService.addQuantity(this.userId, plantId);

    const currPlant = this.itemsQuantity.find(e => e.id === plantId);
    this.itemsQuantity.filter(e => e.id !== plantId);
    if (currPlant) {
      currPlant.quantity += 1;
      this.itemsQuantity.push(currPlant);
      this.totalPrice += currPlant.price;
    }
  }

  onMinus(plantId: string) {
    this.storeService.reduceQuantity(this.userId, plantId);

    const currPlant = this.itemsQuantity.find(e => e.id === plantId);
    this.itemsQuantity.filter(e => e.id !== plantId);
    if (currPlant && currPlant.quantity > 1) {
      currPlant.quantity -= 1;
      this.itemsQuantity.push(currPlant);
      this.totalPrice -= currPlant.price;
    }
  }

  getQuantity(plantId: string): number | undefined {
    return this.itemsQuantity.find(e => e.id === plantId)?.quantity;
  }

  getTotalForPlant(plantId: string): number | void {
    const current = this.itemsQuantity.find(e => e.id === plantId);
    if (current) {
      return current.quantity * current.price;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe);
    this.unsubscribes.forEach(e => e());
  }
}
