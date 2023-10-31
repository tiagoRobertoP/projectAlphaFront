import { Pessoa } from "../pessoa/pessoa.model";

export class Projeto {
  id: number;
  nome: string;
  descricao: string;
  status: string;
  risco: string;
  orcamento: number;
  dataInicio: Date;
  dataFim: Date;
  dataPrevisaofim: Date;
  gerente: Pessoa;

  nomeGerente: string;
  gerentes: Array<Pessoa>;
}
