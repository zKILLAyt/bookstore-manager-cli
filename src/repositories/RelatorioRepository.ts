import { pool } from "../database/connection";

export interface LivroDisponivel {
  id: number;
  titulo: string;
  autor: string;
  quantidade: number;
}

export interface LivroEmprestado {
  id: number;
  titulo: string;
  autor: string;
  cliente: string;
  data_emprestimo: Date;
}

export interface LivroPorAutor {
  id: number;
  autor: string;
  livro_id: number | null;
  titulo: string | null;
}

export interface QuantidadeEmprestimosPorLivro {
  id: number;
  titulo: string;
  quantidade_emprestimos: number;
}

export interface ClienteComEmprestimosAtivos {
  id: number;
  cliente: string;
  quantidade_emprestimos: number;
}

export class RelatorioRepository {
  async listarLivrosDisponiveis(): Promise<LivroDisponivel[]> {
    const result = await pool.query<LivroDisponivel>(
      `SELECT
         livros.id,
         livros.titulo,
         autores.nome AS autor,
         livros.quantidade
       FROM livros
       INNER JOIN autores
         ON livros.autor_id = autores.id
       WHERE livros.quantidade > 0
       ORDER BY livros.titulo
       LIMIT 100`,
    );

    return result.rows;
  }

  async listarLivrosEmprestados(): Promise<LivroEmprestado[]> {
    const result = await pool.query<LivroEmprestado>(
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
       ORDER BY emprestimos.data_emprestimo
       LIMIT 100`,
    );

    return result.rows;
  }

  async listarLivrosPorAutor(): Promise<LivroPorAutor[]> {
    const result = await pool.query<LivroPorAutor>(
      `SELECT
         autores.id,
         autores.nome AS autor,
         livros.id AS livro_id,
         livros.titulo
       FROM autores
       LEFT JOIN livros
         ON livros.autor_id = autores.id
       ORDER BY autores.nome, livros.titulo
       LIMIT 100`,
    );

    return result.rows;
  }

  async listarQuantidadeEmprestimosPorLivro(): Promise<
    QuantidadeEmprestimosPorLivro[]
  > {
    const result = await pool.query<QuantidadeEmprestimosPorLivro>(
      `SELECT
         livros.id,
         livros.titulo,
         COUNT(emprestimos.id) AS quantidade_emprestimos
       FROM livros
       LEFT JOIN emprestimos
         ON emprestimos.livro_id = livros.id
       GROUP BY livros.id, livros.titulo
       ORDER BY quantidade_emprestimos DESC, livros.titulo
       LIMIT 100`,
    );

    return result.rows;
  }

  async listarClientesComEmprestimosAtivos(): Promise<
    ClienteComEmprestimosAtivos[]
  > {
    const result = await pool.query<ClienteComEmprestimosAtivos>(
      `SELECT
         clientes.id,
         clientes.nome AS cliente,
         COUNT(emprestimos.id) AS quantidade_emprestimos
       FROM clientes
       INNER JOIN emprestimos
         ON emprestimos.cliente_id = clientes.id
       WHERE emprestimos.data_devolucao IS NULL
       GROUP BY clientes.id, clientes.nome
       ORDER BY quantidade_emprestimos DESC, clientes.nome
       LIMIT 100`,
    );

    return result.rows;
  }
}
