import { TestBed } from '@angular/core/testing';

import { ReadingMouseDataService } from './reading-mouse-data.service';

describe('ReadingMouseDataService', () => {
  let service: ReadingMouseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingMouseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
