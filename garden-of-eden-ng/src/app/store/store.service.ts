import { Injectable } from '@angular/core';
import { Database, getDatabase, ref, set, onValue, remove } from 'firebase/database';
import { FirebaseApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  db: Database;
  exists: boolean = false;

  constructor(private app: FirebaseApp) {
    this.db = getDatabase(this.app);
  }

  async addToFavourites(plantId: string, plantName: string, userId: string, email: string | null | undefined): Promise<void> {
    try {

    } catch (error) {
      console.log('WTF')
    }
    const userUrl = `users/${userId}/favourites/${plantId}`;
    const plantUrl = `plants/${plantId}/likes/${userId}`;
    const userFavouritesRef = ref(this.db, userUrl);
    const plantsLikesRef = ref(this.db, plantUrl);


    await this.checkIfExists(userFavouritesRef);

    console.log(this.exists);
    console.log(userUrl);
    console.log(plantUrl);

    if (this.exists) {

      Promise.all([remove(userFavouritesRef), remove(plantsLikesRef)])
        .catch(() => {
          console.log('Error removing path')
        });


    } else {

      Promise.all([
        set(userFavouritesRef, {
          id: plantId,
          name: plantName
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

}
