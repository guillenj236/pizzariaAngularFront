import { Status } from "../enums/status";
import { Funcionario } from "../funcionario/funcionario";
import { Pizza } from "../pizza/pizza";
import { Produtos } from "../produtos/produto";
import { Usuario } from "../usuario/usuario";

export class Pedido{
    id!: number;
    entrega?: boolean;
    status?: Status;
    pizzas: Pizza[] = [];
    produtos: Produtos [] = [];
    pedidopreco!: number;
    pagamentoCartao?: boolean;
    pagamentoDinheiro?: boolean;
    funcionario: Funcionario = new Funcionario;
    observacao?: string;
    usuario: Usuario = new Usuario;
    delivery?: boolean;
    dataPedido?: Date;
}