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

  errorMessage: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  onSubmit(form: NgForm): void {

    const data: LoginData = form.value;

    const asyncOnSubmit = async () => {

      await this.authService.login(data);

      form.reset();

      this.authService.getErrorMessage
        .subscribe((errorMessage) => {
          debugger
          this.errorMessage = errorMessage;
          console.log(this.errorMessage);
          if (this.errorMessage === "No errors") {
            this.router.navigate(["/catalog"])
          }
        });
    }

    asyncOnSubmit();
  }

}
