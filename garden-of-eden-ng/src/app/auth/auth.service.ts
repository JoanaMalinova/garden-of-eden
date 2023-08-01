import { Injectable } from '@angular/core';
import { LoginData } from 'src/types';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "https://garden-of-eden-406ae-default-rtdb.europe-west1.firebasedatabase.app/users";
  auth = getAuth();

  constructor(

  ) { }

  login(userData: LoginData): void {
    signInWithEmailAndPassword(this.auth, userData.email, userData.password)
  }

  register(userData: { email: string, password: string, username: string }): void {
    createUserWithEmailAndPassword(this.auth, userData.email, userData.password)
      .then(({ user }) => {
        updateProfile(user, { displayName: userData.username });
      })
      .catch(console.log);
  }

}
