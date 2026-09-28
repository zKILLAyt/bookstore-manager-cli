import { createInterface } from "readline/promises";
import { AutorController } from "../controllers/AutorController";

export class AutorMenu {
  private readonly autorController: AutorController;

  constructor(autorController: AutorController) {
    this.autorController = autorController;
  }

  async iniciar(): Promise<void> {
    const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let executando = true;

    while (executando) {
      console.log("\n=== AUTORES ===");
      console.log("1. Cadastrar autor");
      console.log("2. Listar autores");
      console.log("3. Consultar autor");
      console.log("4. Atualizar autor");
      console.log("5. Remover autor");
      console.log("0. Voltar");

      const opcao = await readline.question("Escolha uma opção: ");

      switch (opcao) {
        case "1": {
          const nome = await readline.question("Nome do autor: ");
          await this.autorController.criar(nome);
          break;
        }

        case "2":
          await this.autorController.listar();
          break;

        case "3": {
          const id = Number(await readline.question("ID do autor: "));
          await this.autorController.buscarPorId(id);
          break;
        }

        case "4": {
          const id = Number(await readline.question("ID do autor: "));
          const nome = await readline.question("Novo nome: ");
          await this.autorController.atualizar(id, nome);
          break;
        }

        case "5": {
          const id = Number(await readline.question("ID do autor: "));
          await this.autorController.remover(id);
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
