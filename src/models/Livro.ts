export interface LivroProps {
  id?: number;
  titulo: string;
  autorId: number;
  quantidade: number;
}

export class Livro {
  public id?: number;
  public titulo: string;
  public autorId: number;
  public quantidade: number;

  constructor({ id, titulo, autorId, quantidade }: LivroProps) {
    this.id = id;
    this.titulo = titulo;
    this.autorId = autorId;
    this.quantidade = quantidade;
  }
}
