export interface EmprestimoProps {
  id?: number;
  livroId: number;
  clienteId: number;
  dataEmprestimo: Date;
  dataDevolucao?: Date;
}

export class Emprestimo {
  public id?: number;
  public livroId: number;
  public clienteId: number;
  public dataEmprestimo: Date;
  public dataDevolucao?: Date;

  constructor({
    id,
    livroId,
    clienteId,
    dataEmprestimo,
    dataDevolucao,
  }: EmprestimoProps) {
    this.id = id;
    this.livroId = livroId;
    this.clienteId = clienteId;
    this.dataEmprestimo = dataEmprestimo;
    this.dataDevolucao = dataDevolucao;
  }
}
