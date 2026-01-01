import { TestBed } from '@angular/core/testing';

import { FlankerRecreationTransferService } from './flanker-recreation-transfer.service';

describe('FlankerRecreationTransferService', () => {
  let service: FlankerRecreationTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlankerRecreationTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
