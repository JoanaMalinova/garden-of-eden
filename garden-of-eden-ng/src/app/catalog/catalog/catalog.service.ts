import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private http: HttpClient
  ) { }

  getAllPlants(): Observable<Plant[]> {
    const url = 'https://garden-of-eden-406ae-default-rtdb.europe-west1.firebasedatabase.app/plants';
    return this.http.get<Plant[]>(url);
  }

}
