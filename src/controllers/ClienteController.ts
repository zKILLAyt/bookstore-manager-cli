import { ClienteService } from "../services/ClienteService";

export class ClienteController {
  private readonly clienteService: ClienteService;

  constructor(clienteService: ClienteService) {
    this.clienteService = clienteService;
  }

  async criar(nome: string): Promise<void> {
    try {
      const cliente = await this.clienteService.criar(nome);

      console.log(`Cliente cadastrado com sucesso. ID: ${cliente.id}`);
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async listar(): Promise<void> {
    try {
      const clientes = await this.clienteService.listar();

      if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado.");
        return;
      }

      clientes.forEach((cliente) => {
        console.log(`${cliente.id} - ${cliente.nome}`);
      });
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async buscarPorId(id: number): Promise<void> {
    try {
      const cliente = await this.clienteService.buscarPorId(id);

      console.log(`${cliente.id} - ${cliente.nome}`);
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async atualizar(id: number, nome: string): Promise<void> {
    try {
      const cliente = await this.clienteService.atualizar(id, nome);

      console.log(`Cliente atualizado com sucesso: ${cliente.nome}`);
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async remover(id: number): Promise<void> {
    try {
      await this.clienteService.remover(id);

      console.log("Cliente removido com sucesso.");
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
