import { Component, Inject, inject } from '@angular/core';
import { Pedido } from '../pedido';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from 'src/app/service/pedido.service';

@Component({
  selector: 'app-pedidolist',
  templateUrl: './pedidolist.component.html',
  styleUrls: ['./pedidolist.component.scss']
})
export class PedidolistComponent {

  lista: Pedido[] =[];

  objetoSelecionadoParaEdicao: Pedido = new Pedido();
  indiceSelecionadoParaEdicao!: number;
  
  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  pedidoService= inject(PedidoService);

  constructor(){
    this.listAll();
  }

  listAll(){
    this.pedidoService.listAll().subscribe({
      next: lista =>{
        this.lista = lista;
      },
      error: erro => {
        alert('ERRO, VEJA O CONSOLE');
        console.error(erro);
      }
    });
  }

  adicionar(modal: any){
    this.objetoSelecionadoParaEdicao = new Pedido();
    this.indiceSelecionadoParaEdicao = -1;

    this.modalRef = this.modalService.open(modal, {size: 'md'});
  }

  editar(modal: any, pedido: Pedido, indice: number){
    
    this.objetoSelecionadoParaEdicao = Object.assign({}, pedido);
    this.indiceSelecionadoParaEdicao = indice;
    this.modalRef = this.modalService.open(modal, {size: 'md'});
  }

  
  addOuEditarPedido(pedido: Pedido) {

    this.listAll();

    this.modalService.dismissAll();

  }

  deletar(id: number) {
    this.pedidoService.delete(id).subscribe({
      next: retorno => {
        this.listAll();
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }
}
