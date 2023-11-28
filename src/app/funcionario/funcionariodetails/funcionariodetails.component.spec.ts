import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FuncionariodetailsComponent } from './funcionariodetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { Funcionario } from '../funcionario';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('FuncionariodetailsComponent', () => {
  let component: FuncionariodetailsComponent;
  let fixture: ComponentFixture<FuncionariodetailsComponent>;

  let funcionarioService: FuncionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FuncionariodetailsComponent],
      providers: [FuncionarioService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(FuncionariodetailsComponent);
    component = fixture.componentInstance;
    funcionarioService = TestBed.inject(FuncionarioService);
    fixture.detectChanges();
  });

  beforeEach(() => {
    let funcionario = new Funcionario();
    funcionario.id = 1;
    funcionario.nomeFunc = 'gabriel';
    component.funcionario = funcionario;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TESTE DE @Input - INTERPOLACAO NO TEMPLATE', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="FuncInput"]'));
    expect(elemento.nativeElement.ngModel).toEqual('gabriel');
  });

  it('TESTE 2 DE @Input - INTERPOLACAO NO TEMPLATE', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="FuncInput"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  });

  beforeEach(() => {
    funcionarioService = TestBed.inject(FuncionarioService);
  });

  it('DEVE CHAMAR O METODO AVE AO ENVIAR PASSANDO OBJETO', fakeAsync(() => {
      let spy = spyOn(funcionarioService, 'save').and.callThrough();

      let funcionario = new Funcionario();
      funcionario.nomeFunc = 'gabriel';
      component.funcionario = funcionario;
      fixture.detectChanges();

      let button = fixture.debugElement.nativeElement.querySelector('#inputBotao');
      console.log(button);
      button.click();
  
      tick();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(funcionario);
  }));

  it('DEVE CHAMAR O MÉTODO SAVE AO ENVIAR', fakeAsync(() => {
    let spy = spyOn(funcionarioService, 'save').and.callThrough();

    let funcionario = new Funcionario();
    funcionario.nomeFunc = 'gabriel';
    component.funcionario = funcionario;
    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelector('#inputBotao');
    button.click();
    tick();
    expect(spy).toHaveBeenCalled();

  }));

  it('deve chamar o metodo update quando funcionario.id > 0 no salvar()', fakeAsync(() => {
    spyOn(funcionarioService, 'update').and.returnValue(of(new Funcionario()));

    const funcionario = new Funcionario();
    funcionario.id = 1;
    component.funcionario = funcionario;

    component.salvar();
    tick();
    expect(funcionarioService.update).toHaveBeenCalledWith(funcionario);
  }));

  it('deve chaamr o metodo save quando funcionario.id <= 0 no salvar()', fakeAsync(() => {
    spyOn(funcionarioService, 'save').and.returnValue(of(new Funcionario()));

    const funcionario = new Funcionario();
    funcionario.id = 0;
    component.funcionario = funcionario;
    
    component.salvar();
    tick();

    expect(funcionarioService.save).toHaveBeenCalledWith(funcionario);
  }));

  it('deve chamar o metodo deletar()', fakeAsync(() => {
    spyOn(funcionarioService, 'delete').and.returnValue(of(new Funcionario()));

    const funcionario = new Funcionario();
    funcionario.id = 1;
    component.funcionario = funcionario;

    component.deletar();
    tick();

    expect(funcionarioService.delete).toHaveBeenCalledWith(funcionario.id);
  }));

});
