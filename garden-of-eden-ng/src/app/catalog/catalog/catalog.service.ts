import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlantObject } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private http: HttpClient
  ) { }

  getAllPlants(): Observable<PlantObject> {
    const url = 'https://garden-of-eden-406ae-default-rtdb.europe-west1.firebasedatabase.app/plants.json';
    return this.http.get<PlantObject>(url);
  }

}
