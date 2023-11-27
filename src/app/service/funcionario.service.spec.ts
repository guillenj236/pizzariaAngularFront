import { TestBed } from '@angular/core/testing';

import { FuncionarioService } from './funcionario.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FuncionarioService', () => {
  let service: FuncionarioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FuncionarioService]
    });
    service = TestBed.inject(FuncionarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
