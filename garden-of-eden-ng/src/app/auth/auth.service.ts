import { Injectable } from '@angular/core';
import { LoginData } from 'src/types';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, Auth, signOut } from "@angular/fire/auth";
import { FirebaseApp } from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: Auth;

  constructor(private app: FirebaseApp) {
    this.auth = getAuth(this.app)
  }

  login(userData: LoginData): void {
    signInWithEmailAndPassword(this.auth, userData.email, userData.password)
      .then(() => {
        console.log(`${this.auth.currentUser?.displayName} successfully logged in!`)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  register(userData: { email: string, password: string, username: string }): void {
    createUserWithEmailAndPassword(this.auth, userData.email, userData.password)
      .then(({ user }) => {
        updateProfile(user, { displayName: userData.username });
        console.log(this.auth.currentUser);
      })
      .catch((err) => {
        console.log(err)
      });
  }

  logout(): void {
    signOut(this.auth).then(() => {
      console.log("Successfully signed out!");
      console.log(this.auth.currentUser)
    }).catch((error) => {
      console.log(error);
    });
  }

}
