import { LivroService } from "../services/LivroService";

export class LivroController {
  private readonly livroService: LivroService;

  constructor(livroService: LivroService) {
    this.livroService = livroService;
  }

  async criar(
    titulo: string,
    autorId: number,
    quantidade: number,
  ): Promise<void> {
    try {
      const livro = await this.livroService.criar(titulo, autorId, quantidade);

      console.log(`Livro cadastrado com sucesso. ID: ${livro.id}`);
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async listar(): Promise<void> {
    try {
      const livros = await this.livroService.listar();

      if (livros.length === 0) {
        console.log("Nenhum livro cadastrado.");
        return;
      }

      livros.forEach((livro) => {
        console.log(
          `${livro.id} - ${livro.titulo} | Autor ID: ${livro.autorId} | Quantidade: ${livro.quantidade}`,
        );
      });
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async buscarPorId(id: number): Promise<void> {
    try {
      const livro = await this.livroService.buscarPorId(id);

      console.log(
        `${livro.id} - ${livro.titulo} | Autor ID: ${livro.autorId} | Quantidade: ${livro.quantidade}`,
      );
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async atualizar(
    id: number,
    titulo: string,
    autorId: number,
    quantidade: number,
  ): Promise<void> {
    try {
      const livro = await this.livroService.atualizar(
        id,
        titulo,
        autorId,
        quantidade,
      );

      console.log(`Livro atualizado com sucesso: ${livro.titulo}`);
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async remover(id: number): Promise<void> {
    try {
      await this.livroService.remover(id);

      console.log("Livro removido com sucesso.");
    } catch (error) {
      this.exibirErro(error);
    }
  }

  private exibirErro(error: unknown): void {
    if (error instanceof Error) {
      console.log(`Erro: ${error.message}`);
      return;
    }

    console.log("Ocorreu um erro inesperado.");
  }
}
