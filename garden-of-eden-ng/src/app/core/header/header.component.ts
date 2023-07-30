import { Component } from '@angular/core';
import { NgForm } from "@angular/forms"
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  onSubmit(form: NgForm): void {
    const data: { search: string } = form.value;
    this.appService.setSearchWord(data.search);
    this.router.navigate(['/catalog']);
  }
}
