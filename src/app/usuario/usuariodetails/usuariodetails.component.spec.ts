import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SaboresService } from 'src/app/service/sabores.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { UsuariodetailsComponent } from './usuariodetails.component';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from '../usuario';
import { Endereco } from 'src/app/endereco/endereco';
import { Login } from 'src/app/sistema/cad-login/login';
import { CadLoginService } from 'src/app/service/cad-login.service';

describe('UsuariosdetailsComponent', () => {
  let component: UsuariodetailsComponent;
  let fixture: ComponentFixture<UsuariodetailsComponent>;

  let usuarioService: UsuarioService;
  let cadLoginService: CadLoginService;



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UsuariodetailsComponent],
      providers: [SaboresService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(UsuariodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    usuarioService = TestBed.inject(UsuarioService);
    cadLoginService = TestBed.inject(CadLoginService);
  });

  beforeEach(() => {
    let usuario = new Usuario();
    usuario.id = 1;
    usuario.nomeUsuario = 'joao';
    usuario.telefone = '45999999999';
    usuario.enderecos = [];
    component.usuario = usuario;


    const endereco = new Endereco();
    endereco.id = 1;
    endereco.rua = 'nome da Rua';
    endereco.bairro = 'nome do Bairro'
    endereco.numeroEnd = 871;
    endereco.usuario = usuario;

    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('teste de 1 @Input - INTERPOLACAO NO TEMPLATE', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="UserInput"]'));
    expect(elemento.nativeElement.ngModel).toEqual('joao');
  });

  it('teste 2 de @Input - INTERPOLACAO NO TEMPLATE', () => {
    let elemento = fixture.debugElement.query(By.css('input[name="UserInput"]'));
    expect(elemento.nativeElement.ngModel).not.toBe(null);
  });

  beforeEach(() => {
    usuarioService = TestBed.inject(UsuarioService);
  });

  it('deve chamar o método save ao enviar passando o objeto', fakeAsync(() => {
    let spy= spyOn(usuarioService, 'save').and.callThrough();

    let usuario = new Usuario();
    usuario.nomeUsuario = 'teste';
    component.usuario = usuario;
    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelector('#inputBotao');
    button.click();

    tick();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(usuario);
  }));

  it('deve chamar o método save ao enviar', fakeAsync(() => {
    let spy = spyOn(usuarioService, 'save').and.callThrough();

    let usuario = new Usuario();
    usuario.nomeUsuario = 'teste';
    component.usuario = usuario;
    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelector('#inputBotao');
    button.click();
    tick();
    expect(spy).toHaveBeenCalled();

  }));

  it('deve chamar o método save quando usuario.id <= 0 no salvar()', fakeAsync(() => {
    const saveSpy = spyOn(usuarioService, 'save').and.returnValue(of(new Usuario())); // Mock the save method
  
    const usuario = new Usuario();
    usuario.id = 0; // Certifique-se de que id <= 0
    component.usuario = usuario;
  
    component.salvar();
    tick();
  
    expect(saveSpy).toHaveBeenCalled();
    expect(saveSpy).toHaveBeenCalledWith(usuario); // Adicione essa expectativa para verificar os parâmetros
  }));
  
  it('deve chamar o método update quando usuario.id > 0 no salvar()', fakeAsync(() => {
    const updateSpy = spyOn(usuarioService, 'update').and.returnValue(of(new Usuario())); // Mock the update method
  
    const usuario = new Usuario();
    usuario.id = 1; // Certifique-se de que id > 0
    component.usuario = usuario;
  
    component.salvar();
    tick();
  
    expect(updateSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalledWith(usuario); // Adicione essa expectativa para verificar os parâmetros
  }));

  it('deve chamar o metodo deletar()', fakeAsync(() => {
    spyOn(usuarioService, 'delete').and.returnValue(of(new Usuario())); // Mock the delete method

    const usuario = new Usuario();
    usuario.id = 1;
    component.usuario = usuario;

    component.deletar();
    tick();

    expect(usuarioService.delete).toHaveBeenCalledWith(usuario.id);
  }));

  it('teste logar', () => {
    const loginMock = { username: 'testuser', password: 'testpassword' };
    spyOn(cadLoginService['http'], 'post').and.callThrough();
    cadLoginService.logar(loginMock).subscribe();
    expect(cadLoginService['http'].post).toHaveBeenCalledWith(cadLoginService.API, loginMock);
  });
  it('teste deslogar', () => {
    spyOn(cadLoginService['http'], 'get').and.callThrough();
    cadLoginService.deslogar().subscribe();
    expect(cadLoginService['http'].get).toHaveBeenCalledWith(cadLoginService.API + '/deslogar');
  });
  
});
