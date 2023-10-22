import { Usuario } from "src/app/usuario/usuario";

export class Login{
    id!: number;
    nomeLogin!: string;
    senhaLogin!: string;
    usuario?: Usuario;
}