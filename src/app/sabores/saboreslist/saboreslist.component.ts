import { Component, inject } from '@angular/core';
import { Sabores } from '../sabores';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SaboresService } from 'src/app/service/sabores.service';

@Component({
  selector: 'app-saboreslist',
  templateUrl: './saboreslist.component.html',
  styleUrls: ['./saboreslist.component.scss']
})
export class SaboreslistComponent {
    lista: Sabores[] = [];

    saborSelecionadoParaEdicao: Sabores = new Sabores();
    indiceSelecionadoParaEdicao!: number;

    modalService = inject(NgbModal);
    saboresService = inject(SaboresService);

    constructor(){
      this.listAll();
    }

    listAll(){
      this.saboresService.listAll().subscribe({
        next: lista => {
          this.lista = lista;
        },
        error: erro => {
          alert('ERRO!! Observe no console!!');
          console.error(erro);
        }
      });
    }

    adicionar(modal: any) {
      this.saborSelecionadoParaEdicao = new Sabores();
      this.modalService.open(modal, {size: 'lg'});
    }

    editar(modal: any, sabores: Sabores, indice: number) {
      this.saborSelecionadoParaEdicao = Object.assign({}, sabores);
      this.indiceSelecionadoParaEdicao = indice;

      this.modalService.open(modal, {size: 'lg'});
    }

    addOuEitarSabores(sabores: Sabores){
        this.listAll();
        this.modalService.dismissAll();
    }
    
    excluir(id: number){
      this.saboresService.delete(id).subscribe({
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
