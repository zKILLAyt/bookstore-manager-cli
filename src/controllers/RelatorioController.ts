import {
  ClienteComEmprestimosAtivos,
  LivroDisponivel,
  LivroEmprestado,
  LivroPorAutor,
  QuantidadeEmprestimosPorLivro,
} from "../repositories/RelatorioRepository";
import { RelatorioService } from "../services/RelatorioService";

export class RelatorioController {
  private readonly relatorioService: RelatorioService;

  constructor(relatorioService: RelatorioService) {
    this.relatorioService = relatorioService;
  }

  async listarLivrosDisponiveis(): Promise<void> {
    try {
      const livros = await this.relatorioService.listarLivrosDisponiveis();

      if (livros.length === 0) {
        console.log("Nenhum livro disponível.");
        return;
      }

      console.log("\n=== LIVROS DISPONÍVEIS ===");

      livros.forEach((livro: LivroDisponivel) => {
        console.log(
          `${livro.id} - ${livro.titulo} | Autor: ${livro.autor} | Quantidade: ${livro.quantidade}`,
        );
      });
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async listarLivrosEmprestados(): Promise<void> {
    try {
      const livros = await this.relatorioService.listarLivrosEmprestados();

      if (livros.length === 0) {
        console.log("Nenhum livro emprestado.");
        return;
      }

      console.log("\n=== LIVROS EMPRESTADOS ===");

      livros.forEach((livro: LivroEmprestado) => {
        console.log(
          `${livro.id} - ${livro.titulo} | Autor: ${livro.autor} | Cliente: ${livro.cliente} | Empréstimo: ${new Date(
            livro.data_emprestimo,
          ).toLocaleDateString()}`,
        );
      });
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async listarLivrosPorAutor(): Promise<void> {
    try {
      const livros = await this.relatorioService.listarLivrosPorAutor();

      if (livros.length === 0) {
        console.log("Nenhum autor ou livro cadastrado.");
        return;
      }

      console.log("\n=== LIVROS POR AUTOR ===");

      livros.forEach((livro: LivroPorAutor) => {
        if (livro.livro_id !== null) {
          console.log(`${livro.autor} - ${livro.titulo}`);
        } else {
          console.log(`${livro.autor} - Nenhum livro cadastrado`);
        }
      });
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async listarQuantidadeEmprestimosPorLivro(): Promise<void> {
    try {
      const livros =
        await this.relatorioService.listarQuantidadeEmprestimosPorLivro();

      if (livros.length === 0) {
        console.log("Nenhum livro cadastrado.");
        return;
      }

      console.log("\n=== QUANTIDADE DE EMPRÉSTIMOS POR LIVRO ===");

      livros.forEach((livro: QuantidadeEmprestimosPorLivro) => {
        console.log(
          `${livro.id} - ${livro.titulo} | Empréstimos: ${livro.quantidade_emprestimos}`,
        );
      });
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async listarClientesComEmprestimosAtivos(): Promise<void> {
    try {
      const clientes =
        await this.relatorioService.listarClientesComEmprestimosAtivos();

      if (clientes.length === 0) {
        console.log("Nenhum cliente com empréstimo ativo.");
        return;
      }

      console.log("\n=== CLIENTES COM EMPRÉSTIMOS ATIVOS ===");

      clientes.forEach((cliente: ClienteComEmprestimosAtivos) => {
        console.log(
          `${cliente.id} - ${cliente.cliente} | Empréstimos ativos: ${cliente.quantidade_emprestimos}`,
        );
      });
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
