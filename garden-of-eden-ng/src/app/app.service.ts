import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private searchWord = new BehaviorSubject('');
  getSearchWord = this.searchWord.asObservable();

  constructor() { }

  setSearchWord(searchWord: string) {
    this.searchWord.next(searchWord);
  }

}
