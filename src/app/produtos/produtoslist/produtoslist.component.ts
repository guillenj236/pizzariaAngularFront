import { Component, inject } from '@angular/core';
import { Produtos } from '../produto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutosService } from 'src/app/service/produtos.service';

@Component({
  selector: 'app-produtoslist',
  templateUrl: './produtoslist.component.html',
  styleUrls: ['./produtoslist.component.scss']
})
export class ProdutoslistComponent {
  lista: Produtos[] = [];

  produtoSelecionadoParaEdicao: Produtos = new Produtos();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  produtosService = inject(ProdutosService);

  constructor(){
    this.listAll();
  }

  listAll(){
    this.produtosService.listAll().subscribe({
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
    this.produtoSelecionadoParaEdicao = new Produtos();
    this.modalService.open(modal, {size: 'lg'});
  }

  editar(modal: any, produtos: Produtos, indice: number){
    this.produtoSelecionadoParaEdicao = Object.assign({}, produtos);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, {size: 'lg'});
  }

  addOuEditaProdutos(produtos: Produtos){
    this.listAll();
    this.modalService.dismissAll();
  }

  excluir(id: number){
    this.produtosService.delete(id).subscribe({
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

