import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plant } from 'src/types';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(
    private http: HttpClient
  ) { }

  getSinglePlant(plantId: string): Observable<Plant> {
    const url = 'https://garden-of-eden-406ae-default-rtdb.europe-west1.firebasedatabase.app/plants/' + plantId;
    return this.http.get<Plant>(url);
  }

}
