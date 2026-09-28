export interface ClienteProps {
  id?: number;
  nome: string;
}

export class Cliente {
  public id?: number;
  public nome: string;

  constructor({ id, nome }: ClienteProps) {
    this.id = id;
    this.nome = nome;
  }
}
