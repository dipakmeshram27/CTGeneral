import { TestBed } from '@angular/core/testing';

import { DatacreateService } from './datacreate.service';

describe('DatacreateService', () => {
  let service: DatacreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatacreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
