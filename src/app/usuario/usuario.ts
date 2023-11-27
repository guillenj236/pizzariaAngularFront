import { Endereco } from "../endereco/endereco";

export class Usuario{
    id!: number;
    nomeUsuarioO!: string;
    telefone!: string;
    enderecos?: Endereco[] = [];
}