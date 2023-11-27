import { TestBed } from '@angular/core/testing';

import { EstoqueProdService } from './estoque-prod.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('EstoqueProdService', () => {
  let service: EstoqueProdService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EstoqueProdService]

    });
    service = TestBed.inject(EstoqueProdService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
