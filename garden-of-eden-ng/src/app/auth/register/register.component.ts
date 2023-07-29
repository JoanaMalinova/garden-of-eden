import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterData } from 'src/types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  onSubmit(form: NgForm): void {
    const data: RegisterData = form.value;
    console.log(data);
    form.reset();
  }

}
