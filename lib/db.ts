import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function initializeDatabase() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS confirmaciones (
        id SERIAL PRIMARY KEY,
        nombres VARCHAR(100) NOT NULL,
        apellidos VARCHAR(100) NOT NULL,
        acompanante VARCHAR(100),
        ninos_asisten INT NOT NULL,
        puntualidad VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
  } finally {
    client.release()
  }
}

export async function saveConfirmacion(data: {
  nombres: string
  apellidos: string
  acompanante: string
  ninos_asisten: number
  puntualidad?: string
}) {
  const client = await pool.connect()
  try {
    const result = await client.query(
      'INSERT INTO confirmaciones (nombres, apellidos, acompanante, ninos_asisten, puntualidad) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [data.nombres, data.apellidos, data.acompanante, data.ninos_asisten, data.puntualidad || null]
    )
    return result.rows[0]
  } finally {
    client.release()
  }
}

export async function updatePuntualidad(id: number, puntualidad: string) {
  const client = await pool.connect()
  try {
    const result = await client.query(
      'UPDATE confirmaciones SET puntualidad = $1 WHERE id = $2 RETURNING id',
      [puntualidad, id]
    )
    return result.rows[0]
  } finally {
    client.release()
  }
}

export default pool
