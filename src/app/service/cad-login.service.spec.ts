import { TestBed } from '@angular/core/testing';

import { CadLoginService } from './cad-login.service';

describe('CadLoginService', () => {
  let service: CadLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
