import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SaboreslistComponent } from './saboreslist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SaboresService } from 'src/app/service/sabores.service';
import { of } from 'rxjs';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Sabores } from '../sabores';

describe('SaboreslistComponent', () => {
  let component: SaboreslistComponent;
  let fixture: ComponentFixture<SaboreslistComponent>;
  let saboresService: SaboresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgbModalModule],
      declarations: [SaboreslistComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(SaboreslistComponent);
    component = fixture.componentInstance;
    saboresService = TestBed.inject(SaboresService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the list of sabores on listAll success', fakeAsync(() => {
    const mockSabores: Sabores[] = [{ id: 1, saborPizza: 'Teste 1' }, { id: 2, saborPizza: 'Teste 2' }];
    spyOn(saboresService, 'listAll').and.returnValue(of(mockSabores));
  
    component.listAll();
    tick();
    fixture.detectChanges();
  
    expect(component.lista).toEqual(mockSabores);
  }));
  

  it('should open modal on adicionar', fakeAsync(() => {
    spyOn(component.modalService, 'open').and.returnValue({ componentInstance: {}, result: Promise.resolve('result') } as any);

    component.adicionar({} as any);
    tick();
    fixture.detectChanges();

    expect(component.modalService.open).toHaveBeenCalled();
  }));

  it('should call delete method on excluir', fakeAsync(() => {
    spyOn(saboresService, 'delete').and.returnValue(of(null));
    const mockSabores = { id: 1, saborPizza: 'Teste' };

    component.excluir(mockSabores.id);
    tick();
    fixture.detectChanges();

    expect(saboresService.delete).toHaveBeenCalledWith(mockSabores.id);
    expect(component.lista.length).toBe(0); // Assuming that the delete method will remove the item from the list
  }));
});
