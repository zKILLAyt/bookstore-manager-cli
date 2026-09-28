import { pool } from "../database/connection";
import { Livro } from "../models/Livro";

export class LivroRepository {
  async criar(livro: Livro): Promise<Livro> {
    const result = await pool.query(
      `INSERT INTO livros (titulo, autor_id, quantidade)
       VALUES ($1, $2, $3)
       RETURNING id, titulo, autor_id, quantidade`,
      [livro.titulo, livro.autorId, livro.quantidade],
    );

    return new Livro({
      id: result.rows[0].id,
      titulo: result.rows[0].titulo,
      autorId: result.rows[0].autor_id,
      quantidade: result.rows[0].quantidade,
    });
  }

  async listar(): Promise<Livro[]> {
    const result = await pool.query(
      `SELECT id, titulo, autor_id, quantidade
       FROM livros
       ORDER BY id`,
    );

    return result.rows.map(
      (row) =>
        new Livro({
          id: row.id,
          titulo: row.titulo,
          autorId: row.autor_id,
          quantidade: row.quantidade,
        }),
    );
  }

  async buscarPorId(id: number): Promise<Livro | null> {
    const result = await pool.query(
      `SELECT id, titulo, autor_id, quantidade
       FROM livros
       WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return new Livro({
      id: result.rows[0].id,
      titulo: result.rows[0].titulo,
      autorId: result.rows[0].autor_id,
      quantidade: result.rows[0].quantidade,
    });
  }

  async atualizar(livro: Livro): Promise<Livro | null> {
    const result = await pool.query(
      `UPDATE livros
       SET titulo = $1, autor_id = $2, quantidade = $3
       WHERE id = $4
       RETURNING id, titulo, autor_id, quantidade`,
      [livro.titulo, livro.autorId, livro.quantidade, livro.id],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return new Livro({
      id: result.rows[0].id,
      titulo: result.rows[0].titulo,
      autorId: result.rows[0].autor_id,
      quantidade: result.rows[0].quantidade,
    });
  }

  async remover(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM livros WHERE id = $1", [id]);

    return result.rowCount === 1;
  }
}
