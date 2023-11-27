import { TestBed } from '@angular/core/testing';

import { PizzaService } from './pizza.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PizzaService', () => {
  let service: PizzaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PizzaService]
    });
    service = TestBed.inject(PizzaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
