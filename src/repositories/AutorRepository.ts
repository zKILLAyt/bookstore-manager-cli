import { pool } from "../database/connection";
import { Autor } from "../models/Autor";

export class AutorRepository {
  async criar(autor: Autor): Promise<Autor> {
    const result = await pool.query(
      "INSERT INTO autores (nome) VALUES ($1) RETURNING id, nome",
      [autor.nome],
    );

    return new Autor(result.rows[0]);
  }

  async listar(): Promise<Autor[]> {
    const result = await pool.query("SELECT id, nome FROM autores ORDER BY id");

    return result.rows.map((row) => new Autor(row));
  }

  async buscarPorId(id: number): Promise<Autor | null> {
    const result = await pool.query(
      "SELECT id, nome FROM autores WHERE id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return new Autor(result.rows[0]);
  }

  async atualizar(autor: Autor): Promise<Autor | null> {
    const result = await pool.query(
      "UPDATE autores SET nome = $1 WHERE id = $2 RETURNING id, nome",
      [autor.nome, autor.id],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return new Autor(result.rows[0]);
  }

  async remover(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM autores WHERE id = $1", [id]);

    return result.rowCount === 1;
  }
}
