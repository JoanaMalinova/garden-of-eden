import { Injectable } from '@angular/core';
import { LoginData } from 'src/types';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, Auth, signOut, onAuthStateChanged, User } from "@angular/fire/auth";
import { FirebaseApp } from '@angular/fire/app';
import { Database, getDatabase, ref, set } from "firebase/database";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: Auth;
  db: Database;
  user: User | null;
  isAuthenticated: boolean = false;
  errorMessage = new BehaviorSubject('');
  getErrorMessage = this.errorMessage.asObservable();

  constructor(
    private router: Router,
    private app: FirebaseApp
  ) {
    this.auth = getAuth(this.app);
    this.db = getDatabase(this.app);
    this.user = this.auth.currentUser;
  }

  setErrorMessage(errorMessage: string) {
    this.errorMessage.next(errorMessage);
  }

  login(userData: LoginData): void {

    signInWithEmailAndPassword(this.auth, userData.email, userData.password)
      .then(() => {
        console.log(`${this.auth.currentUser?.displayName} successfully logged in!`);
        localStorage.setItem('user', JSON.stringify(this.auth.currentUser));
        this.setErrorMessage("No errors");
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message == "Firebase: Error (auth/invalid-email)." ||
          err.message == "Firebase: Error (auth/wrong-password).") {
          this.setErrorMessage("Invalid email or password!");
        } else {
          this.router.navigate(['/error']);
        }
      });
  }

  register(userData: { email: string, password: string, username: string }): void {
    createUserWithEmailAndPassword(this.auth, userData.email, userData.password)
      .then(({ user }) => {
        updateProfile(user, { displayName: userData.username });
        set(ref(this.db, 'users/' + user.uid), {
          username: userData.username,
          email: userData.email,
          userId: user.uid,
          favourites: null,
          cart: null
        });
        localStorage.setItem('user', JSON.stringify(this.auth.currentUser));
        this.setErrorMessage("No errors");
      })
      .catch((err) => {
        console.log(err.message)
        if (err.message == "Firebase: Error (auth/email-already-in-use).") {
          this.setErrorMessage("Email already in use!");
        } else {
          this.router.navigate(['/error']);
        }
      });
  }

  logout(): void {
    signOut(this.auth).then(() => {
      console.log("Successfully signed out!");
      localStorage.removeItem('user');
    }).catch((error) => {
      console.error(error.message);
      this.router.navigate(['/error']);
    });
  }

  checkLogin() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
    return this.user;
  }
}
