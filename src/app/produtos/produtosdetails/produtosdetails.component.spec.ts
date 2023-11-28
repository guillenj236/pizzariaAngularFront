import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProdutosdetailsComponent } from './produtosdetails.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Produtos } from '../produto';
import { ProdutosService } from 'src/app/service/produtos.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('ProdutosdetailsComponent', () => {
  let component: ProdutosdetailsComponent;
  let fixture: ComponentFixture<ProdutosdetailsComponent>;

  let produtoService: ProdutosService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProdutosdetailsComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(ProdutosdetailsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    produtoService = TestBed.inject(ProdutosService);
    fixture.detectChanges();
  });

  beforeEach(() => {
    let produtos = new Produtos();

    produtos.id = 1;
    produtos.quantidadeprod = 3;
    produtos.estoqueProds = {id: 1,precoProdutos: 10, nomeProduto: 'teste'};
    component.produtos = produtos;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('DEVE CHAMAR O METODO SALVAR QUANDO CLICAR NO BOTAO', () => {
    spyOn(component, 'salvar');
    const button = fixture.debugElement.nativeElement.querySelector('#inputBotao');
    button.click();
    expect(component.salvar).toHaveBeenCalled();
  });

  it('TESDE DE 1 @Input - INTERPOLACAO NO TEMPLATE', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="quantidadeProd"]'));
    expect(elemento.nativeElement.ngModel).toEqual(3);
  });

  it('TESDE 2 DE @Input - INTERPOLACAO NO TEMPLATE', () =>{
    let elemento = fixture.debugElement.query(By.css('input[name="quantidadeProd"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  });

  it('DEVE CHAMAR O METODO deletar()', fakeAsync(() => {
    spyOn(produtoService, 'delete').and.returnValue(of(new Produtos()));

    const produtos = new Produtos();
    produtos.id = 1;
    component.produtos = produtos;
    
    component.deletar();
    tick();

    expect(produtoService.delete).toHaveBeenCalledWith(produtos.id);
  }));


});
