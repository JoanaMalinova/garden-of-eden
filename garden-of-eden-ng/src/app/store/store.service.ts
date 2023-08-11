import { Injectable } from '@angular/core';
import { Database, getDatabase, ref, set, onValue, remove, get, child } from 'firebase/database';
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
    userId: string,
    email: string
  ): Promise<void> {

    const userFavouritesRef = ref(this.db, `users/${userId}/favourites/${plantId}`);
    const plantsLikesRef = ref(this.db, `plants/${plantId}/likes/${userId}`);

    const unsubscribe = onValue(userFavouritesRef, (snapshot) => {
      if (snapshot.exists()) {

        this.deleteLiked(plantId, userId);

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
          })])
          .catch(() => {
            console.log('Favourites were not added successfully!');
            this.router.navigate(['/error']);
          })
      }
      unsubscribe();
    });
  }

  addToCart(plantId: string, userId: string, plantName: string, imageUrl: string, price: number): void {

    const userCartRef = ref(this.db, `users/${userId}/cart/${plantId}`);
    const plantCartRef = ref(this.db, `plants/${plantId}/inCart/${userId}`);

    const unsubscribe = onValue(userCartRef, (snapshot) => {

      if (snapshot.exists()) {

        this.deleteFromCart(plantId, userId);

      } else {

        Promise.all([
          set(userCartRef, {
            id: plantId,
            name: plantName,
            imageUrl: imageUrl,
            price: price,
            quantity: 1
          }),
          set(plantCartRef, true)])
          .catch((err) => {
            console.log(err);
            this.router.navigate(['/error']);
          })
      }

      unsubscribe();
    });
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
        console.log('Error removing favourites!')
        this.router.navigate(['/error']);
      });
  }

  deleteFromCart(plantId: string, userId: string | undefined): void {

    Promise.all([
      remove(ref(this.db, `users/${userId}/cart/${plantId}`)),
      remove(ref(this.db, `plants/${plantId}/inCart/${userId}`))
    ])
      .catch((err) => {
        console.log(err);
        this.router.navigate(['/error']);
      })

  }

  addQuantity(userId: string, plantId: string): void {

    const dbRef = ref(this.db);
    const url = `users/${userId}/cart/${plantId}/quantity`;

    get(child(dbRef, url)).then((snapshot) => {
      const quantity: number = snapshot.val();
      set(ref(this.db, url), quantity + 1)
    })
      .catch((error) => {
        console.log(error.message);
        this.router.navigate(['/error']);
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
    })
      .catch((error) => {
        console.log(error.message);
        this.router.navigate(['/error']);
      });
  }

}
