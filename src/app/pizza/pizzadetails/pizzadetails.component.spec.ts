import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PizzadetailsComponent } from './pizzadetails.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PizzaService } from 'src/app/service/pizza.service';
import { Pizza } from '../pizza';
import { Tamanho } from 'src/app/enums/tamanho';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('PizzadetailsComponent', () => {
  let component: PizzadetailsComponent;
  let fixture: ComponentFixture<PizzadetailsComponent>;

  let pizzaService: PizzaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PizzadetailsComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(PizzadetailsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    pizzaService = TestBed.inject(PizzaService);
    fixture.detectChanges();
  });

  beforeEach(() => { //MOCANDO DADOS
    let pizza = new Pizza();

    pizza.id = 1;
    pizza.precoPizza = 30;
    pizza.quantidadePizza = 1;
    pizza.tamanho = Tamanho.P;
    pizza.sabores = [{id: 1, saborPizza: 'testeSabor'}];
    component.pizza = pizza;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form elements correctly', () => {
    const tamanhoSelect = fixture.debugElement.query(By.css('#tamanho'));
    const saboresSelect = fixture.debugElement.query(By.css('#sabores'));
    const quantidadeInput = fixture.debugElement.query(By.css('input[name="quantidadePizza"]'));
    const botaoAdicionar = fixture.debugElement.query(By.css('#inputBotao'));

    expect(tamanhoSelect).toBeTruthy();
    expect(saboresSelect).toBeTruthy();
    expect(quantidadeInput).toBeTruthy();
    expect(botaoAdicionar).toBeTruthy();
  });

  it('TESTE DE 1 @Input - INTERPOLACAO NO TEMPLATE', () =>{
    let elemento = fixture.debugElement.query(By.css('input[name="quantidadePizza"]'));
    expect(elemento.nativeElement.ngModel).toEqual(1);
  });

  it('TESDE 2 DE @Input - INTERPOLACAO NO TEMPLATE', () =>{
    let elemento = fixture.debugElement.query(By.css('input[name="quantidadePizza"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  });

  it('Teste de 3 @Input - Interpolação no template', () => {
    let elemento = fixture.debugElement.query(By.css('select[id="tamanho"]'));
    expect(elemento).toBeTruthy();
    console.log('teste deu certo 3');
  });
  
  it('Teste de 4 @Input - Interpolação no template', () => {
    let elemento = fixture.debugElement.query(By.css('select[id="tamanho"]'));
    expect(elemento).toBeTruthy();
  });
  
  it('Teste de 5 @Input - Interpolação no template', () => {
    let elemento = fixture.debugElement.query(By.css('select[id="tamanho"]'));
    expect(elemento).toBeTruthy();
  });

  beforeEach(() => {
    pizzaService = TestBed.inject(PizzaService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('QUANDO CLICAR NO BOTAO CHAMAR O METODO SAVE', fakeAsync(() => {
    spyOn(component, 'salvar');
    const botaoAdicionar = fixture.debugElement.query(By.css('#inputBotao'));
    botaoAdicionar.nativeElement.click();
    tick();
    expect(component.salvar).toHaveBeenCalled();
  }));

  
  it('DEVE CHAMAR O MEOTODO DELETAR', fakeAsync(() => {
    spyOn(pizzaService, 'delete').and.returnValue(of(new Pizza()));

    const pizza = new Pizza();
    pizza.id = 1;
    component.pizza = pizza;

    component.deletar();
    tick();

    expect(pizzaService.delete).toHaveBeenCalledWith(pizza.id);
  }));
  
});
