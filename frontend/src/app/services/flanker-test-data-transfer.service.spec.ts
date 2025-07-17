import { TestBed } from '@angular/core/testing';

import { FlankerTestDataTransferService } from './flanker-test-data-transfer.service';

describe('FlankerTestDataTransferService', () => {
  let service: FlankerTestDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlankerTestDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
