import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewLatestService } from './view-latest.service';
import { Plant } from 'src/types';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ViewLatestService]
})
export class HomeComponent implements OnInit, OnDestroy {

  latest: Plant[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private viewLatestService: ViewLatestService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const subscribe1 = this.viewLatestService.getLatestPlants()
      .subscribe({
        next: (latest) => {
          this.latest = Object.values(latest);
        },
        error: (e) => {
          console.log(e.message);
          this.router.navigate(['/error']);
        }
      })
    this.subscriptions.push(subscribe1);
  }

  redirectToDetails(event: Event, id: string): void {
    this.router.navigate([`/${id}/details`])
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe);
  }
}
