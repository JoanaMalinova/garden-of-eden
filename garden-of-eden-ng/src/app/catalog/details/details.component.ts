import { Component, OnInit } from '@angular/core';
import { DetailsService } from './details.service';
import { ActivatedRoute } from '@angular/router';
import { Plant } from 'src/types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [DetailsService]
})
export class DetailsComponent implements OnInit {

  plant: Plant = {
    name: '',
    price: 0,
    light: '',
    temperature: '',
    humidity: '',
    fertilizer: '',
    water: '',
    imageUrl: '',
    id: '',
  }
  plantId: string = this.route.snapshot.params['plantId'];

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
