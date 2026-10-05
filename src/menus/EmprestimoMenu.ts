import { createInterface } from "readline/promises";
import { EmprestimoController } from "../controllers/EmprestimoController";

export class EmprestimoMenu {
  private readonly emprestimoController: EmprestimoController;

  constructor(emprestimoController: EmprestimoController) {
    this.emprestimoController = emprestimoController;
  }

  async iniciar(): Promise<void> {
    const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let executando = true;

    while (executando) {
      console.log("\n=== EMPRÉSTIMOS ===");
      console.log("1. Realizar empréstimo");
      console.log("2. Listar empréstimos");
      console.log("3. Consultar empréstimo");
      console.log("4. Registrar devolução");
      console.log("0. Voltar");

      const opcao = await readline.question("Escolha uma opção: ");

      switch (opcao) {
        case "1": {
          const livroId = Number(await readline.question("ID do livro: "));

          const clienteId = Number(await readline.question("ID do cliente: "));

          await this.emprestimoController.criar(livroId, clienteId);

          break;
        }

        case "2":
          await this.emprestimoController.listar();
          break;

        case "3": {
          const id = Number(await readline.question("ID do empréstimo: "));

          await this.emprestimoController.buscarPorId(id);
          break;
        }

        case "4": {
          const id = Number(await readline.question("ID do empréstimo: "));

          await this.emprestimoController.devolver(id);
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
