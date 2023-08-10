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
  cartIsEmpty: boolean = false;
  totalPrice: number = 0;
  itemsQuantity: { id: string, quantity: number }[] = [];

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
                this.plants.forEach((plant) => {
                  this.totalPrice += plant.quantity * plant.price;
                  this.itemsQuantity.push({ id: plant.id, quantity: plant.quantity });
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
      }
    }));
  }

  onTrashClick(id: string): void {
    this.storeService.deleteFromCart(id, this.userId);
    this.plants = this.plants.filter(e => e.id !== id);
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
    }
  }

  onMinus(plantId: string) {
    this.storeService.reduceQuantity(this.userId, plantId);

    const currPlant = this.itemsQuantity.find(e => e.id === plantId);
    this.itemsQuantity.filter(e => e.id !== plantId);
    if (currPlant && currPlant.quantity > 1) {
      currPlant.quantity -= 1;
      this.itemsQuantity.push(currPlant);
    }
  }

  getQuantity(plantId: string): number | undefined {
    return this.itemsQuantity.find(e => e.id === plantId)?.quantity;
  }
}
