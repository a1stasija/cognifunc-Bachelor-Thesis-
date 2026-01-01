import { TestBed } from '@angular/core/testing';

import { VsRecreationTransferService } from './vs-recreation-transfer.service';

describe('VsRecreationTransferService', () => {
  let service: VsRecreationTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VsRecreationTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
