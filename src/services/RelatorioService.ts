import {
  ClienteComEmprestimosAtivos,
  LivroDisponivel,
  LivroEmprestado,
  LivroPorAutor,
  QuantidadeEmprestimosPorLivro,
  RelatorioRepository,
} from "../repositories/RelatorioRepository";

export class RelatorioService {
  private readonly relatorioRepository: RelatorioRepository;

  constructor(relatorioRepository: RelatorioRepository) {
    this.relatorioRepository = relatorioRepository;
  }

  async listarLivrosDisponiveis(): Promise<LivroDisponivel[]> {
    return this.relatorioRepository.listarLivrosDisponiveis();
  }

  async listarLivrosEmprestados(): Promise<LivroEmprestado[]> {
    return this.relatorioRepository.listarLivrosEmprestados();
  }

  async listarLivrosPorAutor(): Promise<LivroPorAutor[]> {
    return this.relatorioRepository.listarLivrosPorAutor();
  }

  async listarQuantidadeEmprestimosPorLivro(): Promise<
    QuantidadeEmprestimosPorLivro[]
  > {
    return this.relatorioRepository.listarQuantidadeEmprestimosPorLivro();
  }

  async listarClientesComEmprestimosAtivos(): Promise<
    ClienteComEmprestimosAtivos[]
  > {
    return this.relatorioRepository.listarClientesComEmprestimosAtivos();
  }
}
