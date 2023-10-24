import { EstoqueProd } from "../estoqueProd/estoqueProd";

export class Produtos{
    id!: number;
    quantidadeprod!: number;
    totalprod!: number;

    estoqueProds?: EstoqueProd [] = [];
}