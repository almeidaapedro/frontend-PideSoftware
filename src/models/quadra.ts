import Usuario from "./usuario";

export default interface Quadra{
    nome: string;
    descricao: string;
    latitude: number;
    longitude: number;
    ocupada: boolean;
    usuario: Usuario | null;
}