import { Component } from '@angular/core';
import { NgForm } from "@angular/forms"
import { LoginData, User } from 'src/types';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User = {
    username: "",
    email: "",
    password: "",
    id: ""
  }

  constructor(
    private authService: AuthService
  ) {
  }
  onSubmit(form: NgForm): void {
    const data: LoginData = form.value;
    console.log(data);
    this.authService.login(data)
      .subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (e) => {
          console.log(e.message);
        }
      })

    form.reset();
  }
}
