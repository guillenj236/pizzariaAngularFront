import { Endereco } from "../endereco/endereco";

export class Usuario{
    id!: number;
    nomeUsuario!: string;
    telefone!: string;
    enderecos?: Endereco[] = [];
}