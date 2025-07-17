import { TestBed } from '@angular/core/testing';

import { ReadingDataTransferService } from './reading-data-transfer.service';

describe('ReadingDataTransferService', () => {
  let service: ReadingDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
