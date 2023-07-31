import { Component, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';
import { Plant } from 'src/types';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [CatalogService]
})
export class CatalogComponent implements OnInit {

  plants: Plant[] = [];

  searchWord: string = "";

  constructor(
    private catalogService: CatalogService,
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.appService.getSearchWord.subscribe(word => this.searchWord = word);
    console.log(this.searchWord);
    if (this.searchWord) {
      this.catalogService.getSerachedFor(this.searchWord)
        .subscribe({
          next: (plants) => {
            this.plants = Object.values(plants);
          },
          error: (e) => {
            console.log(e.message);
          }
        })
    } else {
      this.catalogService.getAllPlants()
        .subscribe({
          next: (plants) => {
            this.plants = Object.values(plants);
          },
          error: (e) => {
            console.log(e.message);
          }
        })
    }
  }


  redirectToDetails(event: Event, id: string): void {
    this.router.navigate([`/${id}/details`])
  }
}


