import { TestBed } from '@angular/core/testing';

import { ProdutosService } from './produtos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProdutosService', () => {
  let service: ProdutosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProdutosService]
    });
    service = TestBed.inject(ProdutosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
