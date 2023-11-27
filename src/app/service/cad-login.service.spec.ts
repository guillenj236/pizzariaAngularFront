import { TestBed } from '@angular/core/testing';

import { CadLoginService } from './cad-login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CadLoginService', () => {
  let service: CadLoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CadLoginService]

    });
    service = TestBed.inject(CadLoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
