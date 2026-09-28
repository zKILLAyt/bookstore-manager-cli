import { Autor } from "../models/Autor";
import { AutorRepository } from "../repositories/AutorRepository";

export class AutorService {
  private readonly autorRepository: AutorRepository;

  constructor(autorRepository: AutorRepository) {
    this.autorRepository = autorRepository;
  }

  async criar(nome: string): Promise<Autor> {
    if (!nome.trim()) {
      throw new Error("O nome do autor é obrigatório.");
    }

    const autor = new Autor({
      nome: nome.trim(),
    });

    return this.autorRepository.criar(autor);
  }

  async listar(): Promise<Autor[]> {
    return this.autorRepository.listar();
  }

  async buscarPorId(id: number): Promise<Autor> {
    const autor = await this.autorRepository.buscarPorId(id);

    if (!autor) {
      throw new Error("Autor não encontrado.");
    }

    return autor;
  }

  async atualizar(id: number, nome: string): Promise<Autor> {
    if (!nome.trim()) {
      throw new Error("O nome do autor é obrigatório.");
    }

    await this.buscarPorId(id);

    const autor = new Autor({
      id,
      nome: nome.trim(),
    });

    const autorAtualizado = await this.autorRepository.atualizar(autor);

    if (!autorAtualizado) {
      throw new Error("Não foi possível atualizar o autor.");
    }

    return autorAtualizado;
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);

    const removido = await this.autorRepository.remover(id);

    if (!removido) {
      throw new Error("Não foi possível remover o autor.");
    }
  }
}
