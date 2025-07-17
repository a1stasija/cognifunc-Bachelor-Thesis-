import { TestBed } from '@angular/core/testing';

import { VisualSearchTestMouseDataService } from './visual-search-test-mouse-data.service';

describe('VisualSearchTestMouseDataService', () => {
  let service: VisualSearchTestMouseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualSearchTestMouseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
