import { Injectable } from '@angular/core';
import { Database, getDatabase, ref, set, onValue } from 'firebase/database';
import { FirebaseApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  db: Database;

  constructor(private app: FirebaseApp) {
    this.db = getDatabase(this.app)
  }

  addToFavourites(plantId: string, userId: string | undefined): void {
    set(ref(this.db, 'users/favourites'), {
      id: plantId
    });
    set(ref(this.db, 'plants/likes'), {
      id: userId
    });
  }

  addToCart(plantId: string): void {

  }

  checkIfLiked(plantId: string, userId: string | undefined): void {

  }

}
