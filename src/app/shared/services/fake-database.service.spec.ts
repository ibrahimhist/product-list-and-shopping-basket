import { TestBed } from '@angular/core/testing';

import { FakeDatabaseService } from './fake-database.service';

describe('FakeDatabaseService', () => {
  let service: FakeDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
