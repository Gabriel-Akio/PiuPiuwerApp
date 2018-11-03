import { Usuario } from "./usuario";

export interface Piu {
    id: number;
    favoritado: boolean;
    conteudo: string;
    data: string;
    usuario: Usuario;
}