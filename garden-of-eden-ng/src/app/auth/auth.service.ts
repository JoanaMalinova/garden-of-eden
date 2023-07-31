import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, LoginData } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "https://garden-of-eden-406ae-default-rtdb.europe-west1.firebasedatabase.app/users";

  constructor(
    private http: HttpClient
  ) { }

  login(userData: LoginData): Observable<User> {
    return this.http.post<User>(this.url + "/login", userData);
  }

  register(userData: { email: string, password: string, username: string }): Observable<User> {
    return this.http.post<User>(this.url + "/register", userData);
  }

}
