import { createInterface } from "readline/promises";
import { AutorMenu } from "./AutorMenu";
import { LivroMenu } from "./LivroMenu";
import { ClienteMenu } from "./ClienteMenu";
import { EmprestimoMenu } from "./EmprestimoMenu";
import { RelatorioMenu } from "./RelatorioMenu";

export class MainMenu {
  private readonly autorMenu: AutorMenu;
  private readonly livroMenu: LivroMenu;
  private readonly clienteMenu: ClienteMenu;
  private readonly emprestimoMenu: EmprestimoMenu;
  private readonly relatorioMenu: RelatorioMenu;

  constructor(
    autorMenu: AutorMenu,
    livroMenu: LivroMenu,
    clienteMenu: ClienteMenu,
    emprestimoMenu: EmprestimoMenu,
    relatorioMenu: RelatorioMenu,
  ) {
    this.autorMenu = autorMenu;
    this.livroMenu = livroMenu;
    this.clienteMenu = clienteMenu;
    this.emprestimoMenu = emprestimoMenu;
    this.relatorioMenu = relatorioMenu;
  }

  async iniciar(): Promise<void> {
    let executando = true;

    while (executando) {
      console.log("\n=== BOOKSTORE MANAGER CLI ===");
      console.log("1. Autores");
      console.log("2. Livros");
      console.log("3. Clientes");
      console.log("4. Empréstimos");
      console.log("5. Relatórios");
      console.log("0. Sair");

      const readline = createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const opcao = await readline.question("Escolha uma opção: ");

      readline.close();

      switch (opcao) {
        case "1":
          await this.autorMenu.iniciar();
          break;

        case "2":
          await this.livroMenu.iniciar();
          break;

        case "3":
          await this.clienteMenu.iniciar();
          break;

        case "4":
          await this.emprestimoMenu.iniciar();
          break;

        case "5":
          await this.relatorioMenu.iniciar();
          break;

        case "0":
          executando = false;
          console.log("Encerrando o sistema...");
          break;

        default:
          console.log("Opção inválida.");
      }
    }
  }
}
