import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EstoquProdlistComponent } from './estoqu-prodlist.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EstoqueProdService } from 'src/app/service/estoque-prod.service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EstoqueProds } from '../estoqueProds';
import { of } from 'rxjs';

describe('EstoquProdlistComponent', () => {
  let component: EstoquProdlistComponent;
  let fixture: ComponentFixture<EstoquProdlistComponent>;
  let estoqueProdService: EstoqueProdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgbModalModule],
      declarations: [EstoquProdlistComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(EstoquProdlistComponent);
    component = fixture.componentInstance;
    estoqueProdService = TestBed.inject(EstoqueProdService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the list of estoqueProds on listAll success', fakeAsync(() => {
    const mockEstoqueProds: EstoqueProds[] = [
      { id: 1, nomeProduto: 'Produto 1', precoProdutos: 10.0 },
      { id: 2, nomeProduto: 'Produto 2', precoProdutos: 15.0 }
    ];
    spyOn(estoqueProdService, 'listAll').and.returnValue(of(mockEstoqueProds));
  
    component.listAll();
    tick();
    fixture.detectChanges();
  
    expect(component.lista).toEqual(mockEstoqueProds);
  }));

    
  it('should open modal on adicionar', fakeAsync(() => {
    spyOn(component.modalService, 'open').and.returnValue({ componentInstance: {}, result: Promise.resolve('result') } as any);

    component.adicionar({} as any);
    tick();
    fixture.detectChanges();

    expect(component.modalService.open).toHaveBeenCalled();
  }));

  it('should call delete method on excluir', fakeAsync(() => {
    spyOn(estoqueProdService, 'delete').and.returnValue(of(null));
    const mockEstoqueProd = { id: 1, nomeProduto: 'Produto Teste', precoProdutos: 20.0 };

    component.excluir(mockEstoqueProd.id);
    tick();
    fixture.detectChanges();

    expect(estoqueProdService.delete).toHaveBeenCalledWith(mockEstoqueProd.id);
    expect(component.lista.length).toBe(0); // Assuming that the delete method will remove the item from the list
  }));
});
