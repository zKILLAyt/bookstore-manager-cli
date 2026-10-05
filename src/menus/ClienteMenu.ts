import { createInterface } from "readline/promises";
import { ClienteController } from "../controllers/ClienteController";

export class ClienteMenu {
  private readonly clienteController: ClienteController;

  constructor(clienteController: ClienteController) {
    this.clienteController = clienteController;
  }

  async iniciar(): Promise<void> {
    const readline = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let executando = true;

    while (executando) {
      console.log("\n=== CLIENTES ===");
      console.log("1. Cadastrar cliente");
      console.log("2. Listar clientes");
      console.log("3. Consultar cliente");
      console.log("4. Atualizar cliente");
      console.log("5. Remover cliente");
      console.log("0. Voltar");

      const opcao = await readline.question("Escolha uma opção: ");

      switch (opcao) {
        case "1": {
          const nome = await readline.question("Nome do cliente: ");
          await this.clienteController.criar(nome);
          break;
        }

        case "2":
          await this.clienteController.listar();
          break;

        case "3": {
          const id = Number(await readline.question("ID do cliente: "));

          await this.clienteController.buscarPorId(id);
          break;
        }

        case "4": {
          const id = Number(await readline.question("ID do cliente: "));
          const nome = await readline.question("Novo nome: ");

          await this.clienteController.atualizar(id, nome);
          break;
        }

        case "5": {
          const id = Number(await readline.question("ID do cliente: "));

          await this.clienteController.remover(id);
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
