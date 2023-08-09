import { Injectable } from '@angular/core';
import { LoginData } from 'src/types';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, Auth, signOut, onAuthStateChanged, User } from "@angular/fire/auth";
import { FirebaseApp } from '@angular/fire/app';
import { Database, getDatabase, ref, set } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: Auth;
  db: Database;
  user: User | null;
  isAuthenticated: boolean = false;

  constructor(private app: FirebaseApp) {
    this.auth = getAuth(this.app),
      this.db = getDatabase(this.app),
      this.user = this.auth.currentUser;
  }

  login(userData: LoginData): void {
    signInWithEmailAndPassword(this.auth, userData.email, userData.password)
      .then(() => {
        console.log(`${this.auth.currentUser?.displayName} successfully logged in!`);
        console.log(this.auth.currentUser);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err.message);
      })
  }

  register(userData: { email: string, password: string, username: string }): void {
    createUserWithEmailAndPassword(this.auth, userData.email, userData.password)
      .then(({ user }) => {
        updateProfile(user, { displayName: userData.username });
        set(ref(this.db, 'users/' + user.uid), {
          username: userData.username,
          email: userData.email,
          userId: user.uid
        });
      })
      .catch((err) => {
        console.log(err)
        throw new Error(err.message);
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

  getUser(): User | null {
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
    })
    return this.user;
  }

  checkLogin(): boolean {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
    return this.isAuthenticated;
  }

}
