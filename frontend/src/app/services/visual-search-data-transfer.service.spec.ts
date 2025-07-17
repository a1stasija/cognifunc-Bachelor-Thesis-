import { TestBed } from '@angular/core/testing';

import { VisualSearchDataTransferService } from './visual-search-data-transfer.service';

describe('VisualSearchDataTransferService', () => {
  let service: VisualSearchDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualSearchDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
