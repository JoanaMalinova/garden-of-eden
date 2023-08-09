import { Component } from '@angular/core';
import { NgForm } from "@angular/forms"
import { LoginData } from 'src/types';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
// import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  onSubmit(form: NgForm): void {

    const data: LoginData = form.value;

    this.authService.login(data);

    this.errorMessage = this.authService.errorMessage;
    console.log(this.errorMessage);
    form.reset();
    if (!this.errorMessage) {
      this.router.navigate(["/catalog"]);
    }
  }
}
