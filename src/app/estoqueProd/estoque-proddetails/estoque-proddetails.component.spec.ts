import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueProddetailsComponent } from './estoque-proddetails.component';

describe('EstoqueProddetailsComponent', () => {
  let component: EstoqueProddetailsComponent;
  let fixture: ComponentFixture<EstoqueProddetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstoqueProddetailsComponent]
    });
    fixture = TestBed.createComponent(EstoqueProddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
