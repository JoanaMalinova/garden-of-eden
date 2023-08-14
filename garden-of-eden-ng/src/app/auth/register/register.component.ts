import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterData } from 'src/types';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errorMessage: string = "";
  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(form: NgForm): void {

    const data: RegisterData = form.value;
    const { username, password, email } = data;

    const asyncOnSubmit = async () => {

      await this.authService.register({ username, password, email });

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
