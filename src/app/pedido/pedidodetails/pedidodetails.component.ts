import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Pedido } from '../pedido';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from 'src/app/service/pedido.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { FuncionarioService } from 'src/app/service/funcionario.service';
import { Usuario } from 'src/app/usuario/usuario';
import { Funcionario } from 'src/app/funcionario/funcionario';
import { SaboresService } from 'src/app/service/sabores.service';
import { Sabores } from 'src/app/sabores/sabores';
import { Pizza } from 'src/app/pizza/pizza';
import { Produtos } from 'src/app/produtos/produto';

@Component({
  selector: 'app-pedidodetails',
  templateUrl: './pedidodetails.component.html',
  styleUrls: ['./pedidodetails.component.scss']
})
export class PedidodetailsComponent {
  @Input() pedido: Pedido = new Pedido();
  @Output() retorno = new EventEmitter<Pedido>();

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  pedidoService = inject(PedidoService);
  usuarioService = inject(UsuarioService);
  funcionarioService = inject(FuncionarioService);
  saboresService = inject(SaboresService);

  listaDeUsuarios: Usuario[] = [];
  listaDeFuncionarios: Funcionario[] = [];

  sabores: Sabores[] = [];
  listaDePizzas: Pizza = new Pizza();

  constructor(){
  }

  salvar(){
    const usuarioSelecionado = this.listaDeUsuarios.find(usuario => usuario.id === this.pedido.usuario.id);

    if(usuarioSelecionado){
      this.pedido.usuario = usuarioSelecionado;
    }
    this.pedidoService.save(this.pedido).subscribe({
      next: pedido =>{
        this.retorno.emit(pedido);
        alert('PEDIDO FEITO!!')
      },
      error: erro => {
        alert('ERRO, VEJA O CONSOLE');
        console.error(erro);
      }
    });
  }

  ngOnInit(){
    this.usuarioService.listAll().subscribe((usuarios: Usuario[]) =>{
      this.listaDeUsuarios = usuarios;
    });
    
    this.funcionarioService.listAll().subscribe((funcionarios: Funcionario[]) => {
      this.listaDeFuncionarios = funcionarios;
    });

    this.saboresService.listAll().subscribe((sabores: Sabores[]) => {
      this.sabores = sabores;
    });
  }

  excluir(produto: Produtos, indice: number){
    this.pedido.produtos.splice(indice, 1);
  }
  excluirPizza(pizza: Pizza, indice: number){
    this.pedido.pizzas.splice(indice, 1);
  }

  retornoProdutoList(produto: Produtos){
    
    if(this.pedido.produtos == null)
    this.pedido.produtos = [];

    this.pedido.produtos.push(produto);
    this.modalRef.dismiss();
  }

  retornoPizzaList(pizza: Pizza){
    
    if(this.pedido.pizzas == null)
    this.pedido.pizzas = [];

    this.pedido.pizzas.push(pizza);
    this.modalRef.dismiss();
  }

  lancar(modal: any){
    this.modalRef = this.modalService.open(modal, {size: 'lg'});
  }

  lancarPizza(modal: any){
    this.modalRef = this.modalService.open(modal, {size: 'lg'});
  }

  definirPagamentoDinheiro(valor: boolean){
    this.pedido.pagamentoDinheiro = valor;
  }

}
