import { TestBed } from '@angular/core/testing';

import { JovedelemManagerService } from './jovedelem-manager.service';
import { provideHttpClient } from '@angular/common/http';
describe('JovedelemManagerService', () => {
  let service: JovedelemManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: 
      [
        JovedelemManagerService,provideHttpClient()
      ]});
    service = TestBed.inject(JovedelemManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
