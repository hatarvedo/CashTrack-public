import { TestBed } from '@angular/core/testing';

import { JovedelemManagerService } from './jovedelem-manager.service';

describe('JovedelemManagerService', () => {
  let service: JovedelemManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JovedelemManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
