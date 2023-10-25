import { Component, inject } from '@angular/core';
import { EstoqueProds } from '../estoqueProds';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstoqueProdService } from 'src/app/service/estoque-prod.service';

@Component({
  selector: 'app-estoqu-prodlist',
  templateUrl: './estoqu-prodlist.component.html',
  styleUrls: ['./estoqu-prodlist.component.scss']
})
export class EstoquProdlistComponent {
    lista: EstoqueProds[]= [];

    estoqueProdSelecionadoParaEdicao: EstoqueProds = new EstoqueProds();
    indiceSelecionadoParaEdicao!: number;
    
    modalService = inject(NgbModal);
    estoqueProdService = inject(EstoqueProdService);

    constructor(){
      this.listAll();
    }

    listAll(){
      this.estoqueProdService.listAll().subscribe({
        next: lista => {
          this.lista = lista;
        },
        error: erro => { // QUANDO DÁ ERRO
          alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
          console.error(erro);
        }
      });
    }
    adicionar(modal: any) {
      this.estoqueProdSelecionadoParaEdicao = new EstoqueProds();
      this.modalService.open(modal, {size: 'lg'});
    }
    editar(modal: any, estoqueProd: EstoqueProds, indice: number){
        this.estoqueProdSelecionadoParaEdicao = Object.assign({}, estoqueProd);//clonando o objeto se for edição...
        this.indiceSelecionadoParaEdicao = indice;

        this.modalService.open(modal, { size: 'lg' });
    }
    addOuEditaEstoqueProd(estoqueProd: EstoqueProds){
        this.listAll();
        this.modalService.dismissAll();
    }
    excluir(id: number){
      this.estoqueProdService.delete(id).subscribe({
        next: retorno =>{
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
