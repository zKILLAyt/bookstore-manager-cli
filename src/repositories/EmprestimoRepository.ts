import { pool } from "../database/connection";
import { Emprestimo } from "../models/Emprestimo";

export class EmprestimoRepository {
  async criar(emprestimo: Emprestimo): Promise<Emprestimo> {
    const result = await pool.query(
      `INSERT INTO emprestimos
       (livro_id, cliente_id, data_emprestimo)
       VALUES ($1, $2, $3)
       RETURNING id, livro_id, cliente_id, data_emprestimo, data_devolucao`,
      [emprestimo.livroId, emprestimo.clienteId, emprestimo.dataEmprestimo],
    );

    return new Emprestimo({
      id: result.rows[0].id,
      livroId: result.rows[0].livro_id,
      clienteId: result.rows[0].cliente_id,
      dataEmprestimo: result.rows[0].data_emprestimo,
      dataDevolucao: result.rows[0].data_devolucao,
    });
  }

  async listar(): Promise<Emprestimo[]> {
    const result = await pool.query(
      `SELECT
         id,
         livro_id,
         cliente_id,
         data_emprestimo,
         data_devolucao
       FROM emprestimos
       ORDER BY id`,
    );

    return result.rows.map(
      (row) =>
        new Emprestimo({
          id: row.id,
          livroId: row.livro_id,
          clienteId: row.cliente_id,
          dataEmprestimo: row.data_emprestimo,
          dataDevolucao: row.data_devolucao,
        }),
    );
  }

  async buscarPorId(id: number): Promise<Emprestimo | null> {
    const result = await pool.query(
      `SELECT
         id,
         livro_id,
         cliente_id,
         data_emprestimo,
         data_devolucao
       FROM emprestimos
       WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return new Emprestimo({
      id: result.rows[0].id,
      livroId: result.rows[0].livro_id,
      clienteId: result.rows[0].cliente_id,
      dataEmprestimo: result.rows[0].data_emprestimo,
      dataDevolucao: result.rows[0].data_devolucao,
    });
  }

  async registrarDevolucao(
    id: number,
    dataDevolucao: Date,
  ): Promise<Emprestimo | null> {
    const result = await pool.query(
      `UPDATE emprestimos
       SET data_devolucao = $1
       WHERE id = $2
       RETURNING
         id,
         livro_id,
         cliente_id,
         data_emprestimo,
         data_devolucao`,
      [dataDevolucao, id],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return new Emprestimo({
      id: result.rows[0].id,
      livroId: result.rows[0].livro_id,
      clienteId: result.rows[0].cliente_id,
      dataEmprestimo: result.rows[0].data_emprestimo,
      dataDevolucao: result.rows[0].data_devolucao,
    });
  }
}
