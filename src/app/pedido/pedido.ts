import { Status } from "../enums/status";
import { Funcionario } from "../funcionario/funcionario";
import { Pizza } from "../pizza/pizza";
import { Produtos } from "../produtos/produto";
import { Usuario } from "../usuario/usuario";

export class Pedido{
    id!: number;
    entrega?: boolean;
    status?: Status;
    pizza: Pizza [] = [];
    produtos: Produtos [] = [];
    pedidopreco!: number;
    pagamentoCartao?: boolean;
    pagamentoDinheiro?: boolean;
    funcionario!: Funcionario;
    observacao?: string;
    usuario?: Usuario;
    delivery?: boolean;
    dataPedido?: Date;
}