import { Component, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms"
import { LoginData } from 'src/types';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  errorMessage: string = "";
  subscriptions: Subscription[] = [];

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

      const subscrption = this.authService.getErrorMessage
        .subscribe((errorMessage) => {
          this.errorMessage = errorMessage;
          if (this.errorMessage === "No errors") {
            this.router.navigate(["/catalog"])
          }
        });

      this.subscriptions.push(subscrption);
    }

    asyncOnSubmit();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe);
  }

}
