import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { NgForm } from "@angular/forms"
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  auth = getAuth();
  currUser: boolean = false;
  username: string | null = null;

  constructor(
    private appService: AppService,
    private router: Router,
    private authService: AuthService,

  ) { }

  onSubmit(form: NgForm): void {
    const data: { search: string } = form.value;
    this.appService.setSearchWord(data.search);
    this.router.navigate(['/catalog']);
    form.reset();
  }

  onLogout(): void {
    this.authService.logout();
  }
  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currUser = true;
        this.username = user.displayName;
      } else {
        this.currUser = false;
      }
    });
  }

}
