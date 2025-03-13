import { TestBed } from '@angular/core/testing';

import { KiadasManagerService } from './kiadas-manager.service';

describe('KiadasManagerService', () => {
  let service: KiadasManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KiadasManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
