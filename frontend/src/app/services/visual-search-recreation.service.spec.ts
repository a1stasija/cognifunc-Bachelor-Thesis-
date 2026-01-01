import { TestBed } from '@angular/core/testing';

import { VisualSearchRecreationService } from './visual-search-recreation.service';

describe('VisualSearchRecreationService', () => {
  let service: VisualSearchRecreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualSearchRecreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
