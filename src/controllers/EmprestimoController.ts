import { EmprestimoService } from "../services/EmprestimoService";

export class EmprestimoController {
  private readonly emprestimoService: EmprestimoService;

  constructor(emprestimoService: EmprestimoService) {
    this.emprestimoService = emprestimoService;
  }

  async criar(livroId: number, clienteId: number): Promise<void> {
    try {
      const emprestimo = await this.emprestimoService.criar(livroId, clienteId);

      console.log(`Empréstimo realizado com sucesso. ID: ${emprestimo.id}`);
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async listar(): Promise<void> {
    try {
      const emprestimos = await this.emprestimoService.listar();

      if (emprestimos.length === 0) {
        console.log("Nenhum empréstimo cadastrado.");
        return;
      }

      emprestimos.forEach((emprestimo) => {
        console.log(
          `${emprestimo.id} - Livro ID: ${emprestimo.livroId} | Cliente ID: ${emprestimo.clienteId} | Empréstimo: ${emprestimo.dataEmprestimo.toLocaleDateString()} | Devolução: ${
            emprestimo.dataDevolucao
              ? emprestimo.dataDevolucao.toLocaleDateString()
              : "Em aberto"
          }`,
        );
      });
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async buscarPorId(id: number): Promise<void> {
    try {
      const emprestimo = await this.emprestimoService.buscarPorId(id);

      console.log(
        `${emprestimo.id} - Livro ID: ${emprestimo.livroId} | Cliente ID: ${emprestimo.clienteId} | Empréstimo: ${emprestimo.dataEmprestimo.toLocaleDateString()} | Devolução: ${
          emprestimo.dataDevolucao
            ? emprestimo.dataDevolucao.toLocaleDateString()
            : "Em aberto"
        }`,
      );
    } catch (error) {
      this.exibirErro(error);
    }
  }

  async devolver(id: number): Promise<void> {
    try {
      await this.emprestimoService.devolver(id);

      console.log("Devolução registrada com sucesso.");
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
