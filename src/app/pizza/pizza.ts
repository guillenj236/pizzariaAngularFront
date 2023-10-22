import { Tamanho } from "../enums/tamanho";
import { Sabores } from "../sabores/sabores"

export class Pizza{
    id!: number;
    sabores?: Sabores[] = [];
    precoPizza!: number;
    qantidadePizza?: number;
    tamanho!: Tamanho;
}