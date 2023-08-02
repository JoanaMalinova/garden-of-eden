import { Component, OnInit } from '@angular/core';
import { ViewLatestService } from './view-latest.service';
import { Plant } from 'src/types';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ViewLatestService]
})
export class HomeComponent implements OnInit {

  latest: Plant[] = [];

  constructor(
    private viewLatestService: ViewLatestService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.viewLatestService.getLatestPlants()
      .subscribe({
        next: (latest) => {
          this.latest = Object.values(latest);
        },
        error: (e) => {
          console.log(e.message);
        }
      })

  }

  redirectToDetails(event: Event, id: string): void {
    this.router.navigate([`/${id}/details`])
  }
}
