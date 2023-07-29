import { TestBed } from '@angular/core/testing';

import { ViewLatestService } from './view-latest.service';

describe('ViewLatestService', () => {
  let service: ViewLatestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewLatestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
