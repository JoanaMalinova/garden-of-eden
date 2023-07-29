import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlantObject } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class ViewLatestService {

  query = '?orderBy="timestamp"&limitToLast=3'

  constructor(
    private http: HttpClient
  ) { }

  getLatestPlants(): Observable<PlantObject> {
    const url = `https://garden-of-eden-406ae-default-rtdb.europe-west1.firebasedatabase.app/plants.json${this.query}`;
    return this.http.get<PlantObject>(url);
  }

}
