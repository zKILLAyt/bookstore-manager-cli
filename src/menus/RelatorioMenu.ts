import { createInterface } from "readline/promises";
import { RelatorioController } from "../controllers/RelatorioController";

export class RelatorioMenu {
  private readonly relatorioController: RelatorioController;

  constructor(relatorioController: RelatorioController) {
    this.relatorioController = relatorioController;
  }

  async iniciar(): Promise<void> {
    const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let executando = true;

    while (executando) {
      console.log("\n=== RELATÓRIOS ===");
      console.log("1. Livros disponíveis");
      console.log("2. Livros emprestados");
      console.log("3. Livros por autor");
      console.log("4. Quantidade de empréstimos por livro");
      console.log("5. Clientes com empréstimos ativos");
      console.log("0. Voltar");

      const opcao = await readline.question("Escolha uma opção: ");

      switch (opcao) {
        case "1":
          await this.relatorioController.listarLivrosDisponiveis();
          break;

        case "2":
          await this.relatorioController.listarLivrosEmprestados();
          break;

        case "3":
          await this.relatorioController.listarLivrosPorAutor();
          break;

        case "4":
          await this.relatorioController.listarQuantidadeEmprestimosPorLivro();
          break;

        case "5":
          await this.relatorioController.listarClientesComEmprestimosAtivos();
          break;

        case "0":
          executando = false;
          break;

        default:
          console.log("Opção inválida.");
      }
    }

    readline.close();
  }
}
