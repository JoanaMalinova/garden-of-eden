import { Component } from '@angular/core';
import { NgForm } from "@angular/forms"
import { LoginData } from 'src/types';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  onSubmit(form: NgForm): void {
    const data: LoginData = form.value;

    try {
      this.authService.login(data);
      form.reset();
      this.router.navigate(["/catalog"]);

    } catch (error) {
      console.error(error);
    }

  }
}
