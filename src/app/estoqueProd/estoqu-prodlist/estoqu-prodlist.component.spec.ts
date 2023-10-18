import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoquProdlistComponent } from './estoqu-prodlist.component';

describe('EstoquProdlistComponent', () => {
  let component: EstoquProdlistComponent;
  let fixture: ComponentFixture<EstoquProdlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstoquProdlistComponent]
    });
    fixture = TestBed.createComponent(EstoquProdlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
