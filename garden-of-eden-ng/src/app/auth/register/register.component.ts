import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterData } from 'src/types';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authService: AuthService
  ) { }

  onSubmit(form: NgForm): void {
    const data: RegisterData = form.value;
    console.log(data);
    const { username, password, email } = data;
    this.authService.register({ username, password, email })
    form.reset();
  }

}
