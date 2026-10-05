import { RelatorioRepository } from "../repositories/RelatorioRepository";

export class RelatorioService {
  private readonly relatorioRepository: RelatorioRepository;

  constructor(relatorioRepository: RelatorioRepository) {
    this.relatorioRepository = relatorioRepository;
  }

  async listarLivrosDisponiveis(): Promise<unknown[]> {
    return this.relatorioRepository.listarLivrosDisponiveis();
  }

  async listarLivrosEmprestados(): Promise<unknown[]> {
    return this.relatorioRepository.listarLivrosEmprestados();
  }

  async listarLivrosPorAutor(): Promise<unknown[]> {
    return this.relatorioRepository.listarLivrosPorAutor();
  }

  async listarQuantidadeEmprestimosPorLivro(): Promise<unknown[]> {
    return this.relatorioRepository.listarQuantidadeEmprestimosPorLivro();
  }

  async listarClientesComEmprestimosAtivos(): Promise<unknown[]> {
    return this.relatorioRepository.listarClientesComEmprestimosAtivos();
  }
}
