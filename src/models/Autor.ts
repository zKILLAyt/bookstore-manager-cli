export interface AutorProps {
  id?: number;
  nome: string;
}

export class Autor {
  public id?: number;
  public nome: string;

  constructor({ id, nome }: AutorProps) {
    this.id = id;
    this.nome = nome;
  }
}
