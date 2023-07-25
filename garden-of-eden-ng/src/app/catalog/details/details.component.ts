import { Component, OnInit } from '@angular/core';
import { DetailsService } from './details.service';
// import { Plant } from 'src/types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [DetailsService]
})
export class DetailsComponent implements OnInit {

  plant = {};
  plantId = this.route.snapshot.params['plantId'];

  constructor(
    private detailsService: DetailsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.detailsService.getSinglePlant(this.plantId)
      .subscribe({
        next: (plant) => {
          this.plant = plant;
          console.log(plant);
        },
        error: (e) => {
          console.log(e.message);
        }
      })

  }
}
