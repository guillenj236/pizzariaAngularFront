import { TestBed } from '@angular/core/testing';

import { SaboresService } from './sabores.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SaboresService', () => {
  let service: SaboresService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SaboresService]
    });
    service = TestBed.inject(SaboresService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
