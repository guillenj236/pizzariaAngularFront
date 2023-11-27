import { TestBed } from '@angular/core/testing';

import { EnderecoService } from './endereco.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('EnderecoService', () => {
  let service: EnderecoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EnderecoService]
    });
    service = TestBed.inject(EnderecoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
