import { Component, inject } from '@angular/core';
import { Usuario } from '../usuario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuariolist',
  templateUrl: './usuariolist.component.html',
  styleUrls: ['./usuariolist.component.scss']
})
export class UsuariolistComponent {
  lista: Usuario[] = [];

  usuarioSelecionadoParaEdicao: Usuario = new Usuario();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  usuarioService = inject(UsuarioService);

  constructor(){
    this.listAll();
  }

  listAll(){
    this.usuarioService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('ERRO!! Observe no console!!');
        console.error(erro);
      }
    });
  }

  adicionar(modal: any){
    this.usuarioSelecionadoParaEdicao = new Usuario();
    this.modalService.open(modal, {size: 'lg'});
  }

  editar(modal: any, usuario: Usuario, indice: number){
    this.usuarioSelecionadoParaEdicao = Object.assign({}, usuario);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, {size: 'lg'});
  }

  addOuEditaUsuario(usuario: Usuario){
    this.listAll();
    this.modalService.dismissAll();
  }

  excluir(id:number){
    this.usuarioService.delete(id).subscribe({
     next: retorno => {
        alert('excluído com sucesso!');
        this.listAll();        
    },
    error: erro => { // QUANDO DÁ ERRO
      alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
      console.error(erro);
    }
  });
  }
}
