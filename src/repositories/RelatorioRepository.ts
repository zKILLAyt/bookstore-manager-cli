import { pool } from "../database/connection";

export class RelatorioRepository {
  async listarLivrosDisponiveis(): Promise<unknown[]> {
    const result = await pool.query(
      `SELECT
         livros.id,
         livros.titulo,
         autores.nome AS autor,
         livros.quantidade
       FROM livros
       INNER JOIN autores
         ON livros.autor_id = autores.id
       WHERE livros.quantidade > 0
       ORDER BY livros.titulo`,
    );

    return result.rows;
  }

  async listarLivrosEmprestados(): Promise<unknown[]> {
    const result = await pool.query(
      `SELECT
         livros.id,
         livros.titulo,
         autores.nome AS autor,
         clientes.nome AS cliente,
         emprestimos.data_emprestimo
       FROM emprestimos
       INNER JOIN livros
         ON emprestimos.livro_id = livros.id
       INNER JOIN autores
         ON livros.autor_id = autores.id
       INNER JOIN clientes
         ON emprestimos.cliente_id = clientes.id
       WHERE emprestimos.data_devolucao IS NULL
       ORDER BY emprestimos.data_emprestimo`,
    );

    return result.rows;
  }

  async listarLivrosPorAutor(): Promise<unknown[]> {
    const result = await pool.query(
      `SELECT
         autores.id,
         autores.nome AS autor,
         livros.id AS livro_id,
         livros.titulo
       FROM autores
       LEFT JOIN livros
         ON livros.autor_id = autores.id
       ORDER BY autores.nome, livros.titulo`,
    );

    return result.rows;
  }

  async listarQuantidadeEmprestimosPorLivro(): Promise<unknown[]> {
    const result = await pool.query(
      `SELECT
         livros.id,
         livros.titulo,
         COUNT(emprestimos.id) AS quantidade_emprestimos
       FROM livros
       LEFT JOIN emprestimos
         ON emprestimos.livro_id = livros.id
       GROUP BY livros.id, livros.titulo
       ORDER BY quantidade_emprestimos DESC, livros.titulo`,
    );

    return result.rows;
  }

  async listarClientesComEmprestimosAtivos(): Promise<unknown[]> {
    const result = await pool.query(
      `SELECT
         clientes.id,
         clientes.nome AS cliente,
         COUNT(emprestimos.id) AS quantidade_emprestimos
       FROM clientes
       INNER JOIN emprestimos
         ON emprestimos.cliente_id = clientes.id
       WHERE emprestimos.data_devolucao IS NULL
       GROUP BY clientes.id, clientes.nome
       ORDER BY quantidade_emprestimos DESC, clientes.nome`,
    );

    return result.rows;
  }
}
