import { TestBed } from '@angular/core/testing';

import { EstoqueProdService } from './estoque-prod.service';

describe('EstoqueProdService', () => {
  let service: EstoqueProdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstoqueProdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
