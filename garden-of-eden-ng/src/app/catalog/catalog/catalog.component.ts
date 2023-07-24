import { Component, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';
import { Plant } from 'src/types';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [CatalogService]
})
export class CatalogComponent implements OnInit {
  plants: Plant[] = [];
  constructor(
    private catalogService: CatalogService,

  ) { }

  ngOnInit(): void {
    this.catalogService.getAllPlants()
      .subscribe({
        next: (plants) => {
          this.plants = plants;
          console.log(plants);
        },
        error: (e) => {
          console.log(e.message);
        }
      })
  }
}

