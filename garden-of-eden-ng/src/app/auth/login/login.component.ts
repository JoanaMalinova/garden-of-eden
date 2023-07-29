import { Component } from '@angular/core';
import { NgForm } from "@angular/forms"
import { LoginData } from 'src/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  onSubmit(form: NgForm): void {
    const data: LoginData = form.value;
    console.log(data);
    form.reset();
  }
}
