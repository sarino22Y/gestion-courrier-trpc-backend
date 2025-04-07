import { getConnection } from './connection';

async function test() {
  try {
    const conn = await getConnection();
    console.log('Connexion réussie !');
    await conn.end();
  } catch (error) {
    console.error('Erreur de connexion :', error);
  }
}

test();