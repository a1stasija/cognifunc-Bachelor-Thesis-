import { TestBed } from '@angular/core/testing';

import { FlankerTestMouseDataService } from './flanker-test-mouse-data.service';

describe('FlankerTestMouseDataService', () => {
  let service: FlankerTestMouseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlankerTestMouseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
