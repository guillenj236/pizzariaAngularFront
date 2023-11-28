import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SaboresdetailsComponent } from './saboresdetails.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SaboresService } from 'src/app/service/sabores.service';
import { Sabores } from '../sabores';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('SaboresdetailsComponent', () => {
  let component: SaboresdetailsComponent;
  let fixture: ComponentFixture<SaboresdetailsComponent>;

  let saboresService: SaboresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SaboresdetailsComponent],
      providers: [SaboresService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(SaboresdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    saboresService = TestBed.inject(SaboresService);
  });

  beforeEach(() => {
    let sabores = new Sabores();
    sabores.id = 1;
    sabores.saborPizza = 'calabresa';
    component.sabores = sabores;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TESTE DE 1 @Input - INTERPOLACAO NO TEMPLATE', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="inputSabor"]'));
    expect(elemento.nativeElement.ngModel).toEqual('calabresa');
  });

  it('TESTE 2 DE @Input - INTERPOLACAO NO TEMPLATE', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="inputSabor"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  });

  beforeEach(() => {
    saboresService = TestBed.inject(SaboresService);
  });

  it('DEVE CHAMAR O MÉTODO SAVE AO ENVIAR PASSANDO OBJETO', fakeAsync(() => {
    let spy= spyOn(saboresService, 'save').and.callThrough();

    let sabores = new Sabores();
    sabores.saborPizza = 'eita';
    component.sabores = sabores;
    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelector('#inputBotao');
    console.log(button);
    button.click();

    tick();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(sabores);
  }));

  it('DEVE CHAMAR O MÉTODO SAVE AO ENVIAR', fakeAsync(() => {
    let spy = spyOn(saboresService, 'save').and.callThrough();

    let sabores = new Sabores();
    sabores.saborPizza = 'eita';
    component.sabores = sabores;
    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelector('#inputBotao');
    button.click();
    tick();
    expect(spy).toHaveBeenCalled();

  }));

  it('deve chamar o metood update quando sabores.id > 0 no salvar()', fakeAsync(() => {
    spyOn(saboresService, 'update').and.returnValue(of(new Sabores())); // Mock the update method

    const sabores = new Sabores();
    sabores.id = 1;
    component.sabores = sabores;

    component.salvar();
    tick();

    expect(saboresService.update).toHaveBeenCalledWith(sabores);
  }));

  it('deve chamar o metodo save quando sabores.id <= 0 no salvar()', fakeAsync(() => {
    spyOn(saboresService, 'save').and.returnValue(of(new Sabores())); // Mock the save method

    const sabores = new Sabores();
    sabores.id = 0;
    component.sabores = sabores;

    component.salvar();
    tick();

    expect(saboresService.save).toHaveBeenCalledWith(sabores);
  }));

  it('deve chamar o metodo deletar()', fakeAsync(() => {
    spyOn(saboresService, 'delete').and.returnValue(of(new Sabores())); // Mock the delete method

    const sabores = new Sabores();
    sabores.id = 1;
    component.sabores = sabores;

    component.deletar();
    tick();

    expect(saboresService.delete).toHaveBeenCalledWith(sabores.id);
  }));
  
});
