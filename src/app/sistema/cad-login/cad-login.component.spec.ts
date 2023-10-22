import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadLoginComponent } from './cad-login.component';

describe('CadLoginComponent', () => {
  let component: CadLoginComponent;
  let fixture: ComponentFixture<CadLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadLoginComponent]
    });
    fixture = TestBed.createComponent(CadLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
