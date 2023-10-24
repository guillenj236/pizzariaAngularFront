import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Produtos } from '../produto';
import { ProdutosService } from 'src/app/service/produtos.service';

@Component({
  selector: 'app-produtosdetails',
  templateUrl: './produtosdetails.component.html',
  styleUrls: ['./produtosdetails.component.scss']
})
export class ProdutosdetailsComponent {

  @Input() produtos: Produtos = new Produtos();
  @Output() retorno = new EventEmitter<Produtos>();

  produtosService = inject(ProdutosService);

  constructor(){}

  salvar(){

    if(this.produtos.id > 0){
      this.produtosService.update(this.produtos).subscribe({
        next: produtos => {
          this.retorno.emit(this.produtos);
        },
        error: erro => {
          alert('Error!! verificar no console!!');
          console.error(erro);
        }
      });
    } else{
      this.produtosService.save(this.produtos).subscribe({
        next: produtos => {
          this.retorno.emit(this.produtos);
        },
        error: erro => {
          alert('Erro!! verificar no console!!');
          console.error(erro);
        }
      });
    }
  }

  deletar(){
    this.produtosService.delete(this.produtos.id).subscribe({
      next: produtos => {
        this.retorno.emit(produtos);
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }
}
