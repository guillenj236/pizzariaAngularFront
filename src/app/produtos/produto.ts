import { EstoqueProds } from "../estoqueProd/estoqueProds";

export class Produtos{
    id!: number;
    quantidadeprod!: number;
    totalprod!: number;
    estoqueProds: EstoqueProds = new EstoqueProds;
}