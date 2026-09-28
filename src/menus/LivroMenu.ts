import { createInterface } from "readline/promises";
import { LivroController } from "../controllers/LivroController";

export class LivroMenu {
  private readonly livroController: LivroController;

  constructor(livroController: LivroController) {
    this.livroController = livroController;
  }

  async iniciar(): Promise<void> {
    const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let executando = true;

    while (executando) {
      console.log("\n=== LIVROS ===");
      console.log("1. Cadastrar livro");
      console.log("2. Listar livros");
      console.log("3. Consultar livro");
      console.log("4. Atualizar livro");
      console.log("5. Remover livro");
      console.log("0. Voltar");

      const opcao = await readline.question("Escolha uma opção: ");

      switch (opcao) {
        case "1": {
          const titulo = await readline.question("Título do livro: ");
          const autorId = Number(await readline.question("ID do autor: "));
          const quantidade = Number(await readline.question("Quantidade: "));

          await this.livroController.criar(titulo, autorId, quantidade);
          break;
        }

        case "2":
          await this.livroController.listar();
          break;

        case "3": {
          const id = Number(await readline.question("ID do livro: "));

          await this.livroController.buscarPorId(id);
          break;
        }

        case "4": {
          const id = Number(await readline.question("ID do livro: "));
          const titulo = await readline.question("Novo título: ");
          const autorId = Number(await readline.question("Novo ID do autor: "));
          const quantidade = Number(
            await readline.question("Nova quantidade: "),
          );

          await this.livroController.atualizar(id, titulo, autorId, quantidade);
          break;
        }

        case "5": {
          const id = Number(await readline.question("ID do livro: "));

          await this.livroController.remover(id);
          break;
        }

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
