import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterData } from 'src/types';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(form: NgForm): void {

    const data: RegisterData = form.value;
    console.log(data);

    const { username, password, email } = data;

    try {
      this.authService.register({ username, password, email });
      form.reset();
      this.router.navigate(['/catalog']);

    } catch (error) {
      console.error
    }

  }

}
