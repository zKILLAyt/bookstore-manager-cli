import { Livro } from "../models/Livro";
import { LivroRepository } from "../repositories/LivroRepository";
import { AutorRepository } from "../repositories/AutorRepository";

export class LivroService {
  private readonly livroRepository: LivroRepository;
  private readonly autorRepository: AutorRepository;

  constructor(
    livroRepository: LivroRepository,
    autorRepository: AutorRepository,
  ) {
    this.livroRepository = livroRepository;
    this.autorRepository = autorRepository;
  }

  async criar(
    titulo: string,
    autorId: number,
    quantidade: number,
  ): Promise<Livro> {
    if (!titulo.trim()) {
      throw new Error("O título do livro é obrigatório.");
    }

    if (!Number.isInteger(autorId) || autorId <= 0) {
      throw new Error("O ID do autor é inválido.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 0) {
      throw new Error(
        "A quantidade deve ser um número inteiro maior ou igual a zero.",
      );
    }

    const autor = await this.autorRepository.buscarPorId(autorId);

    if (!autor) {
      throw new Error("Autor não encontrado.");
    }

    const livro = new Livro({
      titulo: titulo.trim(),
      autorId,
      quantidade,
    });

    return this.livroRepository.criar(livro);
  }

  async listar(): Promise<Livro[]> {
    return this.livroRepository.listar();
  }

  async buscarPorId(id: number): Promise<Livro> {
    const livro = await this.livroRepository.buscarPorId(id);

    if (!livro) {
      throw new Error("Livro não encontrado.");
    }

    return livro;
  }

  async atualizar(
    id: number,
    titulo: string,
    autorId: number,
    quantidade: number,
  ): Promise<Livro> {
    if (!titulo.trim()) {
      throw new Error("O título do livro é obrigatório.");
    }

    if (!Number.isInteger(autorId) || autorId <= 0) {
      throw new Error("O ID do autor é inválido.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 0) {
      throw new Error(
        "A quantidade deve ser um número inteiro maior ou igual a zero.",
      );
    }

    await this.buscarPorId(id);

    const autor = await this.autorRepository.buscarPorId(autorId);

    if (!autor) {
      throw new Error("Autor não encontrado.");
    }

    const livro = new Livro({
      id,
      titulo: titulo.trim(),
      autorId,
      quantidade,
    });

    const livroAtualizado = await this.livroRepository.atualizar(livro);

    if (!livroAtualizado) {
      throw new Error("Não foi possível atualizar o livro.");
    }

    return livroAtualizado;
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);

    const removido = await this.livroRepository.remover(id);

    if (!removido) {
      throw new Error("Não foi possível remover o livro.");
    }
  }
}
