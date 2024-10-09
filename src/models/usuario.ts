import Quadra from "./quadra";


export default interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  quadra?: Quadra | null;
}