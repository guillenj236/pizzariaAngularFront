import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FuncionariolistComponent } from './funcionariolist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { Funcionario } from '../funcionario';
import { of } from 'rxjs';

describe('FuncionariolistComponent', () => {
  let component: FuncionariolistComponent;
  let fixture: ComponentFixture<FuncionariolistComponent>;
  let funcionarioService: FuncionarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FuncionariolistComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(FuncionariolistComponent);
    component = fixture.componentInstance;
    funcionarioService = TestBed.inject(FuncionarioService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('CRIAR FUNCIONARIOS E listALL', fakeAsync(() => {
    const mockFuncionarios: Funcionario[] = [{ id: 1, nomeFunc: 'Teste 1' }, { id: 2, nomeFunc: 'Teste 2' }];
    spyOn(funcionarioService, 'listAll').and.returnValue(of(mockFuncionarios));
  
    component.listAll();
    tick();
    fixture.detectChanges();
  
    expect(component.lista).toEqual(mockFuncionarios);
  }));

  it('DEVE ABRIR MODAL DE ADICIONAR', fakeAsync(() => {
    spyOn(component.modalService, 'open').and.returnValue({ componentInstance: {}, result: Promise.resolve('result') } as any);

    component.adicionar({} as any);
    tick();
    fixture.detectChanges();

    expect(component.modalService.open).toHaveBeenCalled();
  }));

  it('DEVE CHAMAR O METODO deletar EM excluir', fakeAsync(() => {
    spyOn(funcionarioService, 'delete').and.returnValue(of(null));
    const mockFuncionario = { id: 1, nomeFunc: 'Teste' };

    component.excluir(mockFuncionario.id);
    tick();
    fixture.detectChanges();

    expect(funcionarioService.delete).toHaveBeenCalledWith(mockFuncionario.id);
    expect(component.lista.length).toBe(0);
  }));
});
