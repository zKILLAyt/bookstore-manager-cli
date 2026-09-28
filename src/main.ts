import { pool } from "./database/connection";

async function testConnection(): Promise<void> {
  try {
    await pool.query("SELECT NOW()");
    console.log("Conexão com PostgreSQL estabelecida.");
  } catch (error) {
    console.error("Erro ao conectar com PostgreSQL:", error);
  } finally {
    await pool.end();
  }
}

testConnection();
