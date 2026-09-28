import { AutorService } from "../services/AutorService";

export class AutorController {
  private readonly autorService: AutorService;

  constructor(autorService: AutorService) {
    this.autorService = autorService;
  }

  async criar(nome: string): Promise<void> {
    try {
      const autor = await this.autorService.criar(nome);

      console.log(`Autor cadastrado com sucesso. ID: ${autor.id}`);
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async listar(): Promise<void> {
    try {
      const autores = await this.autorService.listar();

      if (autores.length === 0) {
        console.log("Nenhum autor cadastrado.");
        return;
      }

      autores.forEach((autor) => {
        console.log(`${autor.id} - ${autor.nome}`);
      });
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async buscarPorId(id: number): Promise<void> {
    try {
      const autor = await this.autorService.buscarPorId(id);

      console.log(`${autor.id} - ${autor.nome}`);
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async atualizar(id: number, nome: string): Promise<void> {
    try {
      const autor = await this.autorService.atualizar(id, nome);

      console.log(`Autor atualizado com sucesso: ${autor.nome}`);
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async remover(id: number): Promise<void> {
    try {
      await this.autorService.remover(id);

      console.log("Autor removido com sucesso.");
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
