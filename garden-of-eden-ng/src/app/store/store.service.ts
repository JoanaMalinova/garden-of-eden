import { Injectable } from '@angular/core';
import { Database, getDatabase, ref, set, onValue, remove, get, child } from 'firebase/database';
import { FirebaseApp } from '@angular/fire/app';
import { LikedPlantObject, PlantInCartObject } from 'src/types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  db: Database;
  exists: boolean = false;

  constructor(
    private app: FirebaseApp,
    private http: HttpClient,
  ) {
    this.db = getDatabase(this.app);
  }

  async addToFavourites(
    plantId: string,
    plantName: string,
    imageUrl: string,
    price: number,
    userId: string,
    email: string
  ): Promise<void> {

    const userFavouritesRef = ref(this.db, `users/${userId}/favourites/${plantId}`);
    const plantsLikesRef = ref(this.db, `plants/${plantId}/likes/${userId}`);

    onValue(userFavouritesRef, ((snapshot) => {
      this.exists = snapshot.exists();
    }))

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

  async addToCart(plantId: string, userId: string, plantName: string, imageUrl: string, price: number): Promise<void> {

    const userCartRef = ref(this.db, `users/${userId}/cart/${plantId}`);

    onValue(userCartRef, (snapshot) => {
      this.exists = snapshot.exists();
    });

    console.log(this.exists);

    if (!this.exists) {
      await set(userCartRef, {
        id: plantId,
        name: plantName,
        imageUrl: imageUrl,
        price: price,
        quantity: 1
      })

    } else {
      this.addQuantity(userId, plantId);
    }
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

  deleteFromCart(plantId: string, userId: string | undefined): void {

    try {
      remove(ref(this.db, `users/${userId}/cart/${plantId}`));
    } catch (err) {
      console.error(err);
    }
  }

  addQuantity(userId: string, plantId: string): void {
    const dbRef = ref(this.db);
    const url = `users/${userId}/cart/${plantId}/quantity`;
    get(child(dbRef, url)).then((snapshot) => {
      const quantity: number = snapshot.val();
      set(ref(this.db, url), quantity + 1)
    }).catch((error) => {
      console.error(error);
    });
  }

  reduceQuantity(userId: string, plantId: string): void {
    const dbRef = ref(this.db);
    const url = `users/${userId}/cart/${plantId}/quantity`;
    get(child(dbRef, url)).then((snapshot) => {
      const quantity: number = snapshot.val();
      if (quantity > 1) {
        set(ref(this.db, url), quantity - 1)
      }
    }).catch((error) => {
      console.error(error);
    });
  }

}
