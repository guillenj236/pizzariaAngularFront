import { Component, inject } from '@angular/core';
import { Funcionario } from '../funcionario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FuncionarioService } from 'src/app/service/funcionario.service';

@Component({
  selector: 'app-funcionariolist',
  templateUrl: './funcionariolist.component.html',
  styleUrls: ['./funcionariolist.component.scss']
})
export class FuncionariolistComponent {
  lista: Funcionario[] = [];

  funcionarioSelecionadoParaEdicao: Funcionario = new Funcionario();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  funcionarioService = inject(FuncionarioService);

  constructor(){
    this.listAll();
  }

  listAll(){
    this.funcionarioService.listAll().subscribe({
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
    this.funcionarioSelecionadoParaEdicao = new Funcionario();
    this.modalService.open(modal, {size: 'lg'});
  }

  editar(modal: any, funcionario: Funcionario, indice: number){
    this.funcionarioSelecionadoParaEdicao = Object.assign({}, funcionario);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, {size: 'lg'});
  }

  addOuEditaFuncionario(funcionario: Funcionario){
    this.listAll();
    this.modalService.dismissAll();
  }

  excluir(id:number){
    this.funcionarioService.delete(id).subscribe({
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
