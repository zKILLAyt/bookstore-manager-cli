import { Emprestimo } from "../models/Emprestimo";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";
import { LivroRepository } from "../repositories/LivroRepository";
import { ClienteRepository } from "../repositories/ClienteRepository";

export class EmprestimoService {
  private readonly emprestimoRepository: EmprestimoRepository;
  private readonly livroRepository: LivroRepository;
  private readonly clienteRepository: ClienteRepository;

  constructor(
    emprestimoRepository: EmprestimoRepository,
    livroRepository: LivroRepository,
    clienteRepository: ClienteRepository,
  ) {
    this.emprestimoRepository = emprestimoRepository;
    this.livroRepository = livroRepository;
    this.clienteRepository = clienteRepository;
  }

  async criar(livroId: number, clienteId: number): Promise<Emprestimo> {
    const livro = await this.livroRepository.buscarPorId(livroId);

    if (!livro) {
      throw new Error("Livro não encontrado.");
    }

    const cliente = await this.clienteRepository.buscarPorId(clienteId);

    if (!cliente) {
      throw new Error("Cliente não encontrado.");
    }

    if (livro.quantidade <= 0) {
      throw new Error("Livro indisponível para empréstimo.");
    }

    const emprestimo = new Emprestimo({
      livroId,
      clienteId,
      dataEmprestimo: new Date(),
    });

    const novoEmprestimo = await this.emprestimoRepository.criar(emprestimo);

    livro.quantidade -= 1;

    await this.livroRepository.atualizar(livro);

    return novoEmprestimo;
  }

  async listar(): Promise<Emprestimo[]> {
    return this.emprestimoRepository.listar();
  }

  async buscarPorId(id: number): Promise<Emprestimo> {
    const emprestimo = await this.emprestimoRepository.buscarPorId(id);

    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado.");
    }

    return emprestimo;
  }

  async devolver(id: number): Promise<Emprestimo> {
    const emprestimo = await this.buscarPorId(id);

    if (emprestimo.dataDevolucao) {
      throw new Error("Este empréstimo já foi devolvido.");
    }

    const livro = await this.livroRepository.buscarPorId(emprestimo.livroId);

    if (!livro) {
      throw new Error("Livro não encontrado.");
    }

    const dataDevolucao = new Date();

    const emprestimoAtualizado =
      await this.emprestimoRepository.registrarDevolucao(id, dataDevolucao);

    if (!emprestimoAtualizado) {
      throw new Error("Não foi possível registrar a devolução.");
    }

    livro.quantidade += 1;

    await this.livroRepository.atualizar(livro);

    return emprestimoAtualizado;
  }
}
