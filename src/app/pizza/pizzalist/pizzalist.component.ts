import { Component, inject } from '@angular/core';
import { Pizza } from '../pizza';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PizzaService } from 'src/app/service/pizza.service';

@Component({
  selector: 'app-pizzalist',
  templateUrl: './pizzalist.component.html',
  styleUrls: ['./pizzalist.component.scss']
})
export class PizzalistComponent {
  lista: Pizza[] =[];

  pizzaSelecionadaParaEdicao: Pizza = new Pizza();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  pizzaService = inject(PizzaService);
  modalRef!: NgbModalRef;

  constructor(){
    this.listAll();
  }

  listAll(){
    this.pizzaService.listAll().subscribe({
      next: lista =>{
        this.lista = lista;
      },
      error: erro => {
        alert('ERRO!! Observe no console!!');
        console.error(erro);
      }
    });
  }
  
  adicionar(modal: any){
    this.pizzaSelecionadaParaEdicao = new Pizza();
    this.modalService.open(modal, {size: 'lg'});
  }

  editar(modal: any, pizza: Pizza, indice: number){
    this.pizzaSelecionadaParaEdicao = Object.assign({}, pizza);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, {size: 'lg'});
  }

  addOuEditaPizza(pizza: Pizza){
    this.listAll();
    this.modalService.dismissAll();
  }

  excluir(id: number){
    this.pizzaService.delete(id).subscribe({
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
