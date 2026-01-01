import { TestBed } from '@angular/core/testing';

import { FlankerRecreationService } from './flanker-recreation.service';

describe('FlankerRecreationService', () => {
  let service: FlankerRecreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlankerRecreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
