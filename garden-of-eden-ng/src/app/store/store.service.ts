import { Injectable } from '@angular/core';
import { Database, getDatabase, ref, set, onValue, remove } from 'firebase/database';
import { FirebaseApp } from '@angular/fire/app';
import { LikedPlantObject, PlantInCartObject } from 'src/types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  db: Database;
  exists: boolean = false;

  constructor(
    private app: FirebaseApp,
    private http: HttpClient,
    private router: Router
  ) {
    this.db = getDatabase(this.app);

  }

  async addToFavourites(
    plantId: string,
    plantName: string,
    imageUrl: string,
    price: number,
    userId: string | undefined,
    email: string | null | undefined
  ): Promise<void> {

    const userFavouritesRef = ref(this.db, `users/${userId}/favourites/${plantId}`);
    const plantsLikesRef = ref(this.db, `plants/${plantId}/likes/${userId}`);

    await this.checkIfExists(userFavouritesRef);

    if (this.exists) {

      this.deleteLiked(plantId, userId)

    } else {

      Promise.all([
        set(userFavouritesRef, {
          id: plantId,
          name: plantName,
          imageUrl,
          price
        }),
        set(plantsLikesRef, {
          id: userId,
          email
        })
          .catch(() => {
            console.log('Error is in set method!!')
          })
      ])
    }
  }

  async addToCart(plantId: string, userId: string | undefined, plantName: string, imageUrl: string, price: number): Promise<void> {

    const userCartRef = ref(this.db, `users/${userId}/cart/${plantId}`);
    const quantityRef = ref(this.db, `users/${userId}/cart/${plantId}/qunatity`)

    await this.checkIfExists(userCartRef);

    if (!this.exists) {
      await set(userCartRef, {
        id: plantId,
        name: plantName,
        imageUrl: imageUrl,
        price: price,
        quantity: 1
      })
    } else {

    }
  }

  async checkIfExists(reference: any): Promise<void> {

    await onValue(reference, (snapshot) => {

      this.exists = snapshot.exists();

    })

  }

  getAllLiked(userId: string): Observable<LikedPlantObject> {

    const url = `https://garden-of-eden-406ae-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/favourites.json`;

    return this.http.get<LikedPlantObject>(url);

  }

  getAllInCart(userId: string): Observable<PlantInCartObject> {

    const url = `https://garden-of-eden-406ae-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/cart.json`;

    return this.http.get<PlantInCartObject>(url)
  }

  deleteLiked(plantId: string, userId: string | undefined): void {
    Promise.all([
      remove(ref(this.db, `users/${userId}/favourites/${plantId}`)),
      remove(ref(this.db, `plants/${plantId}/likes/${userId}`))
    ])
      .catch(() => {
        console.log('Error removing path')
      });
  }

}
