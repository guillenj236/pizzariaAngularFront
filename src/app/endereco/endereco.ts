import { Usuario } from "../usuario/usuario";

export class Endereco{
    id!: number;
    rua!: string;
    bairro!: string;
    numeroEnd!: number;
    usuario!: Usuario;
}