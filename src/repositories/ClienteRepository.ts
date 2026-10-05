import { pool } from "../database/connection";
import { Cliente } from "../models/Cliente";

export class ClienteRepository {
  async criar(cliente: Cliente): Promise<Cliente> {
    const result = await pool.query(
      "INSERT INTO clientes (nome) VALUES ($1) RETURNING id, nome",
      [cliente.nome],
    );

    return new Cliente(result.rows[0]);
  }

  async listar(): Promise<Cliente[]> {
    const result = await pool.query(
      "SELECT id, nome FROM clientes ORDER BY id",
    );

    return result.rows.map((row) => new Cliente(row));
  }

  async buscarPorId(id: number): Promise<Cliente | null> {
    const result = await pool.query(
      "SELECT id, nome FROM clientes WHERE id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return new Cliente(result.rows[0]);
  }

  async atualizar(cliente: Cliente): Promise<Cliente | null> {
    const result = await pool.query(
      "UPDATE clientes SET nome = $1 WHERE id = $2 RETURNING id, nome",
      [cliente.nome, cliente.id],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return new Cliente(result.rows[0]);
  }

  async remover(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM clientes WHERE id = $1", [id]);

    return result.rowCount === 1;
  }
}
