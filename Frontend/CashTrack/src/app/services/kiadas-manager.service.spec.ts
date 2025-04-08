import { TestBed } from '@angular/core/testing';

import { KiadasManagerService } from './kiadas-manager.service';
import { provideHttpClient } from '@angular/common/http';

describe('KiadasManagerService', () => {
  let service: KiadasManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: 
      [
        KiadasManagerService,provideHttpClient()
      ]});
    service = TestBed.inject(KiadasManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
