import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Produtos } from '../produto';
import { ProdutosService } from 'src/app/service/produtos.service';
import { EstoqueProds } from 'src/app/estoqueProd/estoqueProds';
import { EstoqueProdService } from 'src/app/service/estoque-prod.service';

@Component({
  selector: 'app-produtosdetails',
  templateUrl: './produtosdetails.component.html',
  styleUrls: ['./produtosdetails.component.scss']
})
export class ProdutosdetailsComponent {

  @Input() produtos: Produtos = new Produtos();
  @Output() retorno = new EventEmitter<Produtos>();

  produtosService = inject(ProdutosService);
  estoqueProdService = inject(EstoqueProdService);
  
  estoqueProdLista: EstoqueProds[] = [];

  constructor(){
  
  }

  salvar(){
    console.log('Dados a serem enviados para o servidor:', {
      estoqueProds: JSON.stringify(this.produtos.estoqueProds),
      quantidadeprod: this.produtos.quantidadeprod
    });

    const estoquePRodSelecionado = this.estoqueProdLista.find(estoqueProd => estoqueProd.id === this.produtos.estoqueProds.id);

    if(estoquePRodSelecionado){
      this.produtos.estoqueProds = estoquePRodSelecionado;
    }

    if(this.produtos.id > 0){
      this.produtosService.update(this.produtos).subscribe({
        next: produtos => {
          this.retorno.emit(this.produtos);
          alert('Produto Editado!!');
        },
        error: erro => {
          alert('Error!! verificar no console!!');
          console.error(erro);
        }
      });
    } else{
      this.produtosService.save(this.produtos).subscribe({
        next: produtos => {
          this.retorno.emit(produtos);
          alert('Produto Selecionado no Pedido!!');
        },
        error: erro => {
          alert('Erro!! verificar no console!!');
          console.error(erro);
        }
      });
    }
  }

  ngOnInit() {
    this.estoqueProdService.listAll().subscribe((estoqueProd: EstoqueProds[]) => {
      this.estoqueProdLista = estoqueProd;
    })
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
