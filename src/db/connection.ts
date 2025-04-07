import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3308', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'courrier_db',
  });
}

// Fonction utilitaire pour exécuter des requêtes
export async function query<T>(sql: string, params: any[] = []): Promise<T[]> {
  const connection = await getConnection();
  try {
    const [rows] = await connection.execute(sql, params);
    return rows as T[];
  } finally {
    await connection.end();
  }
}