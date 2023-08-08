import { Injectable } from '@angular/core';
import { Database, getDatabase, ref, set, onValue, remove } from 'firebase/database';
import { FirebaseApp } from '@angular/fire/app';
import { LikedPlantObject } from 'src/types';
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
    private http: HttpClient
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

    const userUrl = `users/${userId}/favourites/${plantId}`;
    const plantUrl = `plants/${plantId}/likes/${userId}`;
    const userFavouritesRef = ref(this.db, userUrl);
    const plantsLikesRef = ref(this.db, plantUrl);


    await this.checkIfExists(userFavouritesRef);

    if (this.exists) {

      Promise.all([remove(userFavouritesRef), remove(plantsLikesRef)])
        .catch(() => {
          console.log('Error removing path')
        });

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

  addToCart(plantId: string): void {

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

  deleteLiked(plantId: string, userId: string): void {
    const url = `https://garden-of-eden-406ae-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/favourites/${plantId}.json`
    this.http.delete(url);
  }

}
