import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EstoqueProddetailsComponent } from './estoque-proddetails.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { EstoqueProdService } from 'src/app/service/estoque-prod.service';
import { EstoqueProds } from '../estoqueProds';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('EstoqueProddetailsComponent', () => {
  let component: EstoqueProddetailsComponent;
  let fixture: ComponentFixture<EstoqueProddetailsComponent>;

  let estoqueProdService: EstoqueProdService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EstoqueProddetailsComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(EstoqueProddetailsComponent);
    component = fixture.componentInstance;
    estoqueProdService = TestBed.inject(EstoqueProdService);
    fixture.detectChanges();
  });

  beforeEach(() => {
    let estoqueProd = new EstoqueProds();
    estoqueProd.id = 1;
    estoqueProd.nomeProduto = 'teste';
    estoqueProd.precoProdutos = 10;
    component.estoqueProd = estoqueProd;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TESTE DE 1 @Input - INTERPOLACAO NO TEMPLATE', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="inputEstoque"]'));
    expect(elemento.nativeElement.ngModel).toEqual('teste');
  });

  it('TESTE DE 1 @Input - INTERPOLACAO NO TEMPLATE PRECO', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="inputEstoquePreco"]'));
    expect(elemento.nativeElement.ngModel).toEqual(10);
  });

  it('TESTE DE 2 @Input - INTERPOLACAO NO TEMPLATE', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="inputEstoque"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  });

  it('TESTE DE 2 @Input - INTERPOLACAO NO TEMPLATE PRECO', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="inputEstoquePreco"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  });

  beforeEach(() => {
      estoqueProdService = TestBed.inject(EstoqueProdService);
      httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('DEVE CHAMAR O METODO SAVE AO ENVIAR O FORMULARIO PASSANDO OBJETO', fakeAsync(() => {
    let spy = spyOn(estoqueProdService, 'save').and.callThrough();
    
    let estoqueProd = new EstoqueProds();
    estoqueProd.nomeProduto = 'eita';
    estoqueProd.precoProdutos = 10;
    component.estoqueProd = estoqueProd;
    fixture.detectChanges();

    let button=fixture.debugElement.nativeElement.querySelector('#inputBotao');
    console.log(button);
    button.click();

    tick();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(estoqueProd);
  }));

  it('should interpolate @Input data in the template', () => {
    let elementoNome = fixture.debugElement.query(By.css('input[name="inputEstoque"]'));
    let elementoPreco = fixture.debugElement.query(By.css('input[name="inputEstoquePreco"]'));

    expect(elementoNome.nativeElement.ngModel).toEqual('teste');
    expect(elementoPreco.nativeElement.ngModel).toEqual(10);
  });

  it('should call save method when estoqueProd.id <= 0 on salvar()', fakeAsync(() => {
    let spySave = spyOn(estoqueProdService, 'save').and.callThrough();

    let estoqueProd = new EstoqueProds();
    estoqueProd.nomeProduto = 'eita';
    estoqueProd.precoProdutos = 10;
    component.estoqueProd = estoqueProd;
    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelector('#inputBotao');
    button.click();

    tick();
    fixture.detectChanges();
    expect(spySave).toHaveBeenCalledWith(estoqueProd);
  }));

  it('should call update method when estoqueProd.id > 0 on salvar()', fakeAsync(() => {
    let spyUpdate = spyOn(estoqueProdService, 'update').and.callFake(() => of(new EstoqueProds()));

    let estoqueProd = new EstoqueProds();
    estoqueProd.id = 1;
    estoqueProd.nomeProduto = 'eita';
    estoqueProd.precoProdutos = 20;
    component.estoqueProd = estoqueProd;
    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelector('#inputBotao');
    button.click();

    tick();
    fixture.detectChanges();
    expect(spyUpdate).toHaveBeenCalledWith(estoqueProd);
  }));

});
