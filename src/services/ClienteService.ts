import { Cliente } from "../models/Cliente";
import { ClienteRepository } from "../repositories/ClienteRepository";

export class ClienteService {
  private readonly clienteRepository: ClienteRepository;

  constructor(clienteRepository: ClienteRepository) {
    this.clienteRepository = clienteRepository;
  }

  async criar(nome: string): Promise<Cliente> {
    if (!nome.trim()) {
      throw new Error("O nome do cliente é obrigatório.");
    }

    const cliente = new Cliente({
      nome: nome.trim(),
    });

    return this.clienteRepository.criar(cliente);
  }

  async listar(): Promise<Cliente[]> {
    return this.clienteRepository.listar();
  }

  async buscarPorId(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.buscarPorId(id);

    if (!cliente) {
      throw new Error("Cliente não encontrado.");
    }

    return cliente;
  }

  async atualizar(id: number, nome: string): Promise<Cliente> {
    if (!nome.trim()) {
      throw new Error("O nome do cliente é obrigatório.");
    }

    await this.buscarPorId(id);

    const cliente = new Cliente({
      id,
      nome: nome.trim(),
    });

    const clienteAtualizado = await this.clienteRepository.atualizar(cliente);

    if (!clienteAtualizado) {
      throw new Error("Não foi possível atualizar o cliente.");
    }

    return clienteAtualizado;
  }

  async remover(id: number): Promise<void> {
    await this.buscarPorId(id);

    const removido = await this.clienteRepository.remover(id);

    if (!removido) {
      throw new Error("Não foi possível remover o cliente.");
    }
  }
}
